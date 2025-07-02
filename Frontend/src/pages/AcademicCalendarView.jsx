import React, { useState } from "react";
import "./AcademicCalendarView.css";

const AcademicCalendarView = ({ onBack }) => {
  const [selectedBatch, setSelectedBatch] = useState("27-30");
  const [selectedSemester, setSelectedSemester] = useState("August 2025");

  const batches = ["27-30", "26-29", "25-28", "24-27"];
  const semesters = [
    "August 2025",
    "January 2025",
    "August 2024",
    "January 2024",
  ];

  // Calendar data for August Semester 2025 - Batch 27-30
  const calendarData = {
    weeks: [
      { weekNumber: 1, dates: [null, 3, 4, 5, 6, 7, 8] },
      { weekNumber: 2, dates: [10, 11, 12, 13, 14, 15, 16] },
      { weekNumber: 3, dates: [17, 18, 19, 20, 21, 22, 23] },
      { weekNumber: 4, dates: [24, 25, 26, 27, 28, 29, 30] },
      { weekNumber: 5, dates: [31, 1, 2, 3, 4, 5, 6] },
      { weekNumber: 6, dates: [7, 8, 9, 10, 11, 12, 13] },
      { weekNumber: 7, dates: [14, 15, 16, 17, 18, 19, 20] },
      { weekNumber: 8, dates: [21, 22, 23, 24, 25, 26, 27] },
      { weekNumber: 9, dates: [28, 29, 30, 31, 1, 2, 3] },
      { weekNumber: 10, dates: [4, 5, 6, 7, 8, 9, 10] },
      { weekNumber: 11, dates: [11, 12, 13, 14, 15, 16, 17] },
      { weekNumber: 12, dates: [18, 19, 20, 21, 22, 23, 24] },
      { weekNumber: 13, dates: [25, 26, 27, 28, 29, 30, 1] },
      { weekNumber: "PL", dates: [2, 3, 4, 5, 6, 7, 8] },
      { weekNumber: "EXAM", dates: [9, 10, 11, 12, 13, 14, 15] },
      { weekNumber: "EXAM", dates: [16, 17, 18, 19, 20, 21, 22] },
      { weekNumber: "EXAM", dates: [23, 24, 25, 26, 27, 28, 29] },
      { weekNumber: "", dates: [30, 31, 1, 2, 3, 4, 5] },
    ],
    specialDates: {
      // August
      24: "regular-class",
      // September
      5: "class-off", // Eid E Miladunnabi
      29: "vacation-start", // Puja Vacation start
      // October
      15: "mourning-day", // University Mourning Day
      4: "fateka-day", // Fateka Yazdallah
      // November
      // December
      16: "victory-day", // Victory Day
      25: "christmas", // Christmas
      7: "winter-vacation", // Winter Vacation
      20: "orientation", // CSEDU Orientation
      // January
    },
    holidays: [
      { date: "September 5", event: "Eid E Miladunnabi" },
      {
        date: "29 Sept - 7 Oct",
        event: "Puja Vacation (Possible, Not Confirmed)",
      },
      { date: "15 Oct", event: "University Mourning Day" },
      { date: "4 Oct", event: "Fateka Yazdallah" },
      { date: "16 Dec", event: "Victory Day" },
      { date: "25 Dec", event: "Christmas" },
      { date: "Dec 7-22", event: "Winter Vacation" },
      { date: "Dec 20", event: "CSEDU Orientation" },
    ],
  };

  const getDayCellClass = (date, weekNumber, dayIndex) => {
    let classes = "calendar-day";

    // Add month-specific classes
    if (weekNumber <= 4) {
      classes += " august-month";
    } else if (weekNumber <= 8) {
      classes += " september-month";
    } else if (weekNumber <= 12) {
      classes += " october-month";
    } else if (weekNumber <= 16) {
      classes += " november-month";
    } else {
      classes += " december-month";
    }

    // Add special date classes
    if (calendarData.specialDates[date]) {
      classes += ` ${calendarData.specialDates[date]}`;
    }

    // Add weekend classes
    if (dayIndex === 0 || dayIndex === 6) {
      classes += " weekend";
    }

    // Add exam/vacation period classes
    if (weekNumber === "EXAM") {
      classes += " exam-period";
    } else if (weekNumber === "PL") {
      classes += " pl-period";
    } else if (
      typeof weekNumber === "number" &&
      weekNumber >= 5 &&
      weekNumber <= 7
    ) {
      classes += " in-course";
    } else if (
      typeof weekNumber === "number" &&
      weekNumber >= 1 &&
      weekNumber <= 4
    ) {
      classes += " active-week";
    }

    return classes;
  };

  const getMonthName = (weekNumber) => {
    if (weekNumber <= 4) return "August";
    if (weekNumber <= 8) return "September";
    if (weekNumber <= 12) return "October";
    if (weekNumber <= 16) return "November";
    return "December";
  };

  const legends = [
    { label: "Regular Class", color: "#f8f9fa", textColor: "#000" },
    { label: "Class + Office Off", color: "#ffd700", textColor: "#000" },
    {
      label: "Possible Class Off (Date Not Confirmed yet)",
      color: "#ffeb3b",
      textColor: "#000",
    },
    { label: "Class off", color: "#87ceeb", textColor: "#000" },
    { label: "In-course", color: "#98fb98", textColor: "#000" },
    { label: "PL", color: "#dda0dd", textColor: "#000" },
    { label: "Final", color: "#ff6b6b", textColor: "#fff" },
    { label: "Events", color: "#4caf50", textColor: "#fff" },
    {
      label: "Class Start Date and End Date",
      color: "#2196f3",
      textColor: "#fff",
    },
    {
      label: "Expected Last Date to Publish the Semester Result",
      color: "#00bcd4",
      textColor: "#fff",
    },
  ];

  return (
    <div className="academic-calendar-view">
      <div className="calendar-container">
        {/* Header Section */}
        <div className="calendar-header">
          {onBack && (
            <button className="back-button" onClick={onBack}>
              ← Back
            </button>
          )}

          <div className="calendar-title-section">
            <h1 className="calendar-title">
              Academic Calendar ({selectedSemester} - Batch {selectedBatch})
            </h1>

            <div className="calendar-filters">
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="filter-select"
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    Batch {batch}
                  </option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="filter-select"
              >
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid-container">
          <div className="calendar-grid">
            {/* Header Row */}
            <div className="calendar-header-row">
              <div className="week-header">#ActiveWeek</div>
              <div className="day-header">Sunday</div>
              <div className="day-header">Monday</div>
              <div className="day-header">Tuesday</div>
              <div className="day-header">Wednesday</div>
              <div className="day-header">Thursday</div>
              <div className="day-header">Friday</div>
              <div className="day-header">Saturday</div>
              <div className="month-header">Month</div>
              <div className="holidays-header">Holidays</div>
            </div>

            {/* Calendar Rows */}
            {calendarData.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="calendar-row">
                <div className="week-number">{week.weekNumber}</div>
                {week.dates.map((date, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={getDayCellClass(date, week.weekNumber, dayIndex)}
                  >
                    {date || ""}
                  </div>
                ))}
                <div className="month-cell">
                  {weekIndex === 0 && "August"}
                  {weekIndex === 4 && "September"}
                  {weekIndex === 8 && "October"}
                  {weekIndex === 12 && "November"}
                  {weekIndex === 16 && "December"}
                  {weekIndex === 17 && "January"}
                </div>
                <div className="holidays-cell">
                  {weekIndex === 4 && "September 5 - Eid E Miladunnabi"}
                  {weekIndex === 6 &&
                    "29 Sept - 7 Oct Puja Vacation (Possible, Not Confirmed)"}
                  {weekIndex === 8 && "15 Oct - University Mourning Day"}
                  {weekIndex === 8 && "4 Oct - Fateka Yazdallah"}
                  {weekIndex === 16 && "16 Dec - Victory Day"}
                  {weekIndex === 16 && "25 Dec - Christmas"}
                  {weekIndex === 16 && "Dec 7-22 Winter Vacation"}
                  {weekIndex === 16 && "Dec 20 - CSEDU Orientation"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legends Section */}
        <div className="legends-section">
          <h3 className="legends-title">Legends</h3>
          <div className="legends-grid">
            {legends.map((legend, index) => (
              <div key={index} className="legend-item">
                <div
                  className="legend-color"
                  style={{
                    backgroundColor: legend.color,
                    color: legend.textColor,
                  }}
                ></div>
                <span className="legend-label">{legend.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendarView;
