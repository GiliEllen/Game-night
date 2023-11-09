import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import Game from "../../components/game/Game";
import AddNewGame from "../../components/addNewGame/AddNewGame";

export interface GameModel {
  gameName: string;
  gameImg: string;
  gameId: string;
  gameAddble?: boolean;
}

export interface UserGame {
  gameId: {
    gameName: string;
    gameImg: string;
    _id: string;
  };
  userId: any;
  gameAddble?: boolean;
}

function MyGames() {
  const loggedInUser = useAppSelector(userSelector);
  const [games, setGames] = useState<UserGame[]>([]);

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
      console.log(results)
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
            //@ts-ignore
            return (
              <Game
                key={idx}
                name={game.gameId.gameName}
                img={game.gameId.gameImg}
                gameId={game.gameId._id}
                addable={false}
                setGames={setGames}
                games={games}
              />
            );
          })}
        </div>
      </div>
      <div className="bottom_section">
        <h1>Add New Game</h1>
        <AddNewGame userGames={games} />
      </div>
    </div>
  );
}

export default MyGames;
