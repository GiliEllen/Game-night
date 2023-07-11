import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import Header from "../header/Header";
import NavBar from "./../navbar/NavBar";
import { GameNightRow } from "./gameNightRow/GameNightRow";
import { useAppDispatch } from "./../../app/hooks";
import { login } from "./../../features/loggedInUser/userAPI";
import GameNightCard from "./gameNightCard/GameNightCard";

interface allEventsModel {
  date: Date;
  spots_available: number;
  location_city: string;
  location_address: string;
  game_name: string;
  game_img: string;
  first_name: string;
  last_name: string;
  user_host_id: number;
  game_events_id: number;
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
            if (loggedInUser?.user_id === event.user_host_id) {
              userHost = true;
            } else {
              userHost = false;
            }
          
              return (
                <GameNightCard
                  key={idx}
                  GameName={event.game_name}
                  playingOn={event.date}
                  playingIn={event.location_city}
                  address={event.location_address}
                  hostedByname={event.first_name}
                  hostedBylastName={event.last_name}
                  spots={event.spots_available}
                  userHost={userHost}
                  gameEventId={event.game_events_id}
                  game_img={event.game_img}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
