import React, { useState } from "react";
import "./AdminProfile.css";

const AdminProfile = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminData, setAdminData] = useState({
    name: "System Administrator",
    email: "admin@csedu.edu.bd",
    role: "System Administrator",
    department: "Computer Science & Engineering",
    phone: "+880-2-9661900",
    joinDate: "2020-01-15",
    permissions: [
      "Faculty Management",
      "Content Management",
      "Course Management",
      "System Settings",
      "Analytics",
      "Database Management",
    ],
  });

  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalFaculty: 45,
    totalStudents: 1200,
    totalCourses: 120,
    activeProjects: 35,
    pendingApprovals: 12,
    totalNotices: 85,
    upcomingEvents: 8,
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@csedu.edu.bd",
      role: "faculty",
      status: "active",
      department: "CSE",
      designation: "Professor",
      phone: "+880-1234-567890",
      joinDate: "2015-08-15",
      specialization: "Artificial Intelligence, Machine Learning",
      qualifications: "PhD in Computer Science",
      officeRoom: "Room 301, Building A",
      researchAreas: ["AI", "ML", "Data Science"],
      publications: 45,
      experience: "15 years",
      employeeId: "CSE-2015-001",
      profileImage: "",
    },
    {
      id: 2,
      name: "Dr. Sarah Davis",
      email: "sarah.d@csedu.edu.bd",
      role: "faculty",
      status: "active",
      department: "CSE",
      designation: "Associate Professor",
      phone: "+880-1234-567891",
      joinDate: "2018-01-10",
      specialization: "Software Engineering, Database Systems",
      qualifications: "PhD in Software Engineering",
      officeRoom: "Room 205, Building A",
      researchAreas: ["Software Engineering", "Database Systems"],
      publications: 28,
      experience: "12 years",
      employeeId: "CSE-2018-002",
      profileImage: "",
    },
    {
      id: 3,
      name: "Dr. Mike Johnson",
      email: "mike.j@csedu.edu.bd",
      role: "faculty",
      status: "active",
      department: "CSE",
      designation: "Assistant Professor",
      phone: "+880-1234-567892",
      joinDate: "2020-09-01",
      specialization: "Computer Networks, Cybersecurity",
      qualifications: "PhD in Computer Networks",
      officeRoom: "Room 102, Building B",
      researchAreas: ["Computer Networks", "Cybersecurity"],
      publications: 15,
      experience: "8 years",
      employeeId: "CSE-2020-003",
      profileImage: "",
    },
    {
      id: 4,
      name: "Dr. Jane Wilson",
      email: "jane.w@csedu.edu.bd",
      role: "faculty",
      status: "inactive",
      department: "CSE",
      designation: "Lecturer",
      phone: "+880-1234-567893",
      joinDate: "2021-02-15",
      specialization: "Web Development, Human-Computer Interaction",
      qualifications: "PhD in Human-Computer Interaction",
      officeRoom: "Room 105, Building B",
      researchAreas: ["HCI", "Web Technologies"],
      publications: 8,
      experience: "5 years",
      employeeId: "CSE-2021-004",
      profileImage: "",
    },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CSE-101",
      title: "Introduction to Programming",
      instructor: "Dr. John Smith",
      students: 45,
      status: "active",
      credits: 3,
      semester: "Fall",
      year: 2024,
      description:
        "This course introduces fundamental programming concepts using Python language.",
      prerequisites: "None",
      maxStudents: 50,
      schedule: "Mon, Wed, Fri 10:00-11:00 AM",
      location: "Room 101, Building A",
      syllabus:
        "Variables, Data Types, Control Structures, Functions, Arrays, Basic Algorithms",
      department: "CSE",
      courseImage: "",
      duration: "3 months",
      difficulty: "Beginner",
      language: "English",
      assessmentMethods:
        "Assignments (30%), Quizzes (20%), Midterm (25%), Final Exam (25%)",
      learningOutcomes:
        "Students will learn basic programming concepts and problem-solving skills",
      textbooks: "Python Programming: An Introduction to Computer Science",
      references: "Online Python documentation, coding practice platforms",
    },
    {
      id: 2,
      code: "CSE-205",
      title: "Data Structures",
      instructor: "Dr. Sarah Davis",
      students: 38,
      status: "active",
      credits: 3,
      semester: "Spring",
      year: 2024,
      description:
        "Study of fundamental data structures and their applications in problem solving.",
      prerequisites: "CSE-101",
      maxStudents: 45,
      schedule: "Tue, Thu 2:00-3:30 PM",
      location: "Room 205, Building A",
      syllabus:
        "Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Searching, Sorting",
      department: "CSE",
      courseImage: "",
      duration: "4 months",
      difficulty: "Intermediate",
      language: "English",
      assessmentMethods:
        "Programming Assignments (40%), Tests (30%), Final Project (30%)",
      learningOutcomes:
        "Master various data structures and their efficient implementation",
      textbooks: "Data Structures and Algorithms in Java",
      references: "Algorithm design manuals, competitive programming resources",
    },
    {
      id: 3,
      code: "CSE-301",
      title: "Database Systems",
      instructor: "Dr. Mike Johnson",
      students: 42,
      status: "active",
      credits: 3,
      semester: "Fall",
      year: 2024,
      description:
        "Comprehensive study of database design, implementation, and management.",
      prerequisites: "CSE-205",
      maxStudents: 50,
      schedule: "Mon, Wed 1:00-2:30 PM",
      location: "Room 301, Building B",
      syllabus:
        "ER Models, Normalization, SQL, Transactions, Concurrency Control",
      department: "CSE",
      courseImage: "",
      duration: "4 months",
      difficulty: "Intermediate",
      language: "English",
      assessmentMethods:
        "Database Projects (50%), Quizzes (25%), Final Exam (25%)",
      learningOutcomes: "Design and implement efficient database systems",
      textbooks: "Database System Concepts by Silberschatz",
      references: "MySQL documentation, PostgreSQL guides",
    },
    {
      id: 4,
      code: "CSE-405",
      title: "Software Engineering",
      instructor: "Dr. Jane Wilson",
      students: 35,
      status: "active",
      credits: 3,
      semester: "Spring",
      year: 2024,
      description:
        "Software development lifecycle, methodologies, and project management.",
      prerequisites: "CSE-301",
      maxStudents: 40,
      schedule: "Tue, Thu 11:00-12:30 PM",
      location: "Room 405, Building B",
      syllabus:
        "SDLC, Agile, Testing, Documentation, Version Control, Project Management",
      department: "CSE",
      courseImage: "",
      duration: "4 months",
      difficulty: "Advanced",
      language: "English",
      assessmentMethods:
        "Group Project (60%), Individual Assignments (25%), Presentation (15%)",
      learningOutcomes:
        "Develop large-scale software systems using industry best practices",
      textbooks: "Software Engineering: A Practitioner's Approach",
      references:
        "Agile methodologies, DevOps practices, industry case studies",
    },
  ]);

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    studentPortal: true,
    facultyPortal: true,
    backupSchedule: "daily",
    sessionTimeout: 30,
    maxFileSize: 10,
  });

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Semester Registration Open",
      content:
        "Fall 2024 semester registration is now open. Please complete your registration by July 15th.",
      category: "Academic",
      priority: "high",
      publishDate: "2024-07-01",
      expiryDate: "2024-07-15",
      status: "published",
      author: "Admin",
      attachments: [],
    },
    {
      id: 2,
      title: "Lab Equipment Maintenance",
      content: "Computer lab will be closed for maintenance from July 10-12.",
      category: "Facility",
      priority: "medium",
      publishDate: "2024-07-05",
      expiryDate: "2024-07-12",
      status: "published",
      author: "Admin",
      attachments: [],
    },
    {
      id: 3,
      title: "Guest Lecture Series",
      content:
        "Industry experts will be giving lectures on AI and Machine Learning.",
      category: "Event",
      priority: "low",
      publishDate: "2024-07-08",
      expiryDate: "2024-07-20",
      status: "draft",
      author: "Admin",
      attachments: [],
    },
  ]);

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Best Research Paper Award",
      description:
        "Dr. John Smith received the Best Research Paper Award at the International Conference on AI.",
      category: "Research",
      recipientName: "Dr. John Smith",
      recipientType: "faculty",
      awardDate: "2024-06-15",
      awardingOrganization: "International Conference on AI",
      imageUrl: "",
      status: "published",
      featured: true,
    },
    {
      id: 2,
      title: "Programming Contest Champion",
      description:
        "Alice Johnson won 1st place in the National Programming Contest 2024.",
      category: "Competition",
      recipientName: "Alice Johnson",
      recipientType: "student",
      awardDate: "2024-06-20",
      awardingOrganization: "National Programming Contest",
      imageUrl: "",
      status: "published",
      featured: false,
    },
    {
      id: 3,
      title: "Research Grant Received",
      description:
        "Department received a significant research grant for AI development.",
      category: "Grant",
      recipientName: "CSE Department",
      recipientType: "department",
      awardDate: "2024-06-25",
      awardingOrganization: "National Science Foundation",
      imageUrl: "",
      status: "draft",
      featured: true,
    },
  ]);

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showArchivedNotices, setShowArchivedNotices] = useState(false);
  const [showArchivedAchievements, setShowArchivedAchievements] =
    useState(false);

  const handleUserStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  // Faculty Management Functions
  const handleAddFaculty = (facultyData) => {
    const newFaculty = {
      id: users.length + 1,
      ...facultyData,
      role: "faculty",
      employeeId: generateEmployeeId(),
      joinDate: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newFaculty]);
    setShowFacultyModal(false);
  };

  const handleEditFaculty = (facultyId, facultyData) => {
    setUsers(
      users.map((user) =>
        user.id === facultyId ? { ...user, ...facultyData } : user
      )
    );
    setShowFacultyModal(false);
    setEditingFaculty(null);
  };

  const handleDeleteFaculty = (facultyId) => {
    if (
      window.confirm("Are you sure you want to delete this faculty member?")
    ) {
      setUsers(users.filter((user) => user.id !== facultyId));
    }
  };

  const generateEmployeeId = () => {
    const year = new Date().getFullYear();
    const count = users.filter((user) => user.role === "faculty").length + 1;
    return `CSE-${year}-${String(count).padStart(3, "0")}`;
  };

  const handleSettingChange = (setting, value) => {
    setSystemSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  // Notice Management Functions
  const handleAddNotice = (noticeData) => {
    const newNotice = {
      id: notices.length + 1,
      ...noticeData,
      author: "Admin",
      publishDate: new Date().toISOString().split("T")[0],
      attachments: [],
    };
    setNotices([...notices, newNotice]);
    setShowNoticeModal(false);
  };

  const handleEditNotice = (noticeId, noticeData) => {
    setNotices(
      notices.map((notice) =>
        notice.id === noticeId ? { ...notice, ...noticeData } : notice
      )
    );
    setShowNoticeModal(false);
    setEditingNotice(null);
  };

  const handleDeleteNotice = (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter((notice) => notice.id !== noticeId));
    }
  };

  const handleArchiveNotice = (noticeId) => {
    setNotices(
      notices.map((notice) =>
        notice.id === noticeId ? { ...notice, status: "archived" } : notice
      )
    );
  };

  const handleRestoreNotice = (noticeId) => {
    setNotices(
      notices.map((notice) =>
        notice.id === noticeId ? { ...notice, status: "published" } : notice
      )
    );
  };

  const handleNoticeStatusChange = (noticeId, newStatus) => {
    setNotices(
      notices.map((notice) =>
        notice.id === noticeId ? { ...notice, status: newStatus } : notice
      )
    );
  };

  // Achievement Management Functions
  const handleAddAchievement = (achievementData) => {
    const newAchievement = {
      id: achievements.length + 1,
      ...achievementData,
      imageUrl: "",
    };
    setAchievements([...achievements, newAchievement]);
    setShowAchievementModal(false);
  };

  const handleEditAchievement = (achievementId, achievementData) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, ...achievementData }
          : achievement
      )
    );
    setShowAchievementModal(false);
    setEditingAchievement(null);
  };

  const handleDeleteAchievement = (achievementId) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      setAchievements(
        achievements.filter((achievement) => achievement.id !== achievementId)
      );
    }
  };

  const handleArchiveAchievement = (achievementId) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, status: "archived" }
          : achievement
      )
    );
  };

  const handleRestoreAchievement = (achievementId) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, status: "published" }
          : achievement
      )
    );
  };

  const handleAchievementStatusChange = (achievementId, newStatus) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, status: newStatus }
          : achievement
      )
    );
  };

  const renderDashboard = () => (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>CSEDU Admin Dashboard</h2>
        <p>Welcome back, {adminData.name}. Here's your system overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h3>{stats.totalFaculty}</h3>
            <p>Faculty Members</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{stats.totalCourses}</h3>
            <p>Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-info">
            <h3>{stats.activeProjects}</h3>
            <p>Active Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.totalNotices}</h3>
            <p>Published Notices</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setActiveTab("users")}>
            �‍🏫 Manage Faculty
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("courses")}
          >
            📚 Manage Courses
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("notices")}
          >
            📢 Manage Notices
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("achievements")}
          >
            🏆 Manage Achievements
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ System Settings
          </button>
          <button className="action-btn">� Generate Reports</button>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="user-management">
      <div className="section-header">
        <h2>Faculty Management</h2>
        <button
          className="add-user-btn"
          onClick={() => setShowFacultyModal(true)}
        >
          ➕ Add New Faculty
        </button>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Publications</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role === "faculty")
              .map((faculty) => (
                <tr key={faculty.id}>
                  <td>
                    <div className="faculty-photo">
                      {faculty.profileImage ? (
                        <img
                          src={faculty.profileImage}
                          alt={faculty.name}
                          className="faculty-avatar"
                        />
                      ) : (
                        <div className="faculty-avatar-placeholder">👨‍🏫</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <strong>{faculty.employeeId}</strong>
                  </td>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>
                    <span
                      className={`role-badge ${faculty.designation
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {faculty.designation}
                    </span>
                  </td>
                  <td>{faculty.department}</td>
                  <td>
                    <div className="specialization-cell">
                      {faculty.specialization
                        ?.split(",")
                        .slice(0, 2)
                        .map((spec, index) => (
                          <span key={index} className="spec-tag">
                            {spec.trim()}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td>{faculty.experience}</td>
                  <td>{faculty.publications} papers</td>
                  <td>
                    <select
                      value={faculty.status}
                      onChange={(e) =>
                        handleUserStatusChange(faculty.id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingFaculty(faculty);
                        setShowFacultyModal(true);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteFaculty(faculty.id)}
                    >
                      🗑️ Delete
                    </button>
                    <button className="view-btn">👁️ View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCourseManagement = () => (
    <div className="user-management">
      <div className="section-header">
        <h2>Course Management</h2>
        <button
          className="add-user-btn"
          onClick={() => setShowCourseModal(true)}
        >
          ➕ Add New Course
        </button>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Instructor</th>
              <th>Credits</th>
              <th>Students</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>
                  <div className="course-image">
                    {course.courseImage ? (
                      <img
                        src={course.courseImage}
                        alt={course.title}
                        className="course-thumbnail"
                      />
                    ) : (
                      <div className="course-image-placeholder">📚</div>
                    )}
                  </div>
                </td>
                <td>
                  <strong>{course.code}</strong>
                </td>
                <td>
                  <div className="course-title-cell">
                    <strong>{course.title}</strong>
                    <small>{course.department}</small>
                  </div>
                </td>
                <td>{course.instructor}</td>
                <td>{course.credits} credits</td>
                <td>{course.students} students</td>
                <td>{course.duration || "3 months"}</td>
                <td>
                  <select
                    value={course.status}
                    onChange={(e) =>
                      handleCourseStatusChange(course.id, e.target.value)
                    }
                    className="status-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingCourse(course);
                      setShowCourseModal(true);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    🗑️ Delete
                  </button>
                  <button className="view-btn" title="View course details">
                    👁️ View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNoticeManagement = () => {
    const filteredNotices = showArchivedNotices
      ? notices.filter((notice) => notice.status === "archived")
      : notices.filter((notice) => notice.status !== "archived");

    return (
      <div className="user-management">
        <div className="section-header">
          <h2>Notice Management</h2>
          <div className="header-actions">
            <button
              className={`filter-btn ${!showArchivedNotices ? "active" : ""}`}
              onClick={() => setShowArchivedNotices(false)}
            >
              📋 Active Notices
            </button>
            <button
              className={`filter-btn ${showArchivedNotices ? "active" : ""}`}
              onClick={() => setShowArchivedNotices(true)}
            >
              📦 Archived Notices
            </button>
            <button
              className="add-user-btn"
              onClick={() => setShowNoticeModal(true)}
            >
              ➕ Add New Notice
            </button>
          </div>
        </div>

        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Publish Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Attachments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map((notice) => (
                <tr key={notice.id}>
                  <td>
                    <strong>{notice.title}</strong>
                  </td>
                  <td>
                    <span
                      className={`role-badge ${notice.category.toLowerCase()}`}
                    >
                      {notice.category}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge ${notice.priority}`}>
                      {notice.priority}
                    </span>
                  </td>
                  <td>{notice.publishDate}</td>
                  <td>{notice.expiryDate}</td>
                  <td>
                    {!showArchivedNotices ? (
                      <select
                        value={notice.status}
                        onChange={(e) =>
                          handleNoticeStatusChange(notice.id, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    ) : (
                      <span className="status-badge archived">Archived</span>
                    )}
                  </td>
                  <td>
                    {notice.attachments && notice.attachments.length > 0 ? (
                      <span className="attachment-count">
                        📎 {notice.attachments.length} file(s)
                      </span>
                    ) : (
                      <span className="no-attachments">No files</span>
                    )}
                  </td>
                  <td>
                    {!showArchivedNotices ? (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            setEditingNotice(notice);
                            setShowNoticeModal(true);
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="archive-btn"
                          onClick={() => handleArchiveNotice(notice.id)}
                        >
                          📦 Archive
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteNotice(notice.id)}
                        >
                          🗑️ Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="restore-btn"
                          onClick={() => handleRestoreNotice(notice.id)}
                        >
                          🔄 Restore
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteNotice(notice.id)}
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredNotices.length === 0 && (
            <div className="empty-state">
              <p>
                {showArchivedNotices
                  ? "No archived notices found."
                  : "No active notices found."}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAchievementManagement = () => {
    const filteredAchievements = showArchivedAchievements
      ? achievements.filter((achievement) => achievement.status === "archived")
      : achievements.filter((achievement) => achievement.status !== "archived");

    return (
      <div className="user-management">
        <div className="section-header">
          <h2>Achievement Management</h2>
          <div className="header-actions">
            <button
              className={`filter-btn ${
                !showArchivedAchievements ? "active" : ""
              }`}
              onClick={() => setShowArchivedAchievements(false)}
            >
              🏆 Active Achievements
            </button>
            <button
              className={`filter-btn ${
                showArchivedAchievements ? "active" : ""
              }`}
              onClick={() => setShowArchivedAchievements(true)}
            >
              📦 Archived Achievements
            </button>
            <button
              className="add-user-btn"
              onClick={() => setShowAchievementModal(true)}
            >
              ➕ Add New Achievement
            </button>
          </div>
        </div>

        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Recipient</th>
                <th>Category</th>
                <th>Award Date</th>
                <th>Organization</th>
                <th>Status</th>
                <th>Media</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAchievements.map((achievement) => (
                <tr key={achievement.id}>
                  <td>
                    <strong>{achievement.title}</strong>
                  </td>
                  <td>
                    {achievement.recipientName}
                    <br />
                    <small
                      className={`role-badge ${achievement.recipientType}`}
                    >
                      {achievement.recipientType}
                    </small>
                  </td>
                  <td>
                    <span
                      className={`role-badge ${achievement.category.toLowerCase()}`}
                    >
                      {achievement.category}
                    </span>
                  </td>
                  <td>{achievement.awardDate}</td>
                  <td>{achievement.awardingOrganization}</td>
                  <td>
                    {!showArchivedAchievements ? (
                      <>
                        <select
                          value={achievement.status}
                          onChange={(e) =>
                            handleAchievementStatusChange(
                              achievement.id,
                              e.target.value
                            )
                          }
                          className="status-select"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                        {achievement.featured && (
                          <span className="featured-badge">⭐ Featured</span>
                        )}
                      </>
                    ) : (
                      <span className="status-badge archived">Archived</span>
                    )}
                  </td>
                  <td>
                    {achievement.imageUrl ? (
                      <span className="has-media">🖼️ Image</span>
                    ) : (
                      <span className="no-media">No media</span>
                    )}
                  </td>
                  <td>
                    {!showArchivedAchievements ? (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            setEditingAchievement(achievement);
                            setShowAchievementModal(true);
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="archive-btn"
                          onClick={() =>
                            handleArchiveAchievement(achievement.id)
                          }
                        >
                          📦 Archive
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteAchievement(achievement.id)
                          }
                        >
                          🗑️ Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="restore-btn"
                          onClick={() =>
                            handleRestoreAchievement(achievement.id)
                          }
                        >
                          🔄 Restore
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteAchievement(achievement.id)
                          }
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAchievements.length === 0 && (
            <div className="empty-state">
              <p>
                {showArchivedAchievements
                  ? "No archived achievements found."
                  : "No active achievements found."}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="system-settings">
      <h2>System Settings</h2>

      <div className="settings-grid">
        <div className="setting-card">
          <h3>General Settings</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={systemSettings.maintenanceMode}
                onChange={(e) =>
                  handleSettingChange("maintenanceMode", e.target.checked)
                }
              />
              Maintenance Mode
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={systemSettings.userRegistration}
                onChange={(e) =>
                  handleSettingChange("userRegistration", e.target.checked)
                }
              />
              Allow User Registration
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={systemSettings.emailNotifications}
                onChange={(e) =>
                  handleSettingChange("emailNotifications", e.target.checked)
                }
              />
              Email Notifications
            </label>
          </div>
        </div>

        <div className="setting-card">
          <h3>Portal Settings</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={systemSettings.studentPortal}
                onChange={(e) =>
                  handleSettingChange("studentPortal", e.target.checked)
                }
              />
              Student Portal Access
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={systemSettings.facultyPortal}
                onChange={(e) =>
                  handleSettingChange("facultyPortal", e.target.checked)
                }
              />
              Faculty Portal Access
            </label>
          </div>
          <div className="setting-item">
            <label>
              Max File Upload Size (MB):
              <input
                type="number"
                value={systemSettings.maxFileSize}
                onChange={(e) =>
                  handleSettingChange("maxFileSize", parseInt(e.target.value))
                }
              />
            </label>
          </div>
        </div>

        <div className="setting-card">
          <h3>Security Settings</h3>
          <div className="setting-item">
            <label>
              Session Timeout (minutes):
              <input
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange(
                    "sessionTimeout",
                    parseInt(e.target.value)
                  )
                }
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              Backup Schedule:
              <select
                value={systemSettings.backupSchedule}
                onChange={(e) =>
                  handleSettingChange("backupSchedule", e.target.value)
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-btn">💾 Save Changes</button>
        <button className="reset-btn">🔄 Reset to Default</button>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="admin-profile-info">
      <h2>Admin Profile</h2>

      <div className="profile-section">
        <div className="profile-avatar">
          <div className="avatar-circle">👨‍💼</div>
          <button className="change-avatar-btn">Change Avatar</button>
        </div>

        <div className="profile-details">
          <div className="detail-group">
            <label>Full Name</label>
            <input type="text" value={adminData.name} readOnly />
          </div>

          <div className="detail-group">
            <label>Email</label>
            <input type="email" value={adminData.email} readOnly />
          </div>

          <div className="detail-group">
            <label>Role</label>
            <input type="text" value={adminData.role} readOnly />
          </div>

          <div className="detail-group">
            <label>Department</label>
            <input type="text" value={adminData.department} readOnly />
          </div>

          <div className="detail-group">
            <label>Phone</label>
            <input type="tel" value={adminData.phone} readOnly />
          </div>

          <div className="detail-group">
            <label>Join Date</label>
            <input type="text" value={adminData.joinDate} readOnly />
          </div>
        </div>
      </div>

      <div className="permissions-section">
        <h3>Permissions</h3>
        <div className="permissions-list">
          {adminData.permissions.map((permission, index) => (
            <span key={index} className="permission-badge">
              {permission}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const NoticeModal = () => {
    const [formData, setFormData] = useState(
      editingNotice || {
        title: "",
        content: "",
        category: "Academic",
        priority: "medium",
        expiryDate: "",
        status: "draft",
        attachments: [],
      }
    );
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    };

    const handleRemoveFile = (index) => {
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updatedFiles);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const attachments = selectedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file), // In real app, this would be uploaded to server
      }));

      const finalFormData = {
        ...formData,
        attachments: [...(formData.attachments || []), ...attachments],
      };

      if (editingNotice) {
        handleEditNotice(editingNotice.id, finalFormData);
      } else {
        handleAddNotice(finalFormData);
      }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{editingNotice ? "Edit Notice" : "Add New Notice"}</h3>
            <button
              className="close-btn"
              onClick={() => {
                setShowNoticeModal(false);
                setEditingNotice(null);
              }}
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                rows="4"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Academic">Academic</option>
                  <option value="Event">Event</option>
                  <option value="Facility">Facility</option>
                  <option value="Administrative">Administrative</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
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
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Attachments (PDF, Images, Documents)</label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
              />
              <div className="file-upload-info">
                <small>
                  Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                </small>
              </div>
              {selectedFiles.length > 0 && (
                <div className="selected-files">
                  <h4>Selected Files:</h4>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                      <span className="file-name">📎 {file.name}</span>
                      <span className="file-size">
                        ({Math.round(file.size / 1024)} KB)
                      </span>
                      <button
                        type="button"
                        className="remove-file-btn"
                        onClick={() => handleRemoveFile(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {formData.attachments && formData.attachments.length > 0 && (
                <div className="existing-files">
                  <h4>Existing Attachments:</h4>
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="file-item existing">
                      <span className="file-name">📎 {file.name}</span>
                      <span className="file-size">
                        ({Math.round(file.size / 1024)} KB)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowNoticeModal(false);
                  setEditingNotice(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editingNotice ? "Update Notice" : "Create Notice"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AchievementModal = () => {
    const [formData, setFormData] = useState(
      editingAchievement || {
        title: "",
        description: "",
        category: "Research",
        recipientName: "",
        recipientType: "student",
        awardDate: "",
        awardingOrganization: "",
        status: "draft",
        featured: false,
        imageUrl: "",
      }
    );
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(file);
      }
    };

    const handleRemoveImage = () => {
      setSelectedImage(null);
      setFormData({ ...formData, imageUrl: "" });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      let finalFormData = { ...formData };

      if (selectedImage) {
        // In real app, this would be uploaded to server
        finalFormData.imageUrl = URL.createObjectURL(selectedImage);
      }

      if (editingAchievement) {
        handleEditAchievement(editingAchievement.id, finalFormData);
      } else {
        handleAddAchievement(finalFormData);
      }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>
              {editingAchievement ? "Edit Achievement" : "Add New Achievement"}
            </h3>
            <button
              className="close-btn"
              onClick={() => {
                setShowAchievementModal(false);
                setEditingAchievement(null);
              }}
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows="3"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Recipient Name *</label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Recipient Type</label>
                <select
                  value={formData.recipientType}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientType: e.target.value })
                  }
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="department">Department</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Research">Research</option>
                  <option value="Competition">Competition</option>
                  <option value="Grant">Grant</option>
                  <option value="Publication">Publication</option>
                  <option value="Award">Award</option>
                  <option value="Recognition">Recognition</option>
                </select>
              </div>
              <div className="form-group">
                <label>Award Date *</label>
                <input
                  type="date"
                  value={formData.awardDate}
                  onChange={(e) =>
                    setFormData({ ...formData, awardDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Awarding Organization *</label>
              <input
                type="text"
                value={formData.awardingOrganization}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    awardingOrganization: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Achievement Image</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleImageChange}
                className="file-input"
              />
              <div className="file-upload-info">
                <small>Supported formats: JPG, PNG, GIF (Max 5MB)</small>
              </div>
              {selectedImage && (
                <div className="selected-image">
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      style={{ maxWidth: "200px", maxHeight: "150px" }}
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={handleRemoveImage}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              )}
              {formData.imageUrl && !selectedImage && (
                <div className="existing-image">
                  <div className="image-preview">
                    <img
                      src={formData.imageUrl}
                      alt="Current"
                      style={{ maxWidth: "200px", maxHeight: "150px" }}
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={handleRemoveImage}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                  />
                  Featured Achievement
                </label>
              </div>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowAchievementModal(false);
                  setEditingAchievement(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editingAchievement
                  ? "Update Achievement"
                  : "Create Achievement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const CourseModal = () => {
    const [formData, setFormData] = useState(
      editingCourse || {
        code: "",
        title: "",
        instructor: "",
        credits: 3,
        semester: "Fall",
        year: new Date().getFullYear(),
        description: "",
        prerequisites: "",
        maxStudents: 50,
        schedule: "",
        location: "",
        status: "active",
        syllabus: "",
        department: "CSE",
        courseImage: "",
        duration: "3 months",
        difficulty: "Beginner",
        language: "English",
        assessmentMethods: "Assignments, Quizzes, Final Exam",
        learningOutcomes: "",
        textbooks: "",
        references: "",
      }
    );
    const [courseImage, setCourseImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(
      editingCourse?.courseImage || ""
    );

    const handleSubmit = (e) => {
      e.preventDefault();

      let finalFormData = { ...formData };

      // Handle image upload
      if (courseImage) {
        // In real app, this would be uploaded to server
        finalFormData.courseImage = URL.createObjectURL(courseImage);
      }

      if (editingCourse) {
        handleEditCourse(editingCourse.id, finalFormData);
      } else {
        handleAddCourse(finalFormData);
      }
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setCourseImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleRemoveImage = () => {
      setCourseImage(null);
      setImagePreview("");
      setFormData({ ...formData, courseImage: "" });
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content large-modal">
          <div className="modal-header">
            <h3>{editingCourse ? "Edit Course" : "Add New Course"}</h3>
            <button
              className="close-btn"
              onClick={() => {
                setShowCourseModal(false);
                setEditingCourse(null);
              }}
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form course-form">
            <div className="form-section">
              <h4>Course Image</h4>
              <div className="image-upload-section">
                <div className="current-image">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Course Preview"
                      className="course-image-preview"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>📚</span>
                      <p>No course image uploaded</p>
                    </div>
                  )}
                </div>
                <div className="image-controls">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="courseImage"
                    className="file-input"
                  />
                  <label htmlFor="courseImage" className="upload-btn">
                    📷 Upload Course Image
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="remove-btn"
                    >
                      🗑️ Remove Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Basic Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Course Code *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    required
                    placeholder="CSE-101"
                  />
                </div>
                <div className="form-group">
                  <label>Course Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    placeholder="Introduction to Programming"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Instructor *</label>
                  <select
                    value={formData.instructor}
                    onChange={(e) =>
                      setFormData({ ...formData, instructor: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Instructor</option>
                    {users
                      .filter((user) => user.role === "faculty")
                      .map((faculty) => (
                        <option key={faculty.id} value={faculty.name}>
                          {faculty.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Credits</label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: parseInt(e.target.value) || 3,
                      })
                    }
                    min="1"
                    max="6"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Semester</label>
                  <select
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                  >
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year:
                          parseInt(e.target.value) || new Date().getFullYear(),
                      })
                    }
                    min="2020"
                    max="2030"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
                  <select
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  >
                    <option value="3 months">3 months</option>
                    <option value="4 months">4 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Difficulty Level</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Course Details</h4>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Detailed course description and objectives..."
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>Learning Outcomes</label>
                <textarea
                  value={formData.learningOutcomes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      learningOutcomes: e.target.value,
                    })
                  }
                  placeholder="What students will learn from this course..."
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Prerequisites</label>
                <input
                  type="text"
                  value={formData.prerequisites}
                  onChange={(e) =>
                    setFormData({ ...formData, prerequisites: e.target.value })
                  }
                  placeholder="CSE-100, Math-101"
                />
              </div>
              <div className="form-group">
                <label>Syllabus Topics</label>
                <textarea
                  value={formData.syllabus}
                  onChange={(e) =>
                    setFormData({ ...formData, syllabus: e.target.value })
                  }
                  placeholder="List of topics covered in the course..."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Class Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Schedule</label>
                  <input
                    type="text"
                    value={formData.schedule}
                    onChange={(e) =>
                      setFormData({ ...formData, schedule: e.target.value })
                    }
                    placeholder="Mon, Wed, Fri 10:00-11:00 AM"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Room 101, Building A"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Max Students</label>
                  <input
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxStudents: parseInt(e.target.value) || 50,
                      })
                    }
                    min="1"
                    max="200"
                  />
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                  >
                    <option value="English">English</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="EEE">
                      Electrical & Electronic Engineering
                    </option>
                    <option value="CE">Civil Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Assessment & Resources</h4>
              <div className="form-group">
                <label>Assessment Methods</label>
                <textarea
                  value={formData.assessmentMethods}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assessmentMethods: e.target.value,
                    })
                  }
                  placeholder="Assignments (30%), Quizzes (20%), Midterm (25%), Final Exam (25%)"
                  rows="2"
                />
              </div>
              <div className="form-group">
                <label>Required Textbooks</label>
                <textarea
                  value={formData.textbooks}
                  onChange={(e) =>
                    setFormData({ ...formData, textbooks: e.target.value })
                  }
                  placeholder="List of required textbooks..."
                  rows="2"
                />
              </div>
              <div className="form-group">
                <label>References</label>
                <textarea
                  value={formData.references}
                  onChange={(e) =>
                    setFormData({ ...formData, references: e.target.value })
                  }
                  placeholder="Additional reference materials..."
                  rows="2"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowCourseModal(false);
                  setEditingCourse(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editingCourse ? "Update Course" : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const FacultyModal = () => {
    const [formData, setFormData] = useState(
      editingFaculty || {
        name: "",
        email: "",
        designation: "Assistant Professor",
        phone: "",
        specialization: "",
        qualifications: "",
        officeRoom: "",
        researchAreas: "",
        publications: 0,
        experience: "",
        department: "CSE",
        status: "active",
        profileImage: "",
      }
    );
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(
      editingFaculty?.profileImage || ""
    );

    const handleSubmit = (e) => {
      e.preventDefault();

      let finalFormData = { ...formData };

      // Handle research areas as array
      if (typeof formData.researchAreas === "string") {
        finalFormData.researchAreas = formData.researchAreas
          .split(",")
          .map((area) => area.trim());
      }

      // Handle image upload
      if (profileImage) {
        // In real app, this would be uploaded to server
        finalFormData.profileImage = URL.createObjectURL(profileImage);
      }

      if (editingFaculty) {
        handleEditFaculty(editingFaculty.id, finalFormData);
      } else {
        handleAddFaculty(finalFormData);
      }
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfileImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleRemoveImage = () => {
      setProfileImage(null);
      setImagePreview("");
      setFormData({ ...formData, profileImage: "" });
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content large-modal">
          <div className="modal-header">
            <h3>
              {editingFaculty
                ? "Edit Faculty Member"
                : "Add New Faculty Member"}
            </h3>
            <button
              className="close-btn"
              onClick={() => {
                setShowFacultyModal(false);
                setEditingFaculty(null);
              }}
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form faculty-form">
            <div className="form-section">
              <h4>Profile Photo</h4>
              <div className="image-upload-section">
                <div className="current-image">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>👨‍🏫</span>
                      <p>No photo uploaded</p>
                    </div>
                  )}
                </div>
                <div className="image-controls">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="profileImage"
                    className="file-input"
                  />
                  <label htmlFor="profileImage" className="upload-btn">
                    📷 Upload Photo
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="remove-btn"
                    >
                      🗑️ Remove Photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Personal Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    placeholder="john.smith@csedu.edu.bd"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+880-1234-567890"
                  />
                </div>
                <div className="form-group">
                  <label>Office Room</label>
                  <input
                    type="text"
                    value={formData.officeRoom}
                    onChange={(e) =>
                      setFormData({ ...formData, officeRoom: e.target.value })
                    }
                    placeholder="Room 301, Building A"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Professional Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Designation *</label>
                  <select
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    required
                  >
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">
                      Associate Professor
                    </option>
                    <option value="Assistant Professor">
                      Assistant Professor
                    </option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Senior Lecturer">Senior Lecturer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="EEE">
                      Electrical & Electronic Engineering
                    </option>
                    <option value="CE">Civil Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    placeholder="15 years"
                  />
                </div>
                <div className="form-group">
                  <label>Number of Publications</label>
                  <input
                    type="number"
                    value={formData.publications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        publications: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Academic Information</h4>
              <div className="form-group">
                <label>Qualifications</label>
                <textarea
                  value={formData.qualifications}
                  onChange={(e) =>
                    setFormData({ ...formData, qualifications: e.target.value })
                  }
                  placeholder="PhD in Computer Science, MSc in Software Engineering..."
                  rows="2"
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <textarea
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                  placeholder="Artificial Intelligence, Machine Learning, Data Science..."
                  rows="2"
                />
              </div>
              <div className="form-group">
                <label>Research Areas (comma-separated)</label>
                <input
                  type="text"
                  value={
                    typeof formData.researchAreas === "string"
                      ? formData.researchAreas
                      : formData.researchAreas?.join(", ")
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, researchAreas: e.target.value })
                  }
                  placeholder="AI, ML, Data Science, Computer Vision"
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Status</h4>
              <div className="form-group">
                <label>Employment Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowFacultyModal(false);
                  setEditingFaculty(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editingFaculty ? "Update Faculty" : "Add Faculty"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return renderUserManagement();
      case "courses":
        return renderCourseManagement();
      case "notices":
        return renderNoticeManagement();
      case "achievements":
        return renderAchievementManagement();
      case "settings":
        return renderSettings();
      case "profile":
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-header">
        <div className="admin-title">
          <h1>CSEDU Admin Portal</h1>
          <p>Computer Science & Engineering Department Administration</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <div className="admin-info">
            <div className="admin-avatar">👨‍💼</div>
            <h3>{adminData.name}</h3>
            <p>{adminData.role}</p>
          </div>

          <nav className="admin-nav">
            <button
              className={`nav-item ${
                activeTab === "dashboard" ? "active" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-item ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              �‍🏫 Faculty Management
            </button>
            <button
              className={`nav-item ${activeTab === "courses" ? "active" : ""}`}
              onClick={() => setActiveTab("courses")}
            >
              📚 Course Management
            </button>
            <button
              className={`nav-item ${activeTab === "notices" ? "active" : ""}`}
              onClick={() => setActiveTab("notices")}
            >
              📢 Notice Management
            </button>
            <button
              className={`nav-item ${
                activeTab === "achievements" ? "active" : ""
              }`}
              onClick={() => setActiveTab("achievements")}
            >
              🏆 Achievement Management
            </button>
            <button
              className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              ⚙️ Settings
            </button>
            <button
              className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              👤 Profile
            </button>
          </nav>
        </div>

        <div className="admin-main">{renderTabContent()}</div>
      </div>

      {showNoticeModal && <NoticeModal />}
      {showAchievementModal && <AchievementModal />}
      {showFacultyModal && <FacultyModal />}
      {showCourseModal && <CourseModal />}
    </div>
  );
};

export default AdminProfile;
