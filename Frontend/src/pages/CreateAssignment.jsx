import React, { useState } from "react";
import "./CreateAssignment.css";

const CreateAssignment = ({ onBack, courseData: propCourseData }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    type: "assignment",
    description: "",
    totalMarks: "",
    dueDate: "",
    dueTime: "",
    instructions: "",
    attachments: [],
    allowLateSubmission: false,
    latePenalty: "",
    submissionFormat: "pdf",
  });

  // Sample course data
  const courseData = propCourseData || [
    {
      id: 1,
      code: "CSE 408",
      title: "Software Development",
      section: "A",
      studentsEnrolled: 45,
      schedule: "Sunday, Tuesday - 10:00 AM - 11:30 AM",
      room: "Room 301",
    },
    {
      id: 2,
      code: "CSE 412",
      title: "Machine Learning",
      section: "B",
      studentsEnrolled: 38,
      schedule: "Monday, Wednesday - 2:00 PM - 3:30 PM",
      room: "Room 205",
    },
    {
      id: 3,
      code: "CSE 498",
      title: "Thesis Supervision",
      section: "Research",
      studentsEnrolled: 8,
      schedule: "By Appointment",
      room: "Room 402",
    },
  ];

  const assignmentTypes = [
    { value: "assignment", label: "Assignment", icon: "📝" },
    { value: "project", label: "Project", icon: "🎯" },
    { value: "quiz", label: "Quiz", icon: "❓" },
    { value: "exam", label: "Exam", icon: "📋" },
    { value: "presentation", label: "Presentation", icon: "🎤" },
    { value: "report", label: "Report", icon: "📊" },
  ];

  const submissionFormats = [
    { value: "pdf", label: "PDF Document" },
    { value: "doc", label: "Word Document" },
    { value: "zip", label: "ZIP Archive" },
    { value: "code", label: "Source Code" },
    { value: "presentation", label: "Presentation File" },
    { value: "any", label: "Any Format" },
  ];

  const handleInputChange = (field, value) => {
    setAssignmentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAssignmentData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index) => {
    setAssignmentData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const required = [
      "title",
      "description",
      "totalMarks",
      "dueDate",
      "dueTime",
    ];
    for (let field of required) {
      if (!assignmentData[field]) {
        alert(
          `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }
    if (assignmentData.totalMarks <= 0) {
      alert("Total marks must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSaveAsDraft = () => {
    if (!assignmentData.title) {
      alert("Please enter a title to save as draft");
      return;
    }

    // Simulate saving as draft
    alert(
      `Assignment "${assignmentData.title}" saved as draft for ${selectedCourse.code}`
    );
  };

  const handlePublishAssignment = () => {
    if (!validateForm()) return;

    // Simulate publishing assignment
    const assignment = {
      ...assignmentData,
      courseId: selectedCourse.id,
      courseCode: selectedCourse.code,
      publishedDate: new Date().toISOString().split("T")[0],
      status: "published",
    };

    alert(
      `Assignment "${assignmentData.title}" published successfully for ${selectedCourse.code}!\n\nStudents will be notified automatically.`
    );

    // Reset form
    setAssignmentData({
      title: "",
      type: "assignment",
      description: "",
      totalMarks: "",
      dueDate: "",
      dueTime: "",
      instructions: "",
      attachments: [],
      allowLateSubmission: false,
      latePenalty: "",
      submissionFormat: "pdf",
    });
  };

  const renderCourseSelection = () => (
    <div className="course-selection">
      <div className="view-header">
        <div className="header-content">
          <h2>📄 Create Assignment</h2>
          <p>Select a course to create a new assignment</p>
        </div>
      </div>

      <div className="courses-grid">
        {courseData.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <div className="course-info">
                <h3>{course.code}</h3>
                <p className="course-title">{course.title}</p>
                <span className="course-section">Section {course.section}</span>
              </div>
              <div className="course-stats">
                <div className="stat-item">
                  <span className="stat-number">{course.studentsEnrolled}</span>
                  <span className="stat-label">Students</span>
                </div>
              </div>
            </div>

            <div className="course-details">
              <div className="detail-item">
                <span className="detail-label">Schedule:</span>
                <span className="detail-value">{course.schedule}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Room:</span>
                <span className="detail-value">{course.room}</span>
              </div>
            </div>

            <div className="course-actions">
              <button
                className="action-btn primary"
                onClick={() => setSelectedCourse(course)}
              >
                Create Assignment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssignmentForm = () => (
    <div className="assignment-form">
      <div className="view-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => setSelectedCourse(null)}>
            ← Back to Courses
          </button>
          <h2>📝 Create Assignment for {selectedCourse.code}</h2>
          <p>
            {selectedCourse.title} • Section {selectedCourse.section}
          </p>
        </div>
      </div>

      <div className="form-container">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Assignment Title *</label>
              <input
                type="text"
                id="title"
                value={assignmentData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter assignment title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Assignment Type *</label>
              <select
                id="type"
                value={assignmentData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="form-select"
              >
                {assignmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="totalMarks">Total Marks *</label>
              <input
                type="number"
                id="totalMarks"
                value={assignmentData.totalMarks}
                onChange={(e) =>
                  handleInputChange("totalMarks", e.target.value)
                }
                placeholder="Enter total marks"
                min="1"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="submissionFormat">Submission Format</label>
              <select
                id="submissionFormat"
                value={assignmentData.submissionFormat}
                onChange={(e) =>
                  handleInputChange("submissionFormat", e.target.value)
                }
                className="form-select"
              >
                {submissionFormats.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Due Date & Time</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dueDate">Due Date *</label>
              <input
                type="date"
                id="dueDate"
                value={assignmentData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueTime">Due Time *</label>
              <input
                type="time"
                id="dueTime"
                value={assignmentData.dueTime}
                onChange={(e) => handleInputChange("dueTime", e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Assignment Description</h3>
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={assignmentData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Provide a clear description of the assignment"
              rows="4"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Detailed Instructions</label>
            <textarea
              id="instructions"
              value={assignmentData.instructions}
              onChange={(e) =>
                handleInputChange("instructions", e.target.value)
              }
              placeholder="Provide detailed instructions, requirements, and guidelines"
              rows="6"
              className="form-textarea"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Submission Settings</h3>
          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="allowLateSubmission"
                checked={assignmentData.allowLateSubmission}
                onChange={(e) =>
                  handleInputChange("allowLateSubmission", e.target.checked)
                }
              />
              <label htmlFor="allowLateSubmission">Allow Late Submission</label>
            </div>
          </div>

          {assignmentData.allowLateSubmission && (
            <div className="form-group">
              <label htmlFor="latePenalty">Late Penalty (% per day)</label>
              <input
                type="number"
                id="latePenalty"
                value={assignmentData.latePenalty}
                onChange={(e) =>
                  handleInputChange("latePenalty", e.target.value)
                }
                placeholder="Enter penalty percentage"
                min="0"
                max="100"
                className="form-input"
              />
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Attachments</h3>
          <div className="form-group">
            <label htmlFor="attachments">Upload Files (Optional)</label>
            <input
              type="file"
              id="attachments"
              multiple
              onChange={handleFileUpload}
              className="form-file-input"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
            />
            <p className="form-help">
              Upload reference materials, templates, or sample files
            </p>
          </div>

          {assignmentData.attachments.length > 0 && (
            <div className="attachments-list">
              <h4>Attached Files:</h4>
              {assignmentData.attachments.map((file, index) => (
                <div key={index} className="attachment-item">
                  <span className="attachment-name">📎 {file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="remove-attachment"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleSaveAsDraft}
            className="action-btn secondary"
          >
            💾 Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublishAssignment}
            className="action-btn primary"
          >
            ✅ Publish Assignment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="create-assignment">
      <div className="create-assignment-container">
        {onBack && !selectedCourse && (
          <button onClick={onBack} className="main-back-button">
            ← Back to Quick Actions
          </button>
        )}

        <div className="create-assignment-content">
          {selectedCourse ? renderAssignmentForm() : renderCourseSelection()}
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
