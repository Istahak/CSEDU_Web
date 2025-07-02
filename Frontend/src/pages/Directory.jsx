import React, { useState } from "react";
import "./Directory.css";

const Directory = ({ onFacultySelect }) => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample faculty data
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Abdul Razzaque",
      role: "Faculty",
      department: "Artificial Intelligence",
      specialization: "Machine Learning",
      status: "online"
    },
    {
      id: 2,
      name: "Dr. Mosaddek Khan",
      role: "Faculty",
      department: "Networking",
      specialization: "Machine Learning",
      status: "online"
    },
    {
      id: 3,
      name: "Dr. Farhan Ahmed",
      role: "Faculty",
      department: "Data Mining",
      specialization: "Machine Learning",
      status: "online"
    },
    {
      id: 4,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      department: "Artificial Intelligence",
      specialization: "Multi Agent Systems",
      status: "online"
    },
    {
      id: 5,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      department: "Software Engineering",
      specialization: "Multi Agent Systems",
      status: "online"
    },
    {
      id: 6,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      department: "Artificial Intelligence",
      specialization: "Multi Agent Systems",
      status: "online"
    },
    {
      id: 7,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      department: "Artificial Intelligence",
      specialization: "Multi Agent Systems",
      status: "online"
    },
    {
      id: 8,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      department: "Software Engineering",
      specialization: "Multi Agent Systems",
      status: "online"
    },
    {
      id: 9,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      department: "Artificial Intelligence",
      specialization: "Multi Agent Systems",
      status: "online"
    }
  ];

  const filteredMembers = facultyMembers.filter(member => {
    const matchesRole = selectedRole === "All" || member.role === selectedRole;
    const matchesDepartment = selectedDepartment === "All" || member.department === selectedDepartment;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRole && matchesDepartment && matchesSearch;
  });

  return (
    <div className="directory-page">
      <div className="directory-header">
        <h1 className="directory-title">CSEDU Directory</h1>
        <p className="directory-subtitle">Find Faculty Members, Students and Staffs</p>
      </div>

      <div className="directory-controls">
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Name / Email / Contact"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Select Role</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="filter-select"
            >
              <option value="All">All</option>
              <option value="Faculty">Faculty</option>
              <option value="Professor">Professor</option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Select Department</label>
            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="filter-select"
            >
              <option value="All">All</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Networking">Networking</option>
              <option value="Data Mining">Data Mining</option>
            </select>
          </div>

          <button className="filters-button">
            <span className="filter-icon">⚙️</span>
            Filters
          </button>
        </div>
      </div>

      <div className="directory-grid">
        {filteredMembers.map((member) => (
          <div 
            key={member.id} 
            className="faculty-card"
            onClick={() => onFacultySelect && onFacultySelect(member)}
          >
            <div className="faculty-avatar">
              <div className="avatar-placeholder">👤</div>
              <div className={`status-indicator ${member.status.toLowerCase()}`}></div>
            </div>
            <div className="faculty-info">
              <h3 className="faculty-name">{member.name}</h3>
              <div className="faculty-role-badge">{member.role}</div>
              <div className="faculty-details">
                <p className="faculty-department">{member.department}</p>
                <p className="faculty-specialization">{member.specialization}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directory;
