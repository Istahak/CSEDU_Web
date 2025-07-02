import React from "react";
import "./Header.css";

const Header = ({ currentPage, setCurrentPage }) => {
  const handleNavClick = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
  };

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
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={(e) => handleNavClick('home', e)}
          >
            Home
          </a>
          <a 
            href="/directory" 
            className={`nav-link ${currentPage === 'directory' ? 'active' : ''}`}
            onClick={(e) => handleNavClick('directory', e)}
          >
            Directory
          </a>
          <a href="/academics" className="nav-link">Academics</a>
          <a href="/projects" className="nav-link">Projects</a>
          <a href="/achievements" className="nav-link">Achievements</a>
          <a href="/notices" className="nav-link">Notices</a>
          <a href="/events" className="nav-link">Events</a>
          <a href="/resources" className="nav-link">Resources</a>
        </nav>
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <button className="menu-btn">☰</button>
          <div className="user-profile">
            <div className="user-avatar">👤</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
