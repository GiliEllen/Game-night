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
  const userId = loggedInUser?._id;
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState<any>();
  const [display, setdisplay] = useState<boolean>(false);
  const [isUserHost, setIsUserHost] = useState<boolean>(false);

  useEffect(() => {
    handlegGetUserEvents();
  }, []);

  const handlegGetUserEvents = async () => {
    try {
      const { data } = await axios.post("/api/game-nights/get-user-events", {
        userId,
      });
      const { userEvents } = data;
      setEvents(userEvents);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
  const handleEventClick = async (arg: any) => {
    // bind with an arrow function
    console.log(arg.event._def);
    console.log(arg);
    setEventToEdit(arg.event._def);

    if (eventToEdit) {
      const { data } = await axios.get(
        `/api/game-nights/${eventToEdit.publicId}`
      );
      console.log(data);
      if (data.ok) {
        const { eventDB } = data;
        if (eventDB.hostId._id == userId) {
          setIsUserHost(true);
          setdisplay(true);
        } else {
          setIsUserHost(false);
        }
      }
    }
    // setClickedOnEvent(true);
  };
  return (
    <>
      {!display ? null : isUserHost ? (
        <div>
          <h3>Edit My Event</h3>
        </div>
      ) : (
        <div>
          <h3>Event Details</h3>
        </div>
      )}
      <></>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
      />
    </>
  );
};
