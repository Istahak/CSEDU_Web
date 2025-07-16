import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const FacultyManagement = ({ 
  users, 
  setShowFacultyModal, 
  setEditingFaculty, 
  handleDeleteFaculty 
}) => {
  return (
    <div className="user-management">
      <div className="section-header">
        <div className="section-header-text">
          <h2>Faculty Management</h2>
          <p>Manage faculty members and their information</p>
        </div>
        <button
          className="add-btn primary"
          onClick={() => setShowFacultyModal(true)}
        >
          <FaPlus /> Add New Faculty
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
                    <div className="faculty-action-buttons">
                      <button
                        className="course-action-btn primary"
                        onClick={() => {
                          setEditingFaculty(faculty);
                          setShowFacultyModal(true);
                        }}
                        title="Edit Faculty"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="course-action-btn secondary"
                        title="View Faculty Details"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className="course-action-btn archive"
                        onClick={() => handleDeleteFaculty(faculty.id)}
                        title="Delete Faculty"
                      >
                        <FaTrash /> Delete
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
