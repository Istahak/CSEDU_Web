import React, { useEffect, useState } from "react";
import "./GradeAssignment.css";

import CourseService from "../api/CourseService";
import AuthService from "../api/AuthService";
import AssignmentService from "../api/AssignmentService";
import AssignmentSubmissionService from "../api/AssignmentSubmissionService";

const GradeAssignment = ({ onBack }) => {
  const [activeView, setActiveView] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [marks, setMarks] = useState({}); // {submissionId: mark}
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const userData = AuthService.getUserData();
        const facultyId = userData?.profile_id || userData?.user_id;
        const response = await CourseService.filterByInstructor(facultyId);
        console.log('API response from filterByInstructor:', response);
        setCourses(Array.isArray(response) ? response : []);
        console.log('Setting courses to:', response);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!selectedCourse) {
        setAssignments([]);
        return;
      }
      setAssignmentsLoading(true);
      try {
        console.log("selected course was", selectedCourse.id)
        const response = await AssignmentService.getByCourse(selectedCourse.id);
        console.log("AssignmentService.getByCourse response:", response);
        setAssignments(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        setAssignments([]);
      }
      setAssignmentsLoading(false);
    };

    fetchAssignments();
  }, [selectedCourse]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!selectedAssignment || !selectedAssignment.id) {
        setSubmissions([]);
        return;
      }
      setSubmissionsLoading(true);
      try {
        const res = await AssignmentSubmissionService.getByAssignment(selectedAssignment.id);
        // If API response is {submissions: [...]}, extract the array
        const submissionsArray = Array.isArray(res) ? res : (res && Array.isArray(res.submissions) ? res.submissions : []);
        console.log('Fetched submissions:', submissionsArray);
        setSubmissions(submissionsArray);
        const initialMarks = {};
        submissionsArray.forEach(sub => {
          initialMarks[sub.id] = sub.grade ?? "";
        });
        setMarks(initialMarks);
      } catch (e) {
        setSubmissions([]);
      }
      setSubmissionsLoading(false);
    };
    fetchSubmissions();
  }, [selectedAssignment]);

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
    setMarks(m => ({ ...m, [studentId]: newGrade }));
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCoursesView = () => {
    console.log('All courses:', courses);
    console.log('Filtered courses:', filteredCourses);
    return (
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
          {courses.map((course) => {
            return (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <div className="course-info">
                    <h3>{course.course_code}</h3>
                    <p className="course-title">{course.course_title}</p>
                    <span className="course-section">Semester {course.semester}</span>
                    <span className="course-section">Credit: {course.credit}</span>
                    <span className="course-section">Schedule: {course.schedule}</span>
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
            );
          })}
        </div>
      </div>
    );
  }

  const renderAssignmentsView = () => (
    <div className="assignments-view">
      <div className="view-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => setActiveView("courses")}>
            ← Back to Courses
          </button>
          <h2>
            📝 {selectedCourse.course_code} - {selectedCourse.course_title}
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
        {assignmentsLoading ? (
          <div className="loading-message">Loading assignments...</div>
        ) : assignments && assignments.length > 0 ? (
          <div>
            {assignments.map((assignment) => (
              <div key={assignment.id} className="assignment-card">
                <div className="assignment-header">
                  <div className="assignment-info">
                    <div className="assignment-title">
                      <span className="assignment-icon">{getTypeIcon(assignment.type)}</span>
                      <div>
                        <h4>{assignment.title}</h4>
                        <span className="assignment-type">Assignment</span>
                      </div>
                    </div>
                    <div className="assignment-details">
                      <span className="detail-item">📅 Due: {assignment.due_date ? new Date(assignment.due_date).toLocaleString() : 'N/A'}</span>
                      <span className="detail-item">📊 Marks: {assignment.max_marks ?? 'N/A'}</span>
                      <span className="detail-item">📥 Submissions: {assignment.submissions ?? 'N/A'}</span>
                      <span className="detail-item">✅ Graded: {assignment.graded ?? 'N/A'}</span>
                    </div>
                  </div>
                  <div className="assignment-status">
                    <span className="status-badge" style={{backgroundColor: getStatusColor(assignment.status)}}>{assignment.status?.toUpperCase() || 'PENDING'}</span>
                  </div>
                </div>
                <div className="assignment-actions">
                  <button
                    className="action-btn primary"
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setActiveView("grading");
                    }}
                  >
                    Grade Submissions
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="assignment-card">
            <div className="assignment-header">
              <div className="assignment-info">
                <div className="assignment-title">
                  <span className="assignment-icon">📝</span>
                  <div>
                    <h4>No Assignments</h4>
                    <span className="assignment-type">N/A</span>
                  </div>
                </div>
                <div className="assignment-details">
                  <span className="detail-item">No assignments found for this course.</span>
                  <span className="detail-item">Selected Course: {selectedCourse?.course_code} - {selectedCourse?.course_title}</span>
                </div>
              </div>
              <div className="assignment-status">
                <span className="status-badge" style={{backgroundColor: getStatusColor('pending')}}>PENDING</span>
              </div>
            </div>
            <div className="assignment-actions">
              <button
                className="action-btn primary"
                onClick={() => {
                  setSelectedAssignment({id: 1, title: 'N/A', totalMarks: 100, course: selectedCourse});
                  setActiveView("grading");
                }}
              >
                Go to Grading Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const [studentNames, setStudentNames] = useState({}); // {studentId: fullName}

  // Fetch missing student names when submissions change
  useEffect(() => {
    const fetchNames = async () => {
      const missingIds = submissions
        .map((s) => s.student_id)
        .filter((id) => id && !studentNames[id]);
      if (missingIds.length === 0) return;
      const updates = {};
      for (const id of missingIds) {
        try {
          const profile = await StudentProfileService.getStudentProfile(id);
          updates[id] = profile?.full_name || profile?.name || "Unknown Student";
        } catch (e) {
          updates[id] = "Unknown Student";
        }
      }
      setStudentNames((prev) => ({ ...prev, ...updates }));
    };
    if (submissions && submissions.length > 0) fetchNames();
    // eslint-disable-next-line
  }, [submissions]);

  const renderGradingView = () => {
    return (
      <div className="grading-view">
        <div className="view-header">
          <div className="header-content">
            <button className="back-btn" onClick={() => setActiveView("assignments")}>
              ← Back to Assignments
            </button>
            <h2>✏️ Grade Assignment</h2>
            <p>{selectedAssignment?.title} • {selectedCourse?.code}</p>
          </div>
        </div>
        <div className="students-grading-list">
          {submissionsLoading ? (
            <div className="loading-message">Loading submissions...</div>
          ) : submissions.length === 0 ? (
            <div className="no-submissions">No submissions found for this assignment.</div>
          ) : (
            submissions.map((submission) => {
              const fullName = studentNames[submission.student_id] || "Unknown Student";
              return (
                <div key={submission.id} className="student-grading-card">
                  <div className="student-info">
                    <div className="student-avatar">
                      {fullName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="student-details">
                      <h4>{fullName}</h4>
                      <p>{submission.student_id || "-"}</p>
                      <span className="submission-date">📅 Submitted: {submission.submission_time ? new Date(submission.submission_time).toLocaleString() : "N/A"}</span>

                      <span className="grade-max">
                        / {selectedAssignment?.max_marks || 100}
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
                          max={selectedAssignment?.max_marks || 100}
                          value={marks[submission.id] ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            setMarks((m) => ({ ...m, [submission.id]: value }));
                          }}
                          className="grade-input"
                          placeholder="0"
                        />
                        <span className="grade-max">
                          / {selectedAssignment?.max_marks || 100}
                        </span>
                      </div>
                    </div>
                    <div style={{marginTop:8}}>
                      <a href={submission.attached_file} target="_blank" rel="noopener noreferrer" className="action-btn secondary">📄 View Submission</a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
