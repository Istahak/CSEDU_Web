import React, { useState } from "react";
import StudentCard from "../components/StudentCard";
import "./ScheduleMeeting.css";

const ScheduleMeeting = ({ onBack }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [meetingData, setMeetingData] = useState({
    studentId: "",
    purpose: "consultation",
    date: "",
    time: "",
    duration: "30",
    location: "office",
    customLocation: "",
    description: "",
  });

  // Sample student data - only thesis students and research assistants
  const students = [
    {
      id: "CSE-2020-1001",
      name: "Mohammad Rahman",
      email: "mohammad.rahman@csedu.ac.bd",
      phone: "+880 1234 567890",
      type: "thesis",
      thesisTopic: "Machine Learning for Stock Price Prediction",
      startDate: "Jan 2023",
      year: "Final",
      level: "Undergraduate"
    },
    {
      id: "CSE-2020-1015",
      name: "Fatima Khan",
      email: "fatima.khan@csedu.ac.bd",
      phone: "+880 1234 567891",
      type: "thesis",
      thesisTopic: "Natural Language Processing for Bengali",
      startDate: "Feb 2023",
      year: "Final",
      level: "Undergraduate"
    },
    {
      id: "CSE-2021-1040",
      name: "Rafiq Islam",
      email: "rafiq.islam@csedu.ac.bd",
      phone: "+880 1234 567894",
      type: "research",
      researchArea: "Deep Learning",
      duration: "6 months",
      joinDate: "Aug 2024",
      level: "Undergraduate"
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
    setSelectedStudents(prev => {
      const isSelected = prev.some(s => s.id === student.id);
      if (isSelected) {
        // Remove student if already selected
        return prev.filter(s => s.id !== student.id);
      } else {
        // Add student to selection
        return [...prev, student];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedStudents.length === 0 || !meetingData.date || !meetingData.time) {
      alert("Please select at least one student and fill in all required fields");
      return;
    }

    // Prepare email data
    const studentEmails = selectedStudents.map(student => student.email).join(',');
    const purposeLabel = meetingPurposes.find(p => p.value === meetingData.purpose)?.label || 'Meeting';
    const formattedDate = formatDate(meetingData.date);
    const locationText = meetingData.location === "office"
      ? "My Office (Room 402)"
      : meetingData.location === "lab"
      ? "Computer Lab"
      : meetingData.location === "classroom"
      ? "Classroom"
      : meetingData.location === "online"
      ? "Online Meeting"
      : meetingData.location === "custom"
      ? meetingData.customLocation
      : "To be determined";

    // Create email subject
    const subject = `Meeting Invitation: ${purposeLabel} - ${formattedDate}`;

    // Create email body
    const body = `Dear Students,

I hope this email finds you well. I would like to schedule a meeting with you for the following:

Meeting Details:
• Purpose: ${purposeLabel}
• Date: ${formattedDate}
• Time: ${meetingData.time} (${meetingData.duration} minutes)
• Location: ${locationText}

${meetingData.description ? `Agenda:
${meetingData.description}

` : ''}Please confirm your attendance by replying to this email.

If you have any conflicts with this schedule, please let me know as soon as possible so we can arrange an alternative time.

Looking forward to our meeting.

Best regards,
[Your Name]
[Your Title]
Department of Computer Science and Engineering
University of Dhaka`;

    // Create Gmail URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(studentEmails)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');

    // Show success message
    alert(
      `Gmail opened with meeting invitation for ${selectedStudents.length} student(s). Please review and send the email.`
    );
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
    <div className="teacher-profile-page">
      <div className="teacher-profile-container">
        {/* Header Section - Consistent with TeacherProfile */}
        <div className="teacher-profile-header">
          <h1 className="profile-title">Schedule Meeting</h1>
          <p className="profile-subtitle">
            Schedule consultation meetings with students
          </p>
        </div>

        <div className="schedule-meeting-content">
          {/* Student Selection Section */}
          <div className="tab-content">
            <div className="students-section">
              <div className="section-header">
                <div className="section-header-text">
                  <h3>Select Students</h3>
                  <p className="section-subtitle">Choose one or more students to schedule a meeting with</p>
                </div>
              </div>

              <div className="notices-grid">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className={selectedStudents.some(s => s.id === student.id) ? "selected-student-card" : ""}
                    onClick={() => handleStudentSelect(student)}
                  >
                    <StudentCard
                      student={student}
                      type={student.type === "thesis" ? "thesis" : "assistant"}
                      hideButtons={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meeting Form */}
          {selectedStudents.length > 0 && (
            <div className="tab-content">
              <div className="meeting-details-section">
                <div className="section-header">
                  <div className="section-header-text">
                    <h3>Meeting Details</h3>
                    <p className="section-subtitle">Configure the meeting settings and schedule</p>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-header-text">
                      <h4>Meeting Purpose</h4>
                      <p className="section-subtitle">Select the type of meeting you want to schedule</p>
                    </div>
                  </div>
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
                <div className="section-header">
                  <div className="section-header-text">
                    <h4>Date & Time</h4>
                    <p className="section-subtitle">Choose when the meeting will take place</p>
                  </div>
                </div>
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
                <div className="section-header">
                  <div className="section-header-text">
                    <h4>Location</h4>
                    <p className="section-subtitle">Choose where the meeting will be held</p>
                  </div>
                </div>
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
                <div className="section-header">
                  <div className="section-header-text">
                    <h4>Additional Information</h4>
                    <p className="section-subtitle">Add meeting description and agenda details</p>
                  </div>
                </div>
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

              {/* Meeting Summary */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-header-text">
                    <h4>Meeting Summary</h4>
                    <p className="section-subtitle">Review all meeting details before scheduling</p>
                  </div>
                </div>
                <div className="meeting-summary">
                  <div className="summary-content">
                    <div className="summary-item">
                      <strong>Students ({selectedStudents.length}):</strong>
                      <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
                        {selectedStudents.map((student) => (
                          <li key={student.id}>
                            {student.name} ({student.id})
                          </li>
                        ))}
                      </ul>
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
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* Action Buttons */}
          {selectedStudents.length > 0 && (
            <div className="tab-content">
              <div className="section-header">
                <div className="section-header-text">
                  <h3>Schedule Actions</h3>
                  <p className="section-subtitle">Schedule the meeting with selected students</p>
                </div>
              </div>
              <div className="action-buttons">
                <button
                  className="primary-action-btn"
                  onClick={() => handleSubmit()}
                  disabled={!meetingData.date || !meetingData.time}
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
