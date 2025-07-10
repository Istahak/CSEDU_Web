import React from "react";
import "./StudentCard.css";

// Redesigned StudentCard to match ResearchCard/CourseCard style
const StudentCard = ({
  student,
  type = "thesis", // "thesis" or "assistant"
  onScheduleMeeting,
  onViewDetails,
  onAssignTasks,
  onRemove,
  hideButtons = false
}) => {
  const isThesisStudent = type === "thesis";
  const isAssistant = type === "assistant";

  return (
    <div className={`course-card student-card${isThesisStudent ? ' thesis' : ' assistant'}`}>
      <div className="course-card-header">
        <h3 className="course-title">{student.name}</h3>
        <span className="course-badge">{student.id}</span>
        {isAssistant && (
          <span className="role-badge assistant">RA</span>
        )}
      </div>
      <div className="course-description">
        {isThesisStudent && (
          <>
            <div className="course-info-row">
              <span className="course-info-label">� Email:</span>
              <span className="course-info-value">{student.email}</span>
            </div>
            <div className="course-info-row">
              <span className="course-info-label">�📝 Thesis Topic:</span>
              <span className="course-info-value">{student.thesisTopic}</span>
            </div>
            <div className="course-info-row">
              <span className="course-info-label"> Start Date:</span>
              <span className="course-info-value">{student.startDate}</span>
            </div>
          </>
        )}
        {isAssistant && (
          <>
            <div className="course-info-row">
              <span className="course-info-label">� Email:</span>
              <span className="course-info-value">{student.email}</span>
            </div>
            <div className="course-info-row">
              <span className="course-info-label">�🔬 Research Area:</span>
              <span className="course-info-value">{student.researchArea}</span>
            </div>
            <div className="course-info-row">
              <span className="course-info-label">⏰ Duration:</span>
              <span className="course-info-value">{student.duration}</span>
            </div>
            <div className="course-info-row">
              <span className="course-info-label">📅 Joined:</span>
              <span className="course-info-value">{student.joinDate}</span>
            </div>
          </>
        )}
      </div>
      {!hideButtons && (
        <div className="course-footer">
          <span className="course-semester">
            {isThesisStudent ? `Year ${student.year || 'Final'}` : `${student.level || 'Undergraduate'}`}
          </span>
          <div className="course-actions">
            {isThesisStudent ? (
              <>
                <button className="course-action-btn secondary" onClick={() => onScheduleMeeting && onScheduleMeeting(student)}>
                  Schedule Meeting
                </button>
                <button className="course-action-btn remove" onClick={() => onRemove && onRemove(student)}>
                  Remove
                </button>
              </>
            ) : (
              <>
                <button className="course-action-btn primary" onClick={() => onViewDetails && onViewDetails(student)}>
                  View Details
                </button>
                <button className="course-action-btn secondary" onClick={() => onAssignTasks && onAssignTasks(student)}>
                  Assign Tasks
                </button>
                <button className="course-action-btn remove" onClick={() => onRemove && onRemove(student)}>
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
