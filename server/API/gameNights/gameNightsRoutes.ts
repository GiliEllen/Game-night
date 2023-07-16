import express from "express";
import {
  addEvent,
  getUserEvents,
  getAllEvents,
  addUserToGameNight,
  checkIfUserCanJoinGame,
  getEventById,
  deleteEventById

} from "./gameNightsCont";
import db from "../../DB/database";

const router = express.Router();

router
  .get("/get-all-events", getAllEvents)
  .get("/:eventId", getEventById)
  .post("/add-event", addEvent)
  .post("/get-user-events", getUserEvents)
  .post("/add-user-to-game-night", addUserToGameNight)
  .post("/check-if-user-can-join-game", checkIfUserCanJoinGame)
  .delete("/:eventId", deleteEventById)


export default router;
