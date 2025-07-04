import React, { useState } from "react";
import "./TeacherEditProfile.css";

const TeacherEditProfile = ({
  onBack,
  teacherData: initialTeacherData,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: initialTeacherData?.name || "Dr. Sarah Wilson",
    facultyId: initialTeacherData?.facultyId || "CSEDU-FAC-001",
    email: initialTeacherData?.email || "sarah.wilson@csedu.ac.bd",
    phone: initialTeacherData?.phone || "+880 1987 654321",
    designation: initialTeacherData?.designation || "Associate Professor",
    department:
      initialTeacherData?.department || "Computer Science & Engineering",
    specialization:
      initialTeacherData?.specialization ||
      "Machine Learning, Artificial Intelligence",
    officeRoom: initialTeacherData?.officeRoom || "Room 402, CSEDU Building",
    officeHours:
      initialTeacherData?.officeHours || "Sunday-Thursday: 10:00 AM - 12:00 PM",
    joiningDate: initialTeacherData?.joiningDate || "2018-01-15",
    education:
      initialTeacherData?.education ||
      "PhD in Computer Science, Stanford University",
    experience: initialTeacherData?.experience || "8 years",
    researchInterests:
      initialTeacherData?.researchInterests ||
      "Deep Learning, Natural Language Processing, Computer Vision",
    // Additional teacher-specific fields
    bloodGroup: initialTeacherData?.bloodGroup || "O+",
    dateOfBirth: initialTeacherData?.dateOfBirth || "1985-03-20",
    emergencyContact:
      initialTeacherData?.emergencyContact || "+880 1234 567890",
    nationality: initialTeacherData?.nationality || "Bangladeshi",
    religion: initialTeacherData?.religion || "Islam",
    permanentAddress:
      initialTeacherData?.permanentAddress || "123 University Road, Dhaka-1000",
    currentAddress:
      initialTeacherData?.currentAddress || "456 Faculty Quarter, Dhaka-1000",
    nidNumber: initialTeacherData?.nidNumber || "1234567890123",
    passportNumber: initialTeacherData?.passportNumber || "BR1234567",
    maritalStatus: initialTeacherData?.maritalStatus || "Married",
    spouseName: initialTeacherData?.spouseName || "Dr. John Wilson",
    previousInstitution: initialTeacherData?.previousInstitution || "MIT",
    academicRank: initialTeacherData?.academicRank || "Associate Professor",
    tenure: initialTeacherData?.tenure || "Tenured",
    researchArea: initialTeacherData?.researchArea || "Computer Science",
    orcidId: initialTeacherData?.orcidId || "0000-0000-0000-0000",
    googleScholarId: initialTeacherData?.googleScholarId || "scholar123",
    linkedinProfile:
      initialTeacherData?.linkedinProfile ||
      "https://linkedin.com/in/sarah-wilson",
    personalWebsite:
      initialTeacherData?.personalWebsite || "https://sarahwilson.com",
    bankAccountNumber: initialTeacherData?.bankAccountNumber || "1234567890",
    bankName: initialTeacherData?.bankName || "Dutch Bangla Bank",
    taxId: initialTeacherData?.taxId || "123456789012",
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
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    }
  };

  const renderPersonalSection = () => (
    <div className="form-section">
      <h3>Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Faculty ID</label>
          <input
            type="text"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            className="form-input"
          >
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
          <label className="form-label">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Religion</label>
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Spouse Name</label>
          <input
            type="text"
            name="spouseName"
            value={formData.spouseName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Emergency Contact</label>
          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">NID Number</label>
          <input
            type="text"
            name="nidNumber"
            value={formData.nidNumber}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Passport Number</label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicSection = () => (
    <div className="form-section">
      <h3>Academic Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="Lecturer">Lecturer</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
            <option value="Department Head">Department Head</option>
            <option value="Dean">Dean</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Academic Rank</label>
          <select
            name="academicRank"
            value={formData.academicRank}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
            <option value="Distinguished Professor">
              Distinguished Professor
            </option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Tenure Status</label>
          <select
            name="tenure"
            value={formData.tenure}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="Tenured">Tenured</option>
            <option value="Tenure-Track">Tenure-Track</option>
            <option value="Non-Tenure Track">Non-Tenure Track</option>
            <option value="Visiting">Visiting</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Office Room</label>
          <input
            type="text"
            name="officeRoom"
            value={formData.officeRoom}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Office Hours</label>
          <input
            type="text"
            name="officeHours"
            value={formData.officeHours}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Experience (Years)</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Previous Institution</label>
          <input
            type="text"
            name="previousInstitution"
            value={formData.previousInstitution}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            className="form-input"
            rows="3"
          />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Specialization</label>
          <textarea
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="form-input"
            rows="2"
          />
        </div>
      </div>
    </div>
  );

  const renderResearchSection = () => (
    <div className="form-section">
      <h3>Research Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Research Area</label>
          <input
            type="text"
            name="researchArea"
            value={formData.researchArea}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">ORCID ID</label>
          <input
            type="text"
            name="orcidId"
            value={formData.orcidId}
            onChange={handleInputChange}
            className="form-input"
            placeholder="0000-0000-0000-0000"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Google Scholar ID</label>
          <input
            type="text"
            name="googleScholarId"
            value={formData.googleScholarId}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn Profile</label>
          <input
            type="url"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Personal Website</label>
          <input
            type="url"
            name="personalWebsite"
            value={formData.personalWebsite}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://your-website.com"
          />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Research Interests</label>
          <textarea
            name="researchInterests"
            value={formData.researchInterests}
            onChange={handleInputChange}
            className="form-input"
            rows="3"
            placeholder="List your research interests, separated by commas"
          />
        </div>
      </div>
    </div>
  );

  const renderAddressSection = () => (
    <div className="form-section">
      <h3>Address Information</h3>
      <div className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Current Address</label>
          <textarea
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleInputChange}
            className="form-input"
            rows="3"
          />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Permanent Address</label>
          <textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleInputChange}
            className="form-input"
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  const renderFinancialSection = () => (
    <div className="form-section">
      <h3>Financial Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Bank Account Number</label>
          <input
            type="text"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tax ID</label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalSection();
      case "academic":
        return renderAcademicSection();
      case "research":
        return renderResearchSection();
      case "address":
        return renderAddressSection();
      case "financial":
        return renderFinancialSection();
      default:
        return renderPersonalSection();
    }
  };

  return (
    <div className="teacher-edit-profile">
      <div className="edit-profile-container">
        <div className="edit-profile-header">
          <button onClick={handleCancel} className="back-button">
            ← Back to Profile
          </button>
          <h1>Edit Teacher Profile</h1>
          <div className="header-actions">
            <button
              onClick={handleCancel}
              className="cancel-btn"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="save-btn"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="edit-profile-content">
          <div className="section-nav">
            <button
              className={`nav-button ${
                activeSection === "personal" ? "active" : ""
              }`}
              onClick={() => setActiveSection("personal")}
            >
              <span className="nav-icon">👤</span>
              Personal
            </button>
            <button
              className={`nav-button ${
                activeSection === "academic" ? "active" : ""
              }`}
              onClick={() => setActiveSection("academic")}
            >
              <span className="nav-icon">🎓</span>
              Academic
            </button>
            <button
              className={`nav-button ${
                activeSection === "research" ? "active" : ""
              }`}
              onClick={() => setActiveSection("research")}
            >
              <span className="nav-icon">🔬</span>
              Research
            </button>
            <button
              className={`nav-button ${
                activeSection === "address" ? "active" : ""
              }`}
              onClick={() => setActiveSection("address")}
            >
              <span className="nav-icon">🏠</span>
              Address
            </button>
            <button
              className={`nav-button ${
                activeSection === "financial" ? "active" : ""
              }`}
              onClick={() => setActiveSection("financial")}
            >
              <span className="nav-icon">💳</span>
              Financial
            </button>
          </div>

          <div className="form-container">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default TeacherEditProfile;
