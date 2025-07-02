import React from "react";
import "./FacultyProfile.css";

const FacultyProfile = ({ faculty, onBack }) => {
  if (!faculty) {
    return (
      <div className="faculty-profile-page">
        <div className="profile-header">
          <button onClick={onBack} className="back-button">
            ← Back to Directory
          </button>
          <h1>Faculty not found</h1>
        </div>
      </div>
    );
  }

  const courses = [
    { code: "CSE 101", name: "Introduction to Programming", credits: "3.00" },
    { code: "CSE 201", name: "Data Structures and Algorithms", credits: "3.00" },
    { code: "CSE 301", name: "Machine Learning", credits: "3.00" }
  ];

  const publications = [
    {
      authors: "Rahman, A. et al. (2024)",
      title: "Deep Learning for Natural Language Processing",
      journal: "Journal of AI Research"
    },
    {
      authors: "Rahman, A. et al. (2023)",
      title: "A Novel Approach to Data Mining",
      journal: "International Conference on Data Science"
    }
  ];

  return (
    <div className="faculty-profile-page">
      <div className="profile-header">
        <button onClick={onBack} className="back-button">
          ← Back to Directory
        </button>
        <div className="breadcrumb">
          <span>Teacher Detailed Information</span>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="faculty-header-section">
            <div className="faculty-avatar-large">
              <div className="avatar-placeholder-large">👤</div>
              <div className={`status-indicator-large ${faculty.status.toLowerCase()}`}></div>
            </div>
            <div className="faculty-basic-info">
              <h1 className="faculty-title">{faculty.name}</h1>
              <p className="faculty-position">{faculty.role}, Computer Science, University of Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="profile-sections">
            <section className="about-section">
              <h2 className="section-title">About</h2>
              <p className="about-text">
                Dr. {faculty.name.split(' ').slice(-1)[0]} is a distinguished researcher and educator in the Department of Computer Science and Engineering at the University of Dhaka. 
                With extensive experience in {faculty.specialization.toLowerCase()}, {faculty.department.toLowerCase()}, and computational methods, Dr. {faculty.name.split(' ').slice(-1)[0]} has contributed significantly to 
                both theoretical research and practical applications. The professor is committed to fostering innovative research and maintaining 
                a collaborative and supportive learning environment for students.
              </p>
            </section>

            <section className="courses-section">
              <h2 className="section-title">Courses</h2>
              <div className="courses-table">
                <div className="table-header">
                  <div className="header-cell">Course Code</div>
                  <div className="header-cell">Course Title</div>
                  <div className="header-cell">Credits</div>
                </div>
                {courses.map((course, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell course-code">{course.code}</div>
                    <div className="table-cell course-name">{course.name}</div>
                    <div className="table-cell course-credits">{course.credits}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="publications-section">
              <h2 className="section-title">Publications</h2>
              <div className="publications-list">
                {publications.map((publication, index) => (
                  <div key={index} className="publication-item">
                    <p className="publication-authors">{publication.authors}</p>
                    <p className="publication-title">"{publication.title}"</p>
                    <p className="publication-journal">{publication.journal}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="contact-section">
              <h2 className="section-title">Contact</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong>
                  <span>{faculty.name.toLowerCase().replace(/\s+/g, '.').replace('dr.', '')}@du.ac.bd</span>
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong>
                  <span>+880 2-9661920 Ext: 7456</span>
                </div>
                <div className="contact-item">
                  <strong>Office:</strong>
                  <span>Room 304, New Science Complex Building</span>
                  <span>University of Dhaka 1000</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
