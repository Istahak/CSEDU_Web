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
    <div className="course-details-page">
      <div className="page-header">
        <button onClick={onBack} className="back-button">
          ← Back to Academics
        </button>
      </div>
      
      <div className="course-details-content">
        <div className="course-header-section">
          <div className="course-hero">
            <div className="course-icon-large">
              <span className="icon">{course.image}</span>
              <div className="course-code-large">{course.code}</div>
            </div>
            <div className="course-basic-info">
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description-full">{course.description}</p>
              <div className="course-meta">
                <div className="meta-item">
                  <strong>Credits:</strong> {courseInfo.credits}
                </div>
                <div className="meta-item">
                  <strong>Duration:</strong> {courseInfo.duration}
                </div>
                <div className="meta-item">
                  <strong>Instructor:</strong> {courseInfo.instructor}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="details-sections">
          <section className="info-section">
            <h2 className="section-title">Course Information</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Schedule</h3>
                <p>{courseInfo.schedule}</p>
              </div>
              <div className="info-card">
                <h3>Classroom</h3>
                <p>{courseInfo.classroom}</p>
              </div>
              <div className="info-card">
                <h3>Prerequisites</h3>
                <ul>
                  {courseInfo.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="syllabus-section">
            <h2 className="section-title">Course Syllabus</h2>
            <div className="syllabus-timeline">
              {courseInfo.syllabus.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4 className="timeline-week">{item.week}</h4>
                    <h5 className="timeline-topic">{item.topic}</h5>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="outcomes-section">
            <h2 className="section-title">Learning Outcomes</h2>
            <div className="outcomes-list">
              {courseInfo.learningOutcomes.map((outcome, index) => (
                <div key={index} className="outcome-item">
                  <span className="outcome-number">{index + 1}</span>
                  <p>{outcome}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="assessment-section">
            <h2 className="section-title">Assessment Methods</h2>
            <div className="assessment-grid">
              {courseInfo.assessmentMethods.map((method, index) => (
                <div key={index} className="assessment-card">
                  <h4>{method.type}</h4>
                  <div className="percentage">{method.percentage}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="textbooks-section">
            <h2 className="section-title">Required Textbooks</h2>
            <div className="textbooks-list">
              {courseInfo.textbooks.map((book, index) => (
                <div key={index} className="textbook-item">
                  <div className="book-icon">📚</div>
                  <div className="book-info">
                    <h4 className="book-title">{book.title}</h4>
                    <p className="book-author">by {book.author}</p>
                    <p className="book-edition">{book.edition}</p>
                    <span className={`book-type ${book.type.toLowerCase()}`}>
                      {book.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
