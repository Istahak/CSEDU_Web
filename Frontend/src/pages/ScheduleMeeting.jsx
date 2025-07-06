import React, { useState } from "react";
import "./ScheduleMeeting.css";

const ScheduleMeeting = ({ onBack }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showNewStudentForm, setShowNewStudentForm] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
    course: "",
    type: "course",
    topic: "",
  });
  const [meetingData, setMeetingData] = useState({
    studentId: "",
    purpose: "consultation",
    date: "",
    time: "",
    duration: "30",
    location: "office",
    customLocation: "",
    description: "",
    recurring: false,
    recurringType: "weekly",
    recurringEnd: "",
    reminderEmail: true,
    reminderSms: false,
    notes: "",
  });

  // Sample student data
  const students = [
    {
      id: 1,
      name: "Mohammad Rahman",
      studentId: "CSE-2020-1001",
      email: "mohammad.rahman@csedu.ac.bd",
      phone: "+880 1234 567890",
      course: "CSE 408 - Software Development",
      type: "thesis",
      topic: "Machine Learning for Stock Price Prediction",
    },
    {
      id: 2,
      name: "Fatima Khan",
      studentId: "CSE-2020-1015",
      email: "fatima.khan@csedu.ac.bd",
      phone: "+880 1234 567891",
      course: "CSE 412 - Machine Learning",
      type: "thesis",
      topic: "Natural Language Processing for Bengali",
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      studentId: "CSE-2021-1025",
      email: "ahmed.hassan@csedu.ac.bd",
      phone: "+880 1234 567892",
      course: "CSE 408 - Software Development",
      type: "course",
      topic: "Course Assignment Help",
    },
    {
      id: 4,
      name: "Aisha Begum",
      studentId: "CSE-2020-1030",
      email: "aisha.begum@csedu.ac.bd",
      phone: "+880 1234 567893",
      course: "CSE 412 - Machine Learning",
      type: "course",
      topic: "Project Guidance",
    },
    {
      id: 5,
      name: "Rafiq Islam",
      studentId: "CSE-2021-1040",
      email: "rafiq.islam@csedu.ac.bd",
      phone: "+880 1234 567894",
      course: "CSE 408 - Software Development",
      type: "research",
      topic: "Research Assistant",
    },
  ];

  const meetingPurposes = [
    { value: "consultation", label: "Academic Consultation", icon: "🎓" },
    { value: "thesis", label: "Thesis Discussion", icon: "📚" },
    { value: "project", label: "Project Review", icon: "💼" },
    { value: "career", label: "Career Guidance", icon: "🚀" },
    { value: "research", label: "Research Discussion", icon: "🔬" },
    { value: "other", label: "Other", icon: "💭" },
  ];

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const handleInputChange = (field, value) => {
    setMeetingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setShowNewStudentForm(false);
    setMeetingData((prev) => ({ ...prev, studentId: student.studentId }));
  };

  const handleNewStudentInputChange = (field, value) => {
    setNewStudentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNewStudent = () => {
    if (
      !newStudentData.name ||
      !newStudentData.studentId ||
      !newStudentData.email
    ) {
      alert("Please fill in all required fields for the new student");
      return;
    }

    const newStudent = {
      id: Date.now(), // Simple ID generation
      ...newStudentData,
    };

    setSelectedStudent(newStudent);
    setMeetingData((prev) => ({ ...prev, studentId: newStudent.studentId }));
    setShowNewStudentForm(false);

    // Reset form
    setNewStudentData({
      name: "",
      studentId: "",
      email: "",
      phone: "",
      course: "",
      type: "course",
      topic: "",
    });
  };

  const handleSubmit = (action) => {
    if (!selectedStudent || !meetingData.date || !meetingData.time) {
      alert("Please fill in all required fields");
      return;
    }

    const meetingInfo = {
      ...meetingData,
      student: selectedStudent,
      action: action,
    };

    console.log(`Meeting ${action}:`, meetingInfo);

    if (action === "schedule") {
      alert(
        "Meeting scheduled successfully! Email notification sent to student."
      );
    } else {
      alert("Meeting saved as draft. You can finalize it later.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="schedule-meeting">
      <div className="schedule-meeting-container">
        <button onClick={onBack} className="main-back-button">
          ← Back to Profile
        </button>

        <div className="schedule-meeting-content">
          <div className="view-header">
            <div className="header-content">
              <h2>Schedule Meeting</h2>
              <p>Schedule consultation meetings with students</p>
            </div>
            <button onClick={onBack} className="back-btn">
              ← Back
            </button>
          </div>

          {/* Student Selection */}
          <div className="student-selection">
            <div className="selection-header">
              <h3>📋 Select Student</h3>
              <button
                className="add-new-btn"
                onClick={() => setShowNewStudentForm(true)}
              >
                ➕ Add New Student
              </button>
            </div>

            {showNewStudentForm && (
              <div className="new-student-form">
                <h4>📝 Add New Student</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Student Name *</label>
                    <input
                      type="text"
                      value={newStudentData.name}
                      onChange={(e) =>
                        handleNewStudentInputChange("name", e.target.value)
                      }
                      placeholder="Enter student name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Student ID *</label>
                    <input
                      type="text"
                      value={newStudentData.studentId}
                      onChange={(e) =>
                        handleNewStudentInputChange("studentId", e.target.value)
                      }
                      placeholder="e.g., CSE-2021-1050"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={newStudentData.email}
                      onChange={(e) =>
                        handleNewStudentInputChange("email", e.target.value)
                      }
                      placeholder="student.email@csedu.ac.bd"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={newStudentData.phone}
                      onChange={(e) =>
                        handleNewStudentInputChange("phone", e.target.value)
                      }
                      placeholder="+880 1234 567890"
                    />
                  </div>
                  <div className="form-group">
                    <label>Course</label>
                    <input
                      type="text"
                      value={newStudentData.course}
                      onChange={(e) =>
                        handleNewStudentInputChange("course", e.target.value)
                      }
                      placeholder="e.g., CSE 408 - Software Development"
                    />
                  </div>
                  <div className="form-group">
                    <label>Student Type</label>
                    <select
                      value={newStudentData.type}
                      onChange={(e) =>
                        handleNewStudentInputChange("type", e.target.value)
                      }
                    >
                      <option value="course">Course Student</option>
                      <option value="thesis">Thesis Student</option>
                      <option value="research">Research Assistant</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Topic/Subject</label>
                    <input
                      type="text"
                      value={newStudentData.topic}
                      onChange={(e) =>
                        handleNewStudentInputChange("topic", e.target.value)
                      }
                      placeholder="Brief description of consultation topic"
                    />
                  </div>
                </div>
                <div className="new-student-actions">
                  <button
                    className="action-btn secondary"
                    onClick={() => setShowNewStudentForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="action-btn primary"
                    onClick={handleAddNewStudent}
                  >
                    Add Student
                  </button>
                </div>
              </div>
            )}

            <div className="students-grid">
              {students.map((student) => (
                <div
                  key={student.id}
                  className={`student-card ${
                    selectedStudent?.id === student.id ? "selected" : ""
                  }`}
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="student-info">
                    <div className="student-header">
                      <h4>{student.name}</h4>
                      <span className="student-id">{student.studentId}</span>
                    </div>
                    <div className="student-details">
                      <p>
                        <strong>Course:</strong> {student.course}
                      </p>
                      <p>
                        <strong>Type:</strong> {student.type}
                      </p>
                      <p>
                        <strong>Topic:</strong> {student.topic}
                      </p>
                      <p>
                        <strong>Email:</strong> {student.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting Form */}
          {selectedStudent && (
            <div className="meeting-form">
              <h3>📅 Meeting Details</h3>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">🎯</span>
                  Meeting Purpose
                </h4>
                <div className="purpose-selection">
                  {meetingPurposes.map((purpose) => (
                    <div
                      key={purpose.value}
                      className={`purpose-option ${
                        meetingData.purpose === purpose.value ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleInputChange("purpose", purpose.value)
                      }
                    >
                      <input
                        type="radio"
                        name="purpose"
                        value={purpose.value}
                        checked={meetingData.purpose === purpose.value}
                        onChange={() =>
                          handleInputChange("purpose", purpose.value)
                        }
                      />
                      <span className="icon">{purpose.icon}</span>
                      <span className="label">{purpose.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">📅</span>
                  Date & Time
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={meetingData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Time *</label>
                    <select
                      value={meetingData.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <select
                      value={meetingData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", e.target.value)
                      }
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">📍</span>
                  Location
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Meeting Location</label>
                    <select
                      value={meetingData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    >
                      <option value="office">My Office (Room 402)</option>
                      <option value="lab">Computer Lab</option>
                      <option value="classroom">Classroom</option>
                      <option value="online">Online Meeting</option>
                      <option value="custom">Custom Location</option>
                    </select>
                  </div>
                  {meetingData.location === "custom" && (
                    <div className="form-group">
                      <label>Custom Location</label>
                      <input
                        type="text"
                        value={meetingData.customLocation}
                        onChange={(e) =>
                          handleInputChange("customLocation", e.target.value)
                        }
                        placeholder="Enter custom location"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">📝</span>
                  Additional Information
                </h4>
                <div className="form-group full-width">
                  <label>Meeting Description</label>
                  <textarea
                    value={meetingData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe the meeting agenda or topics to discuss..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">🔄</span>
                  Recurring Meeting
                </h4>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={meetingData.recurring}
                    onChange={(e) =>
                      handleInputChange("recurring", e.target.checked)
                    }
                  />
                  <label htmlFor="recurring">
                    Make this a recurring meeting
                  </label>
                </div>

                {meetingData.recurring && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Repeat</label>
                      <select
                        value={meetingData.recurringType}
                        onChange={(e) =>
                          handleInputChange("recurringType", e.target.value)
                        }
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        value={meetingData.recurringEnd}
                        onChange={(e) =>
                          handleInputChange("recurringEnd", e.target.value)
                        }
                        min={meetingData.date}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">🔔</span>
                  Notifications
                </h4>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="reminderEmail"
                    checked={meetingData.reminderEmail}
                    onChange={(e) =>
                      handleInputChange("reminderEmail", e.target.checked)
                    }
                  />
                  <label htmlFor="reminderEmail">
                    Send email reminder to student
                  </label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="reminderSms"
                    checked={meetingData.reminderSms}
                    onChange={(e) =>
                      handleInputChange("reminderSms", e.target.checked)
                    }
                  />
                  <label htmlFor="reminderSms">
                    Send SMS reminder to student
                  </label>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group full-width">
                  <label>Internal Notes</label>
                  <textarea
                    value={meetingData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Private notes for your reference..."
                    rows="3"
                  />
                </div>
              </div>

              {/* Meeting Summary */}
              <div className="meeting-summary">
                <h4>📋 Meeting Summary</h4>
                <div className="summary-content">
                  <div className="summary-item">
                    <strong>Student:</strong> {selectedStudent.name} (
                    {selectedStudent.studentId})
                  </div>
                  <div className="summary-item">
                    <strong>Purpose:</strong>{" "}
                    {
                      meetingPurposes.find(
                        (p) => p.value === meetingData.purpose
                      )?.label
                    }
                  </div>
                  {meetingData.date && (
                    <div className="summary-item">
                      <strong>Date:</strong> {formatDate(meetingData.date)}
                    </div>
                  )}
                  {meetingData.time && (
                    <div className="summary-item">
                      <strong>Time:</strong> {meetingData.time} (
                      {meetingData.duration} minutes)
                    </div>
                  )}
                  <div className="summary-item">
                    <strong>Location:</strong>{" "}
                    {meetingData.location === "office"
                      ? "My Office (Room 402)"
                      : meetingData.location === "lab"
                      ? "Computer Lab"
                      : meetingData.location === "classroom"
                      ? "Classroom"
                      : meetingData.location === "online"
                      ? "Online Meeting"
                      : meetingData.location === "custom"
                      ? meetingData.customLocation
                      : "Not specified"}
                  </div>
                  {meetingData.recurring && (
                    <div className="summary-item">
                      <strong>Recurring:</strong> {meetingData.recurringType}{" "}
                      until {meetingData.recurringEnd}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {selectedStudent && (
            <div className="action-buttons">
              <button
                className="action-btn secondary"
                onClick={() => handleSubmit("draft")}
              >
                Save as Draft
              </button>
              <button
                className="action-btn success"
                onClick={() => handleSubmit("schedule")}
                disabled={!meetingData.date || !meetingData.time}
              >
                Schedule Meeting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
