import React, { useState, useRef, useEffect } from "react";
import "./Header.css";

const Header = ({
  currentPage,
  setCurrentPage,
  userRole,
  isAuthenticated,
  onLogout,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null); // null | 'academics' | 'resources'
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleNavClick = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
    setOpenDropdown(null); // Close dropdown when navigating
  };

  // Helper function to determine if a nav item should be active
  const isNavActive = (navPage) => {
    if (navPage === "academics") {
      return ["academics", "course-details", "program-details"].includes(
        currentPage
      );
    }
    if (navPage === "directory") {
      return ["directory", "faculty-profile"].includes(currentPage);
    }
    return currentPage === navPage;
  };

  const handleDropdownMouseEnter = (dropdown) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(dropdown);
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="university-info">
          <div className="university-logo">🎓</div>
          <span className="university-name">CSEDU</span>
        </div>
        <nav className="header-nav">
          <a
            href="/"
            className={`nav-link ${currentPage === "home" ? "active" : ""}`}
            onClick={(e) => handleNavClick("home", e)}
          >
            Home
          </a>
          <a
            href="/directory"
            className={`nav-link ${isNavActive("directory") ? "active" : ""}`}
            onClick={(e) => handleNavClick("directory", e)}
          >
            Directory
          </a>
          <div
            className="nav-dropdown"
            onMouseEnter={() => handleDropdownMouseEnter("academics")}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <a
              href="/degree-outlines"
              className={`nav-link ${isNavActive("academics") ? "active" : ""}`}
              onClick={(e) => handleNavClick("degree-outlines", e)}
            >
              Academics <span className="dropdown-arrow">▼</span>
            </a>
            {openDropdown === "academics" && (
              <div className="dropdown-menu">
                <a
                  href="/degree-outlines"
                  className="dropdown-item"
                  onClick={(e) => handleNavClick("degree-outlines", e)}
                >
                  Degree Outlines
                </a>
                <a
                  href="/course-list"
                  className="dropdown-item"
                  onClick={(e) => handleNavClick("course-list", e)}
                >
                  Course List
                </a>
              </div>
            )}
          </div>
          <a
            href="/projects"
            className={`nav-link ${currentPage === "projects" ? "active" : ""}`}
            onClick={(e) => handleNavClick("projects", e)}
          >
            Projects
          </a>
          <a
            href="/notices"
            className={`nav-link ${currentPage === "notices" ? "active" : ""}`}
            onClick={(e) => handleNavClick("notices", e)}
          >
            Notices
          </a>
          <a
            href="/events"
            className={`nav-link ${currentPage === "events" ? "active" : ""}`}
            onClick={(e) => handleNavClick("events", e)}
          >
            Events
          </a>
          <a
            href="/achievements"
            className={`nav-link ${
              currentPage === "achievements" ? "active" : ""
            }`}
            onClick={(e) => handleNavClick("achievements", e)}
          >
            Achievements
          </a>
          <div
            className="nav-dropdown"
            onMouseEnter={() => handleDropdownMouseEnter("resources")}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <a href="/resources" className="nav-link">
              Resources
              <span className="dropdown-arrow">▼</span>
            </a>
            {openDropdown === "resources" && (
              <div className="dropdown-menu">
                <a
                  href="/academic-calendar"
                  className="dropdown-item"
                  onClick={(e) => handleNavClick("academic-calendar", e)}
                >
                  Academic Schedule
                </a>
                <a
                  href="/academic-calendar-view"
                  className="dropdown-item"
                  onClick={(e) => handleNavClick("academic-calendar-view", e)}
                >
                  Academic Calendar
                </a>
                <a
                  href="/exam-schedule"
                  className="dropdown-item"
                  onClick={(e) => handleNavClick("exam-schedule", e)}
                >
                  Exam Schedule
                </a>
                <a
                  href="/lab-booking"
                  className="dropdown-item"
                  onClick={(e) => handleNavClick("lab-booking", e)}
                >
                  Lab Equipment Booking
                </a>
              </div>
            )}
          </div>
        </nav>
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <button className="menu-btn">☰</button>
          <div className="user-section">
            {isAuthenticated ? (
              <>
                <div
                  className="user-profile-header"
                  onClick={() => setCurrentPage(userRole === "faculty" ? "teacher-profile" : "user-profile")}
                >
                  <div className="user-avatar">
                    {userRole === "faculty" ? "👩‍🏫" : userRole === "student" ? "👨‍🎓" : "�️"}
                  </div>
                  <span className="user-role">{userRole}</span>
                </div>
                <button
                  className="logout-btn"
                  onClick={() => {
                    if (typeof onLogout === "function") onLogout();
                  }}
                  style={{
                    minWidth: "80px",
                    background: "#ffd6d6",
                    color: "#a12a2a",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.2rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div
                className="auth-buttons"
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <button
                  className="login-btn"
                  onClick={() => setCurrentPage("login")}
                  style={{
                    minWidth: "80px",
                    background: "#b6f5c6",
                    color: "#205c2c",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.2rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
                <button
                  className="signup-btn"
                  onClick={() => setCurrentPage("signup")}
                  style={{
                    minWidth: "80px",
                    background: "#b6f5c6",
                    color: "#205c2c",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.2rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
