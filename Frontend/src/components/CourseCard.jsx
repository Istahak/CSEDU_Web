import React from "react";
import "./CourseCard.css";

const CourseCard = ({ course, onViewStudents, onManageGrades, onAttendance, onArchive, archived }) => {
  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3 className="course-title">{course.code} - {course.title}</h3>
        <span className="course-badge academic">{course.section}</span>
      </div>

      <div className="course-description">
        <div className="course-info-row">
          <span className="course-info-label">📅 Schedule:</span>
          <span className="course-info-value">{course.schedule}</span>
        </div>
        <div className="course-info-row">
          <span className="course-info-label">👥 Students:</span>
          <span className="course-info-value">{course.studentsEnrolled} enrolled</span>
        </div>
        <div className="course-info-row">
          <span className="course-info-label">🏫 Room:</span>
          <span className="course-info-value">{course.room}</span>
        </div>
      </div>

      <div className="course-footer">
        <span className="course-semester">{course.semester}</span>
        <div className="course-actions">
          {/* Only show View Students if archived, else show all */}
          {archived ? (
            <button
              className="course-action-btn primary"
              onClick={() => onViewStudents && onViewStudents(course)}
            >
              View Students
            </button>
          ) : (
            <>
              <button
                className="course-action-btn primary"
                onClick={() => onViewStudents && onViewStudents(course)}
              >
                View Students
              </button>
              <button
                className="course-action-btn secondary"
                onClick={() => onManageGrades && onManageGrades(course)}
              >
                Grades
              </button>
              <button
                className="course-action-btn secondary"
                onClick={() => onAttendance && onAttendance(course)}
              >
                Attendance
              </button>
              <button
                className="course-action-btn archive"
                onClick={() => onArchive && onArchive(course)}
              >
                Archive
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
