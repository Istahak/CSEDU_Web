import React, { useState } from "react";
import "./UserProfile.css";

const UserProfile = ({ onBack, userData: propUserData, onEditProfile }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const userData = propUserData || {
    name: "Istahak Islam",
    studentId: "CSE-2020-2021",
    email: "istahak.islam@csedu.ac.bd",
    phone: "+880 1234 567890",
    batch: "2019",
    semester: "7th",
    cgpa: "3.00",
    department: "Computer Science & Engineering",
    address: "123 University Road, Dhaka-1000",
  };

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
              <div className="course-list">
                <div className="course-item">
                  <h4>CSE 408 - Software Development</h4>
                  <p>Instructor: Dr. Jane Smith</p>
                  <p>Credits: 3</p>
                </div>
                <div className="course-item">
                  <h4>CSE 410 - Computer Graphics</h4>
                  <p>Instructor: Dr. Mike Johnson</p>
                  <p>Credits: 3</p>
                </div>
                <div className="course-item">
                  <h4>CSE 412 - Machine Learning</h4>
                  <p>Instructor: Dr. Sarah Wilson</p>
                  <p>Credits: 3</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="tab-content">
            <div className="projects-section">
              <h3>Projects</h3>
              <div className="project-list">
                <div className="project-item">
                  <h4>E-commerce Web Application</h4>
                  <p>Status: Completed</p>
                  <p>Technologies: React, Node.js, MongoDB</p>
                </div>
                <div className="project-item">
                  <h4>Mobile Banking App</h4>
                  <p>Status: In Progress</p>
                  <p>Technologies: React Native, Firebase</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "assignments":
        return (
          <div className="tab-content">
            <div className="assignments-section">
              <h3>Assignments</h3>
              <div className="assignment-list">
                <div className="assignment-item">
                  <h4>CSE 408 - Assignment 3</h4>
                  <p>Due: March 15, 2024</p>
                  <p>Status: Submitted</p>
                </div>
                <div className="assignment-item">
                  <h4>CSE 410 - Lab Report 5</h4>
                  <p>Due: March 20, 2024</p>
                  <p>Status: Pending</p>
                </div>
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
                <button className="pay-now-btn">Pay Now</button>
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
                <button className="edit-btn">Edit Information</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
    </div>
  );
};

export default UserProfile;
