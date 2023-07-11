import React from "react";
import Header from "./../header/Header";
import NavBar from "./../navbar/NavBar";
import { FullCalenderReact } from "../calender/fullCalender/FullCalender";
import Calendar from "../calender/ReactCalender";
import { AddEvent } from "./../addEvent/AddEvent";
import { NextGame } from "./../nextGame/NextGame";

function MyGameNights() {
  return (
    <div className="page">
      <Header />
      <NavBar />

      <div className="top_section">
        <NextGame />
      </div>
      <div className="main main_calendar">
        <div>calnder for game nights</div>
        <FullCalenderReact />
      </div>

      <div className="bottom_section">
        <div>
          <h1>Schedual new Game Night:</h1>
        </div>
        <AddEvent />
      </div>
    </div>
  );
}

export default MyGameNights;
