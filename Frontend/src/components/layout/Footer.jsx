import React from "react";
import "./Footer.css";

const Footer = ({ setCurrentPage }) => {
  const handleNavClick = (page, e) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Department of Computer Science and Engineering</h3>
            <p>University of Dhaka</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/home" onClick={(e) => handleNavClick("home", e)}>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/directory"
                    onClick={(e) => handleNavClick("directory", e)}
                  >
                    Faculty
                  </a>
                </li>
                <li>
                  <a
                    href="/events"
                    onClick={(e) => handleNavClick("events", e)}
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a href="/achievements">Achievements</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a
                    href="/academic-calendar"
                    onClick={(e) => handleNavClick("academic-calendar", e)}
                  >
                    Academic Calendar
                  </a>
                </li>
                <li>
                  <a href="/syllabus">Syllabus</a>
                </li>
                <li>
                  <a
                    href="/notices"
                    onClick={(e) => handleNavClick("notices", e)}
                  >
                    Notices
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => handleNavClick("contact", e)}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
              <p>New Science Complex Building</p>
              <p>University of Dhaka 1000</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
