import React from "react";
import cseduImg from "../assets/images/csedu.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../api/config";

// const BASE_URL = API_CONFIG.BASE_URL;

const announcements = [
  {
    id: 1,
    title: "Academic Calendar for Fall 2024",
    description:
      "View the full academic calendar for detailed information on course registration, exams, and holidays. Important dates and deadlines for the upcoming semester.",
    type: "Academic",
    date: "2024-07-01",
  },
  {
    id: 2,
    title: "New Administrative Procedures",
    description:
      "Learn about the new procedures for submitting documents, requesting approvals, and other administrative tasks. Changes to the department's administrative procedures.",
    type: "Administrative",
    date: "2024-06-28",
  },
  {
    id: 3,
    title: "Department-Wide Announcements",
    description:
      "Find out about upcoming events, workshops, and other important news from the department. General announcements and updates for all students and staff.",
    type: "General",
    date: "2024-06-25",
  },
];

const getNoticeTypeColor = (type) => {
  switch (type) {
    case "Academic":
      return "academic";
    case "Administrative":
      return "administrative";
    case "General":
      return "general";
    default:
      return "general";
  }
};


// Added By Tanzim (Date : 2025-07-11)

const Home = ({ setCurrentPage }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/notices`,
        { params: { skip: 0, limit: 3 } }
    );
      console.log("API Response:", response.data); // Debug response
      const fetchedNotices = response.data.length > 0
        ? response.data.map(notice => ({
            id: notice.id || notice.notice_id || `temp-${Math.random()}`,
            title: notice.title || "Untitled",
            description: notice.description || "No description",
            type: notice.type || "General",
            date: notice.date || "2025-07-11",
          }))
        : announcements; // Fallback to static announcements
      setNotices(fetchedNotices);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err.message, err.response?.data); // Detailed error
      setError(`Failed to fetch notices: ${err.message}. Using static announcements.`);
      setNotices(announcements); // Fallback to static on error
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleNavigation = (page) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <img src={cseduImg} alt="CSEDU Building" className="hero-img-actual" />
        </div>
        <div className="hero-content">
          <p className="hero-description">
            The Department of Computer Science at Academic Excellence University is dedicated to advancing the field of computing 
            through innovative research and comprehensive education. Our faculty are leaders in their respective fields, committed to 
            fostering collaborative and inclusive learning environment. We offer a wide range of programs, from undergraduate to 
            doctoral levels, designed to equip students with the knowledge and skills needed to excel in the rapidly evolving tech 
            industry.
          </p>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="announcements-section">
        <h2 className="section-title">Announcements</h2>
        <div className="notices-grid">
          {announcements.map((a) => (
            <div className="notice-card" key={a.id}>
              <div className="notice-card-header">
                <h3 className="notice-title">{a.title}</h3>
                <span className={`notice-badge ${getNoticeTypeColor(a.type)}`}>{a.type}</span>
              </div>
              <p className="notice-description">{a.description}</p>
              <div className="notice-footer">
                <span className="notice-date">{new Date(a.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <h2 className="section-title">Quick Links</h2>
        <div className="quick-links-grid">
          <div className="quick-link-card" onClick={() => handleNavigation("degree-outlines")}>
            <div className="card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12l-10-7-10 7 10 7 10-7z"/><path d="M2 12v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7"/></svg>
            </div>
            <h3>Academic Programs</h3>
          </div>
          <div className="quick-link-card" onClick={() => handleNavigation("projects")}>
            <div className="card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <h3>Research Areas</h3>
          </div>
          <div className="quick-link-card" onClick={() => handleNavigation("directory")}>
            <div className="card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
            </div>
            <h3>Faculty Directory</h3>
          </div>
          <div className="quick-link-card" onClick={() => handleNavigation("course-list")}>
            <div className="card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
            </div>
            <h3>Course Catalog</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
