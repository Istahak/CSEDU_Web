import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import ProfileService from "../api/ProfileService";

const UserProfile = ({ onBack, userData: propUserData, onEditProfile }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(propUserData || {});
  const [academicRecords, setAcademicRecords] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const profileData = await ProfileService.getMyProfile();
        setUserData(profileData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);
  
  // Fetch tab-specific data when tab changes
  useEffect(() => {
    const fetchTabData = async () => {
      try {
        setLoading(true);
        
        switch (activeTab) {
          case 'academic-records':
            const records = await ProfileService.getAcademicRecords();
            setAcademicRecords(records);
            break;
          case 'courses':
            const courseData = await ProfileService.getCourses();
            setCourses(courseData);
            break;
          case 'projects':
            const projectData = await ProfileService.getProjects();
            setProjects(projectData);
            break;
          case 'assignments':
            const assignmentData = await ProfileService.getAssignments();
            setAssignments(assignmentData);
            break;
          case 'due-payments':
            const paymentData = await ProfileService.getPayments();
            setPayments(paymentData);
            break;
          default:
            break;
        }
        
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching data for ${activeTab} tab:`, err);
        setError(`Failed to load ${activeTab} data`);
        setLoading(false);
      }
    };
    
    if (activeTab !== 'overview' && activeTab !== 'contact-info') {
      fetchTabData();
    }
  }, [activeTab]);
  
  // Handle profile update
  const handleUpdateProfile = async (updatedData) => {
    try {
      setLoading(true);
      const updated = await ProfileService.updateMyProfile(updatedData);
      setUserData(updated);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      setLoading(false);
      return false;
    }
  };

  const renderTabContent = () => {
    // Show loading state
    if (loading) {
      return (
        <div className="tab-content loading">
          <p>Loading data...</p>
        </div>
      );
    }
    
    // Show error state
    if (error) {
      return (
        <div className="tab-content error">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Try Again</button>
        </div>
      );
    }
    
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
                {userData.studentId && (
                  <div className="info-item">
                    <span className="label">Student ID:</span>
                    <span className="value">{userData.studentId}</span>
                  </div>
                )}
                {userData.facultyId && (
                  <div className="info-item">
                    <span className="label">Faculty ID:</span>
                    <span className="value">{userData.facultyId}</span>
                  </div>
                )}
                {userData.adminId && (
                  <div className="info-item">
                    <span className="label">Admin ID:</span>
                    <span className="value">{userData.adminId}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{userData.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{userData.phone}</span>
                </div>
                {userData.batch && (
                  <div className="info-item">
                    <span className="label">Batch:</span>
                    <span className="value">{userData.batch}</span>
                  </div>
                )}
                {userData.semester && (
                  <div className="info-item">
                    <span className="label">Current Semester:</span>
                    <span className="value">{userData.semester}</span>
                  </div>
                )}
                {userData.cgpa && (
                  <div className="info-item">
                    <span className="label">CGPA:</span>
                    <span className="value">{userData.cgpa}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="label">Department:</span>
                  <span className="value">{userData.department}</span>
                </div>
                {userData.designation && (
                  <div className="info-item">
                    <span className="label">Designation:</span>
                    <span className="value">{userData.designation}</span>
                  </div>
                )}
                {userData.role_description && (
                  <div className="info-item">
                    <span className="label">Role:</span>
                    <span className="value">{userData.role_description}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "academic-records":
        return (
          <div className="tab-content">
            <div className="academic-records">
              <h3>Academic Records</h3>
              {academicRecords.length > 0 ? (
                <div className="semester-records">
                  {academicRecords.map(record => (
                    <div className="semester-item" key={record.id}>
                      <h4>Semester {record.semester}</h4>
                      <p>GPA: {record.gpa} | Credits: {record.credits} | Year: {record.year}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No academic records found.</p>
              )}
            </div>
          </div>
        );
      case "courses":
        return (
          <div className="tab-content">
            <div className="courses-section">
              <h3>Current Courses</h3>
              {courses.length > 0 ? (
                <div className="course-list">
                  {courses.map(course => (
                    <div className="course-item" key={course.id}>
                      <h4>{course.course_code} - {course.title}</h4>
                      {course.instructor_name && <p>Instructor: {course.instructor_name}</p>}
                      <p>Credits: {course.credits}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No courses found.</p>
              )}
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="tab-content">
            <div className="projects-section">
              <h3>Projects</h3>
              {projects.length > 0 ? (
                <div className="project-list">
                  {projects.map(project => (
                    <div className="project-item" key={project.id}>
                      <h4>{project.title}</h4>
                      {project.description && <p>{project.description}</p>}
                      <p>Status: {project.status}</p>
                      {project.end_date && <p>Deadline: {new Date(project.end_date).toLocaleDateString()}</p>}
                      {project.grade && <p>Grade: {project.grade}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No projects found.</p>
              )}
            </div>
          </div>
        );
      case "assignments":
        return (
          <div className="tab-content">
            <div className="assignments-section">
              <h3>Assignments</h3>
              {assignments.length > 0 ? (
                <div className="assignment-list">
                  {assignments.map(assignment => (
                    <div className="assignment-item" key={assignment.id}>
                      <h4>{assignment.title}</h4>
                      {assignment.course_title && <p>Course: {assignment.course_title}</p>}
                      {assignment.description && <p>{assignment.description}</p>}
                      {assignment.due_date && <p>Due: {new Date(assignment.due_date).toLocaleDateString()}</p>}
                      <p>Status: {assignment.status}</p>
                      {assignment.grade && <p>Grade: {assignment.grade}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No assignments found.</p>
              )}
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
                  <input type="email" value={userData.email || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="tel" value={userData.phone || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <textarea value={userData.address || ''} readOnly />
                </div>
                <button
                  className="edit-btn"
                  onClick={() => onEditProfile && onEditProfile(userData, handleUpdateProfile)}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Edit Information'}
                </button>
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
          {loading ? (
            <div className="profile-info loading">
              <p>Loading profile...</p>
            </div>
          ) : (
            <div className="profile-info">
              <div className="profile-avatar">
                {userData.profile_image ? (
                  <img src={userData.profile_image} alt="Profile" className="avatar-image" />
                ) : (
                  <span className="avatar-icon">
                    {userData.type === 'faculty' ? '👨‍🏫' : userData.type === 'admin' ? '👨‍💼' : '👩‍🎓'}
                  </span>
                )}
              </div>
              <div className="profile-details">
                <h1 className="profile-name">{userData.name}</h1>
                {userData.studentId && <p className="profile-id">Student ID: {userData.studentId}</p>}
                {userData.facultyId && <p className="profile-id">Faculty ID: {userData.facultyId}</p>}
                {userData.adminId && <p className="profile-id">Admin ID: {userData.adminId}</p>}
                <p className="profile-department">{userData.department}</p>
              </div>
              <button
                className="edit-profile-header-btn"
                onClick={() => onEditProfile && onEditProfile(userData, handleUpdateProfile)}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Edit Profile'}
              </button>
            </div>
          )}
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
