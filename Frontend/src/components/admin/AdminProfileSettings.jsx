import React, { useState } from "react";
import "./AdminProfileSettings.css";

const AdminProfileSettings = ({ adminData, setAdminData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: adminData.name,
    email: adminData.email,
    phone: adminData.phone,
    department: adminData.department,
    permissions: adminData.permissions || [],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    adminData.profileImage || ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  const handlePermissionChange = (permission) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter((p) => p !== permission)
      : [...formData.permissions, permission];

    setFormData({
      ...formData,
      permissions: updatedPermissions,
    });
  };

  const handleSave = () => {
    const updatedAdminData = {
      ...adminData,
      ...formData,
      profileImage: imagePreview,
    };
    setAdminData(updatedAdminData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: adminData.name,
      email: adminData.email,
      phone: adminData.phone,
      department: adminData.department,
      permissions: adminData.permissions || [],
    });
    setImagePreview(adminData.profileImage || "");
    setSelectedImage(null);
    setIsEditing(false);
  };

  const availablePermissions = [
    "Faculty Management",
    "Content Management",
    "Course Management",
    "System Settings",
    "Analytics",
    "Database Management",
    "User Management",
    "Event Management",
    "Notice Management",
    "Achievement Management",
    "Request Management",
    "Financial Management",
  ];

  return (
    <div className="admin-profile-settings">
      <div className="section-header">
        <h2>Admin Profile Settings</h2>
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            ✏️ Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>
              ✅ Save Changes
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              ❌ Cancel
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-image-section">
            <h3>Profile Picture</h3>
            <div className="image-upload-section">
              <div className="current-image">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Admin Profile"
                    className="admin-profile-image"
                  />
                ) : (
                  <div className="image-placeholder">
                    <span>👨‍💼</span>
                    <p>No profile image</p>
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="image-controls">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="adminProfileImage"
                    className="file-input"
                  />
                  <label htmlFor="adminProfileImage" className="upload-btn">
                    📷 Upload Image
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="remove-btn"
                    >
                      🗑️ Remove Image
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="profile-info-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                ) : (
                  <div className="display-value">{adminData.name}</div>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                ) : (
                  <div className="display-value">{adminData.email}</div>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="display-value">{adminData.phone}</div>
                )}
              </div>

              <div className="form-group">
                <label>Department</label>
                {isEditing ? (
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="Computer Science & Engineering">
                      Computer Science & Engineering
                    </option>
                    <option value="Electrical & Electronic Engineering">
                      Electrical & Electronic Engineering
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Business Administration">
                      Business Administration
                    </option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                ) : (
                  <div className="display-value">{adminData.department}</div>
                )}
              </div>
            </div>
          </div>

          <div className="additional-info-section">
            <h3>System Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Role:</label>
                <span>{adminData.role}</span>
              </div>
              <div className="info-item">
                <label>Join Date:</label>
                <span>{adminData.joinDate}</span>
              </div>
              <div className="info-item">
                <label>Admin ID:</label>
                <span>{adminData.adminId || "ADMIN-001"}</span>
              </div>
              <div className="info-item">
                <label>Last Login:</label>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="permissions-section">
            <h3>System Permissions</h3>
            <div className="permissions-grid">
              {availablePermissions.map((permission) => (
                <div key={permission} className="permission-item">
                  {isEditing ? (
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                      />
                      <span className="checkmark"></span>
                      {permission}
                    </label>
                  ) : (
                    <div
                      className={`permission-badge ${
                        adminData.permissions.includes(permission)
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {adminData.permissions.includes(permission) ? "✅" : "❌"}{" "}
                      {permission}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSettings;
