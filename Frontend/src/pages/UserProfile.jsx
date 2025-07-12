import React, { useState } from "react";
import "./UserProfile.css";

import { getHardcodedUUID } from "../utils/FetchUser";
import { getUserData } from "../api/UserProfileApi";
import { useEffect } from "react";
import { submitAssignment } from "../api/UserProfileApi";
import { getCoursesBySemester } from "../api/UserProfileApi";
import { getProjectsByAuthor } from "../api/UserProfileApi";

const UserProfile = ({ onBack, userData: propUserData, onEditProfile }) => {
  
  const [activeTab, setActiveTab] = useState("overview");
  const [assignments, setAssignments] = useState([
    {
      id: '0c30ee37-4073-4b50-8723-33a8b80c93db',
      title: "CSE 408 - Assignment 3",
      course: "CSE 408",
      courseName: "Software Development",
      dueDate: "March 15, 2024",
      status: "submitted",
      submissionDate: "March 12, 2024",
      description: "Develop a web application using React and Node.js",
      maxMarks: 100,
      obtainedMarks: 85,
      submittedFile: "assignment3_submission.zip",
    },
    {
      id: '0c30ee37-4073-4b50-8723-33a8b80c93db',
      title: "CSE 410 - Lab Report 5",
      course: "CSE 410",
      courseName: "Computer Graphics",
      dueDate: "March 20, 2024",
      status: "pending",
      description: "Implement 3D transformations and lighting in OpenGL",
      maxMarks: 50,
      submittedFile: null,
    },
    {
      id: '0c30ee37-4073-4b50-8723-33a8b80c93db',
      title: "CSE 412 - Assignment 2",
      course: "CSE 412",
      courseName: "Machine Learning",
      dueDate: "March 25, 2024",
      status: "pending",
      description: "Train a neural network for image classification",
      maxMarks: 100,
      submittedFile: null,
    },
  ]);
  
  console.log(getHardcodedUUID());

  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionComments, setSubmissionComments] = useState("");

  const [userData, setUserData] = useState({
    name: "Istahak Islam",
    studentId: "CSE-2020-2021",
    email: "istahak.islam@csedu.ac.bd",
    phone: "+880 1234 567890",
    batch: "2019",
    semester: "7th",
    cgpa: "3.00",
    department: "Computer Science & Engineering",
    address: "123 University Road, Dhaka-1000",
  });

  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="tab-content">
            <div className="overview-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{userData.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Student ID:</span>
                  <span className="value">{userData.studentId}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{userData.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{userData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Batch:</span>
                  <span className="value">{userData.batch}</span>
                </div>
                <div className="info-item">
                  <span className="label">Current Semester:</span>
                  <span className="value">{userData.semester}</span>
                </div>
                <div className="info-item">
                  <span className="label">CGPA:</span>
                  <span className="value">{userData.cgpa}</span>
                </div>
                <div className="info-item">
                  <span className="label">Department:</span>
                  <span className="value">{userData.department}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "academic-records":
        return (
          <div className="tab-content">
            <div className="academic-records">
              <h3>Academic Records</h3>
              <div className="semester-records">
                <div className="semester-item">
                  <h4>Semester 7</h4>
                  <p>GPA: 3.8 | Credits: 18</p>
                </div>
                <div className="semester-item">
                  <h4>Semester 6</h4>
                  <p>GPA: 3.7 | Credits: 18</p>
                </div>
                <div className="semester-item">
                  <h4>Semester 5</h4>
                  <p>GPA: 3.6 | Credits: 18</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "courses":
        return (
          <div className="tab-content">
            <div className="courses-section">
              <h3>Current Courses</h3>
              <div className="course-list-grid">
                {Array.isArray(courses) && courses.length > 0 ? (
                  courses.map((course, idx) => (
                    <div className="course-card" key={course.course_code || idx}>
                      <div className="course-card-header">
                        <span role="img" aria-label="book" className="course-icon">📘</span>
                        <h4>{course.course_title}</h4>
                        <span className="course-code">({course.course_code})</span>
                      </div>
                      <div className="course-card-body">
                        <p className="course-intro">{course.intro}</p>
                        <div className="course-details-row">
                          <span className="course-detail"><strong>Credit:</strong> {course.credit}</span>
                          <span className="course-detail"><strong>Duration:</strong> {course.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No courses found for this semester.</p>
                )}
              </div>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="tab-content">
            <div className="projects-section">
              <h3>Projects</h3>
              <div className="project-list-grid">
                {Array.isArray(projects) && projects.length > 0 ? (
                  projects.map((project, idx) => (
                    <div className="project-card" key={project.id || idx}>
                      <div className="project-card-header">
                        <span role="img" aria-label="project" className="project-icon">💡</span>
                        <h4>{project.title}</h4>
                      </div>
                      <div className="project-card-body">
                        <p className="project-abstract">{project.abstract}</p>
                        {project.link && (
                          <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                            🔗 View Project
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No projects found.</p>
                )}
              </div>
            </div>
          </div>
        );
      case "assignments":
        return (
          <div className="tab-content">
            <div className="assignments-section">
              <h3>Assignments</h3>
              <div className="assignments-stats">
                <div className="stat-item">
                  <span className="stat-number">
                    {assignments.filter((a) => a.status === "submitted").length}
                  </span>
                  <span className="stat-label">Submitted</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {assignments.filter((a) => a.status === "pending").length}
                  </span>
                  <span className="stat-label">Pending</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {
                      assignments.filter(
                        (a) => isOverdue(a.dueDate) && a.status === "pending"
                      ).length
                    }
                  </span>
                  <span className="stat-label">Overdue</span>
                </div>
              </div>
              <div className="assignment-list">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="assignment-item">
                    <div className="assignment-header">
                      <h4>{assignment.title}</h4>
                      <span
                        className="assignment-status"
                        style={{
                          backgroundColor: getStatusColor(assignment.status),
                        }}
                      >
                        {assignment.status.charAt(0).toUpperCase() +
                          assignment.status.slice(1)}
                      </span>
                    </div>
                    <div className="assignment-details">
                      <p>
                        <strong>Course:</strong> {assignment.courseName}
                      </p>
                      <p>
                        <strong>Due Date:</strong> {assignment.dueDate}
                      </p>
                      <p>
                        <strong>Description:</strong> {assignment.description}
                      </p>
                      <p>
                        <strong>Max Marks:</strong> {assignment.maxMarks}
                      </p>
                      {assignment.status === "submitted" && (
                        <>
                          <p>
                            <strong>Submission Date:</strong>{" "}
                            {assignment.submissionDate}
                          </p>
                          <p>
                            <strong>Submitted File:</strong>{" "}
                            {assignment.submittedFile}
                          </p>
                          {assignment.obtainedMarks && (
                            <p>
                              <strong>Marks Obtained:</strong>{" "}
                              {assignment.obtainedMarks}/{assignment.maxMarks}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="assignment-actions">
                      {assignment.status === "pending" && (
                        <button
                          className="submit-btn"
                          onClick={() => handleSubmitAssignment(assignment)}
                        >
                          Submit Assignment
                        </button>
                      )}
                      {assignment.status === "submitted" && (
                        <button className="view-btn" disabled>
                          View Submission
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "due-payments":
        return (
          <div className="tab-content">
            <div className="due-payments-section">
              <h3>Due Payments</h3>
              <div className="payment-summary">
                <div className="total-due">
                  <h4>Total Due Amount</h4>
                  <p className="amount">৳ 25,000</p>
                </div>
                <div className="payment-breakdown">
                  <div className="payment-item">
                    <span className="payment-type">Semester Fee</span>
                    <span className="payment-amount">৳ 20,000</span>
                    <span className="payment-due">Due: April 30, 2024</span>
                  </div>
                  <div className="payment-item">
                    <span className="payment-type">Library Fine</span>
                    <span className="payment-amount">৳ 500</span>
                    <span className="payment-due">Due: March 25, 2024</span>
                  </div>
                  <div className="payment-item">
                    <span className="payment-type">Lab Fee</span>
                    <span className="payment-amount">৳ 4,500</span>
                    <span className="payment-due">Due: April 15, 2024</span>
                  </div>
                </div>
                <button
                  className="pay-now-btn"
                  onClick={() =>
                    alert("Payment functionality will be implemented soon!")
                  }
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        );
      case "contact-info":
        return (
          <div className="tab-content">
            <div className="contact-section">
              <h3>Contact Information</h3>
              <div className="contact-form">
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" value={userData.email} readOnly />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="tel" value={userData.phone} readOnly />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <textarea value={userData.address} readOnly />
                </div>
                <button
                  className="edit-btn"
                  onClick={() => onEditProfile && onEditProfile()}
                >
                  Edit Information
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Assignment submission functions
  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionModal(true);
    setSubmissionFile(null);
    setSubmissionComments("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubmissionFile(file);
  };

  const handleSubmissionSubmit = async (e) => {
    e.preventDefault();
    console.log("ki oilo");
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData.entries()));
    await submitAssignment(formData, selectedAssignment.id, userData.id, submissionComments);
  };

  const closeSubmissionModal = () => {
    setShowSubmissionModal(false);
    setSelectedAssignment(null);
    setSubmissionFile(null);
    setSubmissionComments("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "#27ae60";
      case "pending":
        return "#f39c12";
      case "overdue":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();

      if (userData) {
        setUserData(userData);
        console.log(userData);
      }
      const courses = await getCoursesBySemester(userData.semester);
      if (courses) {
        setCourses(courses);
        console.log(courses);
      }
      const projects = await getProjectsByAuthor();
      if (projects) {
        setProjects(projects);
        console.log(projects);
      }

    };
    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-container">
        <div className="profile-header">
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
          <div className="profile-info">
            <div className="profile-avatar">
              <span className="avatar-icon">👩‍🎓</span>
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{userData.name}</h1>
              <p className="profile-id">Student ID: {userData.studentId}</p>
              <p className="profile-department">{userData.department}</p>
            </div>
            <button
              className="edit-profile-header-btn"
              onClick={() => onEditProfile && onEditProfile()}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <button
              className={`tab-button ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`tab-button ${
                activeTab === "academic-records" ? "active" : ""
              }`}
              onClick={() => setActiveTab("academic-records")}
            >
              Academic Records
            </button>
            <button
              className={`tab-button ${
                activeTab === "courses" ? "active" : ""
              }`}
              onClick={() => setActiveTab("courses")}
            >
              Courses
            </button>
            <button
              className={`tab-button ${
                activeTab === "projects" ? "active" : ""
              }`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
            <button
              className={`tab-button ${
                activeTab === "assignments" ? "active" : ""
              }`}
              onClick={() => setActiveTab("assignments")}
            >
              Assignments
            </button>
            <button
              className={`tab-button ${
                activeTab === "due-payments" ? "active" : ""
              }`}
              onClick={() => setActiveTab("due-payments")}
            >
              Due Payments
            </button>
            <button
              className={`tab-button ${
                activeTab === "contact-info" ? "active" : ""
              }`}
              onClick={() => setActiveTab("contact-info")}
            >
              Contact Info
            </button>
          </div>

          <div className="tab-content-container">{renderTabContent()}</div>
        </div>
      </div>

      {/* Assignment Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <div className="modal-overlay">
          <form className="submission-modal" onSubmit={handleSubmissionSubmit}>
            <div className="modal-header">
              <h3>Submit Assignment</h3>
              <button className="close-btn" onClick={closeSubmissionModal}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="assignment-info">
                <h4>{selectedAssignment.title}</h4>
                <p>
                  <strong>Course:</strong> {selectedAssignment.courseName}
                </p>
                <p>
                  <strong>Due Date:</strong> {selectedAssignment.dueDate}
                </p>
                <p>
                  <strong>Max Marks:</strong> {selectedAssignment.maxMarks}
                </p>
                <p>
                  <strong>Description:</strong> {selectedAssignment.description}
                </p>
              </div>

              <div className="submission-form">
                <div className="form-group">
                  <label htmlFor="submission-file">
                    Upload Assignment File:
                  </label>
                  <input
                    name="file"
                    type="file"
                    id="submission-file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.zip,.rar,.txt,.ppt,.pptx"
                  />
                  {submissionFile && (
                    <p className="file-info">Selected: {submissionFile.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="submission-comments">
                    Comments (Optional):
                  </label>
                  <textarea
                    // name="comment"
                    id="submission-comments"
                    value={submissionComments}
                    onChange={(e) => setSubmissionComments(e.target.value)}
                    placeholder="Add any comments about your submission..."
                    rows="4"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeSubmissionModal}>
                Cancel
              </button>
              <button
                className="submit-final-btn"
                type="submit"
              >
                Submit Assignment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
