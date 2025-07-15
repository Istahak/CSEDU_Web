import React, { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../api/config";
import "./Directory.css";

// Edited by Tanzim (Date: 15/07/2025)

const Directory = ({ onFacultySelect }) => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [error, setError] = useState(null);

  const roles = ["All", "Professor", "Associate Professor", "Assistant Professor", "Lecturer", "System Administrator"];

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
      designation: "Faculty",
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
      full_name: "Md. Karim Uddin",
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

  // Fetch faculty data
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/faculty`
        );
        console.log("Directory API Response:", response.data);
        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            setFacultyMembers(staticFaculty.map((f) => ({
              id: f.id,
              name: f.full_name,
              role: f.employment_status === "Active" ? f.designation : f.employment_status,
              designation: f.designation,
              department: f.department,
              email: f.email,
              phone: f.phone_number || "+880 2-9661920 Ext: 7456",
              office: f.office_room_id ? `Room ${f.office_room_id}` : "Room 304, New Science Complex",
              specialization: f.specialization ? f.specialization.split(", ") : [],
              experience: f.experience,
              education: f.qualifications
            })));
            setError("No faculty found in database; showing static data");
          } else {
            const mappedFaculty = response.data.map((faculty) => ({
              id: faculty.id,
              name: faculty.full_name,
              role: faculty.employment_status === "Active" ? faculty.designation : faculty.employment_status,
              designation: faculty.designation,
              department: faculty.department || "Computer Science & Engineering",
              email: faculty.email,
              phone: faculty.phone_number || "+880 2-9661920 Ext: 7456",
              office: faculty.office_room_id ? `Room ${faculty.office_room_id}` : "Room 304, New Science Complex",
              specialization: faculty.specialization ? faculty.specialization.split(", ") : [],
              experience: faculty.experience,
              education: faculty.qualifications
            }));
            setFacultyMembers(mappedFaculty);
            setError(null);
          }
        } else {
          setError("Invalid response format from server");
          setFacultyMembers(staticFaculty.map((f) => ({
            id: f.id,
            name: f.full_name,
            role: f.employment_status === "Active" ? f.designation : f.employment_status,
            designation: f.designation,
            department: f.department,
            email: f.email,
            phone: f.phone_number || "+880 2-9661920 Ext: 7456",
            office: f.office_room_id ? `Room ${f.office_room_id}` : "Room 304, New Science Complex",
            specialization: f.specialization ? f.specialization.split(", ") : [],
            experience: f.experience,
            education: f.qualifications
          })));
        }
      } catch (err) {
        console.error("Directory Fetch Error:", err.message, err.response?.data);
        setError(`Failed to fetch faculty: ${err.message}`);
        setFacultyMembers(staticFaculty.map((f) => ({
          id: f.id,
          name: f.full_name,
          role: f.employment_status === "Active" ? f.designation : f.employment_status,
          designation: f.designation,
          department: f.department,
          email: f.email,
          phone: f.phone_number || "+880 2-9661920 Ext: 7456",
          office: f.office_room_id ? `Room ${f.office_room_id}` : "Room 304, New Science Complex",
          specialization: f.specialization ? f.specialization.split(", ") : [],
          experience: f.experience,
          education: f.qualifications
        })));
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
          {error && <p className="error-message">{error}</p>}
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