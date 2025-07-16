import React, { useState } from 'react';

const FacultyModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingFaculty 
}) => {
  const [formData, setFormData] = useState(
    editingFaculty || {
      name: "",
      email: "",
      phone: "",
      designation: "Assistant Professor",
      specialization: "",
      qualifications: "",
      officeRoom: "",
      researchAreas: "",
      publications: 0,
      experience: "",
      profileImage: "",
      bio: "",
      education: "",
      joinDate: new Date().toISOString().split('T')[0]
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!formData.qualifications.trim()) newErrors.qualifications = "Qualifications are required";
    if (!formData.officeRoom.trim()) newErrors.officeRoom = "Office room is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Process research areas and specialization
    const processedData = {
      ...formData,
      researchAreas: formData.researchAreas.split(',').map(area => area.trim()).filter(area => area),
      specialization: formData.specialization,
      publications: parseInt(formData.publications) || 0,
      role: "faculty",
      status: "active",
      department: "CSE"
    };

    onSave(processedData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container faculty-modal">
        <div className="modal-header">
          <h2>{editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="faculty-form">
          <div className="form-grid">
            {/* Basic Information Section */}
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="e.g., Dr. John Smith"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="john.smith@csedu.edu.bd"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+880-1234-567890"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="designation">Designation *</label>
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="joinDate">Join Date</label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="profileImage">Profile Image URL</label>
                <input
                  type="url"
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Academic & Research Information Section */}
            <div className="form-section">
              <h3>Academic & Research Information</h3>
              
              <div className="form-group">
                <label htmlFor="qualifications">Qualifications *</label>
                <input
                  type="text"
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className={errors.qualifications ? 'error' : ''}
                  placeholder="e.g., PhD in Computer Science"
                />
                {errors.qualifications && <span className="error-text">{errors.qualifications}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="education">Education Background</label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., PhD from MIT (2010), MS from Stanford (2005)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialization">Specialization *</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={errors.specialization ? 'error' : ''}
                  placeholder="e.g., Artificial Intelligence, Machine Learning"
                />
                {errors.specialization && <span className="error-text">{errors.specialization}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="researchAreas">Research Areas</label>
                <input
                  type="text"
                  id="researchAreas"
                  name="researchAreas"
                  value={formData.researchAreas}
                  onChange={handleChange}
                  placeholder="AI, ML, Data Science (comma separated)"
                />
                <small>Separate multiple areas with commas</small>
              </div>

              <div className="form-group">
                <label htmlFor="publications">Number of Publications</label>
                <input
                  type="number"
                  id="publications"
                  name="publications"
                  value={formData.publications}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="form-section">
              <h3>Professional Information</h3>
              
              <div className="form-group">
                <label htmlFor="experience">Experience *</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? 'error' : ''}
                  placeholder="e.g., 15 years"
                />
                {errors.experience && <span className="error-text">{errors.experience}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="officeRoom">Office Room *</label>
                <input
                  type="text"
                  id="officeRoom"
                  name="officeRoom"
                  value={formData.officeRoom}
                  onChange={handleChange}
                  className={errors.officeRoom ? 'error' : ''}
                  placeholder="e.g., Room 301, Building A"
                />
                {errors.officeRoom && <span className="error-text">{errors.officeRoom}</span>}
              </div>
            </div>
          </div>

          {/* Biography Section - Full Width */}
          <div className="form-section full-width-section">
            <h3>Biography & Additional Information</h3>
            <div className="form-group">
              <label htmlFor="bio">Biography</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Brief biography, research interests, achievements, and other relevant information..."
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingFaculty ? 'Update Faculty' : 'Add Faculty'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyModal;
