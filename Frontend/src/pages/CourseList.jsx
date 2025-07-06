import React, { useState } from "react";
import "./Academics.css";

const courseList = [
  // ...course data copied from Academics.jsx...
  { id: 1, code: "CSE101", title: "Introduction to Programming", description: "Fundamental concepts of programming using structured and object-oriented programming paradigms.", status: "Available", image: "💻", degree: "BSc CSE", semester: "1st" },
  { id: 2, code: "CSE201", title: "Data Structures and Algorithms", description: "Study of fundamental data structures and algorithms for efficient problem solving.", status: "Available", image: "📊", degree: "BSc CSE", semester: "2nd" },
  { id: 3, code: "CSE301", title: "Database Systems", description: "Design and implementation of database systems, SQL, and database management concepts.", status: "Available", image: "🗃️", degree: "BSc CSE", semester: "3rd" },
  { id: 4, code: "CSE401", title: "Software Engineering", description: "Principles and practices of software development, project management, and quality assurance.", status: "Available", image: "🛠️", degree: "BSc CSE", semester: "4th" },
  { id: 5, code: "CSE501", title: "Machine Learning", description: "Introduction to machine learning algorithms, neural networks, and artificial intelligence.", status: "Available", image: "🤖", degree: "MSc CSE", semester: "1st" },
  { id: 6, code: "CSE601", title: "Computer Networks", description: "Network protocols, architectures, and distributed systems fundamentals.", status: "Available", image: "🌐", degree: "BSc CSE", semester: "6th" },
  { id: 7, code: "CSE502", title: "Advanced Algorithms", description: "Advanced algorithmic techniques and complexity analysis for complex problem solving.", status: "Available", image: "⚡", degree: "MSc CSE", semester: "2nd" },
  { id: 8, code: "CSE102", title: "Discrete Mathematics", description: "Mathematical foundations including logic, sets, relations, and graph theory.", status: "Available", image: "🔢", degree: "BSc CSE", semester: "1st" },
  { id: 9, code: "CSE302", title: "Computer Graphics", description: "Principles of computer graphics, 2D/3D transformations, and rendering techniques.", status: "Available", image: "🎨", degree: "BSc CSE", semester: "3rd" },
  { id: 10, code: "CSE503", title: "Research Methodology", description: "Research methods, thesis writing, and academic publication guidelines.", status: "Available", image: "📝", degree: "MSc CSE", semester: "1st" },
  { id: 11, code: "CSE202", title: "Object Oriented Programming", description: "Advanced programming concepts using object-oriented paradigms and design patterns.", status: "Available", image: "🔧", degree: "BSc CSE", semester: "2nd" },
  { id: 12, code: "CSE402", title: "Computer Architecture", description: "Computer system design, processor architecture, and performance optimization.", status: "Available", image: "⚙️", degree: "BSc CSE", semester: "4th" },
  { id: 13, code: "CSE504", title: "Advanced Machine Learning", description: "Deep learning, neural networks, and advanced AI techniques.", status: "Available", image: "🧠", degree: "MSc CSE", semester: "2nd" },
  { id: 14, code: "CSE303", title: "Web Technologies", description: "Modern web development, frameworks, and full-stack programming.", status: "Available", image: "🌍", degree: "BSc CSE", semester: "3rd" },
  { id: 15, code: "CSE505", title: "Thesis", description: "Independent research project and thesis preparation.", status: "Available", image: "📚", degree: "MSc CSE", semester: "3rd" },
  { id: 16, code: "CSE501", title: "Operating Systems", description: "Process management, memory management, file systems, and system programming.", status: "Available", image: "💾", degree: "BSc CSE", semester: "5th" },
  { id: 17, code: "CSE502", title: "Compiler Design", description: "Lexical analysis, syntax analysis, semantic analysis, and code generation.", status: "Available", image: "⚙️", degree: "BSc CSE", semester: "5th" },
  { id: 18, code: "CSE503", title: "Theory of Computation", description: "Automata theory, formal languages, computability, and complexity theory.", status: "Available", image: "🧮", degree: "BSc CSE", semester: "5th" },
  { id: 19, code: "CSE701", title: "Artificial Intelligence", description: "AI fundamentals, search algorithms, knowledge representation, and expert systems.", status: "Available", image: "🤖", degree: "BSc CSE", semester: "7th" },
  { id: 20, code: "CSE702", title: "Mobile Application Development", description: "Android and iOS development, cross-platform frameworks, and mobile UI/UX.", status: "Available", image: "📱", degree: "BSc CSE", semester: "7th" },
  { id: 21, code: "CSE703", title: "Distributed Systems", description: "Distributed computing, consensus algorithms, fault tolerance, and scalability.", status: "Available", image: "🌐", degree: "BSc CSE", semester: "7th" },
  { id: 22, code: "CSE801", title: "Project Work", description: "Capstone project involving design, implementation, and documentation.", status: "Available", image: "🚀", degree: "BSc CSE", semester: "8th" },
  { id: 23, code: "CSE802", title: "Software Project Management", description: "Agile methodologies, project planning, risk management, and team leadership.", status: "Available", image: "📊", degree: "BSc CSE", semester: "8th" },
  { id: 24, code: "CSE803", title: "Information Security", description: "Cryptography, network security, ethical hacking, and security protocols.", status: "Available", image: "🔒", degree: "BSc CSE", semester: "8th" },
  { id: 25, code: "CSE602", title: "Human-Computer Interaction", description: "User interface design, usability testing, and interaction design principles.", status: "Available", image: "👆", degree: "BSc CSE", semester: "6th" },
  { id: 26, code: "CSE603", title: "Digital Image Processing", description: "Image enhancement, filtering, feature extraction, and computer vision basics.", status: "Available", image: "🖼️", degree: "BSc CSE", semester: "6th" }
];

const CourseList = ({ onCourseSelect }) => {
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");

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
                      <option key={degree} value={degree}>{degree}</option>
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
                      <option key={semester} value={semester}>{semester} Semester</option>
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
                Showing {filteredCourses.length} of {courseList.length} courses
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
                    <span className={`status-badge ${course.status.toLowerCase()}`}>
                      {course.status}
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
