import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";
import { userSelector } from "../../../features/loggedInUser/loggedInUser";
import { useEffect } from "react";

export const FullCalenderReact = () => {
  const loggedInUser = useAppSelector(userSelector);
  const userId = loggedInUser?.user_id;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    handlegGetUserEvents();
  }, []);

  const handlegGetUserEvents = async () => {
    try {
      
      const { data } = await axios.post(
        "/api/game-nights/get-user-events",
        {userId}
      );
      const {userEvents} = data;
      setEvents(userEvents);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
      events={events}
    />
  );
};
