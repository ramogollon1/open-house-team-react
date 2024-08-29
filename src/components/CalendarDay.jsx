import React from "react";

const CalendarDay = ({ day, onClick }) => {
  if (!day || !day.date) return;

  const date = day.date instanceof Date ? day.date : new Date(day.date);

  const dayClassName = `day${day.isToday ? " today" : ""}${
    day.tours?.length > 0 ? " available" : ""
  }`;

  return (
    <div className={dayClassName} onClick={() => onClick && onClick(day)}>
      {date.getDate()}
    </div>
  );
};

export default CalendarDay;
