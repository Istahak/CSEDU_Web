import React, { useState } from "react";
import "./AdminProfile.css";
import Dashboard from "../components/admin/Dashboard";
import FacultyManagement from "../components/admin/FacultyManagement";
import FacultyModal from "../components/admin/FacultyModal";
import CourseManagement from "../components/admin/CourseManagement";
import CourseModal from "../components/admin/CourseModal";
import NoticeManagement from "../components/admin/NoticeManagement";
import NoticeModal from "../components/admin/NoticeModal";
import AchievementManagement from "../components/admin/AchievementManagement";
import AchievementModal from "../components/admin/AchievementModal";
import EventManagement from "../components/admin/EventManagement";
import RequestManagement from "../components/admin/RequestManagement";
import RegistrationModal from "../components/admin/RegistrationModal";
import AdminProfileSettings from "../components/admin/AdminProfileSettings";
import TaskManagement from "../components/admin/TaskManagement";
import TaskModal from "../components/admin/TaskModal";

const AdminProfile = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminData, setAdminData] = useState({
    name: "System Administrator",
    email: "admin@csedu.edu.bd",
    role: "System Administrator",
    department: "Computer Science & Engineering",
    phone: "+880-2-9661900",
    joinDate: "2020-01-15",
    adminId: "ADMIN-001",
    profileImage: "",
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
      description:
        "This course introduces fundamental programming concepts using Python language.",
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
    // Additional notices...
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
    // Additional achievements...
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Tech Conference 2024",
      description:
        "Join us for the most exciting technology conference of the year.",
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
      registrations: [
        {
          id: 1,
          studentId: "CSE-2020-001",
          name: "Alice Johnson",
          email: "alice@student.edu.bd",
          phone: "+880-1234-567890",
          year: "3rd Year",
          department: "CSE",
          registrationDate: "2024-02-15",
          paymentStatus: "paid",
          paymentMethod: "bkash",
          transactionId: "TXN123456",
          attendance: "present",
          certificate: "issued",
        },
        {
          id: 2,
          studentId: "CSE-2021-002",
          name: "Bob Wilson",
          email: "bob@student.edu.bd",
          phone: "+880-1234-567891",
          year: "2nd Year",
          department: "CSE",
          registrationDate: "2024-02-18",
          paymentStatus: "pending",
          paymentMethod: "",
          transactionId: "",
          attendance: "absent",
          certificate: "pending",
        },
        {
          id: 3,
          studentId: "CSE-2019-003",
          name: "Charlie Brown",
          email: "charlie@student.edu.bd",
          phone: "+880-1234-567892",
          year: "4th Year",
          department: "CSE",
          registrationDate: "2024-02-20",
          paymentStatus: "paid",
          paymentMethod: "nagad",
          transactionId: "NGD789012",
          attendance: "registered",
          certificate: "pending",
        },
      ],
    },
    {
      id: 2,
      title: "Programming Contest 2024",
      description: "Annual programming competition for students.",
      category: "Competition",
      date: "2024-04-20",
      time: "10:00",
      endTime: "16:00",
      venue: "Computer Lab 1, CSE Building",
      capacity: 100,
      registrationFee: 0,
      status: "active",
      registrationOpen: true,
      registrationDeadline: "2024-04-15",
      organizer: "Dr. Sarah Davis",
      contact: "sarah.d@csedu.edu.bd",
      registrations: [
        {
          id: 4,
          studentId: "CSE-2021-004",
          name: "David Smith",
          email: "david@student.edu.bd",
          phone: "+880-1234-567893",
          year: "2nd Year",
          department: "CSE",
          registrationDate: "2024-03-01",
          paymentStatus: "free",
          paymentMethod: "",
          transactionId: "",
          attendance: "registered",
          certificate: "pending",
        },
      ],
    },
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "Faculty Application",
      applicantName: "Dr. Emily Johnson",
      applicantEmail: "emily.johnson@email.com",
      subject: "Application for Assistant Professor Position",
      description:
        "I am applying for the Assistant Professor position in Computer Science Department. I have completed my PhD in Machine Learning from Stanford University and have 5 years of industry experience at Google AI.",
      status: "pending",
      priority: "high",
      submissionDate: "2024-12-15",
      department: "CSE",
      category: "HR",
      attachments: [
        { name: "CV.pdf", size: "2.5MB", type: "application/pdf" },
        { name: "Cover_Letter.pdf", size: "150KB", type: "application/pdf" },
        { name: "Certificates.pdf", size: "3.2MB", type: "application/pdf" },
      ],
      additionalInfo: {
        position: "Assistant Professor",
        experience: "5 years",
        qualifications: "PhD in Machine Learning",
        expectedSalary: "80,000 BDT",
      },
    },
    {
      id: 2,
      type: "Course Enrollment",
      applicantName: "Ahmed Rahman",
      applicantEmail: "ahmed.rahman@student.edu.bd",
      subject: "Request for Late Course Enrollment - CSE-401",
      description:
        "I missed the regular enrollment deadline due to medical reasons. I have attached medical certificates and would like to enroll in Advanced Database Systems course.",
      status: "under_review",
      priority: "medium",
      submissionDate: "2024-12-14",
      department: "CSE",
      category: "Academic",
      attachments: [
        {
          name: "Medical_Certificate.pdf",
          size: "800KB",
          type: "application/pdf",
        },
        {
          name: "Previous_Transcript.pdf",
          size: "1.2MB",
          type: "application/pdf",
        },
      ],
      additionalInfo: {
        courseCode: "CSE-401",
        courseName: "Advanced Database Systems",
        semester: "Spring 2024",
        reason: "Medical Emergency",
      },
    },
    {
      id: 3,
      type: "Event Registration",
      applicantName: "Sarah Wilson",
      applicantEmail: "sarah.wilson@student.edu.bd",
      subject: "Special Registration for Tech Conference 2024",
      description:
        "I am a final year student and would like to register for the Annual Tech Conference. I understand the registration is closed but I am willing to volunteer.",
      status: "approved",
      priority: "low",
      submissionDate: "2024-12-13",
      department: "CSE",
      category: "Events",
      attachments: [
        { name: "Student_ID.pdf", size: "300KB", type: "application/pdf" },
      ],
      additionalInfo: {
        eventId: 1,
        eventName: "Annual Tech Conference 2024",
        volunteerRole: "Registration Desk Assistant",
      },
      reviewedBy: "System Administrator",
      reviewedDate: "2024-12-14",
      adminNotes: "Approved as volunteer for registration desk.",
    },
    {
      id: 4,
      type: "Grade Appeal",
      applicantName: "Michael Chen",
      applicantEmail: "michael.chen@student.edu.bd",
      subject: "Grade Appeal for CSE-305 Final Exam",
      description:
        "I believe there was an error in grading my final exam for Data Structures and Algorithms course. I would like to request a review of my answer sheet.",
      status: "rejected",
      priority: "medium",
      submissionDate: "2024-12-12",
      department: "CSE",
      category: "Academic",
      attachments: [
        { name: "Exam_Copy.pdf", size: "5.2MB", type: "application/pdf" },
        {
          name: "Supporting_Documents.pdf",
          size: "1.8MB",
          type: "application/pdf",
        },
      ],
      additionalInfo: {
        courseCode: "CSE-305",
        courseName: "Data Structures and Algorithms",
        currentGrade: "B",
        expectedGrade: "A-",
        instructor: "Dr. John Smith",
      },
      reviewedBy: "System Administrator",
      reviewedDate: "2024-12-13",
      adminNotes:
        "After review, the grading was found to be correct. Appeal rejected.",
    },
    {
      id: 5,
      type: "Research Proposal",
      applicantName: "Dr. Robert Taylor",
      applicantEmail: "robert.taylor@faculty.edu.bd",
      subject: "Research Grant Application - AI in Healthcare",
      description:
        "Submitting research proposal for AI in Healthcare project. Requesting funding approval and lab resource allocation for the next academic year.",
      status: "pending",
      priority: "high",
      submissionDate: "2024-12-10",
      department: "CSE",
      category: "Research",
      attachments: [
        {
          name: "Research_Proposal.pdf",
          size: "8.5MB",
          type: "application/pdf",
        },
        {
          name: "Budget_Plan.xlsx",
          size: "150KB",
          type: "application/vnd.ms-excel",
        },
        {
          name: "Literature_Review.pdf",
          size: "12.3MB",
          type: "application/pdf",
        },
      ],
      additionalInfo: {
        fundingAmount: "500,000 BDT",
        duration: "2 years",
        collaborators: ["Dr. Jane Doe", "Dr. Mark Johnson"],
        equipment: "GPU Cluster, Medical Imaging Software",
      },
    },
    {
      id: 6,
      type: "Facility Booking",
      applicantName: "Student Council",
      applicantEmail: "council@student.edu.bd",
      subject: "Booking Request for Seminar Hall - Programming Contest",
      description:
        "We need to book the main seminar hall for organizing Inter-University Programming Contest on March 20th, 2024.",
      status: "under_review",
      priority: "medium",
      submissionDate: "2024-12-11",
      department: "CSE",
      category: "Administrative",
      attachments: [
        { name: "Event_Proposal.pdf", size: "2.1MB", type: "application/pdf" },
        { name: "Sponsor_Letters.pdf", size: "3.5MB", type: "application/pdf" },
      ],
      additionalInfo: {
        facility: "Main Seminar Hall",
        date: "2024-03-20",
        duration: "8 hours",
        expectedParticipants: "150 students",
        equipment: "Projector, Sound System, Wi-Fi",
      },
    },
  ]);

  // Task Assignment Management
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Update Course Curriculum",
      description:
        "Review and update the CSE-101 course curriculum according to new industry standards",
      assignedTo: "Dr. John Smith",
      facultyId: 1,
      category: "Academic",
      priority: "high",
      status: "assigned",
      assignedDate: "2024-12-10",
      dueDate: "2024-12-25",
      estimatedHours: 15,
      progress: 30,
      notes: "Initial review completed, waiting for feedback from industry partners",
      assignedBy: "System Administrator",
    },
    {
      id: 2,
      title: "Organize Research Seminar",
      description:
        "Plan and organize the quarterly research seminar for faculty and graduate students",
      assignedTo: "Dr. Sarah Davis",
      facultyId: 2,
      category: "Administrative",
      priority: "medium",
      status: "in_progress",
      assignedDate: "2024-12-05",
      dueDate: "2024-12-30",
      estimatedHours: 20,
      progress: 60,
      notes: "Venue booked, speakers confirmed, working on promotional materials",
      assignedBy: "System Administrator",
    },
    {
      id: 3,
      title: "Review Graduate Applications",
      description:
        "Review and evaluate graduate school applications for Spring 2025 semester",
      assignedTo: "Dr. John Smith",
      facultyId: 1,
      category: "Administrative",
      priority: "high",
      status: "completed",
      assignedDate: "2024-11-15",
      dueDate: "2024-12-01",
      estimatedHours: 25,
      progress: 100,
      notes: "All applications reviewed and recommendations submitted",
      assignedBy: "System Administrator",
      completedDate: "2024-11-28",
    },
    {
      id: 4,
      title: "Equipment Maintenance Supervision",
      description:
        "Supervise the annual maintenance of computer lab equipment",
      assignedTo: "Dr. Robert Taylor",
      facultyId: 3,
      category: "Technical",
      priority: "medium",
      status: "pending",
      assignedDate: "2024-12-12",
      dueDate: "2025-01-15",
      estimatedHours: 10,
      progress: 0,
      notes: "Waiting for maintenance schedule confirmation",
      assignedBy: "System Administrator",
    },
  ]);

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showArchivedNotices, setShowArchivedNotices] = useState(false);
  const [showArchivedAchievements, setShowArchivedAchievements] =
    useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState(
    []
  );
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedFacultyForTask, setSelectedFacultyForTask] = useState(null);
  const [requestFilter, setRequestFilter] = useState("all");
  const [taskFilter, setTaskFilter] = useState("all");

  // Handler functions
  const generateEmployeeId = () => {
    const year = new Date().getFullYear();
    const count = users.filter((user) => user.role === "faculty").length + 1;
    return `CSE-${year}-${String(count).padStart(3, "0")}`;
  };

  const handleAddFaculty = (facultyData) => {
    const newFaculty = {
      id: Date.now(), // Simple ID generation for demo
      ...facultyData,
      employeeId: generateEmployeeId(),
    };
    setUsers([...users, newFaculty]);
    setShowFacultyModal(false);
    setEditingFaculty(null);
  };

  const handleEditFaculty = (facultyData) => {
    setUsers(
      users.map((user) =>
        user.id === editingFaculty.id ? { ...user, ...facultyData } : user
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

  const generateCourseId = () => {
    return `COURSE-${Date.now()}`;
  };

  const handleAddCourse = (courseData) => {
    const newCourse = {
      id: Date.now(), // Simple ID generation for demo
      ...courseData,
    };
    setCourses([...courses, newCourse]);
    setShowCourseModal(false);
    setEditingCourse(null);
  };

  const handleEditCourse = (courseData) => {
    setCourses(
      courses.map((course) =>
        course.id === editingCourse.id ? { ...course, ...courseData } : course
      )
    );
    setShowCourseModal(false);
    setEditingCourse(null);
  };

  const handleCourseStatusChange = (courseId, newStatus) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== courseId));
    }
  };

  const handleNoticeStatusChange = (noticeId, newStatus) => {
    setNotices(
      notices.map((notice) =>
        notice.id === noticeId ? { ...notice, status: newStatus } : notice
      )
    );
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

  const handleDeleteNotice = (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter((notice) => notice.id !== noticeId));
    }
  };

  const handleAddNotice = (noticeData) => {
    const newNotice = {
      id: Date.now(), // Simple ID generation for demo
      ...noticeData,
    };
    setNotices([...notices, newNotice]);
    setShowNoticeModal(false);
    setEditingNotice(null);
  };

  const handleEditNotice = (noticeData) => {
    setNotices(
      notices.map((notice) =>
        notice.id === editingNotice.id ? { ...notice, ...noticeData } : notice
      )
    );
    setShowNoticeModal(false);
    setEditingNotice(null);
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

  const handleDeleteAchievement = (achievementId) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      setAchievements(
        achievements.filter((achievement) => achievement.id !== achievementId)
      );
    }
  };

  const handleAddAchievement = (achievementData) => {
    const newAchievement = {
      id: Date.now(), // Simple ID generation for demo
      ...achievementData,
    };
    setAchievements([...achievements, newAchievement]);
    setShowAchievementModal(false);
    setEditingAchievement(null);
  };

  const handleEditAchievement = (achievementData) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === editingAchievement.id
          ? { ...achievement, ...achievementData }
          : achievement
      )
    );
    setShowAchievementModal(false);
    setEditingAchievement(null);
  };

  const handleEditEvent = (eventId, eventData) => {
    if (eventId) {
      // Edit existing event
      setEvents(
        events.map((event) =>
          event.id === eventId ? { ...event, ...eventData } : event
        )
      );
    } else {
      // Add new event
      setEvents([...events, eventData]);
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const handleIssueCertificate = (eventId, registrationId) => {
    // Certificate issuance logic would go here
  };

  const handleUpdatePaymentStatus = (
    eventId,
    registrationId,
    paymentStatus
  ) => {
    // Payment status update logic would go here
  };

  const handleMarkAttendance = (eventId, registrationId, attendance) => {
    // Attendance marking logic would go here
  };

  const handleEventStatusChange = (eventId, newStatus) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
  };

  const handleToggleRegistration = (eventId) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? { ...event, registrationOpen: !event.registrationOpen }
          : event
      )
    );
  };

  const handleViewRegistrations = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setSelectedEventRegistrations(event.registrations || []);
      setShowRegistrationModal(true);
    }
  };

  const handleRequestAction = (requestId, action, adminNotes = "") => {
    setRequests(
      requests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: action,
              adminNotes,
              reviewedDate: new Date().toISOString().split("T")[0],
              reviewedBy: adminData.name,
            }
          : request
      )
    );
    setShowRequestModal(false);
    setSelectedRequest(null);
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleDeleteRequest = (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setRequests(requests.filter((request) => request.id !== requestId));
    }
  };

  // Task Management Functions
  const handleAssignTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      assignedDate: new Date().toISOString().split("T")[0],
      assignedBy: adminData.name,
      status: "assigned",
      progress: 0,
    };
    setTasks([...tasks, newTask]);
    setShowTaskModal(false);
    setEditingTask(null);
    setSelectedFacultyForTask(null);
  };

  const handleEditTask = (taskData) => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...taskData } : task
      )
    );
    setShowTaskModal(false);
    setEditingTask(null);
    setSelectedFacultyForTask(null);
  };

  const handleTaskStatusChange = (taskId, newStatus, additionalData = {}) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              ...(newStatus === "completed" && {
                completedDate: new Date().toISOString().split("T")[0],
              }),
              ...additionalData,
            }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const getFilteredTasks = () => {
    if (taskFilter === "all") return tasks;
    return tasks.filter((task) => task.status === taskFilter);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const assigned = tasks.filter((t) => t.status === "assigned").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    const overdue = tasks.filter((t) => {
      const dueDate = new Date(t.dueDate);
      const today = new Date();
      return dueDate < today && t.status !== "completed";
    }).length;

    return { total, assigned, inProgress, completed, pending, overdue };
  };

  // Placeholder function for Profile tab
  const renderProfile = () => (
    <AdminProfileSettings adminData={adminData} setAdminData={setAdminData} />
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            adminData={adminData}
            stats={stats}
            setActiveTab={setActiveTab}
          />
        );
      case "users":
        return (
          <FacultyManagement
            users={users}
            setShowFacultyModal={setShowFacultyModal}
            setEditingFaculty={setEditingFaculty}
            handleDeleteFaculty={handleDeleteFaculty}
          />
        );
      case "courses":
        return (
          <CourseManagement
            courses={courses}
            setShowCourseModal={setShowCourseModal}
            handleCourseStatusChange={handleCourseStatusChange}
            setEditingCourse={setEditingCourse}
            handleDeleteCourse={handleDeleteCourse}
          />
        );
      case "notices":
        return (
          <NoticeManagement
            notices={notices}
            showArchivedNotices={showArchivedNotices}
            setShowArchivedNotices={setShowArchivedNotices}
            setShowNoticeModal={setShowNoticeModal}
            handleNoticeStatusChange={handleNoticeStatusChange}
            setEditingNotice={setEditingNotice}
            handleArchiveNotice={handleArchiveNotice}
            handleDeleteNotice={handleDeleteNotice}
            handleRestoreNotice={handleRestoreNotice}
          />
        );
      case "achievements":
        return (
          <AchievementManagement
            achievements={achievements}
            showArchivedAchievements={showArchivedAchievements}
            setShowArchivedAchievements={setShowArchivedAchievements}
            setShowAchievementModal={setShowAchievementModal}
            handleAchievementStatusChange={handleAchievementStatusChange}
            setEditingAchievement={setEditingAchievement}
            handleArchiveAchievement={handleArchiveAchievement}
            handleDeleteAchievement={handleDeleteAchievement}
            handleRestoreAchievement={handleRestoreAchievement}
          />
        );
      case "events":
        return (
          <EventManagement
            events={events}
            showRegistrationModal={showRegistrationModal}
            setShowRegistrationModal={setShowRegistrationModal}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            selectedEventRegistrations={selectedEventRegistrations}
            setSelectedEventRegistrations={setSelectedEventRegistrations}
            handleEditEvent={handleEditEvent}
            handleDeleteEvent={handleDeleteEvent}
            handleEventStatusChange={handleEventStatusChange}
            handleToggleRegistration={handleToggleRegistration}
            handleViewRegistrations={handleViewRegistrations}
            handleIssueCertificate={handleIssueCertificate}
            handleUpdatePaymentStatus={handleUpdatePaymentStatus}
            handleMarkAttendance={handleMarkAttendance}
            adminData={adminData}
          />
        );
      case "requests":
        return (
          <RequestManagement
            requests={requests}
            getFilteredRequests={getFilteredRequests}
            getRequestStats={getRequestStats}
            requestFilter={requestFilter}
            setRequestFilter={setRequestFilter}
            handleViewRequest={handleViewRequest}
            handleRequestAction={handleRequestAction}
            handleDeleteRequest={handleDeleteRequest}
            selectedRequest={selectedRequest}
            showRequestModal={showRequestModal}
            setShowRequestModal={setShowRequestModal}
            adminData={adminData}
          />
        );
      case "tasks":
        return (
          <TaskManagement
            tasks={tasks}
            users={users}
            getFilteredTasks={getFilteredTasks}
            getTaskStats={getTaskStats}
            taskFilter={taskFilter}
            setTaskFilter={setTaskFilter}
            setShowTaskModal={setShowTaskModal}
            setEditingTask={setEditingTask}
            setSelectedFacultyForTask={setSelectedFacultyForTask}
            handleTaskStatusChange={handleTaskStatusChange}
            handleDeleteTask={handleDeleteTask}
            adminData={adminData}
          />
        );
      case "profile":
        return renderProfile();
      default:
        return (
          <Dashboard
            adminData={adminData}
            stats={stats}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-content">
        <div className="admin-sidebar">
          <div className="admin-info">
            <div className="admin-avatar">
              {adminData.profileImage ? (
                <img
                  src={adminData.profileImage}
                  alt={adminData.name}
                  className="admin-avatar-image"
                />
              ) : (
                "👨‍💼"
              )}
            </div>
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
              className={`nav-item ${
                activeTab === "achievements" ? "active" : ""
              }`}
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
              className={`nav-item ${activeTab === "tasks" ? "active" : ""}`}
              onClick={() => setActiveTab("tasks")}
            >
              ✅ Task Assignment
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

      {showFacultyModal && (
        <FacultyModal
          isOpen={showFacultyModal}
          onClose={() => {
            setShowFacultyModal(false);
            setEditingFaculty(null);
          }}
          onSave={editingFaculty ? handleEditFaculty : handleAddFaculty}
          editingFaculty={editingFaculty}
        />
      )}

      {showCourseModal && (
        <CourseModal
          isOpen={showCourseModal}
          onClose={() => {
            setShowCourseModal(false);
            setEditingCourse(null);
          }}
          onSave={editingCourse ? handleEditCourse : handleAddCourse}
          editingCourse={editingCourse}
        />
      )}

      {showNoticeModal && (
        <NoticeModal
          isOpen={showNoticeModal}
          onClose={() => {
            setShowNoticeModal(false);
            setEditingNotice(null);
          }}
          onSave={editingNotice ? handleEditNotice : handleAddNotice}
          editingNotice={editingNotice}
        />
      )}

      {showAchievementModal && (
        <AchievementModal
          isOpen={showAchievementModal}
          onClose={() => {
            setShowAchievementModal(false);
            setEditingAchievement(null);
          }}
          onSave={
            editingAchievement ? handleEditAchievement : handleAddAchievement
          }
          editingAchievement={editingAchievement}
        />
      )}

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

      {showTaskModal && (
        <TaskModal
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
            setSelectedFacultyForTask(null);
          }}
          onSave={editingTask ? handleEditTask : handleAssignTask}
          editingTask={editingTask}
          selectedFaculty={selectedFacultyForTask}
          facultyList={users.filter((user) => user.role === "faculty")}
        />
      )}
    </div>
  );
};

export default AdminProfile;
