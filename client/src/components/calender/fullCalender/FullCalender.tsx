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
  const [eventToEditInfo, setEventToEditInfo] = useState<any>();
  const [display, setdisplay] = useState<boolean>(false);
  const [displayDelete, setDisplayDelete] = useState<boolean>(false);
  const [isUserHost, setIsUserHost] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<any>();

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
    alert(arg.dateStr);
  };
  const handleEventClick = async (arg: any) => {
    console.log(arg.event._def);
    console.log(arg);
    setEventToEditInfo(arg.event._def);
  };

  const handleGetEventToEditInfo = async () => {
    try {
      if (eventToEditInfo) {
        const { data } = await axios.get(
          `/api/game-nights/${eventToEditInfo.publicId}`
        );
        console.log(data);
        if (data.ok) {
          const { eventDB } = data;
          if (eventDB.hostId._id == userId) {
            setIsUserHost(true);
            setdisplay(true);
            setEventToEdit(eventDB);
            console.log(eventDB);
          } else {
            setIsUserHost(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (ev: any) => {
    setEventToEdit((prev: any) => {
      return { ...prev, [ev.target.id]: ev.target.value.toString() };
    });
  };

  const handleEditEvent = async () => {
    try {
      const { data } = await axios.patch(
        `/api/game-nights/${eventToEdit._id}`,
        { eventToEdit }
      );
      console.log(data);
      setdisplay(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteEvent = async () => {
    try {
      const { data } = await axios.delete(
        `/api/game-nights/${eventToEdit._id}`
      );
      console.log(data);
      setdisplay(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetEventToEditInfo();
  }, [eventToEditInfo]);

  return (
    <div>
      {!display ? null : isUserHost ? (
        <div className="edit-container">
          <h3>Edit My Event</h3>
          <span
            onClick={(ev) => {
              setdisplay(false);
              setDisplayDelete(false)
            }}
            className="material-symbols-outlined to-side"
          >
            close
          </span>
          <form className="calender-form">
            <label className="calender-form__label" htmlFor="city">
              City
              <input
                className="calender-form__label__Input"
                id="city"
                type="text"
                placeholder="City"
                value={eventToEdit.city}
                onInput={handleChange}
              />
            </label>
            <label className="calender-form__label" htmlFor="address">
              Address
              <input
                className="calender-form__label__Input"
                id="address"
                type="text"
                placeholder="Address"
                value={eventToEdit.address}
                onInput={handleChange}
              />
            </label>
            <p>date: {eventToEdit.date}</p>
            <label className="calender-form__label" htmlFor="spotsAvaliable">
              Spots
              <input
                className="calender-form__label__Input"
                id="spotsAvaliable"
                type="text"
                placeholder="Spots Avaliable"
                value={eventToEdit.spotsAvaliable}
                onInput={handleChange}
              />
            </label>
            <p>Can more users join? {eventToEdit.canUserJoin ? "Yes" : "No"}</p>
          </form>
          <div className="btn-container">
            <button className="button_main">SAVE</button>
            <button className="btn-delete" onClick={(ev) => setDisplayDelete(true)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Event Details</h3>
        </div>
      )}
      {display && displayDelete ? (
        <div>
          <h4>Are you sure you want to delete this event?</h4>
          <h4>This action is irreverseble.</h4>
          <div>
            <button className="button_main">YES</button>
            <button onClick={() => {setDisplayDelete(false)}} className="button_main">NO</button>
          </div>
        </div>
      ) : null}
      {!display ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={events}
        />
      ) : null}
    </div>
  );
};
