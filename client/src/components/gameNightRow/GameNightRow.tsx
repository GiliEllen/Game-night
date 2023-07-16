import axios from "axios";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";

interface GameNightRowProps {
  GameName: string;
  playingOn: Date;
  playingIn: string;
  address: string;
  hostedByname: string;
  hostedBylastName: string;
  spots: number;
  userHost: boolean;
  gameEventId: number;
}

export const GameNightRow: FC<GameNightRowProps> = ({
  GameName,
  playingOn,
  playingIn,
  address,
  hostedByname,
  hostedBylastName,
  spots,
  userHost,
  gameEventId,
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
      console.log("check event");
      const today = new Date();
      if (day < today.getDate() && month < today.getMonth() + 1) {
        setDisabled(true);
        console.log("event pass");
      } else if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear() &&
        hour < today.getHours()
      ) {
        setDisabled(true);
        console.log("event pass");
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
      if (results.affectedRows > 0) {
        setDisabled(true);
      }
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
    <tr>
      <td>{GameName}</td>
      <td>{`${day}.${month + 1}.${year} at ${hour}:${minutesFinal}`}</td>
      <td>{playingIn}</td>
      <td>{address}</td>
      <td>
        {hostedByname} {hostedBylastName}
      </td>
      <td>{spots}</td>

      {/*user host*/}

      {disabled && (
        <td>
          <button disabled onClick={handleAddUserToGameEvent}>
            JOIN GAME
          </button>
        </td>
      )}
      {!disabled && (
        <td>
          <button onClick={handleAddUserToGameEvent}>JOIN GAME</button>
        </td>
      )}
    </tr>
  );
};
