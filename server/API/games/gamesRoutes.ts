import express from "express";
import { 
    findGameByUser,
     findGameByName,
      addGame,
       addGameToUser,
     getAllGames,
     deleteGameFromUserGames
    } from "./gamesCont";


const router = express.Router();

router
.post("/get-all-games-by-user", getAllGames)
.post("/find-game-by-user", findGameByUser)
.post("/find-game-by-name", findGameByName)
.post("/Add-New-Game", addGame)
.post("/add-game-to-user", addGameToUser)
.delete("/:gameId/user/:userId", deleteGameFromUserGames);

export default router;
