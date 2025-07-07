import React, { useState } from "react";
import "./ExamSchedule.css";

const ExamSchedule = ({ onBack }) => {
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState("All");

  const semesters = ["All", "Fall 2024", "Spring 2024", "Summer 2024"];
  const courses = ["All", "CS201", "CS302", "CS303", "CS401"];
  const rooms = ["All", "Room 201", "Room 202", "Room 203", "Room 204"];

  const examData = [
    {
      id: 1,
      course: "Data Structures and Algorithms",
      courseCode: "CS201",
      date: "2024-07-15",
      time: "10:00 AM",
      room: "Room 201",
      invigilators: "Dr. Mosaddek Khan, DR. MD. REZAUL KARIM",
      semester: "Fall 2024",
      status: "upcoming",
    },
    {
      id: 2,
      course: "Operating Systems",
      courseCode: "CS302",
      date: "2024-07-16",
      time: "2:00 PM",
      room: "Room 202",
      invigilators: "Dr. Mosaddek Khan, DR. MD. REZAUL KARIM",
      semester: "Fall 2024",
      status: "upcoming",
    },
    {
      id: 3,
      course: "Database Management Systems",
      courseCode: "CS303",
      date: "2024-07-17",
      time: "10:00 AM",
      room: "Room 203",
      invigilators: "Dr. Mosaddek Khan, DR. MD. REZAUL KARIM",
      semester: "Fall 2024",
      status: "upcoming",
    },
    {
      id: 4,
      course: "Computer Networks",
      courseCode: "CS401",
      date: "2024-07-18",
      time: "2:00 PM",
      room: "Room 204",
      invigilators: "Dr. Mosaddek Khan, DR. MD. REZAUL KARIM",
      semester: "Fall 2024",
      status: "upcoming",
    },
  ];

  const getFilteredExams = () => {
    return examData.filter((exam) => {
      const semesterMatch =
        selectedSemester === "All" || exam.semester === selectedSemester;
      const courseMatch =
        selectedCourse === "All" || exam.courseCode === selectedCourse;
      const roomMatch = selectedRoom === "All" || exam.room === selectedRoom;
      return semesterMatch && courseMatch && roomMatch;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const filteredExams = getFilteredExams();

  return (
    <div className="exam-schedule">
      <div className="exam-container">
        {/* Header Section */}
        <div className="notices-header">
          <h1 className="notices-title">Exam Schedule</h1>
          <p className="notices-subtitle">
            View upcoming exams and examination details for all courses.
          </p>
        </div>

        {/* Filter Section */}
        <div className="exam-filter-section">
          <div className="filter-tabs">
            <div className="filter-tab active">Semester</div>
            <div className="filter-tab">Course</div>
            <div className="filter-tab">Room</div>
            <div className="filter-tab-highlight">All</div>
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <select
                className="filter-select"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select
                className="filter-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select
                className="filter-select"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Upcoming Exams Section */}
        <div className="upcoming-exams-section">
          <h2 className="section-title">Upcoming Exams</h2>

          <div className="exams-grid">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="exam-card">
                <div className="exam-card-header">
                  <h3 className="exam-course-name">{exam.course}</h3>
                  <span className="exam-course-code">
                    Course Code: {exam.courseCode}
                  </span>
                </div>

                <div className="exam-card-body">
                  <div className="exam-detail">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {formatDate(exam.date)}
                    </span>
                  </div>

                  <div className="exam-detail">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{exam.time}</span>
                  </div>

                  <div className="exam-detail">
                    <span className="detail-label">Room:</span>
                    <span className="detail-value">{exam.room}</span>
                  </div>

                  <div className="exam-detail">
                    <span className="detail-label">Invigilators:</span>
                    <span className="detail-value">{exam.invigilators}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="no-exams">
              <div className="no-exams-content">
                <span className="no-exams-icon">📅</span>
                <h3>No exams found</h3>
                <p>No exams match your current filter criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;
