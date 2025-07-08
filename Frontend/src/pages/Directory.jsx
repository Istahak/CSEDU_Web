import React, { useState } from "react";
import "./Directory.css";

const Directory = ({ onFacultySelect }) => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedRole("All");
    setSearchQuery("");
  };

  // Check if any filters are active
  const hasActiveFilters = selectedRole !== "All" || searchQuery.trim() !== "";

  // Sample faculty data
  const facultyMembers = [
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
  ];

  const roles = ["All", "Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Staff"];

  const filteredMembers = facultyMembers.filter(member => {
    const matchesRole = selectedRole === "All" || member.role === selectedRole;
    
    // Search by name, email, specialization
    const searchTerm = searchQuery.toLowerCase().trim();
    const matchesSearch = searchTerm === "" || 
                         member.name.toLowerCase().includes(searchTerm) ||
                         member.email.toLowerCase().includes(searchTerm) ||
                         member.specialization.some(spec => 
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

        <div className="directory-grid">
          {filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="faculty-card"
              onClick={() => onFacultySelect && onFacultySelect(member.id)}
            >
              <div className="faculty-avatar">
                <div className={`avatar-placeholder ${member.role.toLowerCase().replace(/\s+/g, '-')}-avatar`}>
                  {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
              </div>
              <div className="faculty-header">
                <div className="faculty-meta">
                  <span className={`faculty-role ${member.role.toLowerCase().replace(/\s+/g, '-')}`}>
                    {member.role}
                  </span>
                  <span className="faculty-department">
                    {member.department}
                  </span>
                </div>
              </div>
              <div className="faculty-content">
                <h3 className="faculty-name">{member.name}</h3>
                <p className="faculty-designation">{member.designation}</p>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{member.email}</span>
                  </div>
                  <div className="faculty-detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{member.phone}</span>
                  </div>
                  <div className="faculty-detail-item">
                    <span className="detail-label">Office:</span>
                    <span className="detail-value">{member.office}</span>
                  </div>
                  <div className="faculty-detail-item">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{member.experience}</span>
                  </div>
                </div>
                <div className="faculty-specializations">
                  {member.specialization.map((spec) => (
                    <span key={spec} className="faculty-specialization">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="faculty-footer">
                <button
                  className="view-profile-button"
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
          <div className="no-faculty-message">
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
