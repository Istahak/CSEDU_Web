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
      role: "Faculty",
      specialization: ["Machine Learning", "Distributed Systems"]
    },
    {
      id: 2,
      name: "Dr. Mosaddek Khan",
      role: "Faculty",
      specialization: ["Machine Learning", "Networking"]
    },
    {
      id: 3,
      name: "Dr. Farhan Ahmed",
      role: "Faculty",
      specialization: ["Machine Learning", "Data Mining"]
    },
    {
      id: 4,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      specialization: ["Multi Agent Systems", "Artificial Intelligence"]
    },
    {
      id: 5,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      specialization: ["Multi Agent Systems", "Software Engineering"]
    },
    {
      id: 6,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      specialization: ["Multi Agent Systems"]
    },
    {
      id: 7,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      specialization: ["Multi Agent Systems"]
    },
    {
      id: 8,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      specialization: ["Multi Agent Systems"]
    },
    {
      id: 9,
      name: "Dr. Mosaddek Khan",
      role: "Professor",
      specialization: ["Multi Agent Systems"]
    }
  ];

  const filteredMembers = facultyMembers.filter(member => {
    const matchesRole = selectedRole === "All" || member.role === selectedRole;
    
    // Search only by name with prefix matching
    const searchTerm = searchQuery.toLowerCase().trim();
    const matchesSearch = searchTerm === "" || 
                         member.name.toLowerCase().split(' ').some(word => 
                           word.startsWith(searchTerm)
                         );
    
    return matchesRole && matchesSearch;
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
              onClick={() => onFacultySelect && onFacultySelect(member.id)}
            >
              <ul className="faculty-info-list">
                <li className="faculty-avatar">
                  <div className="avatar-placeholder">👤</div>
                </li>
                <li className="faculty-name"><strong>Name:</strong> {member.name}</li>
                <li className="faculty-role-badge"><strong>Role:</strong> {member.role}</li>
                <li className="faculty-specializations"><strong>Specializations:</strong>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {member.specialization.map((spec, idx) => (
                      <li key={idx} className="faculty-specialization">{spec}</li>
                    ))}
                  </ul>
                </li>
              </ul>
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
