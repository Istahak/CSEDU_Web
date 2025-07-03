import React, { useState } from "react";
import "./Directory.css";

const Directory = ({ onFacultySelect }) => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedRole("All");
    setSelectedDepartment("All");
    setSearchQuery("");
  };

  // Check if any filters are active
  const hasActiveFilters = selectedRole !== "All" || selectedDepartment !== "All" || searchQuery.trim() !== "";

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
    
    // Search only by name with prefix matching
    const searchTerm = searchQuery.toLowerCase().trim();
    const matchesSearch = searchTerm === "" || 
                         member.name.toLowerCase().split(' ').some(word => 
                           word.startsWith(searchTerm)
                         );
    
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
              placeholder="Search faculty members..."
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
          {searchQuery && (
            <div className="search-results-count">
              {filteredMembers.length} result{filteredMembers.length !== 1 ? 's' : ''} found
            </div>
          )}
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Role</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Roles</option>
              <option value="Faculty">Faculty</option>
              <option value="Professor">Professor</option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Department</label>
            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Departments</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Networking">Networking</option>
              <option value="Data Mining">Data Mining</option>
            </select>
          </div>

          {hasActiveFilters && (
            <div className="filter-group">
              <label className="filter-label">&nbsp;</label>
              <button 
                className="clear-filters-button"
                onClick={clearAllFilters}
                title="Clear all filters"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="directory-grid">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
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
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3 className="no-results-title">No faculty members found</h3>
            <p className="no-results-message">
              {hasActiveFilters 
                ? "Try adjusting your search criteria or clearing filters"
                : "No faculty members available at the moment"
              }
            </p>
            {hasActiveFilters && (
              <button 
                className="clear-filters-button-large"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
