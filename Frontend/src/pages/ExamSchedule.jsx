import React, { useState } from "react";
import "./ExamSchedule.css";

const ExamSchedule = ({ onBack, userRole }) => {
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState("All");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const semesters = ["All", "Fall 2024", "Spring 2024", "Summer 2024"];
  const courses = ["All", "CS201", "CS302", "CS303", "CS401"];
  const rooms = ["All", "Room 201", "Room 202", "Room 203", "Room 204"];

  const [examData, setExamData] = useState([
    {
      id: 1,
      course: "Data Structures and Algorithms",
      courseCode: "CS201",
      date: "2024-07-15",
      time: "10:00 AM",
      room: "Room 201",
      invigilators: "Dr. Mosaddek Khan, DR. MD. REZAUL KARIM",
      semester: "Fall 2024",
      status: "upcoming",
      duration: "3 hours",
      maxStudents: 50,
      instructions: "Bring calculator and ID card",
    },
    {
      id: 2,
      course: "Operating Systems",
      courseCode: "CS302",
      date: "2024-07-16",
      time: "2:00 PM",
      room: "Room 202",
      invigilators: "Dr. Mosaddek Khan, DR. MD. REZAUL KARIM",
      semester: "Fall 2024",
      status: "upcoming",
      duration: "3 hours",
      maxStudents: 45,
      instructions: "Open book exam",
    },
    {
      id: 3,
      course: "Database Management Systems",
      courseCode: "CS303",
      date: "2024-07-17",
      time: "10:00 AM",
      room: "Room 203",
      invigilators: "Dr. Mosaddek Khan, DR. MD. REZAUL KARIM",
      semester: "Fall 2024",
      status: "upcoming",
      duration: "3 hours",
      maxStudents: 40,
      instructions: "Closed book exam",
    },
    {
      id: 4,
      course: "Computer Networks",
      courseCode: "CS401",
      date: "2024-07-18",
      time: "2:00 PM",
      room: "Room 204",
      invigilators: "Dr. Mosaddek Khan, DR. MD. REZAUL KARIM",
      semester: "Fall 2024",
      status: "upcoming",
      duration: "3 hours",
      maxStudents: 35,
      instructions: "MCQ and descriptive questions",
    },
  ]);

  const getFilteredExams = () => {
    return examData.filter((exam) => {
      const semesterMatch =
        selectedSemester === "All" || exam.semester === selectedSemester;
      const courseMatch =
        selectedCourse === "All" || exam.courseCode === selectedCourse;
      const roomMatch = selectedRoom === "All" || exam.room === selectedRoom;
      return semesterMatch && courseMatch && roomMatch;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const filteredExams = getFilteredExams();

  // Admin functions
  const handleAddExam = (examData) => {
    const newExam = {
      ...examData,
      id: Math.max(...examData.map((e) => e.id), 0) + 1,
    };
    setExamData((prev) => [...prev, newExam]);
    setShowExamModal(false);
  };

  const handleEditExam = (examId, examData) => {
    setExamData((prev) =>
      prev.map((exam) => (exam.id === examId ? { ...exam, ...examData } : exam))
    );
    setShowExamModal(false);
    setEditingExam(null);
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      setExamData((prev) => prev.filter((exam) => exam.id !== examId));
    }
  };

  const handleStatusChange = (examId, newStatus) => {
    setExamData((prev) =>
      prev.map((exam) =>
        exam.id === examId ? { ...exam, status: newStatus } : exam
      )
    );
  };

  const handleDuplicateExam = (exam) => {
    const duplicatedExam = {
      ...exam,
      id: Math.max(...examData.map((e) => e.id), 0) + 1,
      course: `${exam.course} (Copy)`,
      date: "",
      status: "draft",
    };
    setExamData((prev) => [...prev, duplicatedExam]);
  };

  return (
    <div className="exam-schedule">
      <div className="exam-container">
        {/* Header Section */}
        <div className="notices-header">
          <h1 className="notices-title">Exam Schedule</h1>
          <p className="notices-subtitle">
            View upcoming exams and examination details for all courses.
          </p>
        </div>

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
                    className="admin-btn add-exam-btn"
                    onClick={() => setShowExamModal(true)}
                  >
                    ➕ Add New Exam
                  </button>
                  <button
                    className="admin-btn save-changes-btn"
                    onClick={() => {
                      alert("Exam schedule changes saved successfully!");
                    }}
                  >
                    💾 Save Changes
                  </button>
                  <button
                    className="admin-btn export-btn"
                    onClick={() => {
                      const dataStr = JSON.stringify(examData, null, 2);
                      const dataBlob = new Blob([dataStr], {
                        type: "application/json",
                      });
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "exam-schedule.json";
                      link.click();
                    }}
                  >
                    📊 Export Schedule
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Admin Mode Indicator */}
        {userRole === "admin" && isAdminMode && (
          <div className="admin-mode-indicator">
            Admin Edit Mode Active - You can now add, edit, and delete exams
          </div>
        )}

        {/* Filter Section */}
        <div className="exam-filter-section">
          <div className="filter-tabs">
            <div className="filter-tab active">Semester</div>
            <div className="filter-tab">Course</div>
            <div className="filter-tab">Room</div>
            <div className="filter-tab-highlight">All</div>
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <select
                className="filter-select"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select
                className="filter-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
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
        </div>

        {/* Upcoming Exams Section */}
        <div className="upcoming-exams-section">
          <h2 className="section-title">Upcoming Exams</h2>

          <div className="exams-grid">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="exam-card">
                <div className="exam-card-header">
                  <h3 className="exam-course-name">{exam.course}</h3>
                  <span className="exam-course-code">
                    Course Code: {exam.courseCode}
                  </span>
                  {userRole === "admin" && isAdminMode && (
                    <div className="exam-admin-actions">
                      <button
                        className="admin-action-btn edit-btn"
                        onClick={() => {
                          setEditingExam(exam);
                          setShowExamModal(true);
                        }}
                        title="Edit exam"
                      >
                        ✏️
                      </button>
                      <button
                        className="admin-action-btn duplicate-btn"
                        onClick={() => handleDuplicateExam(exam)}
                        title="Duplicate exam"
                      >
                        📋
                      </button>
                      <button
                        className="admin-action-btn delete-btn"
                        onClick={() => handleDeleteExam(exam.id)}
                        title="Delete exam"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>

                <div className="exam-card-body">
                  <div className="exam-detail">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {formatDate(exam.date)}
                    </span>
                  </div>

                  <div className="exam-detail">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{exam.time}</span>
                  </div>

                  <div className="exam-detail">
                    <span className="detail-label">Room:</span>
                    <span className="detail-value">{exam.room}</span>
                  </div>

                  <div className="exam-detail">
                    <span className="detail-label">Invigilators:</span>
                    <span className="detail-value">{exam.invigilators}</span>
                  </div>

                  {exam.duration && (
                    <div className="exam-detail">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">{exam.duration}</span>
                    </div>
                  )}

                  {exam.maxStudents && (
                    <div className="exam-detail">
                      <span className="detail-label">Max Students:</span>
                      <span className="detail-value">{exam.maxStudents}</span>
                    </div>
                  )}

                  {exam.instructions && (
                    <div className="exam-detail">
                      <span className="detail-label">Instructions:</span>
                      <span className="detail-value">{exam.instructions}</span>
                    </div>
                  )}

                  {userRole === "admin" && isAdminMode && (
                    <div className="exam-detail">
                      <span className="detail-label">Status:</span>
                      <select
                        className="status-select"
                        value={exam.status}
                        onChange={(e) =>
                          handleStatusChange(exam.id, e.target.value)
                        }
                      >
                        <option value="draft">Draft</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="no-exams">
              <div className="no-exams-content">
                <span className="no-exams-icon">📅</span>
                <h3>No exams found</h3>
                <p>No exams match your current filter criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exam Modal */}
      {showExamModal && (
        <ExamModal
          editingExam={editingExam}
          onSave={editingExam ? handleEditExam : handleAddExam}
          onClose={() => {
            setShowExamModal(false);
            setEditingExam(null);
          }}
          semesters={semesters.filter((s) => s !== "All")}
          courses={courses.filter((c) => c !== "All")}
          rooms={rooms.filter((r) => r !== "All")}
        />
      )}
    </div>
  );
};

// Exam Modal Component
const ExamModal = ({
  editingExam,
  onSave,
  onClose,
  semesters,
  courses,
  rooms,
}) => {
  const [formData, setFormData] = useState(
    editingExam || {
      course: "",
      courseCode: "",
      date: "",
      time: "",
      room: "",
      invigilators: "",
      semester: "",
      status: "upcoming",
      duration: "3 hours",
      maxStudents: "",
      instructions: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExam) {
      onSave(editingExam.id, formData);
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content exam-modal">
        <div className="modal-header">
          <h3>{editingExam ? "Edit Exam" : "Add New Exam"}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Course Name *</label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                placeholder="e.g., Data Structures and Algorithms"
                required
              />
            </div>
            <div className="form-group">
              <label>Course Code *</label>
              <input
                type="text"
                value={formData.courseCode}
                onChange={(e) =>
                  setFormData({ ...formData, courseCode: e.target.value })
                }
                placeholder="e.g., CS201"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Room *</label>
              <select
                value={formData.room}
                onChange={(e) =>
                  setFormData({ ...formData, room: e.target.value })
                }
                required
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
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
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 3 hours"
              />
            </div>
            <div className="form-group">
              <label>Max Students</label>
              <input
                type="number"
                value={formData.maxStudents}
                onChange={(e) =>
                  setFormData({ ...formData, maxStudents: e.target.value })
                }
                placeholder="e.g., 50"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Invigilators *</label>
            <input
              type="text"
              value={formData.invigilators}
              onChange={(e) =>
                setFormData({ ...formData, invigilators: e.target.value })
              }
              placeholder="e.g., Dr. John Smith, Dr. Jane Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Instructions</label>
            <textarea
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              placeholder="Special instructions for students..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="draft">Draft</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingExam ? "Update Exam" : "Create Exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamSchedule;
