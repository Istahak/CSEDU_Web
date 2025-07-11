import React, { useState } from "react";
import "./AcademicCalendar.css";

const AcademicCalendar = ({ onExamsClick, userRole }) => {
  const [selectedBatch, setSelectedBatch] = useState("CSE-22");
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [selectedRoom, setSelectedRoom] = useState("All");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [editingBatch, setEditingBatch] = useState(null);

  const [batches, setBatches] = useState([
    "CSE-19",
    "CSE-20",
    "CSE-21",
    "CSE-22",
  ]);

  const handleExamsClick = () => {
    if (onExamsClick) {
      onExamsClick();
    } else {
      alert("Exams functionality coming soon!");
    }
  };

  // Day filter restored
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"];
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
  const [scheduleDataByBatch, setScheduleDataByBatch] = useState({
    "CSE-19": {
      Monday: [
        {
          id: 1,
          time: "8:00 AM - 9:00 AM",
          course: "Discrete Math",
          courseId: "CSE 201",
          teacher: "Dr. A. Rahman",
          room: "Room 201",
        },
        {
          id: 2,
          time: "9:00 AM - 10:00 AM",
          course: "Digital Logic",
          courseId: "CSE 202",
          teacher: "Dr. S. Islam",
          room: "Room 202",
        },
        {
          id: 3,
          time: "10:00 AM - 11:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 4,
          time: "11:00 AM - 12:00 PM",
          course: "Microprocessors",
          courseId: "CSE 203",
          teacher: "Dr. A. Rahman",
          room: "Room 203",
        },
      ],
      Tuesday: [
        {
          id: 5,
          time: "8:00 AM - 9:00 AM",
          course: "Data Comm",
          courseId: "CSE 204",
          teacher: "Dr. S. Islam",
          room: "Room 204",
        },
        {
          id: 6,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 7,
          time: "10:00 AM - 11:00 AM",
          course: "Database",
          courseId: "CSE 205",
          teacher: "Dr. A. Rahman",
          room: "Room 205",
        },
      ],
      Wednesday: [
        {
          id: 8,
          time: "8:00 AM - 9:00 AM",
          course: "Software Engg",
          courseId: "CSE 206",
          teacher: "Dr. S. Islam",
          room: "Room 206",
        },
        {
          id: 9,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 10,
          time: "10:00 AM - 11:00 AM",
          course: "AI",
          courseId: "CSE 207",
          teacher: "Dr. A. Rahman",
          room: "Room 207",
        },
      ],
      Thursday: [
        {
          id: 11,
          time: "8:00 AM - 9:00 AM",
          course: "Networking",
          courseId: "CSE 208",
          teacher: "Dr. S. Islam",
          room: "Room 208",
        },
        {
          id: 12,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 13,
          time: "10:00 AM - 11:00 AM",
          course: "Compiler",
          courseId: "CSE 209",
          teacher: "Dr. A. Rahman",
          room: "Room 209",
        },
      ],
      Sunday: [
        {
          id: 14,
          time: "9:00 AM - 10:00 AM",
          course: "Project",
          courseId: "CSE 210",
          teacher: "Dr. S. Islam",
          room: "Room 201",
        },
      ],
    },
    "CSE-20": {
      Monday: [
        {
          id: 15,
          time: "8:00 AM - 9:00 AM",
          course: "OOP",
          courseId: "CSE 301",
          teacher: "Dr. B. Rahman",
          room: "Room 202",
        },
        {
          id: 16,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 17,
          time: "10:00 AM - 11:00 AM",
          course: "Web Tech",
          courseId: "CSE 302",
          teacher: "Dr. C. Islam",
          room: "Room 203",
        },
      ],
      Tuesday: [
        {
          id: 18,
          time: "8:00 AM - 9:00 AM",
          course: "Mobile App",
          courseId: "CSE 303",
          teacher: "Dr. B. Rahman",
          room: "Room 204",
        },
        {
          id: 19,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 20,
          time: "10:00 AM - 11:00 AM",
          course: "Cloud",
          courseId: "CSE 304",
          teacher: "Dr. C. Islam",
          room: "Room 205",
        },
      ],
      Wednesday: [
        {
          id: 21,
          time: "8:00 AM - 9:00 AM",
          course: "Security",
          courseId: "CSE 305",
          teacher: "Dr. B. Rahman",
          room: "Room 206",
        },
        {
          id: 22,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 23,
          time: "10:00 AM - 11:00 AM",
          course: "IoT",
          courseId: "CSE 306",
          teacher: "Dr. C. Islam",
          room: "Room 207",
        },
      ],
      Thursday: [
        {
          id: 24,
          time: "8:00 AM - 9:00 AM",
          course: "Big Data",
          courseId: "CSE 307",
          teacher: "Dr. B. Rahman",
          room: "Room 208",
        },
        {
          id: 25,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 26,
          time: "10:00 AM - 11:00 AM",
          course: "ML",
          courseId: "CSE 308",
          teacher: "Dr. C. Islam",
          room: "Room 209",
        },
      ],
      Sunday: [
        {
          id: 27,
          time: "9:00 AM - 10:00 AM",
          course: "Project",
          courseId: "CSE 310",
          teacher: "Dr. B. Rahman",
          room: "Room 202",
        },
      ],
    },
    "CSE-21": {
      Monday: [
        {
          id: 28,
          time: "8:00 AM - 9:00 AM",
          course: "Math IV",
          courseId: "CSE 401",
          teacher: "Dr. D. Rahman",
          room: "Room 203",
        },
        {
          id: 29,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 30,
          time: "10:00 AM - 11:00 AM",
          course: "Graphics",
          courseId: "CSE 402",
          teacher: "Dr. E. Islam",
          room: "Room 204",
        },
      ],
      Tuesday: [
        {
          id: 31,
          time: "8:00 AM - 9:00 AM",
          course: "Bioinformatics",
          courseId: "CSE 403",
          teacher: "Dr. D. Rahman",
          room: "Room 205",
        },
        {
          id: 32,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 33,
          time: "10:00 AM - 11:00 AM",
          course: "Robotics",
          courseId: "CSE 404",
          teacher: "Dr. E. Islam",
          room: "Room 206",
        },
      ],
      Wednesday: [
        {
          id: 34,
          time: "8:00 AM - 9:00 AM",
          course: "Quantum",
          courseId: "CSE 405",
          teacher: "Dr. D. Rahman",
          room: "Room 207",
        },
        {
          id: 35,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 36,
          time: "10:00 AM - 11:00 AM",
          course: "Ethics",
          courseId: "CSE 406",
          teacher: "Dr. E. Islam",
          room: "Room 208",
        },
      ],
      Thursday: [
        {
          id: 37,
          time: "8:00 AM - 9:00 AM",
          course: "Thesis",
          courseId: "CSE 407",
          teacher: "Dr. D. Rahman",
          room: "Room 209",
        },
        {
          id: 38,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 39,
          time: "10:00 AM - 11:00 AM",
          course: "Seminar",
          courseId: "CSE 408",
          teacher: "Dr. E. Islam",
          room: "Room 201",
        },
      ],
      Sunday: [
        {
          id: 40,
          time: "9:00 AM - 10:00 AM",
          course: "Project",
          courseId: "CSE 410",
          teacher: "Dr. D. Rahman",
          room: "Room 203",
        },
      ],
    },
    "CSE-22": {
      Monday: [
        {
          id: 41,
          time: "8:00 AM - 9:00 AM",
          course: "Intro to CSE",
          courseId: "CSE 101",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 201",
        },
        {
          id: 42,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 43,
          time: "10:00 AM - 11:00 AM",
          course: "Math I",
          courseId: "CSE 102",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 202",
        },
      ],
      Tuesday: [
        {
          id: 44,
          time: "8:00 AM - 9:00 AM",
          course: "Physics",
          courseId: "CSE 103",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 203",
        },
        {
          id: 45,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 46,
          time: "10:00 AM - 11:00 AM",
          course: "Chemistry",
          courseId: "CSE 104",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 204",
        },
      ],
      Wednesday: [
        {
          id: 47,
          time: "8:00 AM - 9:00 AM",
          course: "English",
          courseId: "CSE 105",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 205",
        },
        {
          id: 48,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 49,
          time: "10:00 AM - 11:00 AM",
          course: "Bangla",
          courseId: "CSE 106",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 206",
        },
      ],
      Thursday: [
        {
          id: 50,
          time: "8:00 AM - 9:00 AM",
          course: "ICT",
          courseId: "CSE 107",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 207",
        },
        {
          id: 51,
          time: "9:00 AM - 10:00 AM",
          course: "Lunch Break",
          courseId: "",
          teacher: "",
          room: "",
        },
        {
          id: 52,
          time: "10:00 AM - 11:00 AM",
          course: "History",
          courseId: "CSE 108",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 208",
        },
      ],
      Sunday: [
        {
          id: 53,
          time: "9:00 AM - 10:00 AM",
          course: "Orientation",
          courseId: "CSE 110",
          teacher: "Dr. Mosaddek Khan",
          room: "Room 209",
        },
      ],
    },
  });

  // Admin functions
  const handleAddSchedule = (scheduleData) => {
    const { batch, day, ...scheduleEntry } = scheduleData;
    setScheduleDataByBatch((prev) => ({
      ...prev,
      [batch]: {
        ...prev[batch],
        [day]: [
          ...(prev[batch]?.[day] || []),
          { ...scheduleEntry, id: Date.now() },
        ],
      },
    }));
    setShowScheduleModal(false);
  };

  const handleEditSchedule = (scheduleData) => {
    const { batch, day, id, ...scheduleEntry } = scheduleData;
    setScheduleDataByBatch((prev) => ({
      ...prev,
      [batch]: {
        ...prev[batch],
        [day]: prev[batch][day].map((item) =>
          item.id === id ? { ...item, ...scheduleEntry } : item
        ),
      },
    }));
    setShowScheduleModal(false);
    setEditingSchedule(null);
  };

  const handleDeleteSchedule = (batch, day, id) => {
    if (
      window.confirm("Are you sure you want to delete this class schedule?")
    ) {
      setScheduleDataByBatch((prev) => ({
        ...prev,
        [batch]: {
          ...prev[batch],
          [day]: prev[batch][day].filter((item) => item.id !== id),
        },
      }));
    }
  };

  const handleAddBatch = (batchData) => {
    setBatches((prev) => [...prev, batchData.name]);
    setScheduleDataByBatch((prev) => ({
      ...prev,
      [batchData.name]: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Sunday: [],
      },
    }));
    setShowBatchModal(false);
  };

  const handleDeleteBatch = (batchName) => {
    if (
      window.confirm(
        `Are you sure you want to delete batch ${batchName} and all its schedules?`
      )
    ) {
      setBatches((prev) => prev.filter((batch) => batch !== batchName));
      setScheduleDataByBatch((prev) => {
        const newData = { ...prev };
        delete newData[batchName];
        return newData;
      });
      if (selectedBatch === batchName) {
        setSelectedBatch(batches[0]);
      }
    }
  };

  // Show schedule for the selected day and batch
  const daySchedule = scheduleDataByBatch[selectedBatch]?.[selectedDay] || [];
  const allRows = daySchedule.map((entry) => ({
    ...entry,
    day: selectedDay,
    batch: selectedBatch,
  }));

  // Filter by room only
  const filteredRows = allRows.filter((row) => {
    const roomMatch = selectedRoom === "All" || row.room === selectedRoom;
    return roomMatch;
  });

  return (
    <div className="academic-calendar">
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
                    className="admin-btn add-schedule-btn"
                    onClick={() => setShowScheduleModal(true)}
                  >
                    ➕ Add Class
                  </button>
                  <button
                    className="admin-btn add-batch-btn"
                    onClick={() => setShowBatchModal(true)}
                  >
                    🎓 Add Batch
                  </button>
                  <button
                    className="admin-btn save-changes-btn"
                    onClick={() => {
                      alert("Schedule changes saved successfully!");
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
        <div className="notices-header">
          <h1 className="notices-title">Class Routine</h1>
          <p className="notices-subtitle">
            View the full class routine for the current semester. Use the
            filters to find classes by batch, day, or room.
          </p>
        </div>

        {/* Modern Filter Section */}
        <div className="directory-controls">
          <div className="filters-section">
            <div className="filter-group">
              <label className="filter-label">Batch</label>
              <div className="batch-filter-container">
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
                {userRole === "admin" && isAdminMode && (
                  <button
                    className="delete-batch-btn"
                    onClick={() => handleDeleteBatch(selectedBatch)}
                    title="Delete Batch"
                  >
                    🗑️
                  </button>
                )}
              </div>
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
          <h2 className="section-title">
            {selectedDay} Schedule - {selectedBatch}
          </h2>

          <div className="routine-table-wrapper">
            <table className="routine-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Course Name</th>
                  <th>Course ID</th>
                  <th>Teacher</th>
                  <th>Room</th>
                  {userRole === "admin" && isAdminMode && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={userRole === "admin" && isAdminMode ? 6 : 5}
                      className="no-classes"
                    >
                      No classes found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, idx) => (
                    <tr
                      key={row.id || idx}
                      className={
                        row.course === "Lunch Break"
                          ? "lunch-break"
                          : idx % 2 === 0
                          ? "even-row"
                          : "odd-row"
                      }
                    >
                      <td className="time-col" data-label="Time">
                        {row.time}
                      </td>
                      <td className="course-col" data-label="Course">
                        {row.course}
                      </td>
                      <td className="id-col" data-label="Course ID">
                        {row.courseId}
                      </td>
                      <td className="teacher-col" data-label="Teacher">
                        {row.teacher}
                      </td>
                      <td className="room-col" data-label="Room">
                        {row.room}
                      </td>
                      {userRole === "admin" && isAdminMode && (
                        <td className="actions-col" data-label="Actions">
                          <div className="action-buttons">
                            <button
                              className="edit-btn"
                              onClick={() => {
                                setEditingSchedule({
                                  ...row,
                                  batch: selectedBatch,
                                  day: selectedDay,
                                });
                                setShowScheduleModal(true);
                              }}
                              title="Edit Schedule"
                            >
                              ✏️
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDeleteSchedule(
                                  selectedBatch,
                                  selectedDay,
                                  row.id
                                )
                              }
                              title="Delete Schedule"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleModal
          editingSchedule={editingSchedule}
          onSave={editingSchedule ? handleEditSchedule : handleAddSchedule}
          onClose={() => {
            setShowScheduleModal(false);
            setEditingSchedule(null);
          }}
          batches={batches}
          days={days}
          rooms={rooms}
        />
      )}

      {/* Batch Modal */}
      {showBatchModal && (
        <BatchModal
          onSave={handleAddBatch}
          onClose={() => setShowBatchModal(false)}
        />
      )}
    </div>
  );
};

// Schedule Modal Component
const ScheduleModal = ({
  editingSchedule,
  onSave,
  onClose,
  batches,
  days,
  rooms,
}) => {
  const [formData, setFormData] = useState(
    editingSchedule || {
      batch: batches[0],
      day: days[0],
      time: "",
      course: "",
      courseId: "",
      teacher: "",
      room: rooms[1], // Skip "All" option
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
          <h3>
            {editingSchedule ? "Edit Class Schedule" : "Add Class Schedule"}
          </h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Batch *</label>
              <select
                value={formData.batch}
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
                required
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Day *</label>
              <select
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
                required
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Time *</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                placeholder="e.g., 8:00 AM - 9:00 AM"
                required
              />
            </div>
            <div className="form-group">
              <label>Room *</label>
              <select
                value={formData.room}
                onChange={(e) =>
                  setFormData({ ...formData, room: e.target.value })
                }
                required
              >
                {rooms
                  .filter((room) => room !== "All")
                  .map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Course Name *</label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              placeholder="e.g., Data Structures"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Course ID</label>
              <input
                type="text"
                value={formData.courseId}
                onChange={(e) =>
                  setFormData({ ...formData, courseId: e.target.value })
                }
                placeholder="e.g., CSE 201"
              />
            </div>
            <div className="form-group">
              <label>Teacher</label>
              <input
                type="text"
                value={formData.teacher}
                onChange={(e) =>
                  setFormData({ ...formData, teacher: e.target.value })
                }
                placeholder="e.g., Dr. John Smith"
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingSchedule ? "Update Schedule" : "Add Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Batch Modal Component
const BatchModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    year: new Date().getFullYear(),
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Batch</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Batch Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., CSE-23"
              required
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              min="2020"
              max="2030"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Additional details about this batch"
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Add Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcademicCalendar;
