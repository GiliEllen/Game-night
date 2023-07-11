import express from "express";
import http from "http";
import mongoose from "mongoose"

const cookieParser = require('cookie-parser')

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const mongodb_uri = process.env.MONGO_URI;

// future implementation
mongoose.set("strictQuery", true);

mongoose //@ts-ignore
  .connect(mongodb_uri)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("At mongoose.connect:");
    console.error(err.message);
  });



app.use(express.json());
app.use(cookieParser());

import usersRoutes from "./API/users/usersRoutes";
app.use("/api/users", usersRoutes);

import gamesRoutes from "./API/games/gamesRoutes";
app.use("/api/games", gamesRoutes);

import gameNightsRoutes from "./API/gameNights/gameNightsRoutes";
app.use("/api/game-nights", gameNightsRoutes);

app.use("/check", (req, res) => {
    try {
        console.log("check")
        res.send({ok: "hello"})
    } catch (error) {
        res.status(500).send({error: error})
    }
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

