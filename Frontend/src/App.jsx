import React, { useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import FacultyProfile from "./pages/FacultyProfile";
import Academics from "./pages/Academics";
import CourseDetails from "./pages/CourseDetails";
import ProgramDetails from "./pages/ProgramDetails";
import AdmissionsInfo from "./pages/AdmissionsInfo";
import Projects from "./pages/Projects";
import "./styles/App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

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
        return <Projects />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content" key={currentPage}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
