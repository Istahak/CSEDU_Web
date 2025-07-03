import React, { useState } from "react";
import "./Academics.css";

const Academics = ({ onCourseSelect, onProgramSelect }) => {
  const [selectedSection, setSelectedSection] = useState("degree-outlines");

  const degreeOutlines = [
    {
      id: 1,
      title: "Bachelor of Science in Computer Science and Engineering",
      description: "The Bachelor of Science in Computer Science and Engineering program is designed to provide students with a solid foundation in computer science.",
      status: "Available",
      image: "💻"
    },
    {
      id: 2,
      title: "Master of Science in Computer Science and Engineering",
      description: "The Master of Science in Computer Science and Engineering program provides advanced knowledge and skills in specialized areas of computer science.",
      status: "Available",
      image: "🎓"
    }
  ];

  const courseList = [
    {
      id: 1,
      code: "CSE101",
      title: "Introduction to Programming",
      description: "Fundamental concepts of programming using structured and object-oriented programming paradigms.",
      status: "Available",
      image: "💻"
    },
    {
      id: 2,
      code: "CSE201",
      title: "Data Structures and Algorithms",
      description: "Study of fundamental data structures and algorithms for efficient problem solving.",
      status: "Available",
      image: "📊"
    },
    {
      id: 3,
      code: "CSE301",
      title: "Database Systems",
      description: "Design and implementation of database systems, SQL, and database management concepts.",
      status: "Available",
      image: "🗃️"
    },
    {
      id: 4,
      code: "CSE401",
      title: "Software Engineering",
      description: "Principles and practices of software development, project management, and quality assurance.",
      status: "Available",
      image: "🛠️"
    },
    {
      id: 5,
      code: "CSE501",
      title: "Machine Learning",
      description: "Introduction to machine learning algorithms, neural networks, and artificial intelligence.",
      status: "Available",
      image: "🤖"
    },
    {
      id: 6,
      code: "CSE601",
      title: "Computer Networks",
      description: "Network protocols, architectures, and distributed systems fundamentals.",
      status: "Available",
      image: "🌐"
    }
  ];

  const renderDegreeOutlines = () => (
    <div className="content-section">
      <h2 className="section-title">Degree Outlines</h2>
      <div className="cards-grid">
        {degreeOutlines.map((degree) => (
          <div 
            key={degree.id} 
            className="academic-card clickable"
            onClick={() => onProgramSelect && onProgramSelect(degree)}
          >
            <div className="card-image">
              <div className="image-placeholder">
                <span className="image-icon">{degree.image}</span>
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">{degree.title}</h3>
              <p className="card-description">{degree.description}</p>
              <div className="card-footer">
                <span className={`status-badge ${degree.status.toLowerCase()}`}>
                  {degree.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourseList = () => (
    <div className="content-section">
      <h2 className="section-title">Course List</h2>
      <div className="cards-grid">
        {courseList.map((course) => (
          <div 
            key={course.id} 
            className="academic-card clickable"
            onClick={() => onCourseSelect && onCourseSelect(course)}
          >
            <div className="card-image">
              <div className="image-placeholder">
                <span className="image-icon">{course.image}</span>
                <div className="course-code">{course.code}</div>
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">{course.title}</h3>
              <p className="card-description">{course.description}</p>
              <div className="card-footer">
                <span className={`status-badge ${course.status.toLowerCase()}`}>
                  {course.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="academics-page">
      <div className="academics-header">
        <h1 className="page-title">Degree Outlines and Course Lists</h1>
        <p className="page-subtitle">
          Explore comprehensive degree programs and detailed course information for the Department of Computer Science and Engineering
        </p>
      </div>

      <div className="academics-navigation">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${selectedSection === 'degree-outlines' ? 'active' : ''}`}
            onClick={() => setSelectedSection('degree-outlines')}
          >
            <span className="nav-icon">🎓</span>
            Degree Outlines
          </button>
          <button 
            className={`nav-tab ${selectedSection === 'course-list' ? 'active' : ''}`}
            onClick={() => setSelectedSection('course-list')}
          >
            <span className="nav-icon">📚</span>
            Course List
          </button>
        </div>
      </div>

      <div className="academics-content">
        {selectedSection === 'degree-outlines' && renderDegreeOutlines()}
        {selectedSection === 'course-list' && renderCourseList()}
      </div>

      <div className="view-more-section">
        <button className="view-more-button">
          View All Programs
        </button>
      </div>
    </div>
  );
};

export default Academics;
