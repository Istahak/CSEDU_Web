import React from "react";
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import hero4 from "../assets/images/hero4.jpg";
import hero5 from "../assets/images/hero5.jpg";
import hero6 from "../assets/images/hero6.jpg";

const heroImages = [
  {
    src: hero1,
    label: "Seminar by CSEDU Alumni on Higher Studies and Research in the US",
  },
  {
    src: hero2,
    label:
      "A group of faculty members and wining team students of Code Samurai 2024 call on the honorable Ambassador of Japan in Bangladesh",
  },
  {
    src: hero3,
    label:
      "CSEDU Celebrates Talent and Excellence at Cultural Program and Annual Prize Giving Ceremony-2025",
  },
  {
    src: hero4,
    label:
      "A courtesy visit and exchange of views was held with the newly appointed Dean of Faculty of Engineering and Technology",
  },
  {
    src: hero5,
    label:
      "CSEDU's 26th Batch Graduation Week: A Celebration of Achievement and Community",
  },
  { src: hero6, label: "CSEDU warmly welcomes the UG Students of 31st Batch" },
];

import { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../api/config";
import "./Home.css";
// import { useNavigate } from "react-router-dom";

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
        { params: { skip: 0, limit: 5 } }
    );
      console.log("API Response:", response.data); // Debug response
      const fetchedNotices = response.data.length > 0
        ? response.data.map(notice => ({
            id: notice.id || notice.notice_id || `temp-${Math.random()}`,
            title: notice.title || "Untitled",
            description: notice.description || notice.content || "No description",
            type: notice.category || notice.type || "General",
            date: notice.date || notice.expiry_date || notice.created_at || "2025-07-11",
          }))
        : announcements; // Fallback to static announcements
      setNotices(fetchedNotices);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err.message, err.response?.data); // Detailed error
      setError(
        `Failed to fetch notices: ${err.message}. Using static announcements.`
      );
      setNotices(announcements); // Fallback to static on error
      setLoading(false);
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); // changes every 2 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // const navigate = useNavigate();

  const handleNavigation = (page) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-carousel-section">
        <div className="hero-carousel-container">
          <div className="hero-carousel-slide">
            <img
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].label}
              className="hero-carousel-image"
            />

            <div className="hero-carousel-label">
              {heroImages[currentImageIndex].label}
            </div>
            <button className="carousel-arrow left" onClick={goToPrevious}>
              ‹
            </button>
            <button className="carousel-arrow right" onClick={goToNext}>
              ›
            </button>
          </div>

          <div className="hero-overlay-content">
            <p className="hero-tagline">
              #1 Department in Bangladesh for CS Education
            </p>
            <h1 className="hero-overlay-title">Welcome to CSEDU</h1>

            <p className="hero-overlay-subtext">
              We empower future leaders through academic excellence, research,
              and innovation in computing.
            </p>
            <button
              className="hero-overlay-button"
              onClick={() => handleNavigation("degree-outlines")}
            >
              Explore Programs
            </button>
          </div>
        </div>
      </section>

      {/* <section className="hero-modern">
        <div className="hero-modern-content">
          <div className="hero-text-area">
            <p className="hero-tagline">
              #1 Department in Bangladesh for CS Education
            </p>
            <h1 className="hero-title">Welcome to CSEDU</h1>
            <p className="hero-subtext">
              We empower future leaders through academic excellence, research,
              and innovation in computing.
            </p>
            <button className="btn btn-primary">Explore Programs</button>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-brush">
              <img
                src={heroImages[currentImageIndex]}
                alt="CSEDU Building"
                className="hero-img-rounded fade-transition"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="hero-section">
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
      </section> */}

      {/* Announcements Section */}

      <section className="announcements-section">
        <h2 className="section-title">Announcements</h2>
        {/* <div className="section-underline"></div> */}
        <div className="notices-grid">
          {notices.map((a) => (
            <div 
              className="notice-card" 
              key={a.id}
              onClick={() => setCurrentPage && setCurrentPage("notice-details", a)}
              style={{ cursor: "pointer" }}
            >
              <div className="notice-card-header">
                <h3 className="notice-title">{a.title}</h3>
                <div className="notice-type-and-date">
                  <span
                    className={`notice-badge ${getNoticeTypeColor(a.type)}`}
                  >
                    {a.type}
                  </span>
                  <span className="notice-date">
                    {new Date(a.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="notice-description">{a.description}</p>
            </div>
          ))}
        </div>
        <div className="announcement-cta">
          <button onClick={() => handleNavigation("notices")}>
            Read All
          </button>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <h2 className="section-title">Quick Links</h2>
        <div className="quick-links-grid">
          <div className="quick-link-card" onClick={() => handleNavigation("degree-outlines")}> 
            <div className="card-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#353839"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12l-10-7-10 7 10 7 10-7z" />
                <path d="M2 12v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7" />
              </svg>
            </div>
            <h3>Academic Programs</h3>
          </div>
          <div className="quick-link-card" onClick={() => handleNavigation("projects")}> 
            <div className="card-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#353839"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3>Research Areas</h3>
          </div>
          <div className="quick-link-card" onClick={() => handleNavigation("directory")}> 
            <div className="card-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#353839"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
              </svg>
            </div>
            <h3>Faculty Directory</h3>
          </div>
          <div className="quick-link-card" onClick={() => handleNavigation("course-list")}> 
            <div className="card-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#353839"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
              </svg>
            </div>
            <h3>Course Catalog</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
