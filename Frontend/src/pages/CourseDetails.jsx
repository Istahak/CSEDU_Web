
import React from "react";
import "./CourseDetails.css";

const CourseDetails = ({ course, onBack }) => {
  if (!course) {
    return (
      <div className="course-details-page">
        <div className="details-header">
          <button onClick={onBack} className="back-button">
            ← Back to Academics
          </button>
          <h1>Course not found</h1>
        </div>
      </div>
    );
  }

  const courseInfo = {
    prerequisites: ["CSE100 - Programming Fundamentals", "MAT101 - Mathematics I"],
    credits: "3.0",
    duration: "1 Semester",
    instructor: "Dr. Abdul Rahman",
    schedule: "Mon, Wed, Fri - 10:00 AM to 11:00 AM",
    classroom: "Room 301, New Science Building",
    syllabus: [
      {
        week: "Week 1-2",
        topic: "Introduction to Programming Concepts",
        description: "Basic programming concepts, variables, data types, and operators"
      },
      {
        week: "Week 3-4", 
        topic: "Control Structures",
        description: "Conditional statements, loops, and decision making"
      },
      {
        week: "Week 5-6",
        topic: "Functions and Methods",
        description: "Function definition, parameters, return values, and scope"
      },
      {
        week: "Week 7-8",
        topic: "Arrays and Collections",
        description: "Array operations, multi-dimensional arrays, and basic collections"
      },
      {
        week: "Week 9-10",
        topic: "Object-Oriented Programming",
        description: "Classes, objects, inheritance, and polymorphism"
      },
      {
        week: "Week 11-12",
        topic: "File Handling and Exception Management",
        description: "File I/O operations and error handling techniques"
      },
      {
        week: "Week 13-14",
        topic: "Project Development",
        description: "Comprehensive project work and code review"
      }
    ],
    learningOutcomes: [
      "Understand fundamental programming concepts and paradigms",
      "Develop problem-solving skills using structured programming",
      "Apply object-oriented programming principles",
      "Create and debug programs using modern development tools",
      "Work with files and handle runtime exceptions effectively"
    ],
    assessmentMethods: [
      { type: "Midterm Exam", percentage: "30%" },
      { type: "Final Exam", percentage: "40%" },
      { type: "Assignments", percentage: "20%" },
      { type: "Lab Work", percentage: "10%" }
    ],
    textbooks: [
      {
        title: "Introduction to Programming with Java",
        author: "John Smith",
        edition: "5th Edition",
        type: "Primary"
      },
      {
        title: "Programming Fundamentals",
        author: "Jane Doe",
        edition: "3rd Edition", 
        type: "Reference"
      }
    ]
  };

  return (
    <div className="course-details-page modern-gradient-bg">
      <div className="modern-header-bar glass-effect header-left-align">
        <div className="header-title-group">
          <span className="course-code-pill vibrant-pill">{course.code}</span>
          <h1 className="course-title-modern gradient-text">{course.title}</h1>
        </div>
      </div>

      <div className="course-main-grid responsive-grid">
        {/* Left: Hero and Description */}
        <div className="course-hero-card shadow-card">
          <div className="course-icon-hero hero-gradient-circle">{course.image}</div>
          <div className="course-description-block">
            <p className="course-description-full large-text">{course.description}</p>
            <div className="course-meta-modern meta-flex">
              <span><strong>Credits:</strong> {courseInfo.credits}</span>
              <span><strong>Duration:</strong> {courseInfo.duration}</span>
              <span><strong>Instructor:</strong> {courseInfo.instructor}</span>
            </div>
          </div>
        </div>

        {/* Right: Info Cards */}
        <div className="course-info-cards info-cards-grid">
          <div className="info-card-modern glass-effect">
            <h3>Schedule</h3>
            <p>{courseInfo.schedule}</p>
          </div>
          <div className="info-card-modern glass-effect">
            <h3>Classroom</h3>
            <p>{courseInfo.classroom}</p>
          </div>
          <div className="info-card-modern glass-effect">
            <h3>Prerequisites</h3>
            <ul>
              {courseInfo.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Syllabus & Outcomes in grid like Assessment & Textbooks */}
      <div className="assessment-textbooks-grid syllabus-outcomes-grid">
        <section className="assessment-section-modern glass-effect">
          <h2 className="section-title accent-text">Course Syllabus</h2>
          <div className="assessment-grid-modern">
            {courseInfo.syllabus.map((item, index) => (
              <div key={index} className="assessment-card-modern syllabus-card-item">
                <div>
                  <span className="syllabus-week-label accent-text">{item.week}</span>
                  <span className="syllabus-topic-title">{item.topic}</span>
                </div>
                <div className="syllabus-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="textbooks-section-modern glass-effect">
          <h2 className="section-title accent-text">Learning Outcomes</h2>
          <div className="textbooks-list-modern outcomes-list-grid">
            {courseInfo.learningOutcomes.map((outcome, index) => (
              <div key={index} className="textbook-item-modern outcome-card-item">
                <span className="outcome-number-modern vibrant-pill">{index + 1}</span>
                <span className="outcome-desc">{outcome}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Assessment and Textbooks in a grid */}
      <div className="assessment-textbooks-grid">
        <section className="assessment-section-modern glass-effect">
          <h2 className="section-title accent-text">Assessment Methods</h2>
          <div className="assessment-grid-modern">
            {courseInfo.assessmentMethods.map((method, index) => (
              <div key={index} className="assessment-card-modern">
                <h4>{method.type}</h4>
                <div className="percentage-modern vibrant-pill">{method.percentage}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="textbooks-section-modern glass-effect">
          <h2 className="section-title accent-text">Required Textbooks</h2>
          <div className="textbooks-list-modern">
            {courseInfo.textbooks.map((book, index) => (
              <div key={index} className="textbook-item-modern">
                <div className="book-icon-modern hero-gradient-circle">📚</div>
                <div className="book-info-modern">
                  <h4 className="book-title bold-text">{book.title}</h4>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-edition">{book.edition}</p>
                  <span className={`book-type-modern vibrant-pill ${book.type.toLowerCase()}`}>
                    {book.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetails;
