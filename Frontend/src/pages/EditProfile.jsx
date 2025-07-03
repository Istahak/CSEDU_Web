import React, { useState } from "react";
import "./EditProfile.css";

const EditProfile = ({ onBack, userData: initialUserData, onSave }) => {
  const [formData, setFormData] = useState({
    name: initialUserData?.name || "Istahak Islam",
    studentId: initialUserData?.studentId || "CSE-2020-2021",
    email: initialUserData?.email || "istahak.islam@csedu.ac.bd",
    phone: initialUserData?.phone || "+880 1234 567890",
    batch: initialUserData?.batch || "2019",
    semester: initialUserData?.semester || "7th",
    department: initialUserData?.department || "Computer Science & Engineering",
    address: initialUserData?.address || "123 University Road, Dhaka-1000",
    bloodGroup: initialUserData?.bloodGroup || "O+",
    dateOfBirth: initialUserData?.dateOfBirth || "1998-05-15",
    emergencyContact: initialUserData?.emergencyContact || "+880 1987 654321",
    fatherName: initialUserData?.fatherName || "Mohammad Rahman",
    motherName: initialUserData?.motherName || "Fatema Begum",
    nationality: initialUserData?.nationality || "Bangladeshi",
    religion: initialUserData?.religion || "Islam",
  });

  const [activeSection, setActiveSection] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onSave) {
        onSave(formData);
      }

      // Show success message
      alert("Profile updated successfully!");

      // Go back to profile page
      if (onBack) {
        onBack();
      }
    } catch (error) {
      alert("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    }
  };

  const renderPersonalInfo = () => (
    <div className="form-section">
      <h3>Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="studentId">Student ID *</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            required
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="religion">Religion</label>
          <input
            type="text"
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="form-section">
      <h3>Contact Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContact">Emergency Contact</label>
          <input
            type="tel"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  const renderFamilyInfo = () => (
    <div className="form-section">
      <h3>Family Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="fatherName">Father's Name</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="motherName">Mother's Name</label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="form-section">
      <h3>Academic Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="batch">Batch</label>
          <input
            type="text"
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="semester">Current Semester</label>
          <select
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
          >
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
            <option value="3rd">3rd Semester</option>
            <option value="4th">4th Semester</option>
            <option value="5th">5th Semester</option>
            <option value="6th">6th Semester</option>
            <option value="7th">7th Semester</option>
            <option value="8th">8th Semester</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalInfo();
      case "contact":
        return renderContactInfo();
      case "family":
        return renderFamilyInfo();
      case "academic":
        return renderAcademicInfo();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <div className="edit-profile-header">
          <button onClick={handleCancel} className="back-button">
            ← Back to Profile
          </button>
          <h1>Edit Profile</h1>
        </div>

        <div className="edit-profile-content">
          <div className="profile-sidebar">
            <div className="profile-picture-section">
              <div className="profile-picture">
                <span className="avatar-icon">👩‍🎓</span>
              </div>
              <button className="change-picture-btn">Change Picture</button>
            </div>

            <nav className="edit-nav">
              <button
                className={`nav-button ${
                  activeSection === "personal" ? "active" : ""
                }`}
                onClick={() => setActiveSection("personal")}
              >
                Personal Info
              </button>
              <button
                className={`nav-button ${
                  activeSection === "contact" ? "active" : ""
                }`}
                onClick={() => setActiveSection("contact")}
              >
                Contact Info
              </button>
              <button
                className={`nav-button ${
                  activeSection === "family" ? "active" : ""
                }`}
                onClick={() => setActiveSection("family")}
              >
                Family Info
              </button>
              <button
                className={`nav-button ${
                  activeSection === "academic" ? "active" : ""
                }`}
                onClick={() => setActiveSection("academic")}
              >
                Academic Info
              </button>
            </nav>
          </div>

          <div className="edit-form-container">
            <form onSubmit={(e) => e.preventDefault()}>
              {renderActiveSection()}

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-btn"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="save-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
