import React, {useState} from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import { FullCalenderReact } from "../../components/calender/fullCalender/FullCalender";
import Calendar from "../../components/calender/ReactCalender";
import { AddEvent } from "../../components/addEvent/AddEvent";
import { NextGame } from "../../components/nextGame/NextGame";

function MyGameNights() {

  const [events, setEvents] = useState([]);

  return (
    <div className="page">
      <Header />
      <NavBar />

      <div className="top_section">
        <NextGame />
      </div>
      <div className="main main_calendar">
        <FullCalenderReact events={events} setEvents={setEvents}/>
      </div>

      <div className="bottom_section">
        <div>
          <h1>Schedual new Game Night:</h1>
        </div>
        <AddEvent setEvents={setEvents}/>
      </div>
    </div>
  );
}

export default MyGameNights;
