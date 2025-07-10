import React, { useState } from "react";
import "./AdminProfile.css";
import Dashboard from '../components/admin/Dashboard';
import FacultyManagement from '../components/admin/FacultyManagement';
import CourseManagement from '../components/admin/CourseManagement';
import NoticeManagement from '../components/admin/NoticeManagement';
import AchievementManagement from '../components/admin/AchievementManagement';
import EventManagement from '../components/admin/EventManagement';
import RequestManagement from '../components/admin/RequestManagement';
import RegistrationModal from '../components/admin/RegistrationModal';

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
    pendingRequests: 3,
    totalRequests: 6,
  });

  // Sample data - in a real app, this would come from an API
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
    // Additional sample users would be here in a real implementation
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
      description: "This course introduces fundamental programming concepts using Python language.",
      prerequisites: "None",
      maxStudents: 50,
      schedule: "Mon, Wed, Fri 10:00-11:00 AM",
      location: "Room 101, Building A",
      department: "CSE",
      duration: "3 months",
      difficulty: "Beginner",
    },
    // Additional sample courses would be here
  ]);

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Semester Registration Open",
      content: "Fall 2024 semester registration is now open. Please complete your registration by July 15th.",
      category: "Academic",
      priority: "high",
      publishDate: "2024-07-01",
      expiryDate: "2024-07-15",
      status: "published",
      author: "Admin",
      attachments: [],
    },
    // Additional notices...
  ]);

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Best Research Paper Award",
      description: "Dr. John Smith received the Best Research Paper Award at the International Conference on AI.",
      category: "Research",
      recipientName: "Dr. John Smith",
      recipientType: "faculty",
      awardDate: "2024-06-15",
      awardingOrganization: "International Conference on AI",
      imageUrl: "",
      status: "published",
      featured: true,
    },
    // Additional achievements...
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Tech Conference 2024",
      description: "Join us for the most exciting technology conference of the year.",
      category: "Conference",
      date: "2024-03-15",
      time: "09:00",
      endTime: "17:00", 
      venue: "Main Auditorium, CSE Building",
      capacity: 200,
      registrationFee: 500,
      status: "active",
      registrationOpen: true,
      registrationDeadline: "2024-03-10",
      organizer: "Dr. John Smith",
      contact: "john.smith@csedu.edu.bd",
      registrations: [],
    },
    // Additional events...
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "Faculty Application",
      applicantName: "Dr. Emily Johnson",
      applicantEmail: "emily.johnson@email.com",
      subject: "Application for Assistant Professor Position",
      description: "I am applying for the Assistant Professor position.",
      status: "pending",
      priority: "high",
      submissionDate: "2024-12-15",
      department: "CSE",
      category: "HR",
      attachments: [],
    },
    // Additional requests...
  ]);

  // Modal states
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showArchivedNotices, setShowArchivedNotices] = useState(false);
  const [showArchivedAchievements, setShowArchivedAchievements] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState([]);

  // Handler functions
  const handleUserStatusChange = (userId, newStatus) => {
    setUsers(users.map((user) => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleDeleteFaculty = (facultyId) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      setUsers(users.filter((user) => user.id !== facultyId));
    }
  };

  const handleCourseStatusChange = (courseId, newStatus) => {
    setCourses(courses.map((course) => 
      course.id === courseId ? { ...course, status: newStatus } : course
    ));
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== courseId));
    }
  };

  const handleNoticeStatusChange = (noticeId, newStatus) => {
    setNotices(notices.map((notice) => 
      notice.id === noticeId ? { ...notice, status: newStatus } : notice
    ));
  };

  const handleArchiveNotice = (noticeId) => {
    setNotices(notices.map((notice) => 
      notice.id === noticeId ? { ...notice, status: "archived" } : notice
    ));
  };

  const handleRestoreNotice = (noticeId) => {
    setNotices(notices.map((notice) => 
      notice.id === noticeId ? { ...notice, status: "published" } : notice
    ));
  };

  const handleDeleteNotice = (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter((notice) => notice.id !== noticeId));
    }
  };

  const handleAchievementStatusChange = (achievementId, newStatus) => {
    setAchievements(achievements.map((achievement) => 
      achievement.id === achievementId ? { ...achievement, status: newStatus } : achievement
    ));
  };

  const handleArchiveAchievement = (achievementId) => {
    setAchievements(achievements.map((achievement) => 
      achievement.id === achievementId ? { ...achievement, status: "archived" } : achievement
    ));
  };

  const handleRestoreAchievement = (achievementId) => {
    setAchievements(achievements.map((achievement) => 
      achievement.id === achievementId ? { ...achievement, status: "published" } : achievement
    ));
  };

  const handleDeleteAchievement = (achievementId) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      setAchievements(achievements.filter((achievement) => achievement.id !== achievementId));
    }
  };

  const handleEditEvent = (eventId, eventData) => {
    setEvents(events.map((event) => 
      event.id === eventId ? { ...event, ...eventData } : event
    ));
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const handleIssueCertificate = (eventId, registrationId) => {
    // Certificate issuance logic would go here
  };

  const handleUpdatePaymentStatus = (eventId, registrationId, paymentStatus) => {
    // Payment status update logic would go here
  };

  const handleMarkAttendance = (eventId, registrationId, attendance) => {
    // Attendance marking logic would go here
  };

  const handleRequestAction = (requestId, action, adminNotes = "") => {
    setRequests(requests.map((request) => 
      request.id === requestId ? { 
        ...request, 
        status: action, 
        adminNotes, 
        reviewedDate: new Date().toISOString().split("T")[0],
        reviewedBy: adminData.name,
      } : request
    ));
  };

  // Placeholder functions for Settings and Profile tabs
  const renderSettings = () => (
    <div className="settings-section">
      <h2>System Settings</h2>
      <p>Settings management interface would be implemented here.</p>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <h2>Admin Profile</h2>
      <p>Profile management interface would be implemented here.</p>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard adminData={adminData} stats={stats} setActiveTab={setActiveTab} />;
      case "users":
        return <FacultyManagement 
          users={users} 
          setShowFacultyModal={setShowFacultyModal} 
          handleUserStatusChange={handleUserStatusChange} 
          setEditingFaculty={setEditingFaculty} 
          handleDeleteFaculty={handleDeleteFaculty} 
        />;
      case "courses":
        return <CourseManagement 
          courses={courses} 
          setShowCourseModal={setShowCourseModal} 
          handleCourseStatusChange={handleCourseStatusChange} 
          setEditingCourse={setEditingCourse} 
          handleDeleteCourse={handleDeleteCourse} 
        />;
      case "notices":
        return <NoticeManagement 
          notices={notices} 
          showArchivedNotices={showArchivedNotices} 
          setShowArchivedNotices={setShowArchivedNotices} 
          setShowNoticeModal={setShowNoticeModal} 
          handleNoticeStatusChange={handleNoticeStatusChange} 
          setEditingNotice={setEditingNotice} 
          handleArchiveNotice={handleArchiveNotice} 
          handleDeleteNotice={handleDeleteNotice} 
          handleRestoreNotice={handleRestoreNotice} 
        />;
      case "achievements":
        return <AchievementManagement 
          achievements={achievements} 
          showArchivedAchievements={showArchivedAchievements} 
          setShowArchivedAchievements={setShowArchivedAchievements} 
          setShowAchievementModal={setShowAchievementModal} 
          handleAchievementStatusChange={handleAchievementStatusChange} 
          setEditingAchievement={setEditingAchievement} 
          handleArchiveAchievement={handleArchiveAchievement} 
          handleDeleteAchievement={handleDeleteAchievement} 
          handleRestoreAchievement={handleRestoreAchievement} 
        />;
      case "events":
        return <EventManagement
          events={events}
          showRegistrationModal={showRegistrationModal}
          setShowRegistrationModal={setShowRegistrationModal}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          selectedEventRegistrations={selectedEventRegistrations}
          setSelectedEventRegistrations={setSelectedEventRegistrations}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
          handleIssueCertificate={handleIssueCertificate}
          handleUpdatePaymentStatus={handleUpdatePaymentStatus}
          handleMarkAttendance={handleMarkAttendance}
          adminData={adminData}
        />;
      case "requests":
        return <RequestManagement
          requests={requests}
          handleRequestAction={handleRequestAction}
          adminData={adminData}
        />;
      case "settings":
        return renderSettings();
      case "profile":
        return renderProfile();
      default:
        return <Dashboard adminData={adminData} stats={stats} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-content">
        <div className="admin-sidebar">
          <div className="admin-info">
            <div className="admin-avatar">👨‍💼</div>
            <h3>{adminData.name}</h3>
            <p>{adminData.role}</p>
          </div>

          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-item ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              👨‍🏫 Faculty Management
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
              className={`nav-item ${activeTab === "achievements" ? "active" : ""}`}
              onClick={() => setActiveTab("achievements")}
            >
              🏆 Achievement Management
            </button>
            <button
              className={`nav-item ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              📅 Event Management
            </button>
            <button
              className={`nav-item ${activeTab === "requests" ? "active" : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              📋 Request Management
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
            <button className="logout-btn nav-item" onClick={onLogout}>
              🚪 Logout
            </button>
          </nav>
        </div>

        <div className="admin-main">{renderTabContent()}</div>
      </div>

      {showRegistrationModal && (
        <RegistrationModal
          selectedEvent={selectedEvent}
          selectedEventRegistrations={selectedEventRegistrations}
          setSelectedEventRegistrations={setSelectedEventRegistrations}
          setShowRegistrationModal={setShowRegistrationModal}
          handleEditEvent={handleEditEvent}
          handleIssueCertificate={handleIssueCertificate}
          handleUpdatePaymentStatus={handleUpdatePaymentStatus}
          handleMarkAttendance={handleMarkAttendance}
        />
      )}
    </div>
  );
};

export default AdminProfile;
