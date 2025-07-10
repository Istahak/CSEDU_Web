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
    pendingRequests: 3,
    totalRequests: 6,
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
  const [showEventModal, setShowEventModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showArchivedNotices, setShowArchivedNotices] = useState(false);
  const [showArchivedAchievements, setShowArchivedAchievements] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState(
    []
  );

  // Event Management State
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Tech Conference 2024",
      description:
        "Join us for the most exciting technology conference of the year featuring industry leaders, innovative workshops, and networking opportunities.",
      category: "Conference",
      date: "2024-03-15",
      time: "09:00",
      endTime: "17:00",
      venue: "Main Auditorium, CSE Building",
      capacity: 200,
      registrationFee: 500,
      image: "/api/placeholder/300/200",
      status: "active",
      registrationOpen: true,
      registrationDeadline: "2024-03-10",
      organizer: "Dr. John Smith",
      contact: "john.smith@csedu.edu.bd",
      requirements: ["Valid student ID", "Registration fee payment"],
      agenda: [
        { time: "09:00-10:00", topic: "Registration & Welcome" },
        { time: "10:00-11:30", topic: "Keynote: Future of AI" },
        { time: "11:30-12:30", topic: "Workshop: Machine Learning" },
        { time: "14:00-15:30", topic: "Panel Discussion" },
        { time: "15:30-17:00", topic: "Networking Session" },
      ],
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
      ],
    },
    {
      id: 2,
      title: "Coding Competition 2024",
      description:
        "Test your programming skills in our annual coding competition with exciting prizes and recognition.",
      category: "Competition",
      date: "2024-04-20",
      time: "10:00",
      endTime: "16:00",
      venue: "Computer Lab 1, CSE Building",
      capacity: 100,
      registrationFee: 0,
      image: "/api/placeholder/300/200",
      status: "active",
      registrationOpen: true,
      registrationDeadline: "2024-04-15",
      organizer: "Dr. Sarah Davis",
      contact: "sarah.d@csedu.edu.bd",
      requirements: ["Laptop with development environment", "Valid student ID"],
      agenda: [
        { time: "10:00-10:30", topic: "Registration & Setup" },
        { time: "10:30-13:00", topic: "Round 1: Problem Solving" },
        { time: "14:00-15:30", topic: "Round 2: Final Challenge" },
        { time: "15:30-16:00", topic: "Prize Distribution" },
      ],
      registrations: [
        {
          id: 3,
          studentId: "CSE-2019-003",
          name: "Charlie Brown",
          email: "charlie@student.edu.bd",
          phone: "+880-1234-567892",
          year: "4th Year",
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

  // Request Management State
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "Faculty Application",
      applicantName: "Dr. Emily Johnson",
      applicantEmail: "emily.johnson@email.com",
      subject: "Application for Assistant Professor Position",
      description:
        "I am applying for the Assistant Professor position in Computer Science Department. I have completed my PhD in Machine Learning from Stanford University.",
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
      status: "pending",
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
    },
    {
      id: 4,
      type: "Grade Appeal",
      applicantName: "Michael Chen",
      applicantEmail: "michael.chen@student.edu.bd",
      subject: "Grade Appeal for CSE-305 Final Exam",
      description:
        "I believe there was an error in grading my final exam for Data Structures and Algorithms course. I would like to request a review of my answer sheet.",
      status: "under_review",
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
    },
    {
      id: 5,
      type: "Research Proposal",
      applicantName: "Dr. Robert Taylor",
      applicantEmail: "robert.taylor@faculty.edu.bd",
      subject: "Research Grant Application - AI in Healthcare",
      description:
        "Submitting research proposal for AI in Healthcare project. Requesting funding approval and lab resource allocation for the next academic year.",
      status: "rejected",
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
      status: "pending",
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

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestFilter, setRequestFilter] = useState("all");

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

  // Event Management Functions
  const handleAddEvent = (eventData) => {
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      registrations: [],
      status: "active",
      registrationOpen: true,
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
  };

  const handleEditEvent = (eventId, eventData) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, ...eventData } : event
      )
    );
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
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
      setSelectedEventRegistrations(event.registrations);
      setShowRegistrationModal(true);
    }
  };

  const handleUpdateRegistration = (eventId, registrationId, updates) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              registrations: event.registrations.map((reg) =>
                reg.id === registrationId ? { ...reg, ...updates } : reg
              ),
            }
          : event
      )
    );

    // Update the modal data if it's currently open
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEventRegistrations((prevRegs) =>
        prevRegs.map((reg) =>
          reg.id === registrationId ? { ...reg, ...updates } : reg
        )
      );
    }
  };

  const handleMarkAttendance = (eventId, registrationId, attendance) => {
    handleUpdateRegistration(eventId, registrationId, { attendance });
  };

  const handleUpdatePaymentStatus = (
    eventId,
    registrationId,
    paymentStatus,
    paymentMethod = "",
    transactionId = ""
  ) => {
    handleUpdateRegistration(eventId, registrationId, {
      paymentStatus,
      paymentMethod,
      transactionId,
    });
  };

  const handleIssueCertificate = (eventId, registrationId) => {
    handleUpdateRegistration(eventId, registrationId, {
      certificate: "issued",
    });
  };

  // Request Management Functions
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

  const getFilteredRequests = () => {
    if (requestFilter === "all") return requests;
    return requests.filter((request) => request.status === requestFilter);
  };

  const getRequestStats = () => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const approved = requests.filter((r) => r.status === "approved").length;
    const rejected = requests.filter((r) => r.status === "rejected").length;
    const underReview = requests.filter(
      (r) => r.status === "under_review"
    ).length;

    return { total, pending, approved, rejected, underReview };
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
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.pendingRequests}</h3>
            <p>Pending Requests</p>
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
          <button className="action-btn" onClick={() => setActiveTab("events")}>
            📅 Manage Events
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("requests")}
          >
            📋 Manage Requests
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
              onClick={() =>{ 
                setEditingNotice(null);
                setShowNoticeModal(true);
              }}
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
        {showNoticeModal && <NoticeModal />}
        {editingNotice && <NoticeModal />}
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

  const renderEventManagement = () => {
    return (
      <div className="user-management">
        <div className="section-header">
          <h2>Event Management</h2>
          <button
            className="add-user-btn"
            onClick={() => {
              setEditingEvent(null);
              setShowEventModal(true);
            }}
          >
            ➕ Add New Event
          </button>
        </div>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Capacity</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Registration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>
                    <div className="event-image">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="event-thumbnail"
                        />
                      ) : (
                        <div className="event-image-placeholder">🎫</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <strong>{event.title}</strong>
                  </td>
                  <td>{event.category}</td>
                  <td>{event.date}</td>
                  <td>
                    {event.time} - {event.endTime}
                  </td>
                  <td>{event.venue}</td>
                  <td>{event.capacity}</td>
                  <td>
                    {event.registrationFee > 0
                      ? `${event.registrationFee}৳`
                      : "Free"}
                  </td>
                  <td>
                    <select
                      value={event.status}
                      onChange={(e) =>
                        handleEventStatusChange(event.id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={`toggle-btn ${
                        event.registrationOpen ? "open" : "closed"
                      }`}
                      onClick={() => handleToggleRegistration(event.id)}
                      title={
                        event.registrationOpen
                          ? "Close Registration"
                          : "Open Registration"
                      }
                    >
                      {event.registrationOpen ? "🟢 Open" : "🔴 Closed"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingEvent(event);
                        setShowEventModal(true);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      🗑️ Delete
                    </button>
                    <button
                      className="view-btn"
                      onClick={() => handleViewRegistrations(event.id)}
                      title="View Registrations"
                    >
                      👥 Registrations
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length === 0 && (
            <div className="empty-state">
              <p>No events found.</p>
            </div>
          )}
        </div>
        {showEventModal && <EventModal />}
        {showRegistrationModal && <RegistrationModal />}
      </div>
    );
  };

  // Event Modal for Create/Edit
  const EventModal = () => {
    const [formData, setFormData] = useState(
      editingEvent || {
        title: "",
        description: "",
        category: "Seminar",
        date: "",
        time: "",
        endTime: "",
        venue: "",
        capacity: 50,
        registrationFee: 0,
        image: "",
        registrationDeadline: "",
        organizer: adminData.name,
        contact: adminData.email,
        requirements: "",
        agenda: "",
        status: "active",
        registrationOpen: true,
      }
    );
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(editingEvent?.image || "");

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleRemoveImage = () => {
      setSelectedImage(null);
      setImagePreview("");
      setFormData({ ...formData, image: "" });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let finalFormData = { ...formData };
      if (selectedImage) {
        finalFormData.image = URL.createObjectURL(selectedImage);
      }
      // Parse requirements and agenda as arrays
      finalFormData.requirements = formData.requirements
        ? formData.requirements.split(",").map((r) => r.trim())
        : [];
      finalFormData.agenda = formData.agenda
        ? formData.agenda.split("\n").map((line) => {
            const [time, ...topicArr] = line.split("-");
            return { time: time.trim(), topic: topicArr.join("-").trim() };
          })
        : [];
      if (editingEvent) {
        handleEditEvent(editingEvent.id, finalFormData);
      } else {
        handleAddEvent(finalFormData);
      }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content large-modal">
          <div className="modal-header">
            <h3>{editingEvent ? "Edit Event" : "Add New Event"}</h3>
            <button
              className="close-btn"
              onClick={() => {
                setShowEventModal(false);
                setEditingEvent(null);
              }}
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form event-form">
            <div className="form-section">
              <h4>Event Image</h4>
              <div className="image-upload-section">
                <div className="current-image">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Event Preview"
                      className="event-image-preview"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>🎫</span>
                      <p>No event image uploaded</p>
                    </div>
                  )}
                </div>
                <div className="image-controls">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="eventImage"
                    className="file-input"
                  />
                  <label htmlFor="eventImage" className="upload-btn">
                    📷 Upload Event Image
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
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    placeholder="Event Title"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                    <option value="Competition">Competition</option>
                    <option value="Social">Social</option>
                    <option value="Other">Other</option>
                  </select>
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
                  <label>Start Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Time *</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Venue *</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    required
                    placeholder="Event Venue"
                  />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: parseInt(e.target.value) || 0,
                      })
                    }
                    min="1"
                    max="1000"
                  />
                </div>
                <div className="form-group">
                  <label>Registration Fee (৳)</label>
                  <input
                    type="number"
                    value={formData.registrationFee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationFee: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Registration Deadline</label>
                  <input
                    type="date"
                    value={formData.registrationDeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationDeadline: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Organizer</label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) =>
                      setFormData({ ...formData, organizer: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="form-section">
              <h4>Event Details</h4>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows="3"
                  placeholder="Event description, objectives, etc."
                />
              </div>
              <div className="form-group">
                <label>
                  Requirements <span className="hint">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  placeholder="Student ID, Registration Fee, etc."
                />
              </div>
              <div className="form-group">
                <label>
                  Agenda{" "}
                  <span className="hint">
                    (one per line, format: time - topic)
                  </span>
                </label>
                <textarea
                  value={formData.agenda}
                  onChange={(e) =>
                    setFormData({ ...formData, agenda: e.target.value })
                  }
                  rows="4"
                  placeholder={
                    "09:00-10:00 - Registration\n10:00-11:00 - Keynote"
                  }
                />
              </div>
            </div>
            <div className="form-section">
              <h4>Status & Registration</h4>
              <div className="form-row">
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
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.registrationOpen}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registrationOpen: e.target.checked,
                        })
                      }
                    />
                    Registration Open
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowEventModal(false);
                  setEditingEvent(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Registration Management Modal
  const RegistrationModal = () => {
    // State for adding a new registration
    const [newReg, setNewReg] = useState({
      studentId: "",
      name: "",
      email: "",
      phone: "",
      year: "",
      department: "",
      registrationDate: new Date().toISOString().split("T")[0],
      paymentStatus: "pending",
      paymentMethod: "",
      transactionId: "",
      attendance: "registered",
      certificate: "pending",
    });
    const [addError, setAddError] = useState("");
    const [editRegId, setEditRegId] = useState(null);
    const [editReg, setEditReg] = useState(null);

    // Add new registration handler
    const handleAddRegistration = (e) => {
      e.preventDefault();
      if (!newReg.studentId || !newReg.name || !newReg.email) {
        setAddError("Student ID, Name, and Email are required.");
        return;
      }
      const updatedRegs = [
        ...selectedEventRegistrations,
        {
          ...newReg,
          id: Date.now(),
        },
      ];
      handleEditEvent(selectedEvent.id, {
        ...selectedEvent,
        registrations: updatedRegs,
      });
      setSelectedEventRegistrations(updatedRegs);
      setNewReg({
        studentId: "",
        name: "",
        email: "",
        phone: "",
        year: "",
        department: "",
        registrationDate: new Date().toISOString().split("T")[0],
        paymentStatus: "pending",
        paymentMethod: "",
        transactionId: "",
        attendance: "registered",
        certificate: "pending",
      });
      setAddError("");
    };

    // Remove registration handler
    const handleRemoveRegistration = (regId) => {
      if (window.confirm("Remove this registration?")) {
        const updatedRegs = selectedEventRegistrations.filter(
          (reg) => reg.id !== regId
        );
        handleEditEvent(selectedEvent.id, {
          ...selectedEvent,
          registrations: updatedRegs,
        });
        setSelectedEventRegistrations(updatedRegs);
      }
    };

    // Start editing a registration
    const handleEditRegistration = (reg) => {
      setEditRegId(reg.id);
      setEditReg({ ...reg });
    };

    // Save edited registration
    const handleSaveEditRegistration = () => {
      if (!editReg.studentId || !editReg.name || !editReg.email) {
        setAddError("Student ID, Name, and Email are required.");
        return;
      }
      const updatedRegs = selectedEventRegistrations.map((reg) =>
        reg.id === editRegId ? { ...editReg } : reg
      );
      handleEditEvent(selectedEvent.id, {
        ...selectedEvent,
        registrations: updatedRegs,
      });
      setSelectedEventRegistrations(updatedRegs);
      setEditRegId(null);
      setEditReg(null);
      setAddError("");
    };

    // Cancel editing
    const handleCancelEdit = () => {
      setEditRegId(null);
      setEditReg(null);
      setAddError("");
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content large-modal">
          <div className="modal-header">
            <h3>Event Registrations - {selectedEvent?.title}</h3>
            <button
              className="close-btn"
              onClick={() => setShowRegistrationModal(false)}
            >
              ✕
            </button>
          </div>
          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Year</th>
                  <th>Department</th>
                  <th>Reg. Date</th>
                  <th>Payment</th>
                  <th>Attendance</th>
                  <th>Certificate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedEventRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={11} style={{ textAlign: "center" }}>
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  selectedEventRegistrations.map((reg) =>
                    editRegId === reg.id ? (
                      <tr key={reg.id} className="editing-row">
                        <td>
                          <input
                            type="text"
                            value={editReg.studentId}
                            onChange={(e) =>
                              setEditReg({
                                ...editReg,
                                studentId: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editReg.name}
                            onChange={(e) =>
                              setEditReg({ ...editReg, name: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            value={editReg.email}
                            onChange={(e) =>
                              setEditReg({ ...editReg, email: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editReg.phone}
                            onChange={(e) =>
                              setEditReg({ ...editReg, phone: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editReg.year}
                            onChange={(e) =>
                              setEditReg({ ...editReg, year: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editReg.department}
                            onChange={(e) =>
                              setEditReg({
                                ...editReg,
                                department: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            value={editReg.registrationDate}
                            onChange={(e) =>
                              setEditReg({
                                ...editReg,
                                registrationDate: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <select
                            value={editReg.paymentStatus}
                            onChange={(e) =>
                              setEditReg({
                                ...editReg,
                                paymentStatus: e.target.value,
                              })
                            }
                          >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="free">Free</option>
                          </select>
                          {editReg.paymentStatus === "paid" && (
                            <>
                              <br />
                              <input
                                type="text"
                                value={editReg.paymentMethod || ""}
                                onChange={(e) =>
                                  setEditReg({
                                    ...editReg,
                                    paymentMethod: e.target.value,
                                  })
                                }
                                placeholder="Method (bkash, cash)"
                                style={{ width: "80px" }}
                              />
                              <input
                                type="text"
                                value={editReg.transactionId || ""}
                                onChange={(e) =>
                                  setEditReg({
                                    ...editReg,
                                    transactionId: e.target.value,
                                  })
                                }
                                placeholder="Txn ID"
                                style={{ width: "80px" }}
                              />
                            </>
                          )}
                        </td>
                        <td>
                          <select
                            value={editReg.attendance}
                            onChange={(e) =>
                              setEditReg({
                                ...editReg,
                                attendance: e.target.value,
                              })
                            }
                          >
                            <option value="registered">Registered</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </td>
                        <td>
                          {editReg.certificate === "issued"
                            ? "Issued"
                            : "Pending"}
                          {editReg.attendance === "present" &&
                            editReg.certificate !== "issued" && (
                              <button
                                className="issue-btn"
                                onClick={() =>
                                  handleIssueCertificate(
                                    selectedEvent.id,
                                    editReg.id
                                  )
                                }
                                type="button"
                              >
                                🎓 Issue
                              </button>
                            )}
                        </td>
                        <td>
                          <button
                            className="save-btn"
                            onClick={handleSaveEditRegistration}
                            type="button"
                          >
                            💾 Save
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={handleCancelEdit}
                            type="button"
                          >
                            ✕ Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={reg.id}>
                        <td>{reg.studentId}</td>
                        <td>{reg.name}</td>
                        <td>{reg.email}</td>
                        <td>{reg.phone}</td>
                        <td>{reg.year}</td>
                        <td>{reg.department}</td>
                        <td>{reg.registrationDate}</td>
                        <td>
                          <select
                            value={reg.paymentStatus}
                            onChange={(e) =>
                              handleUpdatePaymentStatus(
                                selectedEvent.id,
                                reg.id,
                                e.target.value,
                                reg.paymentMethod,
                                reg.transactionId
                              )
                            }
                          >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="free">Free</option>
                          </select>
                          {reg.paymentStatus === "paid" && (
                            <>
                              <br />
                              <input
                                type="text"
                                value={reg.paymentMethod || ""}
                                onChange={(e) =>
                                  handleUpdatePaymentStatus(
                                    selectedEvent.id,
                                    reg.id,
                                    reg.paymentStatus,
                                    e.target.value,
                                    reg.transactionId
                                  )
                                }
                                placeholder="Method (bkash, cash)"
                                style={{ width: "80px" }}
                              />
                              <input
                                type="text"
                                value={reg.transactionId || ""}
                                onChange={(e) =>
                                  handleUpdatePaymentStatus(
                                    selectedEvent.id,
                                    reg.id,
                                    reg.paymentStatus,
                                    reg.paymentMethod,
                                    e.target.value
                                  )
                                }
                                placeholder="Txn ID"
                                style={{ width: "80px" }}
                              />
                            </>
                          )}
                        </td>
                        <td>
                          <select
                            value={reg.attendance}
                            onChange={(e) =>
                              handleMarkAttendance(
                                selectedEvent.id,
                                reg.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="registered">Registered</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </td>
                        <td>
                          {reg.certificate === "issued" ? "Issued" : "Pending"}
                          {reg.attendance === "present" &&
                            reg.certificate !== "issued" && (
                              <button
                                className="issue-btn"
                                onClick={() =>
                                  handleIssueCertificate(
                                    selectedEvent.id,
                                    reg.id
                                  )
                                }
                                type="button"
                              >
                                🎓 Issue
                              </button>
                            )}
                        </td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => handleEditRegistration(reg)}
                            type="button"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleRemoveRegistration(reg.id)}
                            type="button"
                          >
                            🗑️ Remove
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
                {/* Add new registration row */}
                <tr>
                  <td>
                    <input
                      type="text"
                      value={newReg.studentId}
                      onChange={(e) =>
                        setNewReg({ ...newReg, studentId: e.target.value })
                      }
                      placeholder="Student ID"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={newReg.name}
                      onChange={(e) =>
                        setNewReg({ ...newReg, name: e.target.value })
                      }
                      placeholder="Name"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={newReg.email}
                      onChange={(e) =>
                        setNewReg({ ...newReg, email: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={newReg.phone}
                      onChange={(e) =>
                        setNewReg({ ...newReg, phone: e.target.value })
                      }
                      placeholder="Phone"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={newReg.year}
                      onChange={(e) =>
                        setNewReg({ ...newReg, year: e.target.value })
                      }
                      placeholder="Year"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={newReg.department}
                      onChange={(e) =>
                        setNewReg({ ...newReg, department: e.target.value })
                      }
                      placeholder="Department"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={newReg.registrationDate}
                      onChange={(e) =>
                        setNewReg({
                          ...newReg,
                          registrationDate: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={newReg.paymentStatus}
                      onChange={(e) =>
                        setNewReg({ ...newReg, paymentStatus: e.target.value })
                      }
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="free">Free</option>
                    </select>
                    {newReg.paymentStatus === "paid" && (
                      <>
                        <br />
                        <input
                          type="text"
                          value={newReg.paymentMethod}
                          onChange={(e) =>
                            setNewReg({
                              ...newReg,
                              paymentMethod: e.target.value,
                            })
                          }
                          placeholder="Method"
                          style={{ width: "80px" }}
                        />
                        <input
                          type="text"
                          value={newReg.transactionId}
                          onChange={(e) =>
                            setNewReg({
                              ...newReg,
                              transactionId: e.target.value,
                            })
                          }
                          placeholder="Txn ID"
                          style={{ width: "80px" }}
                        />
                      </>
                    )}
                  </td>
                  <td>
                    <select
                      value={newReg.attendance}
                      onChange={(e) =>
                        setNewReg({ ...newReg, attendance: e.target.value })
                      }
                    >
                      <option value="registered">Registered</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                  <td>
                    {newReg.certificate === "issued" ? "Issued" : "Pending"}
                  </td>
                  <td>
                    <button
                      className="save-btn"
                      onClick={handleAddRegistration}
                      type="button"
                    >
                      ➕ Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {addError && <div className="error-message">{addError}</div>}
          </div>
          <div className="modal-actions">
            <button
              className="cancel-btn"
              onClick={() => setShowRegistrationModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderRequestManagement = () => {
    const filteredRequests = getFilteredRequests();
    const stats = getRequestStats();

    return (
      <div className="user-management">
        <div className="section-header">
          <h2>Request Management</h2>
          <div className="header-actions">
            <button
              className={`filter-btn ${
                requestFilter === "all" ? "active" : ""
              }`}
              onClick={() => setRequestFilter("all")}
            >
              📋 All Requests ({stats.total})
            </button>
            <button
              className={`filter-btn ${
                requestFilter === "pending" ? "active" : ""
              }`}
              onClick={() => setRequestFilter("pending")}
            >
              ⏳ Pending ({stats.pending})
            </button>
            <button
              className={`filter-btn ${
                requestFilter === "under_review" ? "active" : ""
              }`}
              onClick={() => setRequestFilter("under_review")}
            >
              👁️ Under Review ({stats.underReview})
            </button>
            <button
              className={`filter-btn ${
                requestFilter === "approved" ? "active" : ""
              }`}
              onClick={() => setRequestFilter("approved")}
            >
              ✅ Approved ({stats.approved})
            </button>
            <button
              className={`filter-btn ${
                requestFilter === "rejected" ? "active" : ""
              }`}
              onClick={() => setRequestFilter("rejected")}
            >
              ❌ Rejected ({stats.rejected})
            </button>
          </div>
        </div>

        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Applicant</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Department</th>
                <th>Priority</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <span
                      className={`role-badge ${request.type
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {request.type}
                    </span>
                  </td>
                  <td>
                    <strong>{request.applicantName}</strong>
                    <br />
                    <small>{request.applicantEmail}</small>
                  </td>
                  <td>
                    <strong>{request.subject}</strong>
                    <br />
                    <small>{request.description.substring(0, 60)}...</small>
                  </td>
                  <td>
                    <span
                      className={`role-badge ${request.category.toLowerCase()}`}
                    >
                      {request.category}
                    </span>
                  </td>
                  <td>{request.department}</td>
                  <td>
                    <span className={`priority-badge ${request.priority}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td>{request.submissionDate}</td>
                  <td>
                    <span className={`status-badge ${request.status}`}>
                      {request.status.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleViewRequest(request)}
                      title="View Details"
                    >
                      👁️ View
                    </button>
                    {request.status === "pending" && (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleRequestAction(request.id, "under_review")
                          }
                          title="Mark as Under Review"
                        >
                          👁️ Review
                        </button>
                        <button
                          className="save-btn"
                          onClick={() =>
                            handleRequestAction(request.id, "approved")
                          }
                          title="Approve Request"
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleRequestAction(request.id, "rejected")
                          }
                          title="Reject Request"
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteRequest(request.id)}
                      title="Delete Request"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length === 0 && (
            <div className="empty-state">
              <p>No requests found for the selected filter.</p>
            </div>
          )}
        </div>
        {showRequestModal && <RequestModal />}
      </div>
    );
  };

  // Request Detail Modal
  const RequestModal = () => {
    const [adminNotes, setAdminNotes] = useState("");
    const [actionType, setActionType] = useState("");

    const handleAction = (action) => {
      handleRequestAction(selectedRequest.id, action, adminNotes);
    };

    if (!selectedRequest) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content large-modal">
          <div className="modal-header">
            <h3>Request Details - {selectedRequest.type}</h3>
            <button
              className="close-btn"
              onClick={() => setShowRequestModal(false)}
            >
              ✕
            </button>
          </div>

          <div className="request-details">
            <div className="request-info-grid">
              <div className="info-section">
                <h4>Applicant Information</h4>
                <div className="info-item">
                  <label>Name:</label>
                  <span>{selectedRequest.applicantName}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{selectedRequest.applicantEmail}</span>
                </div>
                <div className="info-item">
                  <label>Department:</label>
                  <span>{selectedRequest.department}</span>
                </div>
              </div>

              <div className="info-section">
                <h4>Request Information</h4>
                <div className="info-item">
                  <label>Type:</label>
                  <span
                    className={`role-badge ${selectedRequest.type
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {selectedRequest.type}
                  </span>
                </div>
                <div className="info-item">
                  <label>Category:</label>
                  <span
                    className={`role-badge ${selectedRequest.category.toLowerCase()}`}
                  >
                    {selectedRequest.category}
                  </span>
                </div>
                <div className="info-item">
                  <label>Priority:</label>
                  <span
                    className={`priority-badge ${selectedRequest.priority}`}
                  >
                    {selectedRequest.priority}
                  </span>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`status-badge ${selectedRequest.status}`}>
                    {selectedRequest.status.replace("_", " ")}
                  </span>
                </div>
                <div className="info-item">
                  <label>Submission Date:</label>
                  <span>{selectedRequest.submissionDate}</span>
                </div>
              </div>
            </div>

            <div className="request-content">
              <h4>Subject</h4>
              <p>
                <strong>{selectedRequest.subject}</strong>
              </p>

              <h4>Description</h4>
              <p>{selectedRequest.description}</p>

              {selectedRequest.additionalInfo && (
                <>
                  <h4>Additional Information</h4>
                  <div className="additional-info">
                    {Object.entries(selectedRequest.additionalInfo).map(
                      ([key, value]) => (
                        <div key={key} className="info-item">
                          <label>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            :
                          </label>
                          <span>
                            {Array.isArray(value) ? value.join(", ") : value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {selectedRequest.attachments &&
                selectedRequest.attachments.length > 0 && (
                  <>
                    <h4>Attachments</h4>
                    <div className="attachments-list">
                      {selectedRequest.attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          <span className="file-icon">📎</span>
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">({file.size})</span>
                          <button className="download-btn" type="button">
                            📥 Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

              {selectedRequest.reviewedBy && (
                <>
                  <h4>Review Information</h4>
                  <div className="review-info">
                    <div className="info-item">
                      <label>Reviewed By:</label>
                      <span>{selectedRequest.reviewedBy}</span>
                    </div>
                    <div className="info-item">
                      <label>Review Date:</label>
                      <span>{selectedRequest.reviewedDate}</span>
                    </div>
                    {selectedRequest.adminNotes && (
                      <div className="info-item">
                        <label>Admin Notes:</label>
                        <span>{selectedRequest.adminNotes}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {(selectedRequest.status === "pending" ||
              selectedRequest.status === "under_review") && (
              <div className="admin-actions">
                <h4>Admin Actions</h4>
                <div className="form-group">
                  <label>Admin Notes (Optional)</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add any notes or feedback..."
                    rows="3"
                  />
                </div>
                <div className="action-buttons">
                  {selectedRequest.status === "pending" && (
                    <button
                      className="edit-btn"
                      onClick={() => handleAction("under_review")}
                      type="button"
                    >
                      👁️ Mark as Under Review
                    </button>
                  )}
                  <button
                    className="save-btn"
                    onClick={() => handleAction("approved")}
                    type="button"
                  >
                    ✅ Approve Request
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleAction("rejected")}
                    type="button"
                  >
                    ❌ Reject Request
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button
              className="cancel-btn"
              onClick={() => setShowRequestModal(false)}
            >
              Close
            </button>
          </div>
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
      case "events":
        return renderEventManagement();
      case "requests":
        return renderRequestManagement();
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
          </nav>
        </div>

        <div className="admin-main">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default AdminProfile;
