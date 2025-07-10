import React from 'react';

const FacultyManagement = ({ 
  users, 
  setShowFacultyModal, 
  setEditingFaculty, 
  handleDeleteFaculty 
}) => {
  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Faculty Management</h2>
        <button
          className="add-user-btn"
          onClick={() => setShowFacultyModal(true)}
        >
          ➕ Add New Faculty
        </button>
      </div>

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
            {users
              .filter((user) => user.role === "faculty")
              .map((faculty) => (
                <tr key={faculty.id}>
                  <td>
                    <div className="faculty-photo">
                      {faculty.profileImage ? (
                        <img
                          src={faculty.profileImage}
                          alt={faculty.name}
                          className="faculty-avatar"
                        />
                      ) : (
                        <div className="faculty-avatar-placeholder">👨‍🏫</div>
                      )}
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
                        style={{ background: 'transparent !important', color: '#1769aa', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => {
                          setEditingFaculty(faculty);
                          setShowFacultyModal(true);
                        }}
                        title="Edit Faculty"
                      >
                        ✏️
                      </button>
                      <button
                        style={{ background: 'transparent !important', color: '#c62828', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => handleDeleteFaculty(faculty.id)}
                        title="Delete Faculty"
                      >
                        🗑️
                      </button>
                      <button
                        style={{ background: 'transparent !important', color: '#444', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        title="View Faculty Details"
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyManagement;
