import React from "react";
import "./ProgramDetails.css";

const ProgramDetails = ({ program, onBack, onAdmissionsInfo }) => {
  if (!program) {
    return (
      <div className="program-details-page">
        <div className="details-header">
          <button onClick={onBack} className="back-button">
            ← Back to Academics
          </button>
          <h1>Program not found</h1>
        </div>
      </div>
    );
  }

  const programInfo = {
    duration: "4 Years (8 Semesters)",
    credits: "160 Credit Hours",
    admissionRequirements: [
      "HSC/A-Level with Mathematics and Physics",
      "Minimum GPA of 4.0 (out of 5.0)",
      "Admission Test Score"
    ],
    careerProspects: [
      "Software Engineer",
      "System Analyst",
      "Data Scientist",
      "Web Developer",
      "Mobile App Developer",
      "Cybersecurity Specialist",
      "Research Scientist"
    ],
    coreSubjects: [
      "Programming Fundamentals",
      "Data Structures and Algorithms",
      "Computer Networks",
      "Database Systems",
      "Software Engineering",
      "Operating Systems",
      "Computer Architecture",
      "Artificial Intelligence"
    ],
    facultyMembers: [
      "Dr. Ahmed Rahman - Head of Department",
      "Dr. Sarah Khan - AI & Machine Learning",
      "Prof. Mohammad Ali - Software Engineering",
      "Dr. Fatima Ahmed - Database Systems"
    ]
  };

  return (
    <div className="program-details-page">
      <div className="page-header">
        <button onClick={onBack} className="back-button">
          ← Back to Academics
        </button>
      </div>
      
      <div className="details-header">
        <div className="program-hero">
          <div className="program-icon">🎓</div>
          <div className="program-title-section">
            <h1 className="program-title">{program.title}</h1>
            <p className="program-subtitle">{program.description}</p>
            <div className="program-meta">
              <span className="meta-item">
                <strong>Duration:</strong> {programInfo.duration}
              </span>
              <span className="meta-item">
                <strong>Credits:</strong> {programInfo.credits}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="details-content">
        <div className="content-grid">
          <div className="main-content">
            <section className="details-section">
              <h2 className="section-title">Program Overview</h2>
              <div className="section-content">
                <p>
                  This comprehensive program is designed to provide students with a strong foundation 
                  in computer science and engineering principles. Students will gain hands-on experience 
                  with cutting-edge technologies and develop the skills necessary to succeed in the 
                  rapidly evolving field of computer science.
                </p>
                <p>
                  The curriculum combines theoretical knowledge with practical applications, ensuring 
                  graduates are well-prepared for both industry careers and advanced academic pursuits.
                </p>
              </div>
            </section>

            <section className="details-section">
              <h2 className="section-title">Core Subjects</h2>
              <div className="section-content">
                <div className="subjects-grid">
                  {programInfo.coreSubjects.map((subject, index) => (
                    <div key={index} className="subject-item">
                      <span className="subject-icon">📚</span>
                      <span className="subject-name">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="details-section">
              <h2 className="section-title">Admission Requirements</h2>
              <div className="section-content">
                <ul className="requirements-list">
                  {programInfo.admissionRequirements.map((requirement, index) => (
                    <li key={index} className="requirement-item">
                      <span className="requirement-icon">✓</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="details-section">
              <h2 className="section-title">Career Prospects</h2>
              <div className="section-content">
                <div className="careers-grid">
                  {programInfo.careerProspects.map((career, index) => (
                    <div key={index} className="career-item">
                      <span className="career-icon">💼</span>
                      <span className="career-name">{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="details-section">
              <h2 className="section-title">Faculty Members</h2>
              <div className="section-content">
                <div className="faculty-list">
                  {programInfo.facultyMembers.map((faculty, index) => (
                    <div key={index} className="faculty-item">
                      <span className="faculty-icon">👨‍🏫</span>
                      <span className="faculty-info">{faculty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="sidebar">
            <div className="info-card">
              <h3 className="card-title">Quick Information</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Program Type:</span>
                  <span className="info-value">Undergraduate</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">{programInfo.duration}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Credits:</span>
                  <span className="info-value">{programInfo.credits}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Delivery Mode:</span>
                  <span className="info-value">On-campus</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Language:</span>
                  <span className="info-value">English</span>
                </div>
              </div>
            </div>

            <div className="action-card">
              <h3 className="card-title">Take Action</h3>
              <div className="action-buttons">
                <button 
                  className="action-button primary"
                  onClick={onAdmissionsInfo}
                >
                  View Admissions Info
                </button>
                <button className="action-button secondary">
                  Download Curriculum
                </button>
                <button className="action-button secondary">
                  Apply Now
                </button>
                <button className="action-button secondary">
                  Contact Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
