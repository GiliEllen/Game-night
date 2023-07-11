import express from "express";
import db from "../../DB/database";
import jwt from "jwt-simple";
import GameNightModel, { GameNightSpotsModel } from "./gameNightModel";
import { Schema } from "mongoose";

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

    const eventDB = await GameNightModel.create({
      date: fullDate,
      spotsAvaliable: eventSpots,
      gameId: SelectedGameId,
      hostId: userId,
      city: eventLocationCity,
      address: eventLocationAddress,
      canUserJoin: true,
    });

    if (!eventDB) throw new Error("no event created");

    res.send({ results: eventDB });
  } catch (error) {
    console.log(error);
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

    const { userID } = req.cookies;
    if (!userID) throw new Error("no userId found");
    if (userID === undefined) throw new Error("no user");

    const decodedUserId = jwt.decode(userID, secret);
    const { userId } = decodedUserId;

    const [gamesNightsHostDB, gamesNightsAtendeeDB] = await Promise.all([
      GameNightModel.find({ hostId: userId }).populate(["hostId", "gameId"]),
      GameNightSpotsModel.find({
        userAtendeeId: userId,
      }).populate(["gameNightId", "userAtendeeId", "hostId", "gameId"]),
    ]);

    const userEvents: any[] = [];

    gamesNightsHostDB.forEach((result) => {
      userEvents.push({
        id: result._id, //@ts-ignore
        title: result.gameId?.gameName,
        start: result.date, //@ts-ignore
        description: `You will play ${result.gameId?.gameName} at ${result.city}, ${result.address}, hosted by You.`,
      });
    });

    gamesNightsAtendeeDB.forEach((result) => {
      userEvents.push({
        id: result._id, //@ts-ignore
        title: result.gameNightId?.gameId.gameName, //@ts-ignore
        start: result.gameNightId?.date, //@ts-ignore
        description: `You will play ${result.gameNightId?.gameId.gameName} at ${result.result.gameNightId?.city}, ${result.result.gameNightId?.ddress}`,
      });
    });
    res.send({ userEvents });

    // const query = `SELECT * FROM gamenight.game_events as ge
    // JOIN gamenight.games as g
    // ON ge.game_id = g.game_id AND ge.user_host_id = ${userID}
    // ;
    // SELECT * from game_events
    // JOIN games
    // WHERE games.game_id = game_events.game_id
    // AND game_events.game_events_id IN (
    //   SELECT game_event_id
    //     FROM game_events_spots
    //     WHERE user_atendee_id = '${userID}'
    // );`;
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
    const eventsDB = await GameNightModel.find().populate(["gameId", "hostId"]);

    res.send({ results: eventsDB });
  } catch (error: any) {
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

    const eventSpotDB = await GameNightSpotsModel.create({
      gameNightId: gameEventId,
      userAtendeeId: userId,
    });

    res.send({ results: eventSpotDB });
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
    const { gameEventId, userId } = req.body;
    let userJoin;
    if (!gameEventId || !userId)
      throw new Error(
        "no information on checkIfUserCanJoinGame at gamenightCtrl"
      );

    const [gameEventDB, gameEventAtendees] = await Promise.all([
      GameNightModel.findById(gameEventId).populate(["hostId", "gameId"]),
      GameNightSpotsModel.find({ gameNightId: gameEventId }).populate([
        "gameNightId",
        "userAtendeeId",
      ]),
    ]);
    if (!gameEventAtendees || !gameEventDB) {
      throw new Error(
        "no events found on checkIfUserCanJoinGame at gameNightCtrl"
      );
    } else {
      if (gameEventDB.spotsAvaliable! < gameEventAtendees.length) {
        userJoin = false;
      } else {
        if (
          gameEventAtendees.some(
            (user) => user.userAtendeeId?.toString() == userId.toString()
          )
        ) {
          userJoin = false;
        } else {
          userJoin = true;
        }
      }
    }

    res.send({ userJoin: userJoin });
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error });
  }
}
