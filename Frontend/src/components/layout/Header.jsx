import React, { useState, useRef, useEffect } from "react";
import "./Header.css";

const Header = ({ currentPage, setCurrentPage }) => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleNavClick = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsResourcesOpen(false); // Close dropdown when navigating
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsResourcesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 150); // Small delay to allow moving to dropdown
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
          <span className="university-name">Dhaka University</span>
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
            className={`nav-link ${
              currentPage === "directory" ? "active" : ""
            }`}
            onClick={(e) => handleNavClick("directory", e)}
          >
            Directory
          </a>
          <a href="/academics" className="nav-link">
            Academics
          </a>
          <a href="/projects" className="nav-link">
            Projects
          </a>
          <a href="/achievements" className="nav-link">
            Achievements
          </a>
          <a
            href="/notices"
            className={`nav-link ${currentPage === "notices" ? "active" : ""}`}
            onClick={(e) => handleNavClick("notices", e)}
          >
            Notices
          </a>
          <a href="/events" className="nav-link">
            Events
          </a>
          <div
            className="nav-dropdown"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/resources" className="nav-link">
              Resources
              <span className="dropdown-arrow">▼</span>
            </a>
            {isResourcesOpen && (
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
              </div>
            )}
          </div>
        </nav>
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <button className="menu-btn">☰</button>
          <div
            className="user-profile-header"
            onClick={() => setCurrentPage("user-profile")}
          >
            <div className="user-avatar">👤</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
