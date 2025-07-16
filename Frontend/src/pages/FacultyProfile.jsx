import React from "react";
import "./ProjectDetails.css";

const facultyMembers = [
  {
    id: 1,
    name: "Dr. Abdul Razzaque",
    role: "Faculty",
    specialization: ["Machine Learning", "Distributed Systems"],
    courses: ["CSE101", "CSE201"],
    publications: ["PUB001", "PUB002"],
    background: {
      education: [
        { degree: "PhD in Computer Science", institution: "Kyushu University, Japan", year: 2005 },
        { degree: "MSc in Computer Science", institution: "University of Dhaka", year: 1998 }
      ],
      joined: 2006,
      bio: "Dr. Razzaque is a pioneer in distributed systems and machine learning, with over 100 publications and several international collaborations."
    }
  },
  {
    id: 2,
    name: "Dr. Mosaddek Khan",
    role: "Faculty",
    specialization: ["Machine Learning", "Networking"],
    courses: ["CSE101"],
    publications: ["PUB001"],
    background: {
      education: [
        { degree: "PhD in Computer Science", institution: "University of Tokyo", year: 2008 },
        { degree: "BSc in Computer Science", institution: "University of Dhaka", year: 2002 }
      ],
      joined: 2009,
      bio: "Dr. Khan's research focuses on scalable networking and intelligent systems. He is a recipient of multiple research grants."
    }
  },
  {
    id: 3,
    name: "Dr. Farhan Ahmed",
    role: "Faculty",
    specialization: ["Machine Learning", "Data Mining"],
    courses: ["CSE201", "CSE301"],
    publications: ["PUB002"],
    background: {
      education: [
        { degree: "PhD in Data Mining", institution: "NUS, Singapore", year: 2012 },
        { degree: "MSc in Computer Science", institution: "University of Dhaka", year: 2006 }
      ],
      joined: 2013,
      bio: "Dr. Ahmed is known for his work in data mining and pattern recognition, mentoring many successful graduate students."
    }
  },
  {
    id: 4,
    name: "Dr. Mosaddek Khan",
    role: "Professor",
    specialization: ["Multi Agent Systems", "Artificial Intelligence"],
    courses: ["CSE301"],
    publications: ["PUB001"],
    background: {
      education: [
        { degree: "PhD in Artificial Intelligence", institution: "MIT", year: 2010 },
        { degree: "BSc in Computer Science", institution: "University of Dhaka", year: 2004 }
      ],
      joined: 2011,
      bio: "Dr. Khan is a leading expert in multi-agent systems and AI, with a passion for teaching and research."
    }
  },
  {
    id: 5,
    name: "Dr. Mosaddek Khan",
    role: "Professor",
    specialization: ["Multi Agent Systems", "Software Engineering"],
    courses: ["CSE201"],
    publications: ["PUB002"],
    background: {
      education: [
        { degree: "PhD in Software Engineering", institution: "Stanford University", year: 2011 },
        { degree: "MSc in Computer Science", institution: "University of Dhaka", year: 2005 }
      ],
      joined: 2012,
      bio: "Dr. Khan has extensive industry experience and is focused on bridging the gap between academia and software industry practices."
    }
  },
  {
    id: 6,
    name: "Dr. Mosaddek Khan",
    role: "Professor",
    specialization: ["Multi Agent Systems"],
    courses: ["CSE101"],
    publications: ["PUB001"],
    background: {
      education: [
        { degree: "PhD in Computer Science", institution: "Harvard University", year: 2015 },
        { degree: "BSc in Computer Science", institution: "University of Dhaka", year: 2009 }
      ],
      joined: 2016,
      bio: "Dr. Khan's expertise lies in intelligent systems and their applications in real-world problems. He is dedicated to student mentorship and research."
    }
  },
  {
    id: 7,
    name: "Dr. Mosaddek Khan",
    role: "Professor",
    specialization: ["Multi Agent Systems"],
    courses: ["CSE301"],
    publications: ["PUB002"],
    background: {
      education: [
        { degree: "PhD in Computer Science", institution: "Caltech", year: 2014 },
        { degree: "MSc in Computer Science", institution: "University of Dhaka", year: 2008 }
      ],
      joined: 2015,
      bio: "With a strong background in AI and machine learning, Dr. Khan is involved in various national and international research projects."
    }
  },
  {
    id: 8,
    name: "Dr. Mosaddek Khan",
    role: "Professor",
    specialization: ["Multi Agent Systems"],
    courses: ["CSE201"],
    publications: ["PUB001"],
    background: {
      education: [
        { degree: "PhD in Computer Science", institution: "Oxford University", year: 2013 },
        { degree: "BSc in Computer Science", institution: "University of Dhaka", year: 2007 }
      ],
      joined: 2014,
      bio: "Dr. Khan has published extensively in top-tier journals and conferences, and he is a sought-after speaker at international forums."
    }
  },
  {
    id: 9,
    name: "Dr. Mosaddek Khan",
    role: "Professor",
    specialization: ["Multi Agent Systems"],
    courses: ["CSE101"],
    publications: ["PUB002"],
    background: {
      education: [
        { degree: "PhD in Computer Science", institution: "Cambridge University", year: 2012 },
        { degree: "MSc in Computer Science", institution: "University of Dhaka", year: 2006 }
      ],
      joined: 2013,
      bio: "An expert in distributed computing and network systems, Dr. Khan is passionate about teaching and developing innovative computing solutions."
    }
  }
];

const FacultyProfile = ({ id, onBack, onCourseSelect }) => {
  const faculty = facultyMembers.find(f => f.id === id);
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

  // Example course and publication data (would come from a database in a real app)
  const allCourses = [
    { id: "CSE101", code: "CSE 101", name: "Introduction to Programming", credits: "3.00", title: "Introduction to Programming", description: "Fundamental concepts of programming using structured and object-oriented programming paradigms.", status: "Available", image: "💻", degree: "BSc CSE", semester: "1st" },
    { id: "CSE201", code: "CSE 201", name: "Data Structures and Algorithms", credits: "3.00", title: "Data Structures and Algorithms", description: "Study of fundamental data structures and algorithms for efficient problem solving.", status: "Available", image: "📊", degree: "BSc CSE", semester: "2nd" },
    { id: "CSE301", code: "CSE 301", name: "Machine Learning", credits: "3.00", title: "Machine Learning", description: "Introduction to machine learning algorithms, neural networks, and artificial intelligence.", status: "Available", image: "🤖", degree: "MSc CSE", semester: "1st" }
  ];

  const publications = [
    {
      id: "PUB001",
      authors: "Rahman, A. et al. (2024)",
      title: "Deep Learning for Natural Language Processing",
      journal: "Journal of AI Research"
    },
    {
      id: "PUB002",
      authors: "Rahman, A. et al. (2023)",
      title: "A Novel Approach to Data Mining",
      journal: "International Conference on Data Science"
    }
  ];

  return (
    <div className="notices-page">
      <div className="notices-container">
        {/* Hero Header Section */}
        <div className="project-hero-header">
          <div className="project-hero-content">
            <div className="project-category-badge">
              {faculty.role}
            </div>
            <h1 className="project-hero-title">{faculty.name}</h1>
            <p className="project-hero-description">
              {faculty.background.bio.slice(0, 200) + (faculty.background.bio.length > 200 ? "..." : "")}
            </p>
            <div className="project-hero-meta">
              <div className="hero-meta-item">
                <span className="meta-icon">🎓</span>
                <span className="meta-text">Joined {faculty.background.joined}</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-icon">📧</span>
                <span className="meta-text">{faculty.name.toLowerCase().replace(/\s+/g, '.').replace('dr.', '')}@du.ac.bd</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-icon">🏢</span>
                <span className="meta-text">Computer Science & Engineering</span>
              </div>
            </div>
          </div>
          <div className="project-hero-visual">
            <div className="hero-icon-container">
              <span className="hero-project-icon">👨‍🏫</span>
            </div>
          </div>
        </div>

        {/* Faculty Meta Bar */}
        <div className="project-meta-bar">
          <span className="project-meta-item">
            <strong>Role:</strong> {faculty.role}
          </span>
          <span className="project-meta-item">
            <strong>Joined:</strong> {faculty.background.joined}
          </span>
          <span className="project-meta-item">
            <strong>Office:</strong> Room 304, New Science Complex
          </span>
          {faculty.specialization && (
            <span className="project-meta-item">
              <strong>Specializations:</strong> {faculty.specialization.join(", ")}
            </span>
          )}
        </div>

        {/* Faculty Content Grid */}
        <div className="project-details-grid">
          <div className="project-main-content">
            <div className="notice-card scrollable-card">
              <div className="notice-card-header">
                <h3 className="notice-title-2">Biography</h3>
              </div>
              <div className="scrollable-content">
                <p className="notice-description">
                  {faculty.background.bio}
                </p>
              </div>
            </div>

            {faculty.specialization && (
              <div className="notice-card">
                <div className="notice-card-header">
                  <h3 className="notice-title-2">Specialization Areas</h3>
                </div>
                <div className="project-tags-detail">
                  {faculty.specialization.map((spec, i) => (
                    <span className="project-tag-detail" key={i}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="notice-card scrollable-card project-details-large">
              <div className="notice-card-header">
                <h3 className="notice-title-2">Academic Details</h3>
              </div>
              <div className="scrollable-content">
                <div className="detail-item">
                  <strong>Education:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    {faculty.background.education.map((ed, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>
                        <strong>{ed.degree}</strong>, {ed.institution} ({ed.year})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="detail-item">
                  <strong>Contact Information:</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    <p><strong>Email:</strong> {faculty.name.toLowerCase().replace(/\s+/g, '.').replace('dr.', '')}@du.ac.bd</p>
                    <p><strong>Phone:</strong> +880 2-9661920 Ext: 7456</p>
                    <p><strong>Office:</strong> Room 304, New Science Complex Building, University of Dhaka 1000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="project-sidebar">
            <div className="simple-info-card">
              <h3 className="simple-card-title">Faculty Information</h3>
              
              <div className="simple-info-list">
                <div className="simple-info-item">
                  <span className="simple-info-label">Position:</span>
                  <span className="simple-info-value">{faculty.role}</span>
                </div>
                
                <div className="simple-info-item">
                  <span className="simple-info-label">Department:</span>
                  <span className="simple-info-value">Computer Science & Engineering</span>
                </div>
                
                <div className="simple-info-item">
                  <span className="simple-info-label">Joined:</span>
                  <span className="simple-info-value">{faculty.background.joined}</span>
                </div>
                
                <div className="simple-info-item">
                  <span className="simple-info-label">Office:</span>
                  <span className="simple-info-value">Room 304, New Science Complex</span>
                </div>
                
                {faculty.specialization && (
                  <div className="simple-info-item">
                    <span className="simple-info-label">Specializations:</span>
                    <div className="simple-tags">
                      {faculty.specialization.map((spec, i) => (
                        <span className="simple-tag" key={i}>{spec}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="simple-info-card">
              <h3 className="simple-card-title">Courses Taught</h3>
              
              <div className="simple-info-list">
                {faculty.courses && faculty.courses.map((courseId) => {
                  const course = allCourses.find(c => c.id === courseId);
                  return course ? (
                    <div key={course.id} className="simple-info-item" style={{ 
                      flexDirection: 'column', 
                      alignItems: 'flex-start',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span 
                        style={{ 
                          color: '#4a90e2', 
                          fontWeight: 500, 
                          cursor: 'pointer', 
                          textDecoration: 'underline',
                          marginBottom: '0.25rem'
                        }}
                        onClick={() => onCourseSelect && onCourseSelect(course)}
                      >
                        {course.code} - {course.name}
                      </span>
                      <span style={{ color: '#6c757d', fontSize: '0.85rem' }}>{course.credits} Credits</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <div className="simple-info-card">
              <h3 className="simple-card-title">Publications</h3>
              
              <div className="simple-info-list">
                {faculty.publications && faculty.publications.map((pubId) => {
                  const pub = publications.find(p => p.id === pubId);
                  return pub ? (
                    <div key={pub.id} className="simple-info-item" style={{ 
                      flexDirection: 'column', 
                      alignItems: 'flex-start',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{ color: '#6c757d', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{pub.authors}</span>
                      <span style={{ color: '#212529', fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.9rem' }}>{pub.title}</span>
                      <span style={{ color: '#495057', fontStyle: 'italic', fontSize: '0.8rem' }}>{pub.journal}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <div className="simple-action-card">
              <h3 className="simple-card-title">Actions</h3>
              <div className="simple-action-list">
                <button 
                  className="simple-action-btn"
                  onClick={() => window.open(`mailto:${faculty.name.toLowerCase().replace(/\s+/g, '.').replace('dr.', '')}@du.ac.bd`, '_blank')}
                >
                  Send Email
                </button>
                <button className="simple-action-btn">
                  View Publications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
