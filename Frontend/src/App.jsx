import React, { useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import FacultyProfile from "./pages/FacultyProfile";
import "./styles/App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

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
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
