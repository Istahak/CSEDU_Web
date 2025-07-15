
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../api/config";
import "./FacultyProfile.css";


// Edited by Tanzim

// UUID validation function
const isValidUUID = (str) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// Static fallback data aligned with FacultyCreate schema
const staticFaculty = [
  {
    id: "b738b418-a6ae-495d-9b91-9bf3c2b09e2a",
    user_id: "4e9d8937-c2ab-4ca7-a9cf-708e74cf4cb7",
    full_name: "Dr. Abdul Razzaque",
    email: "abdul.razzaque@csedu.ac.bd",
    phone_number: "+880 1712 345601",
    specialization: "Machine Learning, Distributed Systems",
    research_areas: "Machine Learning, Distributed Systems",
    employment_status: "Active",
    designation: "Professor",
    department: "Computer Science & Engineering",
    experience: "19 years",
    number_of_publications: 2,
    qualifications: "PhD in Computer Science, Kyushu University, Japan, MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    user_id: "123e4567-e89b-12d3-a456-426614174002",
    full_name: "Dr. Mosaddek Khan",
    email: "mosaddek.khan@csedu.ac.bd",
    phone_number: "+880 1712 345602",
    specialization: "Machine Learning, Networking",
    research_areas: "Machine Learning, Networking",
    employment_status: "Active",
    designation: "Professor",
    department: "Computer Science & Engineering",
    experience: "12 years",
    number_of_publications: 1,
    qualifications: "PhD in Computer Science, MIT, MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    user_id: "123e4567-e89b-12d3-a456-426614174003",
    full_name: "Dr. Farhan Ahmed",
    email: "farhan.ahmed@csedu.ac.bd",
    phone_number: "+880 1712 345603",
    specialization: "Machine Learning, Data Mining",
    research_areas: "Machine Learning, Data Mining",
    employment_status: "Active",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    experience: "10 years",
    number_of_publications: 1,
    qualifications: "PhD in Data Mining, NUS, Singapore, MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    user_id: "123e4567-e89b-12d3-a456-426614174004",
    full_name: "Dr. Sarah Wilson",
    email: "sarah.wilson@csedu.ac.bd",
    phone_number: "+880 1712 345604",
    specialization: "Multi Agent Systems, Artificial Intelligence",
    research_areas: "Multi Agent Systems, Artificial Intelligence",
    employment_status: "Active",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    experience: "8 years",
    number_of_publications: 3,
    qualifications: "PhD in Computer Science, Carnegie Mellon University, MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    user_id: "123e4567-e89b-12d3-a456-426614174005",
    full_name: "Dr. Ahmed Hassan",
    email: "ahmed.hassan@csedu.ac.bd",
    phone_number: "+880 1712 345605",
    specialization: "Software Engineering, Database Systems",
    research_areas: "Software Engineering, Database Systems",
    employment_status: "Active",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    experience: "6 years",
    number_of_publications: 2,
    qualifications: "PhD in Computer Science, University of British Columbia, MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    user_id: "123e4567-e89b-12d3-a456-426614174006",
    full_name: "Dr. Fatima Rahman",
    email: "fatima@csedu.ac.bd",
    phone_number: "+880 1712 345606",
    specialization: "Computer Vision, Deep Learning",
    research_areas: "Computer Vision, Deep Learning",
    employment_status: "Active",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    experience: "5 years",
    number_of_publications: 2,
    qualifications: "PhD in Computer Science, University of Waterloo, MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    user_id: "123e4567-e89b-12d3-a456-426614174007",
    full_name: "Dr. Mohammad Ali",
    email: "mohammad.ali@csedu.ac.bd",
    phone_number: "+880 1712 345607",
    specialization: "Web Development, Human-Computer Interaction",
    research_areas: "Web Development, Human-Computer Interaction",
    employment_status: "Active",
    designation: "Lecturer",
    department: "Computer Science & Engineering",
    experience: "4 years",
    number_of_publications: 1,
    qualifications: "PhD in Computer Science, University of Calgary, MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    user_id: "123e4567-e89b-12d3-a456-426614174008",
    full_name: "Dr. Nadia Islam",
    email: "nadia@csedu.ac.bd",
    phone_number: "+880 1712 345608",
    specialization: "Cybersecurity, Network Security",
    research_areas: "Cybersecurity, Network Security",
    employment_status: "Active",
    designation: "Lecturer",
    department: "Computer Science & Engineering",
    experience: "3 years",
    number_of_publications: 1,
    qualifications: "PhD in Computer Science, Concordia University, MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    user_id: "123e4567-e89b-12d3-a456-426614174009",
    full_name: "Dr. Karim Uddin",
    email: "karim@csedu.ac.bd",
    phone_number: "+880 1712 345609",
    specialization: "System Administration, Network Management",
    research_areas: "System Administration, Network Management",
    employment_status: "Active",
    designation: "System Administrator",
    department: "Computer Science & Engineering",
    experience: "8 years",
    number_of_publications: 0,
    qualifications: "MSc in Computer Science, University of Dhaka",
    office_room_id: null,
    is_active: true
  }
];

// Mock course and publication data (replace with API calls when available)
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

const FacultyProfile = ({ id, onBack, onCourseSelect }) => {
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No faculty ID provided");
      console.error("FacultyProfile: No ID provided");
      return;
    }

    if (!isValidUUID(id)) {
      setError("Invalid faculty ID format");
      console.error("FacultyProfile: Invalid UUID:", id);
      const staticMember = staticFaculty.find((f) => f.id.toString() === id);
      if (staticMember) {
        setFaculty({
          id: staticMember.id,
          name: staticMember.full_name,
          role: staticMember.employment_status === "Active" ? staticMember.designation : staticMember.employment_status,
          designation: staticMember.designation,
          department: staticMember.department || "Computer Science & Engineering",
          email: staticMember.email,
          phone: staticMember.phone_number || "+880 2-9661920 Ext: 7456",
          office: staticMember.office_room_id ? `Room ${staticMember.office_room_id}` : "Room 304, New Science Complex",
          specialization: staticMember.specialization ? staticMember.specialization.split(", ") : [],
          experience: staticMember.experience,
          education: staticMember.qualifications,
          background: {
            education: staticMember.qualifications
              ? staticMember.qualifications.split(", ").map((qual, idx) => ({
                  degree: qual.split(", ")[0],
                  institution: qual.split(", ")[1] || "Unknown",
                  year: parseInt(qual.match(/\d{4}/)?.[0]) || "Unknown"
                }))
              : [],
            joined: staticMember.experience
              ? parseInt(new Date().getFullYear()) - parseInt(staticMember.experience.split(" ")[0])
              : "Unknown",
            bio: `Expert in ${staticMember.specialization || "computer science"} with extensive experience in academia.`
          },
          courses: staticMember.specialization?.includes("Machine Learning")
            ? ["CSE301"]
            : staticMember.specialization?.includes("Software Engineering")
            ? ["CSE201"]
            : ["CSE101"],
          publications: staticMember.number_of_publications > 0 ? ["PUB001"] : []
        });
        setError("Showing static data due to invalid ID format");
      } else {
        setFaculty(null);
        setError("Faculty not found in static data");
      }
      return;
    }

    console.log("FacultyProfile: Using ID:", id);
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/faculty/${id}`,
          { timeout: 5000 }
        );
        console.log("FacultyProfile: API Response:", response.data);

        // Handle both single object and array response
        let facultyDataRaw = Array.isArray(response.data) ? response.data[0] : response.data;

        // Check if response is non-empty and valid
        if (facultyDataRaw && Object.keys(facultyDataRaw).length > 0 && facultyDataRaw.id) {
          const facultyData = {
            id: facultyDataRaw.id,
            name: facultyDataRaw.full_name,
            role: facultyDataRaw.employment_status === "Active" ? facultyDataRaw.designation : facultyDataRaw.employment_status,
            designation: facultyDataRaw.designation,
            department: facultyDataRaw.department || "Computer Science & Engineering",
            email: facultyDataRaw.email,
            phone: facultyDataRaw.phone_number || "+880 2-9661920 Ext: 7456",
            office: facultyDataRaw.office_room_id ? `Room ${facultyDataRaw.office_room_id}` : "Room 304, New Science Complex",
            specialization: facultyDataRaw.specialization ? facultyDataRaw.specialization.split(", ") : [],
            experience: facultyDataRaw.experience,
            education: facultyDataRaw.qualifications,
            background: {
              education: facultyDataRaw.qualifications
                ? facultyDataRaw.qualifications.split(", ").map((qual, idx) => ({
                    degree: qual.split(", ")[0],
                    institution: qual.split(", ")[1] || "Unknown",
                    year: parseInt(qual.match(/\d{4}/)?.[0]) || "Unknown"
                  }))
                : [],
              joined: facultyDataRaw.experience
                ? parseInt(new Date().getFullYear()) - parseInt(facultyDataRaw.experience.split(" ")[0])
                : "Unknown",
              bio: `Expert in ${facultyDataRaw.specialization || "computer science"} with extensive experience in academia.`
            },
            courses: facultyDataRaw.specialization?.includes("Machine Learning")
              ? ["CSE301"]
              : facultyDataRaw.specialization?.includes("Software Engineering")
              ? ["CSE201"]
              : ["CSE101"],
            publications: facultyDataRaw.number_of_publications > 0 ? ["PUB001"] : []
          };
          setFaculty(facultyData);
          setError(null);
        } else {
          console.warn("FacultyProfile: Empty or invalid API response, falling back to static data");
          const staticMember = staticFaculty.find((f) => f.id.toString() === id);
          if (staticMember) {
            setFaculty({
              id: staticMember.id,
              name: staticMember.full_name,
              role: staticMember.employment_status === "Active" ? staticMember.designation : staticMember.employment_status,
              designation: staticMember.designation,
              department: staticMember.department || "Computer Science & Engineering",
              email: staticMember.email,
              phone: staticMember.phone_number || "+880 2-9661920 Ext: 7456",
              office: staticMember.office_room_id ? `Room ${staticMember.office_room_id}` : "Room 304, New Science Complex",
              specialization: staticMember.specialization ? staticMember.specialization.split(", ") : [],
              experience: staticMember.experience,
              education: staticMember.qualifications,
              background: {
                education: staticMember.qualifications
                  ? staticMember.qualifications.split(", ").map((qual, idx) => ({
                      degree: qual.split(", ")[0],
                      institution: qual.split(", ")[1] || "Unknown",
                      year: parseInt(qual.match(/\d{4}/)?.[0]) || "Unknown"
                    }))
                  : [],
                joined: staticMember.experience
                  ? parseInt(new Date().getFullYear()) - parseInt(staticMember.experience.split(" ")[0])
                  : "Unknown",
                bio: `Expert in ${staticMember.specialization || "computer science"} with extensive experience in academia.`
              },
              courses: staticMember.specialization?.includes("Machine Learning")
                ? ["CSE301"]
                : staticMember.specialization?.includes("Software Engineering")
                ? ["CSE201"]
                : ["CSE101"],
              publications: staticMember.number_of_publications > 0 ? ["PUB001"] : []
            });
            setError("Showing static data due to empty or invalid API response");
          } else {
            setFaculty(null);
            setError("Faculty not found in static data");
          }
        }
      } catch (err) {
        console.error("FacultyProfile: Fetch Error:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/faculty/${id}`
        });
        let errorMessage = "Failed to fetch faculty";
        if (err.response?.status === 422) {
          errorMessage = "Invalid faculty ID format sent to server";
        } else if (err.response?.status === 404) {
          errorMessage = "Faculty not found in database";
        } else {
          errorMessage = `Failed to fetch faculty: ${err.message}`;
        }
        setError(errorMessage);

        const staticMember = staticFaculty.find((f) => f.id.toString() === id);
        if (staticMember) {
          setFaculty({
            id: staticMember.id,
            name: staticMember.full_name,
            role: staticMember.employment_status === "Active" ? staticMember.designation : staticMember.employment_status,
            designation: staticMember.designation,
            department: staticMember.department || "Computer Science & Engineering",
            email: staticMember.email,
            phone: staticMember.phone_number || "+880 2-9661920 Ext: 7456",
            office: staticMember.office_room_id ? `Room ${staticMember.office_room_id}` : "Room 304, New Science Complex",
            specialization: staticMember.specialization ? staticMember.specialization.split(", ") : [],
            experience: staticMember.experience,
            education: staticMember.qualifications,
            background: {
              education: staticMember.qualifications
                ? staticMember.qualifications.split(", ").map((qual, idx) => ({
                    degree: qual.split(", ")[0],
                    institution: qual.split(", ")[1] || "Unknown",
                    year: parseInt(qual.match(/\d{4}/)?.[0]) || "Unknown"
                  }))
                : [],
              joined: staticMember.experience
                ? parseInt(new Date().getFullYear()) - parseInt(staticMember.experience.split(" ")[0])
                : "Unknown",
              bio: `Expert in ${staticMember.specialization || "computer science"} with extensive experience in academia.`
            },
            courses: staticMember.specialization?.includes("Machine Learning")
              ? ["CSE301"]
              : staticMember.specialization?.includes("Software Engineering")
              ? ["CSE201"]
              : ["CSE101"],
            publications: staticMember.number_of_publications > 0 ? ["PUB001"] : []
          });
          setError(`Showing static data due to API error: ${errorMessage}`);
        } else {
          setFaculty(null);
          setError("Faculty not found");
        }
      }
    };
    fetchFaculty();
  }, [id]);

  if (error && !faculty) {
    return (
      <div className="notices-page">
        <div className="notices-container">
          <div className="project-hero-header">
            <button onClick={onBack} className="back-button">
              ← Back to Directory
            </button>
            <h1>Faculty not found</h1>
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="notices-page">
        <div className="notices-container">
          <div className="project-hero-header">
            <button onClick={onBack} className="back-button">
              ← Back to Directory
            </button>
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

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
                <span className="meta-text">{faculty.email}</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-icon">🏢</span>
                <span className="meta-text">{faculty.department}</span>
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
            <strong>Office:</strong> {faculty.office || "Room 304, New Science Complex"}
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
                    <p><strong>Email:</strong> {faculty.email}</p>
                    <p><strong>Phone:</strong> {faculty.phone || "+880 2-9661920 Ext: 7456"}</p>
                    <p><strong>Office:</strong> {faculty.office || "Room 304, New Science Complex Building, University of Dhaka 1000"}</p>
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
                  <span className="simple-info-value">{faculty.department}</span>
                </div>
                <div className="simple-info-item">
                  <span className="simple-info-label">Joined:</span>
                  <span className="simple-info-value">{faculty.background.joined}</span>
                </div>
                <div className="simple-info-item">
                  <span className="simple-info-label">Office:</span>
                  <span className="simple-info-value">{faculty.office || "Room 304, New Science Complex"}</span>
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
                  const course = allCourses.find((c) => c.id === courseId);
                  return course ? (
                    <div
                      key={course.id}
                      className="simple-info-item"
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        borderBottom: "1px solid #f1f5f9",
                        paddingBottom: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          color: "#4a90e2",
                          fontWeight: 500,
                          cursor: "pointer",
                          textDecoration: "underline",
                          marginBottom: "0.25rem",
                        }}
                        onClick={() => onCourseSelect && onCourseSelect(course)}
                      >
                        {course.code} - {course.name}
                      </span>
                      <span style={{ color: "#6c757d", fontSize: "0.85rem" }}>
                        {course.credits} Credits
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <div className="simple-info-card">
              <h3 className="simple-card-title">Publications</h3>
              <div className="simple-info-list">
                {faculty.publications && faculty.publications.map((pubId) => {
                  const pub = publications.find((p) => p.id === pubId);
                  return pub ? (
                    <div
                      key={pub.id}
                      className="simple-info-item"
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        borderBottom: "1px solid #f1f5f9",
                        paddingBottom: "0.75rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          color: "#6c757d",
                          fontSize: "0.8rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {pub.authors}
                      </span>
                      <span
                        style={{
                          color: "#212529",
                          fontWeight: 600,
                          marginBottom: "0.25rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        {pub.title}
                      </span>
                      <span
                        style={{
                          color: "#495057",
                          fontStyle: "italic",
                          fontSize: "0.8rem",
                        }}
                      >
                        {pub.journal}
                      </span>
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
                  onClick={() =>
                    window.open(`mailto:${faculty.email}`, "_blank")
                  }
                >
                  Send Email
                </button>
                <button className="simple-action-btn">View Publications</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FacultyProfile;
