import React, { useState } from "react";
import "./AcademicCalendar.css";

const AcademicCalendar = ({ onExamsClick }) => {
  const [selectedBatch, setSelectedBatch] = useState("CSE-22");
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [selectedRoom, setSelectedRoom] = useState("All");
  const batches = [
    "CSE-19",
    "CSE-20",
    "CSE-21",
    "CSE-22"
  ];

  const handleExamsClick = () => {
    if (onExamsClick) {
      onExamsClick();
    } else {
      alert("Exams functionality coming soon!");
    }
  };

  // Day filter restored
  const days = [
    "Monday",
    "Tuesday", 
    "Wednesday",
    "Thursday",
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

  // Schedule data for each batch
  const scheduleDataByBatch = {
    "CSE-19": {
      Monday: [
        { time: "8:00 AM - 9:00 AM", course: "Discrete Math", courseId: "CSE 201", teacher: "Dr. A. Rahman", room: "Room 201" },
        { time: "9:00 AM - 10:00 AM", course: "Digital Logic", courseId: "CSE 202", teacher: "Dr. S. Islam", room: "Room 202" },
        { time: "10:00 AM - 11:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "11:00 AM - 12:00 PM", course: "Microprocessors", courseId: "CSE 203", teacher: "Dr. A. Rahman", room: "Room 203" },
      ],
      Tuesday: [
        { time: "8:00 AM - 9:00 AM", course: "Data Comm", courseId: "CSE 204", teacher: "Dr. S. Islam", room: "Room 204" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Database", courseId: "CSE 205", teacher: "Dr. A. Rahman", room: "Room 205" },
      ],
      Wednesday: [
        { time: "8:00 AM - 9:00 AM", course: "Software Engg", courseId: "CSE 206", teacher: "Dr. S. Islam", room: "Room 206" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "AI", courseId: "CSE 207", teacher: "Dr. A. Rahman", room: "Room 207" },
      ],
      Thursday: [
        { time: "8:00 AM - 9:00 AM", course: "Networking", courseId: "CSE 208", teacher: "Dr. S. Islam", room: "Room 208" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Compiler", courseId: "CSE 209", teacher: "Dr. A. Rahman", room: "Room 209" },
      ],
      Sunday: [
        { time: "9:00 AM - 10:00 AM", course: "Project", courseId: "CSE 210", teacher: "Dr. S. Islam", room: "Room 201" },
      ],
    },
    "CSE-20": {
      Monday: [
        { time: "8:00 AM - 9:00 AM", course: "OOP", courseId: "CSE 301", teacher: "Dr. B. Rahman", room: "Room 202" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Web Tech", courseId: "CSE 302", teacher: "Dr. C. Islam", room: "Room 203" },
      ],
      Tuesday: [
        { time: "8:00 AM - 9:00 AM", course: "Mobile App", courseId: "CSE 303", teacher: "Dr. B. Rahman", room: "Room 204" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Cloud", courseId: "CSE 304", teacher: "Dr. C. Islam", room: "Room 205" },
      ],
      Wednesday: [
        { time: "8:00 AM - 9:00 AM", course: "Security", courseId: "CSE 305", teacher: "Dr. B. Rahman", room: "Room 206" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "IoT", courseId: "CSE 306", teacher: "Dr. C. Islam", room: "Room 207" },
      ],
      Thursday: [
        { time: "8:00 AM - 9:00 AM", course: "Big Data", courseId: "CSE 307", teacher: "Dr. B. Rahman", room: "Room 208" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "ML", courseId: "CSE 308", teacher: "Dr. C. Islam", room: "Room 209" },
      ],
      Sunday: [
        { time: "9:00 AM - 10:00 AM", course: "Project", courseId: "CSE 310", teacher: "Dr. B. Rahman", room: "Room 202" },
      ],
    },
    "CSE-21": {
      Monday: [
        { time: "8:00 AM - 9:00 AM", course: "Math IV", courseId: "CSE 401", teacher: "Dr. D. Rahman", room: "Room 203" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Graphics", courseId: "CSE 402", teacher: "Dr. E. Islam", room: "Room 204" },
      ],
      Tuesday: [
        { time: "8:00 AM - 9:00 AM", course: "Bioinformatics", courseId: "CSE 403", teacher: "Dr. D. Rahman", room: "Room 205" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Robotics", courseId: "CSE 404", teacher: "Dr. E. Islam", room: "Room 206" },
      ],
      Wednesday: [
        { time: "8:00 AM - 9:00 AM", course: "Quantum", courseId: "CSE 405", teacher: "Dr. D. Rahman", room: "Room 207" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Ethics", courseId: "CSE 406", teacher: "Dr. E. Islam", room: "Room 208" },
      ],
      Thursday: [
        { time: "8:00 AM - 9:00 AM", course: "Thesis", courseId: "CSE 407", teacher: "Dr. D. Rahman", room: "Room 209" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Seminar", courseId: "CSE 408", teacher: "Dr. E. Islam", room: "Room 201" },
      ],
      Sunday: [
        { time: "9:00 AM - 10:00 AM", course: "Project", courseId: "CSE 410", teacher: "Dr. D. Rahman", room: "Room 203" },
      ],
    },
    "CSE-22": {
      Monday: [
        { time: "8:00 AM - 9:00 AM", course: "Intro to CSE", courseId: "CSE 101", teacher: "Dr. Mosaddek Khan", room: "Room 201" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Math I", courseId: "CSE 102", teacher: "Dr. Mosaddek Khan", room: "Room 202" },
      ],
      Tuesday: [
        { time: "8:00 AM - 9:00 AM", course: "Physics", courseId: "CSE 103", teacher: "Dr. Mosaddek Khan", room: "Room 203" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Chemistry", courseId: "CSE 104", teacher: "Dr. Mosaddek Khan", room: "Room 204" },
      ],
      Wednesday: [
        { time: "8:00 AM - 9:00 AM", course: "English", courseId: "CSE 105", teacher: "Dr. Mosaddek Khan", room: "Room 205" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "Bangla", courseId: "CSE 106", teacher: "Dr. Mosaddek Khan", room: "Room 206" },
      ],
      Thursday: [
        { time: "8:00 AM - 9:00 AM", course: "ICT", courseId: "CSE 107", teacher: "Dr. Mosaddek Khan", room: "Room 207" },
        { time: "9:00 AM - 10:00 AM", course: "Lunch Break", courseId: "", teacher: "", room: "" },
        { time: "10:00 AM - 11:00 AM", course: "History", courseId: "CSE 108", teacher: "Dr. Mosaddek Khan", room: "Room 208" },
      ],
      Sunday: [
        { time: "9:00 AM - 10:00 AM", course: "Orientation", courseId: "CSE 110", teacher: "Dr. Mosaddek Khan", room: "Room 209" },
      ],
    },
  };


  // Show schedule for the selected day and batch
  const daySchedule = scheduleDataByBatch[selectedBatch]?.[selectedDay] || [];
  const allRows = daySchedule.map((entry) => ({ ...entry, day: selectedDay, batch: selectedBatch }));
  
  // Filter by room only
  const filteredRows = allRows.filter((row) => {
    const roomMatch = selectedRoom === "All" || row.room === selectedRoom;
    return roomMatch;
  });

  return (
    <div className="academic-calendar">
      <div className="calendar-container">
        
        {/* Header Section */}
        <div className="notices-header">
          <h1 className="notices-title">Class Routine</h1>
          <p className="notices-subtitle">
            View the full class routine for the current semester. Use the filters to find classes by batch, day, or room.
          </p>
        </div>

        {/* Modern Filter Section */}
        <div className="directory-controls">
          <div className="filters-section">
            <div className="filter-group">
              <label className="filter-label">Batch</label>
              <select
                className="filter-select"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch}>{batch}</option>
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
                  <option key={day} value={day}>{day}</option>
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
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <button className="exams-button" onClick={handleExamsClick}>
                <span className="exams-icon">📝</span>
                <span className="exams-text">Exams</span>
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="schedule-section">
          <h2 className="section-title">{selectedDay} Schedule - {selectedBatch}</h2>

          <div className="routine-table-wrapper">
            <table className="routine-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Course Name</th>
                  <th>Course ID</th>
                  <th>Teacher</th>
                  <th>Room</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="no-classes">No classes found for the selected filters.</td>
                  </tr>
                ) : (
                  filteredRows.map((row, idx) => (
                    <tr key={idx} className={row.course === "Lunch Break" ? "lunch-break" : idx % 2 === 0 ? "even-row" : "odd-row"}>
                      <td className="time-col" data-label="Time">{row.time}</td>
                      <td className="course-col" data-label="Course">{row.course}</td>
                      <td className="id-col" data-label="Course ID">{row.courseId}</td>
                      <td className="teacher-col" data-label="Teacher">{row.teacher}</td>
                      <td className="room-col" data-label="Room">{row.room}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
