import React from "react";
import "./Academics.css";

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
  },
  {
    id: 3,
    title: "International Program in Computer Science and Engineering",
    description: "The International Program in Computer Science and Engineering is designed for international students seeking quality education in computer science.",
    status: "Available",
    image: "🌍"
  }
];

const DegreeOutlines = ({ onProgramSelect }) => (
  <div className="academics-page" style={{ boxShadow: 'none', background: 'transparent' }}>
    {/* <div className="academics-header">
      <h1 className="page-title">Degree Outlines</h1>
      <p className="page-subtitle">
        Explore comprehensive degree programs for the Department of Computer Science and Engineering
      </p>
    </div> */}
    <div className="academics-content">
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
    </div>
    {/* <div className="view-more-section">
      <button className="view-more-button">
        View All Programs
      </button>
    </div> */}
  </div>
);

export default DegreeOutlines;
