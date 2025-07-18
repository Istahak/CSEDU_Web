import React, { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import FacultyProfile from "./pages/FacultyProfile";
import Academics from "./pages/Academics";
import DegreeOutlines from "./pages/DegreeOutlines";
import CourseList from "./pages/CourseList";
import CourseDetails from "./pages/CourseDetails";
import ProgramDetails from "./pages/ProgramDetails";
import AdmissionsInfo from "./pages/AdmissionsInfo";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import UserProfile from "./pages/UserProfile";
import TeacherProfile from "./pages/TeacherProfile";
import AdminProfile from "./pages/AdminProfile";
import EditProfile from "./pages/EditProfile";
import AcademicCalendar from "./pages/AcademicCalendar";
import AcademicCalendarView from "./pages/AcademicCalendarView";
import ExamSchedule from "./pages/ExamSchedule";
import Notices from "./pages/Notices";
import NoticeDetails from "./pages/NoticeDetails";
import Events from "./pages/Events";
import EventRegistration from "./pages/EventRegistration";
import EventRegistrationSuccess from "./pages/EventRegistrationSuccess";
import Contact from "./pages/Contact";
import Achievements from "./pages/Achievements";
import GradeAssignment from "./pages/GradeAssignment";
import MarkAttendance from "./pages/MarkAttendance";
import CreateAssignment from "./pages/CreateAssignment";
import UploadMaterials from "./pages/UploadMaterials";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import ReserveRoom from "./pages/ReserveRoom";
import LabBooking from "./pages/LabBooking";
import LabBookingSuccess from "./pages/LabBookingSuccess";
import EquipmentHistory from "./pages/EquipmentHistory";
import Signup from "./pages/Signup";
import TeacherEditProfile from "./pages/TeacherEditProfile";
import "./styles/App.css";

function App() {
  const [currentPage, setCurrentPageRaw] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  // Added by miraj 
  
  // Check localStorage for login info on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Add browser history support
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Push initial state
    if (window.history.state === null) {
      window.history.replaceState({ page: currentPage }, "", `#${currentPage}`);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Update history when page changes
  useEffect(() => {
    if (
      window.history.state === null ||
      window.history.state.page !== currentPage
    ) {
      window.history.pushState({ page: currentPage }, "", `#${currentPage}`);
    }
  }, [currentPage]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  // Track source page for notice-details navigation
  const [noticeSource, setNoticeSource] = useState("home");
  // Custom page switcher to support passing notice object and source
  const setCurrentPage = (page, payload, source) => {
    setCurrentPageRaw(page);
    if (page === "notice-details") {
      setSelectedNotice(payload || null);
      setNoticeSource(source || "home");
    }
  };
  const [registrationData, setRegistrationData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [userData, setUserData] = useState({
    name: "Istahak Islam",
    studentId: "CSE-2020-2021",
    email: "istahak.islam@csedu.ac.bd",
    phone: "+880 1234 567890",
    batch: "2019",
    semester: "7th",
    cgpa: "3.00",
    department: "Computer Science & Engineering",
    address: "123 University Road, Dhaka-1000",
  });

  const [teacherData, setTeacherData] = useState({
    name: "Dr. John Smith",
    employeeId: "FAC-2018-001",
    email: "john.smith@csedu.ac.bd",
    phone: "+880 1234 567891",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    specialization: "Machine Learning, Data Science",
    officeRoom: "Room 302, CSE Building",
    officeHours: "Mon-Wed-Fri: 2:00 PM - 4:00 PM",
    education: "Ph.D. in Computer Science",
  });

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    // added by miraj 
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
    localStorage.removeItem('profile_id');
    localStorage.removeItem('login_response');
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentPage("home");
  };

  // If not authenticated and currentPage is 'login', show login page with header
  if (!isAuthenticated && currentPage === "login") {
    return (
      <>
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          userRole={userRole}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <Login onLogin={handleLogin} />
      </>
    );
  }
  // If not authenticated and currentPage is 'signup', show signup page with header, no footer
  if (!isAuthenticated && currentPage === "signup") {
    return (
      <>
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          userRole={userRole}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <Signup
          onSignup={() => setCurrentPage("login")}
          onBack={() => setCurrentPage("login")}
        />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "directory":
        return (
          <Directory
            onFacultySelect={(faculty) => {
              setSelectedFaculty(faculty);
              setCurrentPage("faculty-profile");
            }}
          />
        );
      case "faculty-profile":
        return (
          <FacultyProfile
            id={selectedFaculty}
            onBack={() => {
              setCurrentPage("directory");
              setSelectedFaculty(null);
            }}
            onCourseSelect={(course) => {
              setSelectedCourse(course);
              setCurrentPage("course-details");
            }}
          />
        );
      case "academics":
        return (
          <Academics
            onCourseSelect={(course) => {
              setSelectedCourse(course);
              setCurrentPage("course-details");
            }}
            onProgramSelect={(program) => {
              setSelectedProgram(program);
              setCurrentPage("program-details");
            }}
          />
        );
      case "degree-outlines":
        return (
          <DegreeOutlines
            onProgramSelect={(program) => {
              setSelectedProgram(program);
              setCurrentPage("program-details");
            }}
          />
        );
      case "course-list":
        return (
          <CourseList
            onCourseSelect={(course) => {
              setSelectedCourse(course);
              setCurrentPage("course-details");
            }}
          />
        );
      case "course-details":
        return (
          <CourseDetails
            course={selectedCourse}
            onBack={() => {
              setCurrentPage("academics");
              setSelectedCourse(null);
            }}
          />
        );
      case "program-details":
        return (
          <ProgramDetails
            program={selectedProgram}
            onBack={() => {
              setCurrentPage("academics");
              setSelectedProgram(null);
            }}
            onAdmissionsInfo={() => {
              setCurrentPage("admissions-info");
            }}
          />
        );
      case "admissions-info": {
        // Determine programId based on selected program
        let programId = "undergraduate";
        if (selectedProgram && selectedProgram.title) {
          const title = selectedProgram.title.toLowerCase();
          if (title.includes("master")) {
            programId = "graduate";
          } else if (title.includes("international")) {
            programId = "international";
          } else {
            programId = "undergraduate";
          }
        }
        return (
          <AdmissionsInfo
            programId={programId}
            onBack={() => {
              setCurrentPage("program-details");
            }}
          />
        );
      }
      case "projects":
        return (
          <Projects
            onProjectSelect={(project) => {
              setSelectedProject(project);
              setCurrentPage("project-details");
            }}
          />
        );
      case "project-details":
        return (
          <ProjectDetails
            project={selectedProject}
            onBack={() => {
              setCurrentPage("projects");
              setSelectedProject(null);
            }}
          />
        );
      case "user-profile":
        return (
          <UserProfile
            userData={userData}
            onBack={() => setCurrentPage("home")}
            onEditProfile={() => setCurrentPage("edit-profile")}
          />
        );
      case "teacher-profile":
        return (
          <TeacherProfile
            teacherData={teacherData}
            onBack={() => setCurrentPage("home")}
            onEditProfile={() => setCurrentPage("teacher-edit-profile")}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );
      case "admin-profile":
        return <AdminProfile onLogout={handleLogout} />;
      case "teacher-edit-profile":
        return (
          <TeacherEditProfile
            teacherData={teacherData}
            onBack={() => setCurrentPage("teacher-profile")}
            onSave={(updatedData) => {
              setTeacherData(updatedData);
              setCurrentPage("teacher-profile");
            }}
          />
        );
      case "grade-assignment":
        return (
          <GradeAssignment onBack={() => setCurrentPage("teacher-profile")} />
        );
      case "mark-attendance":
        return (
          <MarkAttendance onBack={() => setCurrentPage("teacher-profile")} />
        );
      case "create-assignment":
        return (
          <CreateAssignment onBack={() => setCurrentPage("teacher-profile")} />
        );
      case "upload-materials":
        return (
          <UploadMaterials onBack={() => setCurrentPage("teacher-profile")} />
        );
      case "schedule-meeting":
        return (
          <ScheduleMeeting onBack={() => setCurrentPage("teacher-profile")} />
        );
      case "reserve-room":
        return <ReserveRoom onBack={() => setCurrentPage("teacher-profile")} />;
      case "edit-profile":
        return (
          <EditProfile
            userData={userData}
            onBack={() => setCurrentPage("user-profile")}
            onSave={(updatedData) => {
              setUserData(updatedData);
              setCurrentPage("user-profile");
            }}
          />
        );
      case "academic-calendar":
        return (
          <AcademicCalendar
            onExamsClick={() => setCurrentPage("exam-schedule")}
            userRole={userRole}
          />
        );
      case "academic-calendar-view":
        return (
          <AcademicCalendarView
            onBack={() => setCurrentPage("home")}
            userRole={userRole}
          />
        );
      case "exam-schedule":
        return (
          <ExamSchedule
            onBack={() => setCurrentPage("academic-calendar")}
            userRole={userRole}
          />
        );
      case "notices":
        return (
          <Notices
            onBack={() => setCurrentPage("home")}
            onNoticeSelect={(notice) => {
              setSelectedNotice(notice);
              setCurrentPage("notice-details", notice, "notices");
            }}
          />
        );
      case "notice-details":
        return (
          <NoticeDetails
            notice={selectedNotice}
            onBack={() => {
              setCurrentPage(noticeSource);
              setSelectedNotice(null);
            }}
          />
        );
      case "events":
        return (
          <Events
            onBack={() => setCurrentPage("home")}
            onEventRegister={(event) => {
              setSelectedEvent(event);
              setCurrentPage("event-registration");
            }}
          />
        );
      case "event-registration":
        return (
          <EventRegistration
            event={selectedEvent}
            onBack={() => {
              setCurrentPage("events");
              setSelectedEvent(null);
            }}
            onRegisterComplete={(formData) => {
              setRegistrationData(formData);
              setCurrentPage("event-registration-success");
            }}
          />
        );
      case "event-registration-success":
        return (
          <EventRegistrationSuccess
            event={selectedEvent}
            registrationData={registrationData}
            onBackToEvents={() => {
              setCurrentPage("events");
              setSelectedEvent(null);
              setRegistrationData(null);
            }}
          />
        );
      case "contact":
        return <Contact onBack={() => setCurrentPage("home")} />;
      case "achievements":
        return <Achievements onBack={() => setCurrentPage("home")} />;
      case "lab-booking":
        return (
          <LabBooking
            onBack={(page) => {
              if (page === 'equipment-history') {
                setCurrentPage("equipment-history");
              } else {
                setCurrentPage("home");
              }
            }}
            onBookingComplete={(formData) => {
              setBookingData(formData);
              setCurrentPage("lab-booking-success");
            }}
          />
        );
      case "equipment-history":
        return (
          <EquipmentHistory
            onBack={() => setCurrentPage("lab-booking")}
          />
        );
      case "lab-booking-success":
        return (
          <LabBookingSuccess
            bookingData={bookingData}
            onBackToBooking={() => {
              setCurrentPage("lab-booking");
              setBookingData(null);
            }}
          />
        );
      default:
        return <Home setCurrentPage={(page, payload) => setCurrentPage(page, payload, "home")} />;
    }
  };

  return (
    <div className="app">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <main className="main-content" key={currentPage}>
        {renderPage()}
      </main>
      {currentPage !== "signup" && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;
