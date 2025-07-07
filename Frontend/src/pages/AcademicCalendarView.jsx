import React, { useState } from "react";
import "./AcademicCalendarView.css";

const AcademicCalendarView = ({ onBack, userRole }) => {
  const [selectedBatch, setSelectedBatch] = useState("27-30");
  const [selectedSemester, setSelectedSemester] = useState("August 2025");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [editingSemester, setEditingSemester] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const batches = ["27-30", "26-29", "25-28", "24-27"];
  const semesters = [
    "August 2025",
    "January 2025",
    "August 2024",
    "January 2024",
  ];

  // Calendar data for August Semester 2025 - Batch 27-30
  const [calendarData, setCalendarData] = useState({
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
  });

  // Admin functions
  const handleDateClick = (date, weekNumber, dayIndex) => {
    console.log("Date clicked:", {
      date,
      weekNumber,
      dayIndex,
      userRole,
      isAdminMode,
    });
    if (userRole === "admin" && isAdminMode && date) {
      setSelectedDate({ date, weekNumber, dayIndex });
      setShowHolidayModal(true);
    }
  };

  const handleAddHoliday = (holidayData) => {
    setCalendarData((prev) => ({
      ...prev,
      holidays: [...prev.holidays, { ...holidayData, id: Date.now() }],
    }));
    setShowHolidayModal(false);
    setSelectedDate(null);
  };

  const handleEditHoliday = (holidayId, holidayData) => {
    setCalendarData((prev) => ({
      ...prev,
      holidays: prev.holidays.map((holiday) =>
        holiday.id === holidayId ? { ...holiday, ...holidayData } : holiday
      ),
    }));
    setShowHolidayModal(false);
    setEditingHoliday(null);
  };

  const handleDeleteHoliday = (holidayId) => {
    if (window.confirm("Are you sure you want to delete this holiday?")) {
      setCalendarData((prev) => ({
        ...prev,
        holidays: prev.holidays.filter((holiday) => holiday.id !== holidayId),
      }));
    }
  };

  const handleCreateSemester = (semesterData) => {
    // In a real application, this would create a new semester calendar
    console.log("Creating new semester:", semesterData);
    setShowSemesterModal(false);
  };

  const handleUpdateSpecialDate = (date, type) => {
    setCalendarData((prev) => ({
      ...prev,
      specialDates: {
        ...prev.specialDates,
        [date]: type,
      },
    }));
  };

  const getDayCellClass = (date, weekNumber, dayIndex) => {
    let classes = "calendar-day";

    // Add admin mode classes
    if (userRole === "admin" && isAdminMode) {
      classes += " admin-editable";
    }

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
      {/* Admin Mode Indicator */}
      {userRole === "admin" && isAdminMode && (
        <div className="admin-mode-indicator">
          Admin Edit Mode Active - Click any date to edit
        </div>
      )}

      {/* Debug Panel - Only show in development */}
      {userRole === "admin" && process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: "#333",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "12px",
            zIndex: 1000,
          }}
        >
          <div>User Role: {userRole}</div>
          <div>Admin Mode: {isAdminMode ? "ON" : "OFF"}</div>
          <div>Holiday Modal: {showHolidayModal ? "OPEN" : "CLOSED"}</div>
          <div>
            Selected Date:{" "}
            {selectedDate ? JSON.stringify(selectedDate) : "None"}
          </div>
        </div>
      )}

      <div className="calendar-container">
        {/* Admin Toolbar */}
        {userRole === "admin" && (
          <div className="admin-toolbar">
            <div className="admin-toolbar-content">
              <div className="admin-mode-toggle">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isAdminMode}
                    onChange={(e) => setIsAdminMode(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Admin Edit Mode</span>
                </label>
              </div>
              {isAdminMode && (
                <div className="admin-actions">
                  <button
                    className="admin-btn create-semester-btn"
                    onClick={() => setShowSemesterModal(true)}
                  >
                    🗓️ Create New Semester
                  </button>
                  <button
                    className="admin-btn add-holiday-btn"
                    onClick={() => setShowHolidayModal(true)}
                  >
                    ➕ Add Holiday
                  </button>
                  <button
                    className="admin-btn save-changes-btn"
                    onClick={() => {
                      // In a real app, this would save to the server
                      alert("Calendar changes saved successfully!");
                    }}
                  >
                    💾 Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="calendar-header">
          <div className="calendar-title-section">
            <h1 className="calendar-title">
              Academic Calendar ({selectedSemester})
            </h1>
            <div className="calendar-filters">
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
                    onClick={() => {
                      if (date) {
                        handleDateClick(date, week.weekNumber, dayIndex);
                      }
                    }}
                    style={{
                      cursor:
                        userRole === "admin" && isAdminMode && date
                          ? "pointer"
                          : "default",
                      position: "relative",
                    }}
                    title={
                      userRole === "admin" && isAdminMode && date
                        ? `Click to edit date ${date}`
                        : ""
                    }
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

      {/* Holiday Modal */}
      {showHolidayModal && (
        <HolidayModal
          selectedDate={selectedDate}
          editingHoliday={editingHoliday}
          onSave={editingHoliday ? handleEditHoliday : handleAddHoliday}
          onClose={() => {
            setShowHolidayModal(false);
            setEditingHoliday(null);
            setSelectedDate(null);
          }}
        />
      )}

      {/* Semester Modal */}
      {showSemesterModal && (
        <SemesterModal
          editingSemester={editingSemester}
          onSave={handleCreateSemester}
          onClose={() => {
            setShowSemesterModal(false);
            setEditingSemester(null);
          }}
        />
      )}
    </div>
  );
};

// Holiday Modal Component
const HolidayModal = ({ selectedDate, editingHoliday, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    editingHoliday || {
      date: selectedDate ? `${selectedDate.date}` : "",
      event: "",
      type: "holiday",
      description: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const holidayData = {
      ...formData,
      id: editingHoliday ? editingHoliday.id : Date.now(),
    };
    onSave(editingHoliday ? editingHoliday.id : holidayData.id, holidayData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{editingHoliday ? "Edit Holiday" : "Add Holiday"}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              placeholder="e.g., September 5 or 29 Sept - 7 Oct"
              required
            />
          </div>
          <div className="form-group">
            <label>Event Name *</label>
            <input
              type="text"
              value={formData.event}
              onChange={(e) =>
                setFormData({ ...formData, event: e.target.value })
              }
              placeholder="e.g., Eid E Miladunnabi"
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="holiday">Holiday</option>
              <option value="exam">Exam</option>
              <option value="vacation">Vacation</option>
              <option value="orientation">Orientation</option>
              <option value="special">Special Event</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Additional details about this event"
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingHoliday ? "Update Holiday" : "Add Holiday"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Semester Modal Component
const SemesterModal = ({ editingSemester, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    editingSemester || {
      semester: "",
      year: new Date().getFullYear(),
      startDate: "",
      endDate: "",
      totalWeeks: 18,
      examWeeks: 3,
      vacationWeeks: 2,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{editingSemester ? "Edit Semester" : "Create New Semester"}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Semester *</label>
              <select
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
                required
              >
                <option value="">Select Semester</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year *</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                min="2020"
                max="2030"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>End Date *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Total Weeks</label>
              <input
                type="number"
                value={formData.totalWeeks}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalWeeks: parseInt(e.target.value),
                  })
                }
                min="16"
                max="20"
              />
            </div>
            <div className="form-group">
              <label>Exam Weeks</label>
              <input
                type="number"
                value={formData.examWeeks}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    examWeeks: parseInt(e.target.value),
                  })
                }
                min="2"
                max="4"
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingSemester ? "Update Semester" : "Create Semester"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcademicCalendarView;
