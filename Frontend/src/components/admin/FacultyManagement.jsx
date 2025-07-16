import React, { useState, useEffect } from 'react';
import FacultyService from '../../api/FacultyService';
import FacultyModal from './FacultyModal';

const FacultyManagement = ({
  setShowFacultyModal,
  setEditingFaculty,
  handleDeleteFaculty
}) => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showFacultyModal, setShowFacultyModalState] = useState(false);
  const [editingFaculty, setEditingFacultyState] = useState(null);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await FacultyService.getAllFaculty(0, 100);
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
      setError(err.message || 'Failed to load faculty data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleSaveFaculty = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (const key in data) {
        if (Array.isArray(data[key])) {
          data[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, data[key]);
        }
      }

      if (editingFaculty) {
        await FacultyService.updateFaculty(editingFaculty.id, formData);
        alert('Faculty updated successfully!');
      } else {
        await FacultyService.createFaculty(formData);
        alert('Faculty created successfully!');
      }

      fetchFaculty();
      setShowFacultyModalState(false);
    } catch (error) {
      alert(`Failed to ${editingFaculty ? 'update' : 'create'} faculty: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditFaculty = (faculty) => {
    setEditingFacultyState(faculty);
    setShowFacultyModalState(true);
  };

  const handleAddNewFaculty = () => {
    setEditingFacultyState(null);
    setShowFacultyModalState(true);
  };

  const handleDeleteFacultyConfirm = async (facultyId) => {
    try {
      setLoading(true);
      await FacultyService.deleteFaculty(facultyId);
      setFacultyList(prev => prev.filter(f => f.id !== facultyId));
      setDeleteConfirmId(null);
      alert('Faculty member deleted successfully');
    } catch (err) {
      alert('Failed to delete faculty: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const getProfileImageUrl = (profileImage) => {
    if (!profileImage) return null;
    if (profileImage.startsWith('http')) return profileImage;
    return `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}/uploads/${profileImage}`;
  };

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Faculty Management</h2>
        <button className="add-user-btn" onClick={handleAddNewFaculty} disabled={loading}>➕ Add New Faculty</button>
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
            {facultyList.filter(user => user.role === 'faculty').map(faculty => (
              <tr key={faculty.id}>
                <td>
                  <img
                    src={getProfileImageUrl(faculty.profileImage)}
                    alt={faculty.name}
                    className="faculty-avatar"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </td>
                <td><strong>{faculty.employeeId}</strong></td>
                <td>{faculty.name}</td>
                <td>{faculty.email}</td>
                <td>{faculty.designation}</td>
                <td>{faculty.specialization}</td>
                <td>{faculty.experience}</td>
                <td>{faculty.publications} papers</td>
                <td>
                  <button onClick={() => handleEditFaculty(faculty)} disabled={loading}>✏️</button>
                  {deleteConfirmId === faculty.id ? (
                    <>
                      <button onClick={() => handleDeleteFacultyConfirm(faculty.id)} disabled={loading}>✓</button>
                      <button onClick={() => setDeleteConfirmId(null)} disabled={loading}>✗</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirmId(faculty.id)} disabled={loading}>🗑️</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && facultyList.filter(user => user.role === 'faculty').length === 0 && (
          <p>No faculty members found. Click "Add New Faculty" to add your first faculty member.</p>
        )}
      </div>

      {showFacultyModal && (
        <FacultyModal
          isOpen={showFacultyModal}
          onClose={() => setShowFacultyModalState(false)}
          onSave={handleSaveFaculty}
          editingFaculty={editingFaculty}
        />
      )}
    </div>
  );
};

export default FacultyManagement;
