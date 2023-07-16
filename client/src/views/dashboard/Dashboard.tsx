import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import ReactCalender from "../../components/calender/ReactCalender";
import { NextGame } from "../../components/nextGame/NextGame";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/loggedInUser/userAPI";
import { FullCalenderReact } from "../../components/calender/fullCalender/FullCalender";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(login());
  }, []);

  return (
    <div className="page">
      <Header />
      <NavBar />

      <div className="main main_calendar">
        <FullCalenderReact events={events} setEvents={setEvents}/>
      </div>
      <div className="top_section">
        <NextGame />
      </div>
      <div className="dashboard_img bottom_section"></div>
    </div>
  );
}

export default Dashboard;
