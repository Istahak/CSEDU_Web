import React, { useState } from "react";
import "./TeacherProfile.css";

const TeacherProfile = ({
  onBack,
  teacherData: propTeacherData,
  onEditProfile,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const teacherData = propTeacherData || {
    name: "Dr. Sarah Wilson",
    facultyId: "CSEDU-FAC-001",
    email: "sarah.wilson@csedu.ac.bd",
    phone: "+880 1987 654321",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    specialization: "Machine Learning, Artificial Intelligence",
    officeRoom: "Room 402, CSEDU Building",
    officeHours: "Sunday-Thursday: 10:00 AM - 12:00 PM",
    joiningDate: "January 15, 2018",
    education: "PhD in Computer Science, Stanford University",
    experience: "8 years",
    researchInterests:
      "Deep Learning, Natural Language Processing, Computer Vision",
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="tab-content">
            <div className="overview-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{teacherData.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Faculty ID:</span>
                  <span className="value">{teacherData.facultyId}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{teacherData.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{teacherData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Designation:</span>
                  <span className="value">{teacherData.designation}</span>
                </div>
                <div className="info-item">
                  <span className="label">Department:</span>
                  <span className="value">{teacherData.department}</span>
                </div>
                <div className="info-item">
                  <span className="label">Specialization:</span>
                  <span className="value">{teacherData.specialization}</span>
                </div>
                <div className="info-item">
                  <span className="label">Office Room:</span>
                  <span className="value">{teacherData.officeRoom}</span>
                </div>
                <div className="info-item">
                  <span className="label">Office Hours:</span>
                  <span className="value">{teacherData.officeHours}</span>
                </div>
                <div className="info-item">
                  <span className="label">Joining Date:</span>
                  <span className="value">{teacherData.joiningDate}</span>
                </div>
                <div className="info-item">
                  <span className="label">Education:</span>
                  <span className="value">{teacherData.education}</span>
                </div>
                <div className="info-item">
                  <span className="label">Experience:</span>
                  <span className="value">{teacherData.experience}</span>
                </div>
                <div className="info-item">
                  <span className="label">Research Interests:</span>
                  <span className="value">{teacherData.researchInterests}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "courses":
        return (
          <div className="tab-content">
            <div className="courses-section">
              <h3>Current Courses</h3>
              <div className="course-list">
                <div className="course-item">
                  <div className="course-header">
                    <h4>CSE 408 - Software Development</h4>
                    <span className="course-code">Section A</span>
                  </div>
                  <p>
                    <strong>Schedule:</strong> Sunday, Tuesday - 10:00 AM -
                    11:30 AM
                  </p>
                  <p>
                    <strong>Students Enrolled:</strong> 45
                  </p>
                  <p>
                    <strong>Room:</strong> Room 301
                  </p>
                  <div className="course-actions">
                    <button className="action-btn primary">
                      View Students
                    </button>
                    <button className="action-btn secondary">
                      Manage Grades
                    </button>
                    <button className="action-btn secondary">Attendance</button>
                  </div>
                </div>
                <div className="course-item">
                  <div className="course-header">
                    <h4>CSE 412 - Machine Learning</h4>
                    <span className="course-code">Section B</span>
                  </div>
                  <p>
                    <strong>Schedule:</strong> Monday, Wednesday - 2:00 PM -
                    3:30 PM
                  </p>
                  <p>
                    <strong>Students Enrolled:</strong> 38
                  </p>
                  <p>
                    <strong>Room:</strong> Room 205
                  </p>
                  <div className="course-actions">
                    <button className="action-btn primary">
                      View Students
                    </button>
                    <button className="action-btn secondary">
                      Manage Grades
                    </button>
                    <button className="action-btn secondary">Attendance</button>
                  </div>
                </div>
                <div className="course-item">
                  <div className="course-header">
                    <h4>CSE 498 - Thesis Supervision</h4>
                    <span className="course-code">Research</span>
                  </div>
                  <p>
                    <strong>Students Supervised:</strong> 8
                  </p>
                  <p>
                    <strong>Meeting Schedule:</strong> By Appointment
                  </p>
                  <div className="course-actions">
                    <button className="action-btn primary">
                      View Students
                    </button>
                    <button className="action-btn secondary">
                      Progress Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "research":
        return (
          <div className="tab-content">
            <div className="research-section">
              <h3>Research Activities</h3>

              <div className="research-subsection">
                <h4>Current Research Projects</h4>
                <div className="research-list">
                  <div className="research-item">
                    <h5>Deep Learning for Medical Image Analysis</h5>
                    <p>
                      <strong>Funding:</strong> NSF Grant - $125,000
                    </p>
                    <p>
                      <strong>Duration:</strong> January 2023 - December 2025
                    </p>
                    <p>
                      <strong>Collaborators:</strong> Dr. John Smith (Medical
                      College), Dr. Jane Doe (Engineering Dept)
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="status-active">Active</span>
                    </p>
                  </div>
                  <div className="research-item">
                    <h5>Natural Language Processing for Bengali Text</h5>
                    <p>
                      <strong>Funding:</strong> University Research Grant -
                      $50,000
                    </p>
                    <p>
                      <strong>Duration:</strong> March 2024 - February 2026
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="status-active">Active</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="research-subsection">
                <h4>Recent Publications</h4>
                <div className="publication-list">
                  <div className="publication-item">
                    <h5>
                      "Advanced Deep Learning Techniques for Medical Diagnosis"
                    </h5>
                    <p>
                      <strong>Journal:</strong> IEEE Transactions on Medical
                      Imaging
                    </p>
                    <p>
                      <strong>Year:</strong> 2024
                    </p>
                    <p>
                      <strong>Impact Factor:</strong> 8.5
                    </p>
                  </div>
                  <div className="publication-item">
                    <h5>
                      "Bengali Text Classification using Transformer Models"
                    </h5>
                    <p>
                      <strong>Conference:</strong> EMNLP 2023
                    </p>
                    <p>
                      <strong>Year:</strong> 2023
                    </p>
                    <p>
                      <strong>Citations:</strong> 23
                    </p>
                  </div>
                  <div className="publication-item">
                    <h5>"Computer Vision Applications in Healthcare"</h5>
                    <p>
                      <strong>Journal:</strong> Pattern Recognition Letters
                    </p>
                    <p>
                      <strong>Year:</strong> 2023
                    </p>
                    <p>
                      <strong>Impact Factor:</strong> 4.2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "students":
        return (
          <div className="tab-content">
            <div className="students-section">
              <h3>Student Management</h3>

              <div className="students-subsection">
                <h4>Thesis Students</h4>
                <div className="student-list">
                  <div className="student-item">
                    <div className="student-info">
                      <h5>Mohammad Rahman</h5>
                      <p>
                        <strong>Student ID:</strong> CSE-2020-1001
                      </p>
                      <p>
                        <strong>Thesis Topic:</strong> Machine Learning for
                        Stock Price Prediction
                      </p>
                      <p>
                        <strong>Progress:</strong> 75%
                      </p>
                    </div>
                    <div className="student-actions">
                      <button className="action-btn primary">
                        View Progress
                      </button>
                      <button
                        className="action-btn secondary"
                        onClick={() => onNavigate("schedule-meeting")}
                      >
                        Schedule Meeting
                      </button>
                    </div>
                  </div>
                  <div className="student-item">
                    <div className="student-info">
                      <h5>Fatima Khan</h5>
                      <p>
                        <strong>Student ID:</strong> CSE-2020-1015
                      </p>
                      <p>
                        <strong>Thesis Topic:</strong> Natural Language
                        Processing for Bengali
                      </p>
                      <p>
                        <strong>Progress:</strong> 60%
                      </p>
                    </div>
                    <div className="student-actions">
                      <button className="action-btn primary">
                        View Progress
                      </button>
                      <button
                        className="action-btn secondary"
                        onClick={() => onNavigate("schedule-meeting")}
                      >
                        Schedule Meeting
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="students-subsection">
                <h4>Research Assistants</h4>
                <div className="student-list">
                  <div className="student-item">
                    <div className="student-info">
                      <h5>Ahmed Hassan</h5>
                      <p>
                        <strong>Student ID:</strong> CSE-2021-1025
                      </p>
                      <p>
                        <strong>Research Area:</strong> Deep Learning
                      </p>
                      <p>
                        <strong>Duration:</strong> 6 months
                      </p>
                    </div>
                    <div className="student-actions">
                      <button className="action-btn primary">
                        View Details
                      </button>
                      <button className="action-btn secondary">
                        Assign Tasks
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "schedule":
        return (
          <div className="tab-content">
            <div className="schedule-section">
              <h3>Weekly Schedule</h3>
              <div className="schedule-grid">
                <div className="schedule-header">
                  <div className="time-slot">Time</div>
                  <div className="day-slot">Sunday</div>
                  <div className="day-slot">Monday</div>
                  <div className="day-slot">Tuesday</div>
                  <div className="day-slot">Wednesday</div>
                  <div className="day-slot">Thursday</div>
                </div>

                <div className="schedule-row">
                  <div className="time-slot">9:00-10:30</div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 408</strong>
                      <span>Room 301</span>
                    </div>
                  </div>
                  <div className="schedule-cell">
                    <div className="meeting-item">
                      <strong>Research Meeting</strong>
                      <span>Lab 201</span>
                    </div>
                  </div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 408</strong>
                      <span>Room 301</span>
                    </div>
                  </div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 412</strong>
                      <span>Room 205</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                </div>

                <div className="schedule-row">
                  <div className="time-slot">10:30-12:00</div>
                  <div className="schedule-cell">
                    <div className="office-hours">
                      <strong>Office Hours</strong>
                      <span>Room 402</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="office-hours">
                      <strong>Office Hours</strong>
                      <span>Room 402</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="office-hours">
                      <strong>Office Hours</strong>
                      <span>Room 402</span>
                    </div>
                  </div>
                </div>

                <div className="schedule-row">
                  <div className="time-slot">2:00-3:30</div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 412</strong>
                      <span>Room 205</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 412</strong>
                      <span>Room 205</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                </div>

                <div className="schedule-row">
                  <div className="time-slot">3:30-5:00</div>
                  <div className="schedule-cell">
                    <div className="committee-item">
                      <strong>Faculty Meeting</strong>
                      <span>Conference Room</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="committee-item">
                      <strong>Curriculum Committee</strong>
                      <span>Conference Room</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "administrative":
        return (
          <div className="tab-content">
            <div className="administrative-section">
              <h3>Administrative Duties</h3>

              <div className="admin-subsection">
                <h4>Committee Memberships</h4>
                <div className="committee-list">
                  <div className="committee-item">
                    <h5>Curriculum Development Committee</h5>
                    <p>
                      <strong>Role:</strong> Member
                    </p>
                    <p>
                      <strong>Responsibilities:</strong> Review and update
                      course curricula, evaluate new course proposals
                    </p>
                    <p>
                      <strong>Meeting Schedule:</strong> First Wednesday of
                      every month
                    </p>
                  </div>
                  <div className="committee-item">
                    <h5>Admissions Committee</h5>
                    <p>
                      <strong>Role:</strong> Co-Chair
                    </p>
                    <p>
                      <strong>Responsibilities:</strong> Review graduate
                      applications, conduct interviews
                    </p>
                    <p>
                      <strong>Meeting Schedule:</strong> Bi-weekly during
                      admission season
                    </p>
                  </div>
                  <div className="committee-item">
                    <h5>Research Ethics Committee</h5>
                    <p>
                      <strong>Role:</strong> Member
                    </p>
                    <p>
                      <strong>Responsibilities:</strong> Review research
                      proposals for ethical compliance
                    </p>
                    <p>
                      <strong>Meeting Schedule:</strong> As needed
                    </p>
                  </div>
                </div>
              </div>

              <div className="admin-subsection">
                <h4>Current Administrative Tasks</h4>
                <div className="task-list">
                  <div className="task-item">
                    <div className="task-info">
                      <h5>Graduate Application Reviews</h5>
                      <p>
                        <strong>Deadline:</strong> March 30, 2024
                      </p>
                      <p>
                        <strong>Progress:</strong> 15/25 applications reviewed
                      </p>
                    </div>
                    <div className="task-status">
                      <span className="status-progress">In Progress</span>
                    </div>
                  </div>
                  <div className="task-item">
                    <div className="task-info">
                      <h5>Course Curriculum Update - CSE 412</h5>
                      <p>
                        <strong>Deadline:</strong> April 15, 2024
                      </p>
                      <p>
                        <strong>Status:</strong> Pending committee approval
                      </p>
                    </div>
                    <div className="task-status">
                      <span className="status-pending">Pending</span>
                    </div>
                  </div>
                  <div className="task-item">
                    <div className="task-info">
                      <h5>Faculty Performance Evaluations</h5>
                      <p>
                        <strong>Deadline:</strong> May 1, 2024
                      </p>
                      <p>
                        <strong>Status:</strong> Not started
                      </p>
                    </div>
                    <div className="task-status">
                      <span className="status-todo">To Do</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "quick-actions":
        return (
          <div className="tab-content">
            <div className="quick-actions-section">
              <h3>Quick Actions</h3>
              <p className="section-description">
                Access frequently used teacher tools and functions
              </p>

              <div className="actions-grid">
                <div className="action-category">
                  <h4>📚 Course Management</h4>
                  <div className="action-buttons">
                    <button
                      className="quick-action-btn"
                      onClick={() =>
                        onNavigate
                          ? onNavigate("grade-assignment")
                          : alert("Grade Assignment - Coming Soon!")
                      }
                    >
                      <span className="btn-icon">📝</span>
                      <span className="btn-text">
                        <strong>Assign Grades</strong>
                        <small>Grade student assignments and exams</small>
                      </span>
                    </button>
                    <button
                      className="quick-action-btn"
                      onClick={() =>
                        onNavigate
                          ? onNavigate("mark-attendance")
                          : alert("Attendance Management - Coming Soon!")
                      }
                    >
                      <span className="btn-icon">✅</span>
                      <span className="btn-text">
                        <strong>Mark Attendance</strong>
                        <small>Record student attendance</small>
                      </span>
                    </button>
                    <button
                      className="quick-action-btn"
                      onClick={() =>
                        onNavigate
                          ? onNavigate("create-assignment")
                          : alert("Assignment Creation - Coming Soon!")
                      }
                    >
                      <span className="btn-icon">📄</span>
                      <span className="btn-text">
                        <strong>Create Assignment</strong>
                        <small>Create new assignments and projects</small>
                      </span>
                    </button>
                    <button
                      className="quick-action-btn"
                      onClick={() => onNavigate("upload-materials")}
                    >
                      <span className="btn-icon">📖</span>
                      <span className="btn-text">
                        <strong>Upload Materials</strong>
                        <small>Add course materials and resources</small>
                      </span>
                    </button>
                    <button
                      className="quick-action-btn"
                      onClick={() => onNavigate("reserve-room")}
                    >
                      <span className="btn-icon">🏛️</span>
                      <span className="btn-text">
                        <strong>Reserve Room</strong>
                        <small>Book classrooms and facilities</small>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="teacher-profile">
      <div className="profile-container">
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back to Dashboard
          </button>
        )}

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <img
                src="/api/placeholder/120/120"
                alt="Profile"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="avatar-placeholder">👩‍🏫</div>
            </div>
            <div className="profile-details">
              <h1>{teacherData.name}</h1>
              <p className="profile-title">{teacherData.designation}</p>
              <p className="profile-department">{teacherData.department}</p>
              <div className="profile-meta">
                <span className="meta-item">📧 {teacherData.email}</span>
                <span className="meta-item">📞 {teacherData.phone}</span>
                <span className="meta-item">🏢 {teacherData.officeRoom}</span>
              </div>
            </div>
            <div className="profile-actions">
              <button className="edit-profile-btn" onClick={onEditProfile}>
                Edit Profile
              </button>
              <button
                className="action-btn secondary"
                onClick={() => onNavigate("schedule-meeting")}
              >
                � Schedule Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="profile-nav">
          <button
            className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
          <button
            className={`nav-tab ${activeTab === "research" ? "active" : ""}`}
            onClick={() => setActiveTab("research")}
          >
            Research
          </button>
          <button
            className={`nav-tab ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`nav-tab ${activeTab === "schedule" ? "active" : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule
          </button>
          <button
            className={`nav-tab ${
              activeTab === "administrative" ? "active" : ""
            }`}
            onClick={() => setActiveTab("administrative")}
          >
            Administrative
          </button>
          <button
            className={`nav-tab ${
              activeTab === "quick-actions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("quick-actions")}
          >
            Quick Actions
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default TeacherProfile;
