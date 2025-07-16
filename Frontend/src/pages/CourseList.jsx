import React, { useState, useEffect } from "react";
import CourseService from "../api/CourseService";
import "./Academics.css";

const CourseList = ({ onCourseSelect }) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    CourseService.getAll()
      .then((response) => {
        if (isMounted) {
          const mapped = (Array.isArray(response) ? response : []).map(course => ({
  id: course.id,
  title: course.course_title || "",
  code: course.course_code || "",
  description: course.intro || "",
  degree: course.degree || "",
  semester: course.semester || "",
  status: course.is_active ? "Active" : "Inactive",
  image: course.image || "📘",
  // Add more mappings if needed
}));
setCourseList(mapped);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError("Failed to load courses. Please try again later.");
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  const getFilteredCourses = () => {
    return courseList.filter(course => {
      const degreeMatch = selectedDegree === "all" || course.degree === selectedDegree;
      const semesterMatch = selectedSemester === "all" || course.semester === selectedSemester;
      return degreeMatch && semesterMatch;
    });
  };

  const getUniqueDegrees = () => {
    const degrees = [...new Set(courseList.map(course => course.degree))];
    return degrees;
  };

  const getUniqueSemesters = () => {
    const semesters = [...new Set(courseList.map(course => course.semester))];
    return semesters.sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      return aNum - bNum;
    });
  };

  const filteredCourses = getFilteredCourses();

  return (
    <div className="academics-page">
      {/* <div className="academics-header">
        <h1 className="page-title">Course List</h1>
        <p className="page-subtitle">
          Explore detailed course information for the Department of Computer Science and Engineering
        </p>
      </div> */}
      <div className="academics-content">
        <div className="content-section">
          <h2 className="section-title">Course List</h2>
          {/* Filter Section */}
          <div className="courses-filter">
            <div className="filter-group">
              <span className="filter-label">Filter by:</span>
              <div className="filter-controls">
                <div className="filter-item">
                  <label htmlFor="degree-filter" className="filter-item-label">Degree</label>
                  <select
                    id="degree-filter"
                    className="filter-select"
                    value={selectedDegree}
                    onChange={(e) => setSelectedDegree(e.target.value)}
                  >
                    <option value="all">All Degrees</option>
                    {getUniqueDegrees().map(degree => (
                      <option key={degree || "unknown-degree"} value={degree}>{degree}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-item">
                  <label htmlFor="semester-filter" className="filter-item-label">Semester</label>
                  <select
                    id="semester-filter"
                    className="filter-select"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                  >
                    <option value="all">All Semesters</option>
                    {getUniqueSemesters().map(semester => (
                      <option key={semester || "unknown-semester"} value={semester}>{semester} Semester</option>
                    ))}
                  </select>
                </div>
                <button
                  className="clear-filters-btn"
                  onClick={() => {
                    setSelectedDegree("all");
                    setSelectedSemester("all");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
            <div className="filter-results">
              <span className="results-count">
                {loading ? "Loading courses..." : error ? error : `Showing ${filteredCourses.length} of ${courseList.length} courses`}
              </span>
            </div>
          </div>
          <div className="cards-grid">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="academic-card clickable"
                onClick={() => onCourseSelect && onCourseSelect(course)}
              >
                <div className="card-image">
                  <div className="image-placeholder">
                    <span className="image-icon">{course.image}</span>
                    <div className="course-code">{course.code}</div>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{course.title}</h3>
                  <p className="card-description">{course.description}</p>
                  <div className="card-meta">
                    <span className="course-degree">{course.degree}</span>
                    <span className="course-semester">{course.semester} Semester</span>
                  </div>
                  <div className="card-footer">
                    <span className={`status-badge ${(course.status || "unknown").toLowerCase()}`}>
                      {course.status || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div className="no-results">
              <p>No courses found matching the selected filters.</p>
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setSelectedDegree("all");
                  setSelectedSemester("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
