import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import { useAppDispatch } from "./../../app/hooks";
import { login } from "./../../features/loggedInUser/userAPI";

export const NextGame = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(userSelector);
  const userId = loggedInUser?._id;
  const [events, setEvents] = useState([]);
  const [nextEvent, setNextEvent] = useState<Date | string>("No Event Found");
  const [nextEventData, SetNextEventData] = useState({
    id: "",
    title: "",
    start: "",
    description: "",
  });

  useEffect(() => {
    dispatch(login());
    handlegGetUserNextEvent();
  }, []);

  const handlegGetUserNextEvent = async () => {
    try {
      const { data } = await axios.post("/api/game-nights/get-user-events", {
        userId,
      });
      const { userEvents } = data;
      if (userEvents.length === 0) {
        setNextEvent("No event Found");
      }
      // console.log(userEvents);
      const today = new Date();
      for (let i = 0; i < userEvents.length; i++) {
        const eventOfUser = new Date(userEvents[i].start);
        if (eventOfUser.getFullYear() >= today.getFullYear()) {
          // console.log("this year or neext");
          if (eventOfUser.getFullYear() === today.getFullYear()) {
            // console.log("this year");
            if (eventOfUser.getMonth() < today.getMonth()) {
              // console.log("this is a past date");
            } else if (eventOfUser.getMonth() >= today.getMonth()) {
              // console.log("this or next month");
              if (eventOfUser.getMonth() === today.getMonth()) {
                // console.log("same month");
                if (eventOfUser.getDate() === today.getDate()) {
                  // console.log("today");
                  setNextEvent(eventOfUser)
                  return
                } else if (eventOfUser.getDate() > today.getDate()) {
                  setNextEvent(eventOfUser)
                  return
                }
              } else if (eventOfUser.getMonth() > today.getMonth()) {
                console.log("future date");
                console.log("is clg working?")
                console.log(nextEventData)
                if(nextEvent === undefined) {
                  setNextEvent(eventOfUser);
                    SetNextEventData(userEvents[i]);
                }

                //@ts-ignore
                if (nextEvent?.getDate() > eventOfUser.getDate()) {
                  console.log("already found next event")
                  //@ts-ignore
                } else if ((nextEvent?.getDate() < eventOfUser.getDate())) {
                  console.log("the next event's date is too future than user events")
                  setNextEvent(eventOfUser);
                    SetNextEventData(userEvents[i]);
                }
              } else if (eventOfUser.getMonth() === today.getMonth()) {
                if (eventOfUser.getDate() === today.getDate()) {
                  if (eventOfUser.getTime() >= today.getTime()) {
                    setNextEvent(eventOfUser);
                    SetNextEventData(userEvents[i]);
                  }
                } else if (eventOfUser.getDate() > today.getDate()) {
                  setNextEvent(eventOfUser);
                  SetNextEventData(userEvents[i]);
                  
                }
              }
            } else {
              console.log("no enter clause");
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="next_event">
      <h1 className="next_event__header">Next Event:</h1>
      <div className="next_event__card">
        <h2>{nextEventData.description}</h2>
        <p> {`${nextEvent}`}</p>
      </div>
    </div>
  );
};
