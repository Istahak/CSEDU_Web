import React from 'react';

const CourseManagement = ({ 
  courses, 
  setShowCourseModal, 
  handleCourseStatusChange, 
  setEditingCourse, 
  handleDeleteCourse 
}) => {
  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Course Management</h2>
        <button
          className="add-user-btn"
          onClick={() => setShowCourseModal(true)}
        >
          ➕ Add New Course
        </button>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Instructor</th>
              <th>Credits</th>
              <th>Students</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>
                  <div className="course-image">
                    {course.courseImage ? (
                      <img
                        src={course.courseImage}
                        alt={course.title}
                        className="course-thumbnail"
                      />
                    ) : (
                      <div className="course-image-placeholder">📚</div>
                    )}
                  </div>
                </td>
                <td>
                  <strong>{course.code}</strong>
                </td>
                <td>
                  <div className="course-title-cell">
                    <strong>{course.title}</strong>
                    <small>{course.department}</small>
                  </div>
                </td>
                <td>{course.instructor}</td>
                <td>{course.credits} credits</td>
                <td>{course.students} students</td>
                <td>{course.duration || "3 months"}</td>
                <td>
                  <select
                    value={course.status}
                    onChange={(e) =>
                      handleCourseStatusChange(course.id, e.target.value)
                    }
                    className="status-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>
                  <div className="action-buttons" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                    <button
                      style={{ background: 'transparent !important', color: '#1769aa', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                      onClick={() => {
                        setEditingCourse(course);
                        setShowCourseModal(true);
                      }}
                      title="Edit Course"
                    >
                      ✏️
                    </button>
                    <button
                      style={{ background: 'transparent !important', color: '#c62828', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                      onClick={() => handleDeleteCourse(course.id)}
                      title="Delete Course"
                    >
                      🗑️
                    </button>
                    <button
                      style={{ background: 'transparent !important', color: '#444', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                      title="View Course Details"
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

export default CourseManagement;
