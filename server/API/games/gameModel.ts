import mongoose, { Schema } from "mongoose";
import UserModel from "./../users/usersModel";

const GameSchema = new mongoose.Schema({
  gameName: String,
  gameImg: String,
});

const GameModel = mongoose.model("games", GameSchema);

export default GameModel;

const UserGameSchema = new mongoose.Schema({
  gameId: { type: Schema.Types.ObjectId, ref: GameModel },
  userId: { type: Schema.Types.ObjectId, ref: UserModel },
});

export const UserGameModel = mongoose.model("usergames", UserGameSchema);
