import React, { useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import FacultyProfile from "./pages/FacultyProfile";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import AcademicCalendar from "./pages/AcademicCalendar";
import AcademicCalendarView from "./pages/AcademicCalendarView";
import ExamSchedule from "./pages/ExamSchedule";
import Notices from "./pages/Notices";
import "./styles/App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
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
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
