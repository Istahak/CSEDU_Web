import React, { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../api/config"; // Adjust path (e.g., ./config.js)
import "./Directory.css";


// Edited by Tanzim (Date : 12/07/2025)

const Directory = ({ onFacultySelect }) => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [error, setError] = useState(null);

  const roles = ["All", "Professor", "Associate Professor", "Assistant Professor", "Lecturer"];

  // Fetch faculty data
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/faculty`
        );
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          const mappedFaculty = response.data.map((faculty) => ({
            id: faculty.id,
            name: faculty.name,
            role: faculty.role,
            designation: faculty.designation,
            department: faculty.department || "Computer Science & Engineering",
            email: faculty.email,
            phone: faculty.phone,
            office: faculty.office,
            specialization: faculty.specialization
              ? Array.isArray(faculty.specialization)
                ? faculty.specialization
                : JSON.parse(faculty.specialization)
              : [],
            experience: faculty.experience,
            education: faculty.education
          }));
          setFacultyMembers(mappedFaculty);
          setError(null);
        } else {
          setError("Invalid response format from server");
        }
      } catch (err) {
        console.error("Fetch Error:", err.message, err.response?.data);
        setError(`Failed to fetch faculty: ${err.message}`);
        // Fallback to static data
        setFacultyMembers([
          {
            id: 1,
            name: "Dr. Abdul Razzaque",
            role: "Professor",
            designation: "Professor & Head",
            department: "Computer Science & Engineering",
            email: "razzaque@csedu.ac.bd",
            phone: "+880 1712 345678",
            office: "Room 401, CSEDU Building",
            specialization: ["Machine Learning", "Distributed Systems"],
            experience: "15 years",
            education: "PhD in Computer Science, University of Toronto"
          },
          // Add other static faculty members
          {
            id: 2,
            name: "Dr. Mosaddek Khan",
            role: "Professor",
            designation: "Professor",
            department: "Computer Science & Engineering",
            email: "mosaddek@csedu.ac.bd",
            phone: "+880 1712 345679",
            office: "Room 402, CSEDU Building",
            specialization: ["Machine Learning", "Networking"],
            experience: "12 years",
            education: "PhD in Computer Science, MIT"
          },
          {
            id: 3,
            name: "Dr. Farhan Ahmed",
            role: "Associate Professor",
            designation: "Associate Professor",
            department: "Computer Science & Engineering",
            email: "farhan@csedu.ac.bd",
            phone: "+880 1712 345680",
            office: "Room 403, CSEDU Building",
            specialization: ["Machine Learning", "Data Mining"],
            experience: "10 years",
            education: "PhD in Computer Science, Stanford University"
          },
          {
            id: 4,
            name: "Dr. Sarah Wilson",
            role: "Associate Professor",
            designation: "Associate Professor",
            department: "Computer Science & Engineering",
            email: "sarah.wilson@csedu.ac.bd",
            phone: "+880 1712 345681",
            office: "Room 404, CSEDU Building",
            specialization: ["Multi Agent Systems", "Artificial Intelligence"],
            experience: "8 years",
            education: "PhD in Computer Science, Carnegie Mellon University"
          },
          {
            id: 5,
            name: "Dr. Ahmed Hassan",
            role: "Assistant Professor",
            designation: "Assistant Professor",
            department: "Computer Science & Engineering",
            email: "ahmed.hassan@csedu.ac.bd",
            phone: "+880 1712 345682",
            office: "Room 405, CSEDU Building",
            specialization: ["Software Engineering", "Database Systems"],
            experience: "6 years",
            education: "PhD in Computer Science, University of British Columbia"
          },
          {
            id: 6,
            name: "Dr. Fatima Rahman",
            role: "Assistant Professor",
            designation: "Assistant Professor",
            department: "Computer Science & Engineering",
            email: "fatima@csedu.ac.bd",
            phone: "+880 1712 345683",
            office: "Room 406, CSEDU Building",
            specialization: ["Computer Vision", "Deep Learning"],
            experience: "5 years",
            education: "PhD in Computer Science, University of Waterloo"
          },
          {
            id: 7,
            name: "Dr. Mohammad Ali",
            role: "Lecturer",
            designation: "Lecturer",
            department: "Computer Science & Engineering",
            email: "mohammad.ali@csedu.ac.bd",
            phone: "+880 1712 345684",
            office: "Room 407, CSEDU Building",
            specialization: ["Web Development", "Human-Computer Interaction"],
            experience: "4 years",
            education: "PhD in Computer Science, University of Calgary"
          },
          {
            id: 8,
            name: "Dr. Nadia Islam",
            role: "Lecturer",
            designation: "Lecturer",
            department: "Computer Science & Engineering",
            email: "nadia@csedu.ac.bd",
            phone: "+880 1712 345685",
            office: "Room 408, CSEDU Building",
            specialization: ["Cybersecurity", "Network Security"],
            experience: "3 years",
            education: "PhD in Computer Science, Concordia University"
          },
          {
            id: 9,
            name: "Md. Karim Uddin",
            role: "Staff",
            designation: "System Administrator",
            department: "Computer Science & Engineering",
            email: "karim@csedu.ac.bd",
            phone: "+880 1712 345686",
            office: "Room 101, CSEDU Building",
            specialization: ["System Administration", "Network Management"],
            experience: "8 years",
            education: "MSc in Computer Science, University of Dhaka"
          }
        ]);
      }
    };
    fetchFaculty();
  }, []);

  const clearAllFilters = () => {
    setSelectedRole("All");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedRole !== "All" || searchQuery.trim() !== "";

  const filteredMembers = facultyMembers.filter((member) => {
    const matchesRole = selectedRole === "All" || member.role === selectedRole;
    const searchTerm = searchQuery.toLowerCase().trim();
    const matchesSearch =
      searchTerm === "" ||
      member.name.toLowerCase().includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm) ||
      member.specialization.some((spec) =>
        spec.toLowerCase().includes(searchTerm)
      );
    return matchesRole && matchesSearch;
  });

  return (
    <div className="directory-page">
      <div className="directory-container">
        <div className="events-header">
          <h1 className="events-title">CSEDU Directory</h1>
          <p className="events-subtitle">
            Find Faculty Members, Students and Staff
          </p>
        </div>

        <div className="directory-controls">
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search faculty members by name, email, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="role-select" className="filter-label">
                Role
              </label>
              <select 
                id="role-select"
                value={selectedRole} 
                onChange={(e) => setSelectedRole(e.target.value)}
                className="filter-select"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === "All" ? "All Roles" : role}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                className="clear-filters-button"
                onClick={clearAllFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="events-grid">
          {filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="event-card"
              onClick={() => onFacultySelect && onFacultySelect(member.id)}
            >
              <div className="event-header">
                <div className="event-meta">
                  <span className={`event-type ${member.role.toLowerCase().replace(/\s+/g, '-')}`}>
                    {member.role}
                  </span>
                  <span className="event-status department">
                    {member.department}
                  </span>
                </div>
              </div>

              <div className="event-content">
                <div className="faculty-avatar">
                  <div className={`avatar-placeholder ${member.role.toLowerCase().replace(/\s+/g, '-')}-avatar`}>
                    {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                </div>
                <h3 className="event-title">{member.name}</h3>
                <p className="event-description">{member.designation}</p>

                <div className="event-details">
                  <div className="event-detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{member.email}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{member.phone}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-label">Office:</span>
                    <span className="detail-value">{member.office}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{member.experience}</span>
                  </div>
                </div>

                <div className="event-tags">
                  {member.specialization.map((spec) => (
                    <span key={spec} className="event-tag">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="event-footer">
                <button
                  className="register-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFacultySelect && onFacultySelect(member.id);
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="no-events-message">
            <h3>No faculty members found</h3>
            <p>
              Try adjusting your search criteria or check back later for new faculty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
