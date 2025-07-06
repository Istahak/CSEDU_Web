import React, { useState } from "react";
import "./MarkAttendance.css";

const MarkAttendance = ({ onBack, courseData: propCourseData }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceData, setAttendanceData] = useState({});

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

  // Generate sample student data
  const generateStudentData = (courseId, studentCount) => {
    return Array.from({ length: studentCount }, (_, index) => ({
      id: index + 1,
      name: `Student ${index + 1}`,
      studentId: `CSE${2020 + (index % 4)}${String(index + 1).padStart(
        3,
        "0"
      )}`,
      email: `student${index + 1}@csedu.ac.bd`,
      previousAttendance: Math.round(Math.random() * 30 + 70), // 70-100%
      status: Math.random() > 0.1 ? "active" : "inactive",
    }));
  };

  const handleAttendanceChange = (studentId, status) => {
    const attendanceKey = `${selectedCourse.id}-${selectedDate}`;
    setAttendanceData((prev) => ({
      ...prev,
      [attendanceKey]: {
        ...prev[attendanceKey],
        [studentId]: status,
      },
    }));
  };

  const markAllPresent = () => {
    const students = generateStudentData(
      selectedCourse.id,
      selectedCourse.studentsEnrolled
    );
    const attendanceKey = `${selectedCourse.id}-${selectedDate}`;
    const allPresent = {};

    students.forEach((student) => {
      allPresent[student.id] = "present";
    });

    setAttendanceData((prev) => ({
      ...prev,
      [attendanceKey]: allPresent,
    }));
  };

  const markAllAbsent = () => {
    const students = generateStudentData(
      selectedCourse.id,
      selectedCourse.studentsEnrolled
    );
    const attendanceKey = `${selectedCourse.id}-${selectedDate}`;
    const allAbsent = {};

    students.forEach((student) => {
      allAbsent[student.id] = "absent";
    });

    setAttendanceData((prev) => ({
      ...prev,
      [attendanceKey]: allAbsent,
    }));
  };

  const clearAttendance = () => {
    const attendanceKey = `${selectedCourse.id}-${selectedDate}`;
    setAttendanceData((prev) => ({
      ...prev,
      [attendanceKey]: {},
    }));
  };

  const saveAttendance = () => {
    const attendanceKey = `${selectedCourse.id}-${selectedDate}`;
    const currentAttendance = attendanceData[attendanceKey] || {};
    const totalMarked = Object.keys(currentAttendance).length;

    if (totalMarked === 0) {
      alert("Please mark attendance for at least one student before saving.");
      return;
    }

    // Simulate saving to backend
    alert(
      `Attendance saved successfully for ${selectedCourse.code} on ${selectedDate}\n\nTotal students marked: ${totalMarked}`
    );
  };

  const renderCourseSelection = () => (
    <div className="course-selection">
      <div className="view-header">
        <div className="header-content">
          <h2>✅ Mark Attendance</h2>
          <p>Select a course to mark student attendance</p>
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
                Mark Attendance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttendanceMarking = () => {
    const students = generateStudentData(
      selectedCourse.id,
      selectedCourse.studentsEnrolled
    );
    const attendanceKey = `${selectedCourse.id}-${selectedDate}`;
    const currentAttendance = attendanceData[attendanceKey] || {};

    const filteredStudents = students.filter(
      (student) =>
        !searchTerm ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const presentCount = Object.values(currentAttendance).filter(
      (status) => status === "present"
    ).length;
    const absentCount = Object.values(currentAttendance).filter(
      (status) => status === "absent"
    ).length;
    const totalMarked = presentCount + absentCount;

    return (
      <div className="attendance-marking">
        <div className="view-header">
          <div className="header-content">
            <button
              className="back-btn"
              onClick={() => setSelectedCourse(null)}
            >
              ← Back to Courses
            </button>
            <h2>
              📋 {selectedCourse.code} - {selectedCourse.title}
            </h2>
            <p>
              Section {selectedCourse.section} •{" "}
              {selectedCourse.studentsEnrolled} Students
            </p>
          </div>
          <div className="header-actions">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        <div className="attendance-stats">
          <div className="stat-card">
            <div className="stat-value">{presentCount}</div>
            <div className="stat-label">Present</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{absentCount}</div>
            <div className="stat-label">Absent</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalMarked}</div>
            <div className="stat-label">Total Marked</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {selectedCourse.studentsEnrolled - totalMarked}
            </div>
            <div className="stat-label">Remaining</div>
          </div>
        </div>

        <div className="attendance-controls">
          <div className="control-group">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <button className="control-btn success" onClick={markAllPresent}>
              ✅ Mark All Present
            </button>
            <button className="control-btn danger" onClick={markAllAbsent}>
              ❌ Mark All Absent
            </button>
            <button className="control-btn secondary" onClick={clearAttendance}>
              🔄 Clear All
            </button>
          </div>
        </div>

        <div className="students-list">
          {filteredStudents.map((student) => {
            const attendanceStatus = currentAttendance[student.id];

            return (
              <div key={student.id} className="student-attendance-card">
                <div className="student-info">
                  <div className="student-avatar">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="student-details">
                    <h4>{student.name}</h4>
                    <p className="student-id">{student.studentId}</p>
                    <p className="student-email">{student.email}</p>
                  </div>
                  <div className="attendance-stats-mini">
                    <span className="attendance-percentage">
                      {student.previousAttendance}% attendance
                    </span>
                    <div className={`student-status ${student.status}`}>
                      {student.status}
                    </div>
                  </div>
                </div>

                <div className="attendance-actions">
                  <button
                    className={`attendance-btn present ${
                      attendanceStatus === "present" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleAttendanceChange(student.id, "present")
                    }
                  >
                    ✅ Present
                  </button>
                  <button
                    className={`attendance-btn absent ${
                      attendanceStatus === "absent" ? "active" : ""
                    }`}
                    onClick={() => handleAttendanceChange(student.id, "absent")}
                  >
                    ❌ Absent
                  </button>
                  <button
                    className={`attendance-btn late ${
                      attendanceStatus === "late" ? "active" : ""
                    }`}
                    onClick={() => handleAttendanceChange(student.id, "late")}
                  >
                    ⏰ Late
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="attendance-footer">
          <div className="footer-info">
            <p>
              Date: {selectedDate} • Course: {selectedCourse.code}
            </p>
            <p>
              Marked: {totalMarked} of {selectedCourse.studentsEnrolled}{" "}
              students
            </p>
          </div>
          <div className="footer-actions">
            <button className="action-btn secondary">💾 Save as Draft</button>
            <button className="action-btn primary" onClick={saveAttendance}>
              ✅ Save Attendance
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mark-attendance">
      <div className="mark-attendance-container">
        {onBack && !selectedCourse && (
          <button onClick={onBack} className="main-back-button">
            ← Back to Quick Actions
          </button>
        )}

        <div className="mark-attendance-content">
          {selectedCourse ? renderAttendanceMarking() : renderCourseSelection()}
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
