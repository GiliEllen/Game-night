import express from "express";
import { addEvent, getUserEvents, getAllEvents, addUserToGameNight, checkIfUserCanJoinGame } from "./gameNightsCont";
import db from "../../DB/database";

const router = express.Router();

router
.get("/get-all-events", getAllEvents)
.post("/add-event", addEvent)
.post("/get-user-events", getUserEvents)
.post("/add-user-to-game-night", addUserToGameNight)
.post("/check-if-user-can-join-game", checkIfUserCanJoinGame)


export default router;
