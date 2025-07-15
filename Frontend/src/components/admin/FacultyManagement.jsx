import React, { useState, useEffect } from 'react';
import FacultyService from '../../api/FacultyService'; // Adjust path
// import './FacultyManagement.css';

const FacultyManagement = ({ 
  setShowFacultyModal, 
  setEditingFaculty, 
  handleDeleteFaculty 
}) => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Fetch faculty data
  const fetchFaculty = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching faculty list...');
      const response = await FacultyService.getAllFaculty(0, 100);
      console.log('Faculty list response:', response);
      
      // Map response to expected format
      const formattedFaculty = response.map(faculty => ({
        id: faculty.id,
        name: faculty.name || faculty.full_name || 'Unknown',
        email: faculty.email || '',
        role: faculty.role || 'faculty',
        department: faculty.department || 'Computer Science & Engineering',
        designation: faculty.designation || 'Professor',
        phone: faculty.phone || '',
        joinDate: faculty.join_date || faculty.joinDate || 'Unknown',
        specialization: faculty.specialization || '',
        qualifications: faculty.qualifications || '',
        officeRoom: faculty.office_room || faculty.officeRoom || '',
        researchAreas: faculty.research_areas || faculty.researchAreas || [],
        publications: faculty.publications || 0,
        experience: faculty.experience || '0 years',
        employeeId: faculty.employee_id || faculty.employeeId || `CSE-${new Date().getFullYear()}-000`,
        profileImage: faculty.profile_image || faculty.profileImage || ''
      }));
      
      setFacultyList(formattedFaculty);
    } catch (err) {
      console.error('Failed to fetch faculty:', err);
      setError(err.message || 'Failed to load faculty data');
      // Fallback to demo data
      setFacultyList([{
        id: '1',
        name: "Dr. John Smith",
        email: "john.smith@csedu.edu.bd",
        role: "faculty",
        status: "active",
        department: "CSE",
        designation: "Professor",
        phone: "+880-1234-567890",
        joinDate: "2015-08-15",
        specialization: "Artificial Intelligence, Machine Learning",
        qualifications: "PhD in Computer Science",
        officeRoom: "Room 301, Building A",
        researchAreas: ["AI", "ML", "Data Science"],
        publications: 45,
        experience: "15 years",
        employeeId: "CSE-2015-001",
        profileImage: ""
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch faculty data on mount
  useEffect(() => {
    fetchFaculty();
  }, []);

  // Handle view faculty details
  const handleViewFaculty = async (facultyId) => {
    try {
      const faculty = await FacultyService.getFacultyById(facultyId);
      const details = `
        Name: ${faculty.name || faculty.full_name || 'Unknown'}
        Email: ${faculty.email || 'N/A'}
        Employee ID: ${faculty.employee_id || faculty.employeeId || 'N/A'}
        Designation: ${faculty.designation || 'N/A'}
        Department: ${faculty.department || 'N/A'}
        Specialization: ${faculty.specialization || 'N/A'}
        Experience: ${faculty.experience || 'N/A'}
        Publications: ${faculty.publications || 0} papers
        Phone: ${faculty.phone || 'N/A'}
        Join Date: ${faculty.join_date || faculty.joinDate || 'N/A'}
        Office Room: ${faculty.office_room || faculty.officeRoom || 'N/A'}
        Qualifications: ${faculty.qualifications || 'N/A'}
        Research Areas: ${(faculty.research_areas || faculty.researchAreas || []).join(', ') || 'N/A'}
      `;
      alert(details);
    } catch (err) {
      console.error(`Failed to fetch faculty details for ID ${facultyId}:`, err);
      alert('Failed to load faculty details: ' + (err.message || 'Unknown error'));
    }
  };

  // Handle delete faculty with confirmation
  const handleDeleteFacultyConfirm = async (facultyId) => {
    try {
      setLoading(true);
      console.log(`Deleting faculty with ID: ${facultyId}`);
      
      // Call the FacultyService delete method
      await FacultyService.deleteFaculty(facultyId);
      
      // Remove from local state
      setFacultyList(prevList => prevList.filter(faculty => faculty.id !== facultyId));
      
      // Clear confirmation state
      setDeleteConfirmId(null);
      
      console.log('Faculty deleted successfully');
      
      // Show success message
      alert('Faculty member deleted successfully');
      
    } catch (err) {
      console.error(`Failed to delete faculty with ID ${facultyId}:`, err);
      alert('Failed to delete faculty: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Handle edit faculty
  const handleEditFaculty = (faculty) => {
    console.log('Editing faculty:', faculty);
    setEditingFaculty(faculty);
    setShowFacultyModal(true);
  };

  // Handle add new faculty
  const handleAddNewFaculty = () => {
    console.log('Adding new faculty');
    setEditingFaculty(null); // Clear editing state for new faculty
    setShowFacultyModal(true);
  };

  // Refresh faculty list (can be called from parent components)
  const refreshFacultyList = () => {
    fetchFaculty();
  };

  // Format profile image URL
  const getProfileImageUrl = (profileImage) => {
    if (!profileImage) return null;
    
    // If it's already a full URL, return as is
    if (profileImage.startsWith('http')) {
      return profileImage;
    }
    
    // If it's a relative path, construct full URL
    // Adjust this based on your API base URL
    return `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}/uploads/${profileImage}`;
  };

  // Format research areas for display
  const formatResearchAreas = (researchAreas) => {
    if (!researchAreas || researchAreas.length === 0) return 'N/A';
    
    if (Array.isArray(researchAreas)) {
      return researchAreas.slice(0, 2).join(', ') + (researchAreas.length > 2 ? '...' : '');
    }
    
    if (typeof researchAreas === 'string') {
      const areas = researchAreas.split(',').map(area => area.trim());
      return areas.slice(0, 2).join(', ') + (areas.length > 2 ? '...' : '');
    }
    
    return 'N/A';
  };

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Faculty Management</h2>
        <button
          className="add-user-btn"
          onClick={handleAddNewFaculty}
          disabled={loading}
        >
          ➕ Add New Faculty
        </button>
      </div>

      {loading && <p>Loading faculty data...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Publications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList
              .filter((user) => user.role === "faculty")
              .map((faculty) => (
                <tr key={faculty.id}>
                  <td>
                    <div className="faculty-photo">
                      {faculty.profileImage ? (
                        <img
                          src={getProfileImageUrl(faculty.profileImage)}
                          alt={faculty.name}
                          className="faculty-avatar"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="faculty-avatar-placeholder"
                        style={{ 
                          display: faculty.profileImage ? 'none' : 'flex',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#f0f0f0',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px'
                        }}
                      >
                        👨‍🏫
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong>{faculty.employeeId}</strong>
                  </td>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>
                    <span
                      className={`role-badge ${faculty.designation
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {faculty.designation}
                    </span>
                  </td>
                  <td>
                    <div className="specialization-cell">
                      {faculty.specialization
                        ?.split(",")
                        .slice(0, 2)
                        .map((spec, index) => (
                          <span key={index} className="spec-tag">
                            {spec.trim()}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td>{faculty.experience}</td>
                  <td>{faculty.publications} papers</td>
                  <td>
                    <div className="action-buttons" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        style={{ 
                          background: 'transparent !important', 
                          color: '#1769aa', 
                          border: 'none', 
                          borderRadius: '4px', 
                          padding: '0.5rem', 
                          cursor: 'pointer', 
                          display: 'inline-flex', 
                          alignItems: 'center',
                          opacity: loading ? 0.5 : 1
                        }}
                        onClick={() => handleEditFaculty(faculty)}
                        title="Edit Faculty"
                        disabled={loading}
                      >
                        ✏️
                      </button>
                      
                      {deleteConfirmId === faculty.id ? (
                        <>
                          <button
                            style={{ 
                              background: '#c62828', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: '4px', 
                              padding: '0.25rem 0.5rem', 
                              cursor: 'pointer', 
                              fontSize: '12px',
                              marginRight: '2px'
                            }}
                            onClick={() => handleDeleteFacultyConfirm(faculty.id)}
                            title="Confirm Delete"
                            disabled={loading}
                          >
                            ✓
                          </button>
                          <button
                            style={{ 
                              background: '#757575', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: '4px', 
                              padding: '0.25rem 0.5rem', 
                              cursor: 'pointer', 
                              fontSize: '12px'
                            }}
                            onClick={() => setDeleteConfirmId(null)}
                            title="Cancel Delete"
                            disabled={loading}
                          >
                            ✗
                          </button>
                        </>
                      ) : (
                        <button
                          style={{ 
                            background: 'transparent !important', 
                            color: '#c62828', 
                            border: 'none', 
                            borderRadius: '4px', 
                            padding: '0.5rem', 
                            cursor: 'pointer', 
                            display: 'inline-flex', 
                            alignItems: 'center',
                            opacity: loading ? 0.5 : 1
                          }}
                          onClick={() => setDeleteConfirmId(faculty.id)}
                          title="Delete Faculty"
                          disabled={loading}
                        >
                          🗑️
                        </button>
                      )}
                      
                      <button
                        style={{ 
                          background: 'transparent !important', 
                          color: '#444', 
                          border: 'none', 
                          borderRadius: '4px', 
                          padding: '0.5rem', 
                          cursor: 'pointer', 
                          display: 'inline-flex', 
                          alignItems: 'center',
                          opacity: loading ? 0.5 : 1
                        }}
                        onClick={() => handleViewFaculty(faculty.id)}
                        title="View Faculty Details"
                        disabled={loading}
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
        {facultyList.filter((user) => user.role === "faculty").length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            No faculty members found. Click "Add New Faculty" to add your first faculty member.
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyManagement;