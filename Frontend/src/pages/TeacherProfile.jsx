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
              <div className="section-header">
                <h3>Current Courses</h3>
                <p className="section-subtitle">Manage your course assignments and track student progress</p>
              </div>
              <div className="content-grid">
                <div className="content-card">
                  <div className="card-header">
                    <div className="course-badge academic">CSE 408</div>
                    <div className="course-meta">
                      <h4>Software Development</h4>
                      <span className="section-badge">Section A</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="info-row">
                      <span className="info-label">📅 Schedule:</span>
                      <span className="info-value">Sunday, Tuesday - 10:00 AM - 11:30 AM</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">👥 Students:</span>
                      <span className="info-value">45 enrolled</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">🏫 Room:</span>
                      <span className="info-value">Room 301</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="action-btn primary">View Students</button>
                    <button className="action-btn secondary">Manage Grades</button>
                    <button className="action-btn secondary">Attendance</button>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-header">
                    <div className="course-badge workshop">CSE 412</div>
                    <div className="course-meta">
                      <h4>Machine Learning</h4>
                      <span className="section-badge">Section B</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="info-row">
                      <span className="info-label">📅 Schedule:</span>
                      <span className="info-value">Monday, Wednesday - 2:00 PM - 3:30 PM</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">👥 Students:</span>
                      <span className="info-value">38 enrolled</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">🏫 Room:</span>
                      <span className="info-value">Room 205</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="action-btn primary">View Students</button>
                    <button className="action-btn secondary">Manage Grades</button>
                    <button className="action-btn secondary">Attendance</button>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-header">
                    <div className="course-badge technology">CSE 498</div>
                    <div className="course-meta">
                      <h4>Thesis Supervision</h4>
                      <span className="section-badge">Research</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="info-row">
                      <span className="info-label">👥 Students:</span>
                      <span className="info-value">8 supervised</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">📅 Meetings:</span>
                      <span className="info-value">By Appointment</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">🏫 Location:</span>
                      <span className="info-value">Room 402 / Online</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="action-btn primary">View Students</button>
                    <button className="action-btn secondary">Progress Reports</button>
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
              <div className="section-header">
                <h3>Research Activities</h3>
                <p className="section-subtitle">Current projects, publications, and research initiatives</p>
              </div>

              <div className="research-subsection">
                <h4>Current Research Projects</h4>
                <div className="content-grid">
                  <div className="content-card research-card">
                    <div className="card-header">
                      <div className="status-badge active">Active</div>
                      <div className="project-meta">
                        <h4>Deep Learning for Medical Image Analysis</h4>
                        <p className="project-period">January 2023 - December 2025</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">💰 Funding:</span>
                        <span className="info-value">NSF Grant - $125,000</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">🤝 Collaborators:</span>
                        <span className="info-value">Dr. John Smith (Medical College), Dr. Jane Doe (Engineering Dept)</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card research-card">
                    <div className="card-header">
                      <div className="status-badge active">Active</div>
                      <div className="project-meta">
                        <h4>Natural Language Processing for Bengali Text</h4>
                        <p className="project-period">March 2024 - February 2026</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">💰 Funding:</span>
                        <span className="info-value">University Research Grant - $50,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="research-subsection">
                <h4>Recent Publications</h4>
                <div className="content-grid">
                  <div className="content-card publication-card">
                    <div className="card-header">
                      <div className="publication-badge journal">Journal</div>
                      <div className="publication-meta">
                        <h4>"Advanced Deep Learning Techniques for Medical Diagnosis"</h4>
                        <p className="publication-venue">IEEE Transactions on Medical Imaging</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📅 Year:</span>
                        <span className="info-value">2024</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">📊 Impact Factor:</span>
                        <span className="info-value">8.5</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card publication-card">
                    <div className="card-header">
                      <div className="publication-badge conference">Conference</div>
                      <div className="publication-meta">
                        <h4>"Bengali Text Classification using Transformer Models"</h4>
                        <p className="publication-venue">EMNLP 2023</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📅 Year:</span>
                        <span className="info-value">2023</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">📈 Citations:</span>
                        <span className="info-value">23</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card publication-card">
                    <div className="card-header">
                      <div className="publication-badge journal">Journal</div>
                      <div className="publication-meta">
                        <h4>"Computer Vision Applications in Healthcare"</h4>
                        <p className="publication-venue">Pattern Recognition Letters</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📅 Year:</span>
                        <span className="info-value">2023</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">📊 Impact Factor:</span>
                        <span className="info-value">4.2</span>
                      </div>
                    </div>
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
              <div className="section-header">
                <h3>Student Management</h3>
                <p className="section-subtitle">Track thesis progress and manage research assistants</p>
              </div>

              <div className="students-subsection">
                <h4>Thesis Students</h4>
                <div className="content-grid">
                  <div className="content-card student-card">
                    <div className="card-header">
                      <div className="progress-badge high">75%</div>
                      <div className="student-meta">
                        <h4>Mohammad Rahman</h4>
                        <p className="student-id">CSE-2020-1001</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📝 Thesis Topic:</span>
                        <span className="info-value">Machine Learning for Stock Price Prediction</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">📈 Progress:</span>
                        <span className="info-value">75% Complete</span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="action-btn primary">View Progress</button>
                      <button className="action-btn secondary" onClick={() => onNavigate("schedule-meeting")}>
                        Schedule Meeting
                      </button>
                    </div>
                  </div>
                  <div className="content-card student-card">
                    <div className="card-header">
                      <div className="progress-badge medium">60%</div>
                      <div className="student-meta">
                        <h4>Fatima Khan</h4>
                        <p className="student-id">CSE-2020-1015</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📝 Thesis Topic:</span>
                        <span className="info-value">Natural Language Processing for Bengali</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">📈 Progress:</span>
                        <span className="info-value">60% Complete</span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="action-btn primary">View Progress</button>
                      <button className="action-btn secondary" onClick={() => onNavigate("schedule-meeting")}>
                        Schedule Meeting
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="students-subsection">
                <h4>Research Assistants</h4>
                <div className="content-grid">
                  <div className="content-card student-card">
                    <div className="card-header">
                      <div className="role-badge assistant">RA</div>
                      <div className="student-meta">
                        <h4>Ahmed Hassan</h4>
                        <p className="student-id">CSE-2021-1025</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">🔬 Research Area:</span>
                        <span className="info-value">Deep Learning</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">⏰ Duration:</span>
                        <span className="info-value">6 months</span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="action-btn primary">View Details</button>
                      <button className="action-btn secondary">Assign Tasks</button>
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
              <div className="section-header">
                <h3>Weekly Schedule</h3>
                <p className="section-subtitle">View your teaching schedule and meeting commitments</p>
              </div>
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
              <div className="section-header">
                <h3>Administrative Duties</h3>
                <p className="section-subtitle">Committee memberships and administrative responsibilities</p>
              </div>

              <div className="admin-subsection">
                <h4>Committee Memberships</h4>
                <div className="content-grid">
                  <div className="content-card admin-card">
                    <div className="card-header">
                      <div className="role-badge member">Member</div>
                      <div className="committee-meta">
                        <h4>Curriculum Development Committee</h4>
                        <p className="meeting-schedule">First Wednesday of every month</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">🎯 Responsibilities:</span>
                        <span className="info-value">Review and update course curricula, evaluate new course proposals</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card admin-card">
                    <div className="card-header">
                      <div className="role-badge chair">Co-Chair</div>
                      <div className="committee-meta">
                        <h4>Admissions Committee</h4>
                        <p className="meeting-schedule">Bi-weekly during admission season</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">🎯 Responsibilities:</span>
                        <span className="info-value">Review graduate applications, conduct interviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card admin-card">
                    <div className="card-header">
                      <div className="role-badge member">Member</div>
                      <div className="committee-meta">
                        <h4>Research Ethics Committee</h4>
                        <p className="meeting-schedule">As needed</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">🎯 Responsibilities:</span>
                        <span className="info-value">Review research proposals for ethical compliance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-subsection">
                <h4>Current Administrative Tasks</h4>
                <div className="content-grid">
                  <div className="content-card task-card">
                    <div className="card-header">
                      <div className="status-badge progress">In Progress</div>
                      <div className="task-meta">
                        <h4>Graduate Application Reviews</h4>
                        <p className="task-deadline">Deadline: March 30, 2024</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📊 Progress:</span>
                        <span className="info-value">15/25 applications reviewed</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card task-card">
                    <div className="card-header">
                      <div className="status-badge pending">Pending</div>
                      <div className="task-meta">
                        <h4>Course Curriculum Update - CSE 412</h4>
                        <p className="task-deadline">Deadline: April 15, 2024</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📋 Status:</span>
                        <span className="info-value">Pending committee approval</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card task-card">
                    <div className="card-header">
                      <div className="status-badge todo">To Do</div>
                      <div className="task-meta">
                        <h4>Faculty Performance Evaluations</h4>
                        <p className="task-deadline">Deadline: May 1, 2024</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📋 Status:</span>
                        <span className="info-value">Not started</span>
                      </div>
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
    <div className="teacher-profile-page">
      <div className="teacher-profile-container">
        {/* Header Section - Consistent with Notices */}
        <div className="teacher-profile-header">
          <h1 className="profile-title">{teacherData.name}</h1>
          <p className="profile-subtitle">
            {teacherData.designation} • {teacherData.department}
          </p>
        </div>

        {/* Profile Info Section */}
        <div className="profile-info-section">
          <div className="profile-avatar-section">
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
          </div>
          <div className="profile-details-section">
            <h2 className="teacher-name">{teacherData.name}</h2>
            <p className="teacher-designation">{teacherData.designation}</p>
            <p className="teacher-department">{teacherData.department}</p>
            <div className="profile-meta">
              <span className="meta-item">📧 {teacherData.email}</span>
              <span className="meta-item">📞 {teacherData.phone}</span>
              <span className="meta-item">🏢 {teacherData.officeRoom}</span>
            </div>
          </div>
          <div className="profile-actions-section">
            <button className="primary-action-btn" onClick={onEditProfile}>
              Edit Profile
            </button>
            <button
              className="secondary-action-btn"
              onClick={() => onNavigate("schedule-meeting")}
            >
              Schedule Meeting
            </button>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="profile-navigation-section">
          <button
            className={`profile-nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "research" ? "active" : ""}`}
            onClick={() => setActiveTab("research")}
          >
            Research
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "schedule" ? "active" : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule
          </button>
          <button
            className={`profile-nav-tab ${
              activeTab === "administrative" ? "active" : ""
            }`}
            onClick={() => setActiveTab("administrative")}
          >
            Administrative
          </button>
          <button
            className={`profile-nav-tab ${
              activeTab === "quick-actions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("quick-actions")}
          >
            Quick Actions
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content-section">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default TeacherProfile;
