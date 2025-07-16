import React, { useState, useEffect } from "react";
import "./CreateAssignment.css";

import CourseService from "../api/CourseService";
import authService from "../api/AuthService";
import AssignmentService from "../api/AssignmentService";

const CreateAssignment = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Only keep assignment fields: title, due_date, max_marks, description
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    due_date: "",
    max_marks: "",
    description: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        setCoursesError(null);
        const userData = authService.getUserData();
        const instructorId = userData?.profile_id || userData?.user_id;
        if (!instructorId) {
          setCoursesError("Could not determine instructor profile ID.");
          setCourses([]);
          setLoadingCourses(false);
          return;
        }
        console.log('[DEBUG][CreateAssignment] instructorId:', instructorId);
        const response = await CourseService.filterByInstructor(instructorId);
        console.log('[DEBUG][CreateAssignment] response:', response);
        setCourses(response || []);
      } catch (err) {
        setCoursesError("Failed to fetch courses. Please try again later.");
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);


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
      "max_marks",
      "due_date",
    ];
    for (let field of required) {
      if (!assignmentData[field]) {
        alert(
          `Please fill in the ${field.replace(/_/g, " ").replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }
    return true;
  };

  const handleSaveAsDraft = () => {
    if (!assignmentData.title) {
      alert("Please enter a title to save as draft");
      return;
    }

    alert(
      `Assignment "${assignmentData.title}" saved as draft for ${selectedCourse.code}`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const assignment = {
      course_id: selectedCourse.id,
      title: assignmentData.title,
      due_date: assignmentData.due_date,
      max_marks: Number(assignmentData.max_marks),
      description: assignmentData.description,
    };
    try {
      await AssignmentService.create(assignment);
      alert("Assignment created successfully!");
      // Optionally reset form or go back
    } catch (err) {
      alert("Failed to create assignment. Please try again.");
    }
  };

  // Step 1: Course selection
  if (!selectedCourse) {
    return (
      <div className="course-selection">
        <h2>Select a course</h2>
        {loadingCourses ? (
          <div>Loading courses...</div>
        ) : coursesError ? (
          <div style={{ color: 'red' }}>{coursesError}</div>
        ) : courses.length === 0 ? (
          <div>No courses found.</div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-info">
                  <h3>{course.course_code}</h3>
                  <p>{course.course_title}</p>
                  <button className="action-btn primary" onClick={() => setSelectedCourse(course)}>
                    Create Assignment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="assignment-form">
      <h2>Create Assignment for {selectedCourse.course_title} ({selectedCourse.course_code})</h2>
      <form onSubmit={handleSubmit} className="simple-assignment-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={assignmentData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="datetime-local"
            id="due_date"
            value={assignmentData.due_date}
            onChange={(e) => handleInputChange("due_date", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="max_marks">Max Marks</label>
          <input
            type="number"
            id="max_marks"
            value={assignmentData.max_marks}
            onChange={(e) => handleInputChange("max_marks", e.target.value)}
            min={1}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={assignmentData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            required
          />
        </div>
        <button type="submit" className="action-btn primary">Create Assignment</button>
        <button type="button" className="action-btn secondary" onClick={() => setSelectedCourse(null)}>
          ← Back to Courses
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
