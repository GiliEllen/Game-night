import express from "express";
import db from "../../DB/database";
import jwt from "jwt-simple";

const cookieParser = require("cookie-parser");

export async function addEvent(req: express.Request, res: express.Response) {
  try {
    const {
      eventDateDay,
      eventDateMonth,
      eventDateYear,
      eventTime,
      eventLocationCity,
      eventLocationAddress,
      eventSpots,
      SelectedGameId,
      userId,
    } = req.body;

    if (!eventDateDay || !eventDateMonth || !eventDateYear)
      throw new Error("No date data from client on addEvent");
    if (!eventTime || !eventLocationCity || !eventLocationAddress)
      throw new Error("no event time or location data from client on addEvent");
    if (!eventSpots || !SelectedGameId || !userId)
      throw new Error("no game or user information from client on addEvent");

    let fullMonth = "";
    if (eventDateMonth >= 10) {
      fullMonth = `${eventDateMonth}`;
    } else {
      fullMonth = `0${eventDateMonth}`;
    }
    const fullDate = `${eventDateYear}-${fullMonth}-${eventDateDay} ${eventTime}:00`;

    const query = `INSERT INTO gamenight.game_events (date, spots_available, game_id, user_host_id, location_city, location_address, can_user_join) VALUES ('${fullDate}', ${eventSpots}, ${SelectedGameId}, ${userId}, '${eventLocationCity}', '${eventLocationAddress}', '1');`;

    db.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({ results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function getUserEvents(
  req: express.Request,
  res: express.Response
) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userId } = req.cookies;
    if (!userId) throw new Error("no userId found");
    if (userId === undefined) throw new Error("no user");

    const decodedUserId = jwt.decode(userId, secret);
    const { userID } = decodedUserId;
    const query = 
    `SELECT * FROM gamenight.game_events as ge
    JOIN gamenight.games as g
    ON ge.game_id = g.game_id AND ge.user_host_id = ${userID}
    ; 
    SELECT * from game_events 
    JOIN games 
    WHERE games.game_id = game_events.game_id 
    AND game_events.game_events_id IN (
      SELECT game_event_id
        FROM game_events_spots
        WHERE user_atendee_id = '${userID}'
    );`;
    const userEvents = [];
    db.query(query, [1,2], (err, results, fields) => {
      try {
        if (err) throw err;
        results[0].forEach((result) => {
          userEvents.push({
            id: result.game_events_id,
            title: result.game_name,
            start: result.date,
            description: `You will play ${result.game_name} at ${result.location_city}, ${result.location_address}, hosted by You.`
          });
        });
        results[1].forEach((result) => {
          userEvents.push({
            id: result.game_events_id,
            title: result.game_name,
            start:result.date,
            description: `You will play ${result.game_name} at ${result.location_city}, ${result.location_address}`
          })
        });
        res.send({ userEvents });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export async function getAllEvents(
  req: express.Request,
  res: express.Response
) {
  try {
    const query = `SELECT ge.game_events_id, ge.date, ge.spots_available, ge.location_city, ge.location_address, g.game_name, g.game_img, u.first_name, u.last_name, ge.user_host_id FROM gamenight.game_events as ge
  JOIN gamenight.games as g 
  ON ge.game_id = g.game_id
  JOIN gamenight.users as u 
  ON ge.user_host_id = u.user_id`;
    db.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({ results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export async function addUserToGameNight(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId, gameEventId } = req.body;
    if (!userId || !gameEventId)
      throw new Error("no data from client on addUserToGameNight");

    const query = `INSERT INTO gamenight.game_events_spots (user_atendee_id, game_event_id) VALUES (${userId}, ${gameEventId})`;
    db.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({ results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export async function checkIfUserCanJoinGame(
  req: express.Request,
  res: express.Response
) {
  try {
    const {gameEventId, userId} = req.body
    const query =
      `SELECT COUNT(game_event_id) as NumberOfAtendees FROM gamenight.game_events_spots 
      WHERE game_events_spots.game_event_id = ${gameEventId}; SELECT game_events.spots_available FROM gamenight.game_events WHERE game_events_id = '${gameEventId}'; SELECT COUNT(ges.user_atendee_id) 
      AS userAlredyJoined FROM gamenight.game_events_spots as ges
      WHERE ges.user_atendee_id = ${userId} AND ges.game_event_id = ${gameEventId}`;
      let userJoin; 
      db.query(query, [1,2,3], (err, results, fields) => {
        try {
          if (err) throw err;
          
          if(results[0][0].NumberOfAtendees === results[1][0].spots_available) {
            userJoin = false;
          } else if(results[0][0].NumberOfAtendees < results[1][0].spots_available) {
            userJoin = true;
          }
          if(results[2][0].userAlredyJoined > 0){
            userJoin = false;
          }
          res.send({ userJoin: userJoin });
          // res.send(results)
        } catch (error) {
          console.log(err);
          res.status(500).send({ ok: false, error: err });
        }
      });
    } catch (error) {
    res.status(500).send({ error: error });
  }
}
