import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import { GameNightRow } from "../../components/gameNightRow/GameNightRow";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/loggedInUser/userAPI";
import GameNightCard from "../../components/gameNightCard/GameNightCard";

interface allEventsModel {
  date: Date;
  spotsAvailable: number;
  city: string;
  address: string;
  gameId: {
    gameName: string;
    gameImg: string;
  };
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
  };

  _id: number;
}

export const FindGameNights = () => {
  const [allEvents, setAllEvents] = useState<allEventsModel[]>([]);
  const loggedInUser = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login());
    getAllEvents();
  }, []);

  async function getAllEvents() {
    try {
      const { data } = await axios.get("/api/game-nights/get-all-events");
      console.log(data);
      const { results } = data;
      setAllEvents(results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="page">
      <Header />
      <NavBar />
      <div className="full_page">
        <div className="container_cards">
          {allEvents.map((event, idx) => {
            let userHost;
            if (loggedInUser?._id === event.hostId._id) {
              userHost = true;
            } else {
              userHost = false;
            }

            return (
              <GameNightCard
                key={idx} //@ts-ignore
                GameName={event.gameId.gameName}
                playingOn={event.date}
                playingIn={event.city}
                address={event.address}
                hostedByname={event.hostId.firstName}
                hostedBylastName={event.hostId.lastName}
                spots={event.spotsAvailable}
                userHost={userHost}
                gameEventId={event._id}
                game_img={event.gameId.gameImg}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
