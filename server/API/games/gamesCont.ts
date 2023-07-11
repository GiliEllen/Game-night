import express from "express";
import db from "../../DB/database";
import jwt from "jwt-simple";
import GameModel, { UserGameModel } from "./gameModel";

export async function findGameByUser(
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

    const userGamesDB = await UserGameModel.find({ userId }).populate([
      "gameId",
      "userId",
    ]);

    console.log(userGamesDB)

    res.send({ results: userGamesDB });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function findGameByName(
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
    const { gameName } = req.body;
    if (!gameName) throw new Error("no game from client on findGameByName");

    const regExpName = new RegExp(gameName, "i");

    // const gamesDB = await GameModel.find({ gameName: regExpName });

    // const userGameDB = await UserGameModel.find({
    //   gameName: regExpName,
    //   userId,
    // });

    const [gamesDB, userGameDB] = await Promise.all([
      GameModel.find({ gameName: regExpName }),
      UserGameModel.find({
        gameName: regExpName,
        userId,
      }).populate(["gameId", "userId"]),
    ]);

    const gamesArray: any[] = [];
    gamesDB.map((result) => {
      //@ts-ignore
      if (userGameDB.some((e) => e.gameId === result._Id)) {
        gamesArray.push({
          gameName: result.gameName,
          gameImg: result.gameImg,
          gameId: result._id,
          gameAddble: false,
        });
      } else {
        gamesArray.push({
          gameName: result.gameName,
          gameImg: result.gameImg,
          gameId: result._id,
          gameAddble: true,
        });
      }

      res.send({ gamesArray });
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function addGame(req: express.Request, res: express.Response) {
  try {
    const { gameName, gameImg } = req.body;
    if (!gameName || !gameImg)
      throw new Error("no data from cliend on addGame");

    const gameDB = await GameModel.create({ gameImg, gameName });
    if (!gameDB) throw new Error("coulf not save game to DB");

    res.send({ results: gameDB });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function addGameToUser(
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
    const { name } = req.body;

    if (!userId || !name)
      throw new Error("no loggedInUser or name from client on addGameToUser");

    const gameDB = await GameModel.findOne({ gameName: name });
    if (!gameDB) throw new Error("no game found with this name");

    const userGameDB = await UserGameModel.create({
      gameId: gameDB._id,
      userId,
    });

    res.send({ results: userGameDB });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function getAllGames(req: express.Request, res: express.Response) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");
    const { userID } = req.cookies;

    if (!userID) throw new Error("no userId found");
    if (userID === undefined) throw new Error("no user");

    const decodedUserId = jwt.decode(userID, secret);
    const { userId } = decodedUserId;
    if (!userId || !userID)
      throw new Error("no loggedInUser from client on get all games");

    const [gamesDB, userGameDB] = await Promise.all([
      GameModel.find(),
      UserGameModel.find({
        userId,
      }).populate(["gameId", "userId"]),
    ]);

    const gamesArray: any[] = [];
    gamesDB.map((result) => {
      //@ts-ignore
      if (userGameDB.some((e) => e.gameId === result._Id)) {
        gamesArray.push({
          gameName: result.gameName,
          gameImg: result.gameImg,
          gameId: result._id,
          gameAddble: false,
        });
      } else {
        gamesArray.push({
          gameName: result.gameName,
          gameImg: result.gameImg,
          gameId: result._id,
          gameAddble: true,
        });
      }
    });

    res.send({ gamesArray });
  } catch (error) {
    console.log(error);

    res.status(500).send({ error: error });
  }
}
