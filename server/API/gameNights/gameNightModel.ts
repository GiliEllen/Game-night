import mongoose, { Schema } from "mongoose";
import GameModel from "../games/gameModel";
import UserModel from "../users/usersModel";

const GameNightSchema = new mongoose.Schema({
    date: String,
    spotsAvaliable: Number,
    gameId: {
      type: Schema.Types.ObjectId, ref: GameModel
    },
    hostId: {
      type: Schema.Types.ObjectId, ref: UserModel
    },
    city: String,
    address: String,
    canUserJoin: Boolean
  });
  
  const GameNightModel = mongoose.model("gamenights", GameNightSchema);
  
  export default GameNightModel;

  const GameNightSpotsSchema = new mongoose.Schema({
    gameNightId: {
      type: Schema.Types.ObjectId, ref: GameNightModel
    },
    userAtendeeId: {
      type: Schema.Types.ObjectId, ref: UserModel
    }
  });
  
  export const GameNightSpotsModel = mongoose.model("gamenightspots", GameNightSpotsSchema);

