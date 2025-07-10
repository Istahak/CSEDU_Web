import React, { useState } from 'react';

const AchievementModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingAchievement 
}) => {
  const [formData, setFormData] = useState(
    editingAchievement || {
      title: "",
      description: "",
      category: "Academic",
      recipientName: "",
      recipientType: "student",
      awardDate: new Date().toISOString().split('T')[0],
      awardingOrganization: "",
      imageUrl: "",
      status: "draft",
      featured: false
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.recipientName.trim()) newErrors.recipientName = "Recipient name is required";
    if (!formData.awardDate) newErrors.awardDate = "Award date is required";
    if (!formData.awardingOrganization.trim()) newErrors.awardingOrganization = "Awarding organization is required";
    
    // Date validation - award date should not be in the future
    if (formData.awardDate) {
      const awardDate = new Date(formData.awardDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      
      if (awardDate > today) {
        newErrors.awardDate = "Award date cannot be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const processedData = {
      ...formData,
      featured: Boolean(formData.featured)
    };

    onSave(processedData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      <div className="modal-container achievement-modal">
        <div className="modal-header">
          <h2>{editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="achievement-form">
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3>Achievement Details</h3>
              
              <div className="form-group">
                <label htmlFor="title">Achievement Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="e.g., Best Research Paper Award"
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Academic">Academic</option>
                  <option value="Research">Research</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Technical">Technical</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Innovation">Innovation</option>
                  <option value="Excellence">Excellence</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="awardDate">Award Date *</label>
                <input
                  type="date"
                  id="awardDate"
                  name="awardDate"
                  value={formData.awardDate}
                  onChange={handleChange}
                  className={errors.awardDate ? 'error' : ''}
                />
                {errors.awardDate && <span className="error-text">{errors.awardDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="awardingOrganization">Awarding Organization *</label>
                <input
                  type="text"
                  id="awardingOrganization"
                  name="awardingOrganization"
                  value={formData.awardingOrganization}
                  onChange={handleChange}
                  className={errors.awardingOrganization ? 'error' : ''}
                  placeholder="e.g., International Conference on AI"
                />
                {errors.awardingOrganization && <span className="error-text">{errors.awardingOrganization}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Achievement Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                <small>Optional: Add a photo of the certificate, award ceremony, or related image</small>
              </div>
            </div>

            {/* Recipient Information */}
            <div className="form-section">
              <h3>Recipient Information</h3>
              
              <div className="form-group">
                <label htmlFor="recipientName">Recipient Name *</label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  className={errors.recipientName ? 'error' : ''}
                  placeholder="e.g., Dr. John Smith or Student Name"
                />
                {errors.recipientName && <span className="error-text">{errors.recipientName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="recipientType">Recipient Type *</label>
                <select
                  id="recipientType"
                  name="recipientType"
                  value={formData.recipientType}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                  <option value="department">Department</option>
                  <option value="institution">Institution</option>
                  <option value="team">Team</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <span className="checkbox-custom"></span>
                  Featured Achievement
                </label>
                <small>Featured achievements will be highlighted on the main page</small>
              </div>

              <div className="recipient-guidelines">
                <h4>Recipient Type Guidelines:</h4>
                <ul>
                  <li><strong>Student:</strong> Individual undergraduate or graduate students</li>
                  <li><strong>Faculty:</strong> Teaching staff, professors, researchers</li>
                  <li><strong>Staff:</strong> Administrative and support staff</li>
                  <li><strong>Department:</strong> Departmental achievements</li>
                  <li><strong>Institution:</strong> University-wide recognitions</li>
                  <li><strong>Team:</strong> Group achievements (research teams, clubs, etc.)</li>
                  <li><strong>Alumni:</strong> Former students and graduates</li>
                </ul>
              </div>

              <div className="category-guidelines">
                <h4>Category Guidelines:</h4>
                <ul>
                  <li><strong>Academic:</strong> Scholarships, academic excellence, GPA awards</li>
                  <li><strong>Research:</strong> Publications, research grants, conference papers</li>
                  <li><strong>Sports:</strong> Athletic achievements, competitions</li>
                  <li><strong>Cultural:</strong> Arts, music, drama, cultural events</li>
                  <li><strong>Technical:</strong> Programming contests, tech innovations</li>
                  <li><strong>Leadership:</strong> Student leadership, management roles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Description Section - Full Width */}
          <div className="form-section full-width-section">
            <h3>Achievement Description</h3>
            
            <div className="form-group">
              <label htmlFor="description">Detailed Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
                rows={6}
                placeholder="Provide a detailed description of the achievement, including its significance, the selection process, criteria, and any other relevant information..."
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
              <small>Include context about the achievement, its importance, and any relevant details that highlight its significance.</small>
            </div>

            <div className="description-tips">
              <h4>Description Writing Tips:</h4>
              <ul>
                <li>Start with the most important aspect of the achievement</li>
                <li>Include the competition level (local, national, international)</li>
                <li>Mention the number of participants or competitors if relevant</li>
                <li>Describe the selection criteria or judging process</li>
                <li>Include the impact or significance of this achievement</li>
                <li>Add any relevant background or context</li>
                <li>Keep it professional and factual</li>
                <li>Proofread for accuracy and clarity</li>
              </ul>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingAchievement ? 'Update Achievement' : 'Add Achievement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AchievementModal;
