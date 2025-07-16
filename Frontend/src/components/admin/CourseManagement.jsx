import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

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
        <div className="section-header-text">
          <h2>Course Management</h2>
          <p>Manage courses and academic programs</p>
        </div>
        <button
          className="add-btn primary"
          onClick={() => setShowCourseModal(true)}
        >
          <FaPlus /> Add New Course
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
                  <div className="course-action-buttons">
                    <button
                      className="course-action-btn primary"
                      onClick={() => {
                        setEditingCourse(course);
                        setShowCourseModal(true);
                      }}
                      title="Edit Course"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="course-action-btn secondary"
                      title="View Course Details"
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className="course-action-btn archive"
                      onClick={() => handleDeleteCourse(course.id)}
                      title="Delete Course"
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

export default CourseManagement;
