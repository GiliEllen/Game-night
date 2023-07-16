import axios from "axios";
import React, { FC, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import { UserGame } from "../../views/myGames/MyGames";

interface GameProps {
  name: string;
  img: string;
  addable: boolean | undefined;
  gameId?: string;
  setGames?: CallableFunction;
  games?: UserGame[];
}

const Game: FC<GameProps> = ({
  name,
  img,
  addable,
  gameId,
  setGames,
  games,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const loggedInUser = useAppSelector(userSelector);
  const userId = loggedInUser?._id;

  async function handleAddGameToList(ev: any) {
    try {
      const { data } = await axios.post("/api/games/add-game-to-user", {
        name,
        userId,
      });
      const { results } = data;

      console.log("game added good!");
      setDisabled(true);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteGame() {
    try {
      const { data } = await axios.delete(
        `/api/games/${gameId}/user/${userId}`
      );
      console.log(data);

      if (data.ok) {
        console.log(games);
        const newGameList = games?.filter(
          (game) =>
            game.gameId._id.toString() !== data.userGame.gameId.toString()
        );
        console.log(newGameList);
        if (setGames) setGames(newGameList);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="game_card">
      <div className="game_card__container">
        <img src={img} alt="" />
        <h2>{name}</h2>
        {!addable ? (
          <button onClick={handleDeleteGame} className="button_icon">
            <span className="material-symbols-outlined">delete</span>
          </button>
        ) : null}
      </div>

      <div className="information">
        {addable && (
          <h3>Would you like to add this game to your owned game list?</h3>
        )}
        {!disabled && addable && (
          <button className="button_add" onClick={handleAddGameToList}>
            ADD
          </button>
        )}
        {disabled && addable && (
          <button className="button_add" disabled onClick={handleAddGameToList}>
            ADD
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
