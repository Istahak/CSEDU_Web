import React, { useState } from "react";
import "./GradeAssignment.css";

const GradeAssignment = ({ onBack, courseData: propCourseData }) => {
  const [activeView, setActiveView] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Sample course data
  const courseData = propCourseData || [
    {
      id: 1,
      code: "CSE 408",
      title: "Software Development",
      section: "A",
      studentsEnrolled: 45,
      assignments: [
        {
          id: 1,
          title: "Assignment 1: System Analysis",
          type: "assignment",
          totalMarks: 20,
          dueDate: "2024-03-15",
          submissions: 42,
          graded: 38,
          status: "grading",
        },
        {
          id: 2,
          title: "Mid Term Exam",
          type: "exam",
          totalMarks: 50,
          dueDate: "2024-03-20",
          submissions: 45,
          graded: 45,
          status: "completed",
        },
        {
          id: 3,
          title: "Assignment 2: Database Design",
          type: "assignment",
          totalMarks: 25,
          dueDate: "2024-04-01",
          submissions: 40,
          graded: 0,
          status: "pending",
        },
        {
          id: 4,
          title: "Final Project",
          type: "project",
          totalMarks: 100,
          dueDate: "2024-04-30",
          submissions: 0,
          graded: 0,
          status: "upcoming",
        },
      ],
    },
    {
      id: 2,
      code: "CSE 412",
      title: "Machine Learning",
      section: "B",
      studentsEnrolled: 38,
      assignments: [
        {
          id: 5,
          title: "Assignment 1: Linear Regression",
          type: "assignment",
          totalMarks: 30,
          dueDate: "2024-03-18",
          submissions: 36,
          graded: 36,
          status: "completed",
        },
        {
          id: 6,
          title: "Mid Term Exam",
          type: "exam",
          totalMarks: 60,
          dueDate: "2024-03-25",
          submissions: 38,
          graded: 20,
          status: "grading",
        },
        {
          id: 7,
          title: "Assignment 2: Neural Networks",
          type: "assignment",
          totalMarks: 35,
          dueDate: "2024-04-05",
          submissions: 0,
          graded: 0,
          status: "upcoming",
        },
      ],
    },
    {
      id: 3,
      code: "CSE 498",
      title: "Thesis Supervision",
      section: "Research",
      studentsEnrolled: 8,
      assignments: [
        {
          id: 8,
          title: "Proposal Defense",
          type: "presentation",
          totalMarks: 40,
          dueDate: "2024-03-12",
          submissions: 8,
          graded: 8,
          status: "completed",
        },
        {
          id: 9,
          title: "Progress Report 1",
          type: "report",
          totalMarks: 30,
          dueDate: "2024-04-10",
          submissions: 6,
          graded: 2,
          status: "grading",
        },
      ],
    },
  ];

  // Sample student data for selected assignment
  const [studentGrades, setStudentGrades] = useState({
    1: [
      {
        id: 1,
        name: "Ahmed Hassan",
        studentId: "CSE-2020-001",
        submissionDate: "2024-03-14",
        grade: 18,
        maxGrade: 20,
        status: "graded",
        feedback:
          "Excellent work with minor improvements needed in documentation.",
      },
      {
        id: 2,
        name: "Fatima Khan",
        studentId: "CSE-2020-002",
        submissionDate: "2024-03-15",
        grade: 16,
        maxGrade: 20,
        status: "graded",
        feedback: "Good analysis but missing some edge cases.",
      },
      {
        id: 3,
        name: "Mohammad Rahman",
        studentId: "CSE-2020-003",
        submissionDate: "2024-03-13",
        grade: 19,
        maxGrade: 20,
        status: "graded",
        feedback: "Outstanding work with comprehensive analysis.",
      },
      {
        id: 4,
        name: "Ayesha Begum",
        studentId: "CSE-2020-004",
        submissionDate: "2024-03-15",
        grade: null,
        maxGrade: 20,
        status: "pending",
        feedback: "",
      },
      {
        id: 5,
        name: "Rakib Ahmed",
        studentId: "CSE-2020-005",
        submissionDate: "2024-03-14",
        grade: null,
        maxGrade: 20,
        status: "pending",
        feedback: "",
      },
    ],
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#27ae60";
      case "grading":
        return "#f39c12";
      case "pending":
        return "#e74c3c";
      case "upcoming":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "assignment":
        return "📝";
      case "exam":
        return "📋";
      case "project":
        return "🎯";
      case "presentation":
        return "🎤";
      case "report":
        return "📊";
      default:
        return "📄";
    }
  };

  const handleGradeChange = (studentId, newGrade) => {
    const assignmentId = selectedAssignment.id;
    setStudentGrades((prev) => ({
      ...prev,
      [assignmentId]:
        prev[assignmentId]?.map((student) =>
          student.id === studentId
            ? {
                ...student,
                grade: newGrade,
                status: newGrade !== null ? "graded" : "pending",
              }
            : student
        ) || [],
    }));
  };

  const handleFeedbackChange = (studentId, newFeedback) => {
    const assignmentId = selectedAssignment.id;
    setStudentGrades((prev) => ({
      ...prev,
      [assignmentId]:
        prev[assignmentId]?.map((student) =>
          student.id === studentId
            ? { ...student, feedback: newFeedback }
            : student
        ) || [],
    }));
  };

  const handleExportGrades = (assignment) => {
    // Get students for this assignment
    const students = studentGrades[assignment.id] || [];

    // If no students data, create sample data based on the assignment
    let exportData = [];
    if (students.length === 0) {
      // Generate sample data for assignments with no grading data
      exportData = Array.from(
        { length: selectedCourse.studentsEnrolled },
        (_, index) => ({
          studentId: `CSE${2020 + (index % 4)}${String(index + 1).padStart(
            3,
            "0"
          )}`,
          name: `Student ${index + 1}`,
          email: `student${index + 1}@csedu.ac.bd`,
          grade: "",
          maxGrade: assignment.totalMarks,
          status: "Not Graded",
          feedback: "",
        })
      );
    } else {
      // Use actual grading data
      exportData = students.map((student) => ({
        studentId: student.studentId,
        name: student.name,
        email:
          student.studentId.toLowerCase().replace("-", "") + "@csedu.ac.bd",
        grade: student.grade || "",
        maxGrade: assignment.totalMarks,
        status: student.status === "graded" ? "Graded" : "Pending",
        feedback: student.feedback || "",
      }));
    }

    // Create CSV content
    const csvHeaders = [
      "Student ID",
      "Name",
      "Email",
      "Grade",
      "Max Grade",
      "Status",
      "Feedback",
    ];
    const csvRows = exportData.map((student) => [
      student.studentId,
      student.name,
      student.email,
      student.grade,
      student.maxGrade,
      student.status,
      `"${student.feedback.replace(/"/g, '""')}"`, // Escape quotes in feedback
    ]);

    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${selectedCourse.code}_${assignment.title.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )}_grades.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleExportAllGrades = () => {
    // Export grades for all assignments in the current course
    const allGradesData = [];

    selectedCourse.assignments.forEach((assignment) => {
      const students = studentGrades[assignment.id] || [];

      if (students.length === 0) {
        // Generate sample data for assignments with no grading data
        Array.from({ length: selectedCourse.studentsEnrolled }, (_, index) => {
          allGradesData.push({
            assignmentTitle: assignment.title,
            assignmentType: assignment.type,
            maxMarks: assignment.totalMarks,
            studentId: `CSE${2020 + (index % 4)}${String(index + 1).padStart(
              3,
              "0"
            )}`,
            name: `Student ${index + 1}`,
            email: `student${index + 1}@csedu.ac.bd`,
            grade: "",
            status: "Not Graded",
            feedback: "",
          });
        });
      } else {
        // Use actual grading data
        students.forEach((student) => {
          allGradesData.push({
            assignmentTitle: assignment.title,
            assignmentType: assignment.type,
            maxMarks: assignment.totalMarks,
            studentId: student.studentId,
            name: student.name,
            email:
              student.studentId.toLowerCase().replace("-", "") + "@csedu.ac.bd",
            grade: student.grade || "",
            status: student.status === "graded" ? "Graded" : "Pending",
            feedback: student.feedback || "",
          });
        });
      }
    });

    // Create CSV content
    const csvHeaders = [
      "Assignment",
      "Type",
      "Max Marks",
      "Student ID",
      "Name",
      "Email",
      "Grade",
      "Status",
      "Feedback",
    ];
    const csvRows = allGradesData.map((row) => [
      row.assignmentTitle,
      row.assignmentType,
      row.maxMarks,
      row.studentId,
      row.name,
      row.email,
      row.grade,
      row.status,
      `"${row.feedback.replace(/"/g, '""')}"`, // Escape quotes in feedback
    ]);

    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${selectedCourse.code}_All_Assignments_Grades.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const filteredCourses = courseData.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCoursesView = () => (
    <div className="courses-view">
      <div className="view-header">
        <div className="header-content">
          <h2>📚 Course Management</h2>
          <p>Select a course to manage assignments and grades</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => (
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
                <div className="stat-item">
                  <span className="stat-number">
                    {course.assignments.length}
                  </span>
                  <span className="stat-label">Assignments</span>
                </div>
              </div>
            </div>

            <div className="course-progress">
              <div className="progress-stats">
                <div className="progress-item">
                  <span className="progress-label">Completed</span>
                  <span className="progress-value">
                    {
                      course.assignments.filter((a) => a.status === "completed")
                        .length
                    }
                  </span>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Grading</span>
                  <span className="progress-value">
                    {
                      course.assignments.filter((a) => a.status === "grading")
                        .length
                    }
                  </span>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Pending</span>
                  <span className="progress-value">
                    {
                      course.assignments.filter((a) => a.status === "pending")
                        .length
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="course-actions">
              <button
                className="action-btn primary"
                onClick={() => {
                  setSelectedCourse(course);
                  setActiveView("assignments");
                }}
              >
                Manage Grades
              </button>
              <button
                className="action-btn secondary"
                onClick={() => {
                  setSelectedCourse(course);
                  setActiveView("students");
                }}
              >
                View Students
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssignmentsView = () => (
    <div className="assignments-view">
      <div className="view-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => setActiveView("courses")}>
            ← Back to Courses
          </button>
          <h2>
            📝 {selectedCourse.code} - {selectedCourse.title}
          </h2>
          <p>
            Section {selectedCourse.section} • {selectedCourse.studentsEnrolled}{" "}
            Students
          </p>
        </div>
        <div className="header-actions">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Assignments</option>
            <option value="grading">Need Grading</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="assignments-list">
        {selectedCourse.assignments
          .filter(
            (assignment) =>
              filterType === "all" || assignment.status === filterType
          )
          .map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <div className="assignment-info">
                  <div className="assignment-title">
                    <span className="assignment-icon">
                      {getTypeIcon(assignment.type)}
                    </span>
                    <div>
                      <h4>{assignment.title}</h4>
                      <span className="assignment-type">
                        {assignment.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="assignment-details">
                    <span className="detail-item">
                      📅 Due: {assignment.dueDate}
                    </span>
                    <span className="detail-item">
                      📊 Marks: {assignment.totalMarks}
                    </span>
                    <span className="detail-item">
                      📥 Submissions: {assignment.submissions}
                    </span>
                    <span className="detail-item">
                      ✅ Graded: {assignment.graded}
                    </span>
                  </div>
                </div>
                <div className="assignment-status">
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: getStatusColor(assignment.status),
                    }}
                  >
                    {assignment.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="assignment-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        assignment.submissions > 0
                          ? (assignment.graded / assignment.submissions) * 100
                          : 0
                      }%`,
                      backgroundColor: getStatusColor(assignment.status),
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  {assignment.graded} of {assignment.submissions} graded
                </span>
              </div>

              <div className="assignment-actions">
                <button
                  className="action-btn primary"
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setActiveView("grading");
                  }}
                  disabled={assignment.submissions === 0}
                >
                  Grade Submissions
                </button>
                <button
                  className="action-btn secondary"
                  onClick={() => handleExportGrades(assignment)}
                >
                  📊 Export Grades
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderGradingView = () => {
    const students = studentGrades[selectedAssignment.id] || [];
    const pendingCount = students.filter((s) => s.status === "pending").length;
    const gradedCount = students.filter((s) => s.status === "graded").length;

    return (
      <div className="grading-view">
        <div className="view-header">
          <div className="header-content">
            <button
              className="back-btn"
              onClick={() => setActiveView("assignments")}
            >
              ← Back to Assignments
            </button>
            <h2>✏️ Grade Assignment</h2>
            <p>
              {selectedAssignment.title} • {selectedCourse.code}
            </p>
          </div>
          <div className="grading-stats">
            <div className="stat-card">
              <span className="stat-number">{gradedCount}</span>
              <span className="stat-label">Graded</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{pendingCount}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {selectedAssignment.totalMarks}
              </span>
              <span className="stat-label">Max Marks</span>
            </div>
          </div>
        </div>

        <div className="grading-controls">
          <div className="control-group">
            <button className="control-btn">📤 Import Grades</button>
            <button className="control-btn">📋 Grade All</button>
            <button className="control-btn">💾 Save Progress</button>
            <button className="control-btn" onClick={handleExportAllGrades}>
              📊 Export All Grades
            </button>
            <button className="control-btn primary">✅ Publish Grades</button>
          </div>
        </div>

        <div className="students-grading-list">
          {students.map((student) => (
            <div key={student.id} className="student-grading-card">
              <div className="student-info">
                <div className="student-avatar">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="student-details">
                  <h4>{student.name}</h4>
                  <p>{student.studentId}</p>
                  <span className="submission-date">
                    📅 Submitted: {student.submissionDate}
                  </span>
                </div>
              </div>

              <div className="grading-section">
                <div className="grade-input-group">
                  <label>Grade</label>
                  <div className="grade-input-wrapper">
                    <input
                      type="number"
                      min="0"
                      max={selectedAssignment.totalMarks}
                      value={student.grade || ""}
                      onChange={(e) =>
                        handleGradeChange(
                          student.id,
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                      className="grade-input"
                      placeholder="0"
                    />
                    <span className="grade-max">
                      / {selectedAssignment.totalMarks}
                    </span>
                  </div>
                </div>

                <div className="feedback-group">
                  <label>Feedback</label>
                  <textarea
                    value={student.feedback}
                    onChange={(e) =>
                      handleFeedbackChange(student.id, e.target.value)
                    }
                    className="feedback-input"
                    placeholder="Add feedback for the student..."
                    rows="3"
                  />
                </div>

                <div className="grading-actions">
                  <button
                    className="action-btn secondary"
                    onClick={() =>
                      window.open(`/submission/${student.id}`, "_blank")
                    }
                  >
                    📄 View Submission
                  </button>
                  <span className={`status-indicator ${student.status}`}>
                    {student.status === "graded" ? "✅ Graded" : "⏳ Pending"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grading-footer">
          <button className="action-btn secondary">💾 Save as Draft</button>
          <button className="action-btn primary">✅ Publish All Grades</button>
        </div>
      </div>
    );
  };

  const renderStudentsView = () => (
    <div className="students-view">
      <div className="view-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => setActiveView("courses")}>
            ← Back to Courses
          </button>
          <h2>
            👥 {selectedCourse.code} - Students (
            {selectedCourse.studentsEnrolled})
          </h2>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Students</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="students-stats">
        <div className="stat-card">
          <div className="stat-value">{selectedCourse.studentsEnrolled}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.round(selectedCourse.studentsEnrolled * 0.95)}
          </div>
          <div className="stat-label">Active Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.round(selectedCourse.studentsEnrolled * 0.78)}
          </div>
          <div className="stat-label">Avg. Attendance</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {selectedCourse.assignments?.reduce(
              (sum, a) => sum + a.graded,
              0
            ) || 0}
          </div>
          <div className="stat-label">Graded Submissions</div>
        </div>
      </div>

      <div className="students-grid">
        {/* Generate sample student data */}
        {Array.from({ length: selectedCourse.studentsEnrolled }, (_, index) => {
          const student = {
            id: index + 1,
            name: `Student ${index + 1}`,
            studentId: `CSE${2020 + (index % 4)}${String(index + 1).padStart(
              3,
              "0"
            )}`,
            email: `student${index + 1}@csedu.ac.bd`,
            attendance: Math.round(Math.random() * 40 + 60),
            assignments: selectedCourse.assignments?.length || 0,
            completed: Math.round(
              Math.random() * (selectedCourse.assignments?.length || 3) + 1
            ),
            avgGrade: Math.round(Math.random() * 30 + 70),
            status: Math.random() > 0.1 ? "active" : "inactive",
          };

          // Filter students based on search term
          const matchesSearch =
            !searchTerm ||
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesFilter =
            filterType === "all" || student.status === filterType;

          if (!matchesSearch || !matchesFilter) return null;

          return (
            <div key={student.id} className="student-card">
              <div className="student-header">
                <div className="student-avatar">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p className="student-id">{student.studentId}</p>
                  <p className="student-email">{student.email}</p>
                </div>
                <div className={`student-status ${student.status}`}>
                  {student.status}
                </div>
              </div>

              <div className="student-stats">
                <div className="stat-item">
                  <span className="stat-label">Attendance</span>
                  <span className="stat-value">{student.attendance}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Assignments</span>
                  <span className="stat-value">
                    {student.completed}/{student.assignments}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Avg. Grade</span>
                  <span className="stat-value">{student.avgGrade}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      case "courses":
        return renderCoursesView();
      case "assignments":
        return renderAssignmentsView();
      case "grading":
        return renderGradingView();
      case "students":
        return renderStudentsView();
      default:
        return renderCoursesView();
    }
  };

  return (
    <div className="grade-assignment">
      <div className="grade-assignment-container">
        {onBack && activeView === "courses" && (
          <button onClick={onBack} className="main-back-button">
            ← Back to Quick Actions
          </button>
        )}

        <div className="grade-assignment-content">{renderActiveView()}</div>
      </div>
    </div>
  );
};

export default GradeAssignment;
