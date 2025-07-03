import React, { useState } from "react";
import "./AcademicCalendar.css";

const AcademicCalendar = ({ onExamsClick }) => {
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState("All");

  const handleExamsClick = () => {
    if (onExamsClick) {
      onExamsClick();
    } else {
      // Fallback for when prop is not provided
      alert("Exams functionality coming soon!");
    }
  };

  const batches = ["All", "CSE-19", "CSE-20", "CSE-21", "CSE-22"];
  const days = [
    "All",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const rooms = [
    "All",
    "Room 201",
    "Room 202",
    "Room 203",
    "Room 204",
    "Room 205",
    "Room 206",
    "Room 207",
    "Room 208",
    "Room 209",
  ];

  const scheduleData = {
    Monday: [
      {
        time: "8:00 AM - 9:00 AM",
        course: "Introduction to Programming",
        courseId: "CSE 101",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 201",
      },
      {
        time: "9:00 AM - 10:00 AM",
        course: "Data Structures and Algorithms",
        courseId: "CSE 106",
        teacher: "DR.MD. REZAUL KARIM",
        room: "Room 202",
      },
      {
        time: "10:00 AM - 11:00 AM",
        course: "Computer Organization",
        courseId: "CSE 111",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 203",
      },
      {
        time: "11:00 AM - 12:00 PM",
        course: "Operating Systems",
        courseId: "CSE 116",
        teacher: "MD. TANVIR ALAM",
        room: "Room 204",
      },
      {
        time: "12:00 PM - 1:00 PM",
        course: "Lunch Break",
        courseId: "",
        teacher: "",
        room: "",
      },
      {
        time: "1:00 PM - 2:00 PM",
        course: "Database Systems",
        courseId: "CSE 121",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 205",
      },
      {
        time: "2:00 PM - 3:00 PM",
        course: "Software Engineering",
        courseId: "CSE 126",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 206",
      },
      {
        time: "3:00 PM - 4:00 PM",
        course: "Computer Networks",
        courseId: "CSE 131",
        teacher: "MD. TANVIR ALAM",
        room: "Room 207",
      },
      {
        time: "4:00 PM - 5:00 PM",
        course: "Artificial Intelligence",
        courseId: "CSE 136",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 208",
      },
      {
        time: "5:00 PM - 6:00 PM",
        course: "Machine Learning",
        courseId: "CSE 141",
        teacher: "MD. TANVIR ALAM",
        room: "Room 209",
      },
    ],
    Tuesday: [
      {
        time: "8:00 AM - 9:00 AM",
        course: "Introduction to Programming",
        courseId: "CSE 101",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 201",
      },
      {
        time: "9:00 AM - 10:00 AM",
        course: "Data Structures and Algorithms",
        courseId: "CSE 106",
        teacher: "DR.MD. REZAUL KARIM",
        room: "Room 202",
      },
      {
        time: "10:00 AM - 11:00 AM",
        course: "Computer Organization",
        courseId: "CSE 111",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 203",
      },
      {
        time: "11:00 AM - 12:00 PM",
        course: "Operating Systems",
        courseId: "CSE 116",
        teacher: "MD. TANVIR ALAM",
        room: "Room 204",
      },
      {
        time: "12:00 PM - 1:00 PM",
        course: "Lunch Break",
        courseId: "",
        teacher: "",
        room: "",
      },
      {
        time: "1:00 PM - 2:00 PM",
        course: "Database Systems",
        courseId: "CSE 121",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 205",
      },
      {
        time: "2:00 PM - 3:00 PM",
        course: "Software Engineering",
        courseId: "CSE 126",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 206",
      },
      {
        time: "3:00 PM - 4:00 PM",
        course: "Computer Networks",
        courseId: "CSE 131",
        teacher: "MD. TANVIR ALAM",
        room: "Room 207",
      },
      {
        time: "4:00 PM - 5:00 PM",
        course: "Artificial Intelligence",
        courseId: "CSE 130",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 208",
      },
      {
        time: "5:00 PM - 6:00 PM",
        course: "Machine Learning",
        courseId: "CSE 141",
        teacher: "MD. TANVIR ALAM",
        room: "Room 209",
      },
    ],
    Wednesday: [
      {
        time: "8:00 AM - 9:00 AM",
        course: "Introduction to Programming",
        courseId: "CSE 101",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 201",
      },
      {
        time: "9:00 AM - 10:00 AM",
        course: "Data Structures and Algorithms",
        courseId: "CSE 106",
        teacher: "DR.MD. REZAUL KARIM",
        room: "Room 202",
      },
      {
        time: "10:00 AM - 11:00 AM",
        course: "Computer Organization",
        courseId: "CSE 111",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 203",
      },
      {
        time: "11:00 AM - 12:00 PM",
        course: "Operating Systems",
        courseId: "CSE 116",
        teacher: "MD. TANVIR ALAM",
        room: "Room 204",
      },
      {
        time: "12:00 PM - 1:00 PM",
        course: "Lunch Break",
        courseId: "",
        teacher: "",
        room: "",
      },
      {
        time: "1:00 PM - 2:00 PM",
        course: "Database Systems",
        courseId: "CSE 121",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 205",
      },
      {
        time: "3:00 PM - 4:00 PM",
        course: "Computer Networks",
        courseId: "CSE 131",
        teacher: "MD. TANVIR ALAM",
        room: "Room 207",
      },
      {
        time: "4:00 PM - 5:00 PM",
        course: "Artificial Intelligence",
        courseId: "CSE 136",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 208",
      },
      {
        time: "5:00 PM - 6:00 PM",
        course: "Machine Learning",
        courseId: "CSE 141",
        teacher: "MD. TANVIR ALAM",
        room: "Room 209",
      },
    ],
    Thursday: [
      {
        time: "8:00 AM - 9:00 AM",
        course: "Introduction to Programming",
        courseId: "CSE 101",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 201",
      },
      {
        time: "9:00 AM - 10:00 AM",
        course: "Data Structures and Algorithms",
        courseId: "CSE 106",
        teacher: "DR.MD. REZAUL KARIM",
        room: "Room 202",
      },
      {
        time: "10:00 AM - 11:00 AM",
        course: "Computer Organization",
        courseId: "CSE 111",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 203",
      },
      {
        time: "11:00 AM - 12:00 PM",
        course: "Operating Systems",
        courseId: "CSE 116",
        teacher: "MD. TANVIR ALAM",
        room: "Room 204",
      },
      {
        time: "12:00 PM - 1:00 PM",
        course: "Lunch Break",
        courseId: "",
        teacher: "",
        room: "",
      },
      {
        time: "1:00 PM - 2:00 PM",
        course: "Database Systems",
        courseId: "CSE 121",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 205",
      },
      {
        time: "2:00 PM - 3:00 PM",
        course: "Software Engineering",
        courseId: "CSE 126",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 206",
      },
      {
        time: "3:00 PM - 4:00 PM",
        course: "Computer Networks",
        courseId: "CSE 131",
        teacher: "MD. TANVIR ALAM",
        room: "Room 207",
      },
      {
        time: "4:00 PM - 5:00 PM",
        course: "Artificial Intelligence",
        courseId: "CSE 136",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 208",
      },
      {
        time: "5:00 PM - 6:00 PM",
        course: "Machine Learning",
        courseId: "CSE 141",
        teacher: "MD. TANVIR ALAM",
        room: "Room 209",
      },
    ],
    Friday: [],
    Saturday: [],
    Sunday: [
      {
        time: "9:00 AM - 9:00 AM",
        course: "Introduction to Programming",
        courseId: "CSE 101",
        teacher: "Dr. Mosaddek Khan",
        room: "Room 201",
      },
    ],
  };

  const getFilteredSchedule = () => {
    if (selectedDay === "All") {
      return Object.keys(scheduleData);
    }
    return [selectedDay];
  };

  const filteredDays = getFilteredSchedule();

  return (
    <div className="academic-calendar">
      <div className="calendar-container">
        {/* Header Section */}
        <div className="calendar-header">
          <div className="header-content">
            <h1 className="calendar-title">Class Schedule</h1>
            <p className="calendar-subtitle">
              View the class schedule for the current semester. Filter by batch
              and day to find specific classes.
            </p>
          </div>
          <div className="exams-section">
            <button className="exams-button" onClick={handleExamsClick}>
              <span className="exams-icon">📝</span>
              <span className="exams-text">Exams</span>
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label">Batch</label>
            <select
              className="filter-select"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Day</label>
            <select
              className="filter-select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Room</label>
            <select
              className="filter-select"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="schedule-content">
          {filteredDays.map((day) => (
            <div key={day} className="day-schedule">
              <h3 className="day-title">{day}</h3>

              {scheduleData[day].length === 0 ? (
                <div className="no-classes">
                  No classes scheduled for {day}.
                </div>
              ) : (
                <div className="schedule-table">
                  <div className="table-header">
                    <div className="header-cell time-col">Time</div>
                    <div className="header-cell course-col">Course Name</div>
                    <div className="header-cell id-col">Course ID</div>
                    <div className="header-cell teacher-col">Teacher</div>
                    <div className="header-cell room-col">Room</div>
                  </div>

                  {scheduleData[day].map((item, index) => (
                    <div
                      key={index}
                      className={`table-row ${
                        item.course === "Lunch Break" ? "lunch-break" : ""
                      }`}
                    >
                      <div className="table-cell time-col">{item.time}</div>
                      <div className="table-cell course-col">{item.course}</div>
                      <div className="table-cell id-col">{item.courseId}</div>
                      <div className="table-cell teacher-col">
                        {item.teacher}
                      </div>
                      <div className="table-cell room-col">{item.room}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
