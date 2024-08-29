import React, { useState } from "react";
import CalendarDay from "./CalendarDay";
import EventModal from "./EventModal";
import {
  getMonthYearString,
  generateCalendarDays,
} from "../utils/calendarUtils";

const Calendar = ({ availableTourDays = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalData, setModalData] = useState(null);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDayClick = (dayData) => {
    if (dayData.tours && dayData.tours.length > 0) {
      setModalData(dayData);
    }
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  const days = generateCalendarDays(currentDate, availableTourDays);

  return (
    <>
      <div className="header">
        <button onClick={handlePrevMonth} className="nav-button">
          &lt;
        </button>
        <div className="month-year">{getMonthYearString(currentDate)}</div>
        <button onClick={handleNextMonth} className="nav-button">
          &gt;
        </button>
      </div>
      <div className="calendar">
        {days.length > 0 ? (
          days.map((day, index) => (
            <CalendarDay
              key={index}
              day={day}
              onClick={() => handleDayClick(day)}
            />
          ))
        ) : (
          <div>No days available</div>
        )}
      </div>
      {modalData && <EventModal data={modalData} onClose={handleCloseModal} />}
    </>
  );
};

export default Calendar;
