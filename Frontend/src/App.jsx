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
import EditProfile from "./pages/EditProfile";
import AcademicCalendar from "./pages/AcademicCalendar";
import AcademicCalendarView from "./pages/AcademicCalendarView";
import ExamSchedule from "./pages/ExamSchedule";
import Notices from "./pages/Notices";
import Events from "./pages/Events";
import EventRegistration from "./pages/EventRegistration";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import "./styles/App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
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

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentPage("home");
  };

  const handleLogout = () => {
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
            faculty={selectedFaculty}
            onBack={() => {
              setCurrentPage("directory");
              setSelectedFaculty(null);
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
      case "admissions-info":
        return (
          <AdmissionsInfo
            onBack={() => {
              setCurrentPage("program-details");
            }}
          />
        );
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
          />
        );
      case "academic-calendar-view":
        return <AcademicCalendarView onBack={() => setCurrentPage("home")} />;
      case "exam-schedule":
        return (
          <ExamSchedule onBack={() => setCurrentPage("academic-calendar")} />
        );
      case "notices":
        return <Notices onBack={() => setCurrentPage("home")} />;
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
            onRegisterComplete={() => {
              setCurrentPage("events");
              setSelectedEvent(null);
            }}
          />
        );
      case "contact":
        return <Contact onBack={() => setCurrentPage("home")} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
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
