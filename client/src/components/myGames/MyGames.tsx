import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import Header from "./../header/Header";
import NavBar from "./../navbar/NavBar";
import axios from "axios";
import Game from "./game/Game";
import AddNewGame from './addNewGame/AddNewGame';

export interface GameModel {
  game_name: string;
  game_img: string,
  game_id:number,
  gameAddble?: boolean
}

function MyGames() {
  const loggedInUser = useAppSelector(userSelector);
  const [games, setGames] = useState<GameModel[]>([]);

  useEffect(() => {
    getUserGames();
  }, []);

  async function getUserGames() {
    try {
      const { data } = await axios.post("/api/games/find-game-by-user", {
        loggedInUser,
      });
      if (!data) throw new Error("no data from serever");
      const { results } = data;
      setGames(results);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="page">
      <Header />
      <NavBar />
      <div className="main">
        <h1>my game list</h1>
        <div className="user_games">
          {games.map((game, idx) => {
            return <Game key={idx} name={game.game_name} img={game.game_img} addable={false}/>;
          })}
        </div>
      </div>
      <div className="bottom_section">
        <h1>Add New Game</h1>
        <AddNewGame userGames={games}/>
      </div>
    </div>
  );
}

export default MyGames;
