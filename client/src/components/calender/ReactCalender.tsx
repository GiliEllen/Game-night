import React from "react";
//@ts-ignore
import Calendar from "react-calendar";
import { useState, FC } from "react";
import 'react-calendar/dist/Calendar.css';

interface ReactCalendarProps {
  setDate: Function,
  date: Date
}

const ReactCalender:FC<ReactCalendarProps> = ({setDate, date}) => {
  const onChange = (date:Date) => {
    setDate(date);
  };

  return (
    <div className="calender">
      <Calendar calendarType="Hebrew" onChange={onChange} value={date} />
    </div>
  );
}

export default ReactCalender;
