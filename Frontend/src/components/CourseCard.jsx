import React from "react";
import "./CourseCard.css";

import { useEffect, useState } from "react";
import ClassroomService from "../api/ClassroomService";

const CourseCard = ({ course, onViewStudents, onManageGrades, onAttendance, onArchive, archived }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomLoading, setRoomLoading] = useState(false);
  const [roomError, setRoomError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchRoom() {
      if (!course.classroom_id) {
        setRoomNumber("");
        return;
      }
      setRoomLoading(true);
      setRoomError(null);
      try {
        const response = await ClassroomService.getById(course.classroom_id);
        if (isMounted && response && response.room_no) {
          setRoomNumber(response.room_no);
        } else if (isMounted && response && response.data && response.data.room_no) {
          setRoomNumber(response.data.room_no);
        } else {
          setRoomNumber("");
        }
      } catch (err) {
        setRoomError("Could not fetch room");
        setRoomNumber("");
      } finally {
        setRoomLoading(false);
      }
    }
    fetchRoom();
    return () => { isMounted = false; };
  }, [course.classroom_id]);
  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3 className="course-title">{course.course_code} - {course.course_title}</h3>
        <span className="course-badge academic">{course.section}</span>
      </div>

      <div className="course-description">
        <div className="course-info-row">
          <span className="course-info-label">📅 Schedule:</span>
          <span className="course-info-value">{course.schedule}</span>
        </div>
        <div className="course-info-row">
          <span className="course-info-label">👥 Students:</span>
          <span className="course-info-value">50 {course.studentsEnrolled} enrolled</span>
        </div>
        <div className="course-info-row">
          <span className="course-info-label">🏫 Room:</span>
          <span className="course-info-value">{roomNumber ? roomNumber : 'Loading...'}</span>
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
