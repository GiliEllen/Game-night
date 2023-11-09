import { ReactEventHandler, useEffect, useState, FC } from "react";
import axios from "axios";
import Game from "../game/Game";
import { GameModel, UserGame } from "../../views/myGames/MyGames";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/loggedInUser/userAPI";

interface AddGamesProps {
  userGames: Array<UserGame>;
}

const AddNewGame: FC<AddGamesProps> = ({ userGames }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(login());
  }, []);

  const [gameExist, setGameExist] = useState(false);
  const [possibleGame, setPossibleGame] = useState<GameModel[]>([]);
  const [allowAdd, setAllowAdd] = useState<Boolean>(false);
  const [searchedGame, setSearchedGame] = useState("")

  async function handleAddGame(ev: any) {
    try {
      ev.preventDefault();
      const gameName = ev.target.gameName.value;
      const gameImg = ev.target.gameImg.value;
      if (!gameName || !gameImg)
        throw new Error("no data from client on handleAddGame");

      const { data } = await axios.post("/api/games/Add-New-Game", {
        gameName,
        gameImg,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // async function handleLookForGameName(ev: any) {
  //   try {
  //     ev.preventDefault();
  //     const gameName = ev.target.value;
  //     if (!gameName) {
  //       setGameExist(false);
  //       setPossibleGame([]);
  //       return;
  //     }
  //     const { data } = await axios.post("/api/games/find-game-by-name", {
  //       gameName,
  //     });
  //     if (!data) throw new Error("no data on /api/games/find-game-by-name");
  //     const { gamesArray } = data;
  //     if (gamesArray.length === 0) {
  //       console.log("no game with this name is found");
  //       setGameExist(false);
  //       setPossibleGame([]);
  //       setAllowAdd(true);
  //     } else if (gamesArray.length > 0) {
  //       console.log("game avilable");
  //       setGameExist(true);
  //       setPossibleGame(gamesArray);
  //       setAllowAdd(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    const getData = setTimeout(async () => {
      try {
        if (!searchedGame) {
          setGameExist(false);
          setPossibleGame([]);
          return;
        }
        const { data } = await axios.post("/api/games/find-game-by-name", {
          gameName: searchedGame,
        });
        if (!data) throw new Error("no data on /api/games/find-game-by-name");
        const { gamesArray } = data;
        if (gamesArray.length === 0) {
          console.log("no game with this name is found");
          setGameExist(false);
          setPossibleGame([]);
          setAllowAdd(true);
        } else if (gamesArray.length > 0) {
          console.log("game avilable");
          setGameExist(true);
          setPossibleGame(gamesArray);
          setAllowAdd(false);
        }
      } catch (error) {
        console.error(error);
      }
    }, 2000)

    return () => clearTimeout(getData)
  }, [searchedGame])

  return (
    <div className="add_new_game">
      <form onSubmit={handleAddGame}>
        <input
          onChange={(ev) => setSearchedGame(ev.target.value)}
          type="text"
          name="gameName"
          placeholder="Enter Game Name Here"
        />
        <input
          type="text"
          name="gameImg"
          placeholder="Enter Game Image Link Here"
        />
        {allowAdd && <button type="submit">ADD GAME</button>}
        {!allowAdd && (
          <button disabled type="submit">
            ADD GAME
          </button>
        )}
      </form>
      <div className="result_container">
        {gameExist && <div>Did you mean...</div>}
        {gameExist &&
          possibleGame.map((game, idx) => {
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
};

export default AddNewGame;
