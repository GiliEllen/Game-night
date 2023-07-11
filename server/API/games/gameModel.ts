import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  gameName: String,
  gameImg: String,
});

const GameModel = mongoose.model("games", GameSchema);

export default GameModel;

const UserGameSchema = new mongoose.Schema({
  gameId: String,
  userId: String,
});

export const UserGameModel = mongoose.model("usergames", UserGameSchema);
