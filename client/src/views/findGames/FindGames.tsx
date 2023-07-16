import React from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { GameModel } from "../myGames/MyGames";
import Game from "../../components/game/Game";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";

function FindGames() {
  const loggedInUser = useAppSelector(userSelector);
  const [allGamesArray, setAllgamesArray] = useState<GameModel[]>([]);
  const userId = loggedInUser?._id;
  async function getAllGames() {
    try {
      const { data } = await axios.post("/api/games/get-all-games-by-user", {
        userId,
      });
      const { gamesArray } = data;
      setAllgamesArray(gamesArray);
      console.log(gamesArray);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllGames();
  }, []);
  return (
    <div className="page">
      <Header />
      <NavBar />
      <div className="full_page game_list">
        {allGamesArray.map((game, idx) => {
          return (
            <Game
              key={idx}
              name={game.gameName}
              img={game.gameImg}
              addable={game.gameAddble}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FindGames;
