import mongoose from "mongoose";

const GameNightSchema = new mongoose.Schema({
    date: String,
    spotsAvaliable: Number,
    gameId: String,
    hostId: String,
    city: String,
    address: String,
    canUserJoin: Boolean
  });
  
  const GameNightModel = mongoose.model("gamenights", GameNightSchema);
  
  export default GameNightModel;

  const GameNightSpotsSchema = new mongoose.Schema({
    gameNightId: String,
    userAtendeeId: String,
  });
  
  export const GameNightSpotsModel = mongoose.model("gamenightspots", GameNightSpotsSchema);
