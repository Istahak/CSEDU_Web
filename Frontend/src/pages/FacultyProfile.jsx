import React from "react";
import "./FacultyProfile.css";

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
    <div className="faculty-profile-page modern-faculty-profile" style={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%)', minHeight: '100vh', padding: 0 }}>
      {/* <div className="profile-header modern-profile-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 4vw 1rem 4vw', background: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)', borderRadius: '0 0 2rem 2rem' }}>
        <button onClick={onBack} className="back-button" style={{ fontWeight: 600, fontSize: '1.1rem', background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: 0 }}>← Back to Directory</button>
        <div className="breadcrumb" style={{ fontWeight: 500, color: '#64748b', fontSize: '1.1rem' }}>
          <span>Faculty Detailed Profile</span>
        </div>
      </div> */}
      <div className="profile-content modern-profile-content" style={{ display: 'flex', flexDirection: 'row', gap: '2vw', padding: '2vw 4vw', maxWidth: 1400, margin: '0 auto', boxShadow: 'none', borderRadius: 0, background: 'none' }}>
        {/* Left: Avatar & Basic Info */}
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.95)', borderRadius: '2rem', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)', padding: '2.5rem 2rem 2rem 2rem', minWidth: 320, maxWidth: 400 }}>
          <div className="faculty-avatar-large modern-faculty-avatar-large" style={{ marginBottom: 24 }}>
            <div className="avatar-placeholder-large" style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #e0e7ef 60%, #c7d2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, color: '#64748b', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)' }}>👤</div>
          </div>
          <h1 className="faculty-title modern-faculty-title" style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>{faculty.name}</h1>
          <p className="faculty-position modern-faculty-position" style={{ color: '#475569', fontWeight: 500, margin: '0.5rem 0 0.7rem 0', fontSize: '1.1rem', textAlign: 'center' }}>{faculty.role}, Computer Science, University of Dhaka, Bangladesh</p>
          <ul className="faculty-specializations modern-faculty-specializations" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', margin: 0, padding: 0, listStyle: 'none' }}>
            {faculty.specialization.map((spec, idx) => (
              <li key={idx} className="faculty-specialization modern-faculty-specialization" style={{ background: '#e0e7ef', color: '#2563eb', borderRadius: 12, padding: '0.3em 0.9em', fontSize: '0.98em', fontWeight: 500 }}>{spec}</li>
            ))}
          </ul>
          <div className="contact-info" style={{ marginTop: 32, width: '100%' }}>
            <div className="contact-item" style={{ marginBottom: 10 }}>
              <strong>Email:</strong> <span style={{ color: '#2563eb', fontWeight: 500 }}>{faculty.name.toLowerCase().replace(/\s+/g, '.').replace('dr.', '')}@du.ac.bd</span>
            </div>
            <div className="contact-item" style={{ marginBottom: 10 }}>
              <strong>Phone:</strong> <span>+880 2-9661920 Ext: 7456</span>
            </div>
            <div className="contact-item">
              <strong>Office:</strong> <span>Room 304, New Science Complex Building</span><br /><span>University of Dhaka 1000</span>
            </div>
          </div>
        </div>
        {/* Right: Details */}
        <div style={{ flex: 2.5, display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <section className="background-section modern-background-section" style={{ background: 'rgba(255,255,255,0.92)', borderRadius: '1.5rem', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)', padding: '2rem 2.5rem', marginBottom: 0 }}>
            <h2 className="section-title modern-section-title" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#2563eb', marginBottom: 18 }}>Background</h2>
            <div className="background-details modern-background-details" style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
              <div className="background-education modern-background-education" style={{ flex: 1, minWidth: 220 }}>
                <h3 style={{ fontSize: '1.08rem', color: '#334155', marginBottom: 8 }}>Education</h3>
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {faculty.background.education.map((ed, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}><strong>{ed.degree}</strong>, {ed.institution} ({ed.year})</li>
                  ))}
                </ul>
              </div>
              <div className="background-joined modern-background-joined" style={{ flex: 0.7, minWidth: 180 }}>
                <h3 style={{ fontSize: '1.08rem', color: '#334155', marginBottom: 8 }}>Joined CSEDU</h3>
                <div style={{ fontWeight: 500, color: '#2563eb', fontSize: '1.1rem' }}>{faculty.background.joined}</div>
              </div>
            </div>
          </section>
          <section className="bio-section" style={{ background: 'rgba(255,255,255,0.92)', borderRadius: '1.5rem', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)', padding: '2rem 2.5rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb', marginBottom: 14 }}>Bio</h2>
            <div className="bio-text" style={{ color: '#475569', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>{faculty.background.bio}</div>
          </section>
          <section className="courses-section" style={{ background: 'rgba(255,255,255,0.92)', borderRadius: '1.5rem', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)', padding: '2rem 2.5rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.18rem', fontWeight: 700, color: '#2563eb', marginBottom: 14 }}>Courses</h2>
            <div className="courses-table" style={{ width: '100%' }}>
              <div className="table-header" style={{ display: 'flex', fontWeight: 600, color: '#334155', borderBottom: '1.5px solid #e0e7ef', marginBottom: 8 }}>
                <div className="header-cell" style={{ flex: 1 }}>Course Code</div>
                <div className="header-cell" style={{ flex: 3 }}>Course Title</div>
                <div className="header-cell" style={{ flex: 1 }}>Credits</div>
              </div>
              {faculty.courses && faculty.courses.map((courseId) => {
                const course = allCourses.find(c => c.id === courseId);
                return course ? (
                  <div key={course.id} className="table-row" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f1f5f9', padding: '0.4em 0' }}>
                    <div 
                      className="table-cell course-code" 
                      style={{ flex: 1, color: '#2563eb', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => onCourseSelect && onCourseSelect(course)}
                    >
                      {course.code}
                    </div>
                    <div 
                      className="table-cell course-name" 
                      style={{ flex: 3, cursor: 'pointer' }}
                      onClick={() => onCourseSelect && onCourseSelect(course)}
                    >
                      {course.name}
                    </div>
                    <div className="table-cell course-credits" style={{ flex: 1 }}>{course.credits}</div>
                  </div>
                ) : null;
              })}
            </div>
          </section>
          <section className="publications-section" style={{ background: 'rgba(255,255,255,0.92)', borderRadius: '1.5rem', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)', padding: '2rem 2.5rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.18rem', fontWeight: 700, color: '#2563eb', marginBottom: 14 }}>Publications</h2>
            <div className="publications-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {faculty.publications && faculty.publications.map((pubId) => {
                const pub = publications.find(p => p.id === pubId);
                return pub ? (
                  <div key={pub.id} className="publication-item" style={{ background: '#f8f9fa', borderRadius: 6, borderLeft: '4px solid #4a90e2', padding: '1.5rem' }}>
                    <p className="publication-authors" style={{ color: '#6c757d', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>{pub.authors}</p>
                    <p className="publication-title" style={{ color: '#212529', fontWeight: 600, margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{pub.title}</p>
                    <p className="publication-journal" style={{ color: '#495057', fontStyle: 'italic', margin: 0, fontSize: '0.9rem' }}>{pub.journal}</p>
                  </div>
                ) : null;
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
