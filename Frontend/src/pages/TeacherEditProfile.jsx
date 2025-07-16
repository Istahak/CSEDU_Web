import React, { useState, useEffect } from "react";
import authService from "../api/AuthService";
import facultyService from "../api/FacultyService";
import roomService from "../api/RoomService";
import "./TeacherProfile.css";

const TeacherEditProfile = ({
  onBack,
  onSave,
}) => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userData = authService.getUserData();
        if (!userData || !userData.profile_id) {
          setError("User not authenticated");
          setIsLoading(false);
          return;
        }
        const profile = await facultyService.getFacultyById(userData.profile_id);
        let officeRoomNumber = "";
        if (profile.office_room_id) {
          try {
            const room = await roomService.getRoomById(profile.office_room_id);
            officeRoomNumber = room.number || room.room_number || profile.office_room_id || "";
          } catch (e) {
            officeRoomNumber = profile.office_room_id || "";
          }
        }
        setFormData({
          name: profile.full_name || "",
          email: profile.email || "",
          phone: profile.phone_number || "",
          officeRoom: officeRoomNumber,
          officeHours: profile.office_hours || "",
          dateOfBirth: profile.date_of_birth || "",
          bloodGroup: profile.blood_group || "",
          emergencyContact: profile.emergency_contact || "",
          nationality: profile.nationality || "",
          religion: profile.religion || "",
          maritalStatus: profile.marital_status || "",
          spouseName: profile.spouse_name || "",
          currentAddress: profile.current_address || "",
          permanentAddress: profile.permanent_address || "",
        });
      } catch (err) {
        setError("Failed to load faculty profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading || !formData) {
    return <div className="teacher-profile-page"><div className="teacher-profile-container"><p>Loading profile data...</p></div></div>;
  }
  if (error) {
    return <div className="teacher-profile-page"><div className="teacher-profile-container"><p style={{color:'red'}}>{error}</p></div></div>;
  }

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

  return (
    <div className="teacher-profile-page">
      <div className="teacher-profile-container">
        {/* Header Section - Consistent with TeacherProfile */}
        <div className="teacher-profile-header">
          <h1 className="profile-title">Edit Profile</h1>
          <p className="profile-subtitle">
            Update your personal information
          </p>
        </div>

        {/* Profile Info Section */}
        <div className="profile-info-section">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img
                src="/api/placeholder/120/120"
                alt="Profile"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="avatar-placeholder">👩‍🏫</div>
            </div>
          </div>
          <div className="profile-details-section">
            <h2 className="teacher-name">{formData.name}</h2>
            <p className="teacher-designation">{formData.designation || "Associate Professor"}</p>
            <p className="teacher-department">{formData.department || "Computer Science & Engineering"}</p>
            <div className="profile-meta">
              <span className="meta-item">📧 {formData.email}</span>
              <span className="meta-item">📞 {formData.phone}</span>
              <span className="meta-item">🏢 {formData.officeRoom}</span>
            </div>
          </div>
          <div className="profile-actions-section">
            <button 
              className="secondary-action-btn"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              className="primary-action-btn"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Edit Form Section */}
        <div className="profile-content-section">
          <div className="content-container">
            <div className="edit-form-content">
              <h3 className="section-title">Personal Information</h3>
              
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherEditProfile;
