import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Scheduling.css";

const Scheduling = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Fake appointments for selected date
  const appointments = {
    "2024-10-10": ["Doctor's appointment at 10:00 AM", "Meeting with client at 2:00 PM"],
    "2024-10-12": ["Lunch with friend at 12:00 PM", "Work on project at 3:00 PM"],
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getAppointments = () => {
    const dateKey = selectedDate?.toISOString().split("T")[0];
    return appointments[dateKey] || []; 
  };

  return (
    <div className="scheduling">
      <div className="calendar-container">
        <Calendar onClickDay={handleDateClick} className="calendar" />
      </div>

      <div className="appointments">
        <div>
          <h2>My Appointments</h2>
          <ul>
            <li>Doctor's appointment at 9:00 AM</li>
            <li>Team meeting at 1:00 PM</li>
            <li>Project work at 4:00 PM</li>
          </ul>
        </div>

        {selectedDate && (
          <div className="appointments-for-date">
            <h2>Appointments for {selectedDate.toDateString()}</h2>
            <ul>
              {getAppointments().length > 0 ? (
                getAppointments().map((appointment, index) => (
                  <li key={index}>{appointment}</li>
                ))
              ) : (
                <li className="no-appointments">No appointments for this day.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheduling;
