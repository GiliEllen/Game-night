import React, { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

interface GameNightCardProps {
  GameName: string;
  playingOn: Date;
  playingIn: string;
  address: string;
  hostedByname: string;
  hostedBylastName: string;
  spots: number;
  userHost: boolean;
  gameEventId: number;
  game_img: string;
}

const GameNightCard: FC<GameNightCardProps> = ({
  GameName,
  playingOn,
  playingIn,
  address,
  hostedByname,
  hostedBylastName,
  spots,
  userHost,
  gameEventId,
  game_img,
}) => {
  const loggedInUser = useAppSelector(userSelector);
  const [userClickedButton, setUserClickedButton] = useState<boolean>(false);
  const [gameJoinable, setGameJoinable] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const day = new Date(playingOn).getDate();
  const month = new Date(playingOn).getMonth();
  const year = new Date(playingOn).getFullYear();
  const hour = new Date(playingOn).getHours();
  const minutes = new Date(playingOn).getMinutes();
  const [display, setDisplay] = useState("flex");
  let minutesFinal;
  if (minutes < 10) {
    minutesFinal = `0${minutes}`;
  } else {
    minutesFinal = minutes;
  }
  useEffect(() => {
    isEventPass();
  }, []);

  function isEventPass() {
    try {
      const today = new Date();
      if (year < today.getFullYear()) {
        setDisabled(true);
        setDisplay("none");
      }

      if (day < today.getDate() && month < today.getMonth() + 1) {
        setDisabled(true);
        setDisplay("none");
      } else if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear() &&
        hour < today.getHours()
      ) {
        setDisabled(true);
        setDisplay("none");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddUserToGameEvent() {
    try {
      const userId = loggedInUser?._id;
      const { data } = await axios.post(
        "/api/game-nights/add-user-to-game-night",
        { userId, gameEventId }
      );
      const { results } = data;

      setDisabled(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function canUserJoinGame() {
    try {
      const userId = loggedInUser?._id;
      const { data } = await axios.post(
        "/api/game-nights/check-if-user-can-join-game",
        { gameEventId, userId }
      );
      const { userJoin } = data;
      setGameJoinable(userJoin);
      if (!userJoin) {
        setDisabled(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function button() {
    if (userHost === true) {
      setDisabled(true);
    } else if (gameJoinable === false) {
      setDisabled(true);
    }
  }

  useEffect(() => {
    canUserJoinGame();
    button();
  }, []);

  return (
    <div style={{ display: display }} className="game-night-card">
      <div className="game-night-card__img">
        <img src={game_img} alt="" />
      </div>

      <h3>{GameName}</h3>
      <div className="game-night-card__date-container">
        <span className="material-symbols-outlined">event</span>
        <p>
          Playing on: {`${day}.${month + 1}.${year} at ${hour}:${minutesFinal}`}
        </p>
      </div>
      <div className="game-night-card__location-container">
        <span className="material-symbols-outlined">location_on</span>
        <p>
          at {playingIn} {address}
        </p>
      </div>
      <div className="game-night-card__host-container">
        <span className="material-symbols-outlined">account_circle</span>
        <p>
          Hosted by {hostedByname} {hostedBylastName}
        </p>
      </div>

      {disabled && (
        <button
          className="button_join button_join--disabled"
          disabled
          onClick={handleAddUserToGameEvent}
        >
          JOIN GAME
        </button>
      )}
      {!disabled && (
        <button className="button_join" onClick={handleAddUserToGameEvent}>
          JOIN GAME
        </button>
      )}
    </div>
  );
};

export default GameNightCard;
