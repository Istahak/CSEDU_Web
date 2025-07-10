import React, { useState } from 'react';

const NoticeModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingNotice 
}) => {
  const [formData, setFormData] = useState(
    editingNotice || {
      title: "",
      content: "",
      category: "Academic",
      priority: "medium",
      publishDate: new Date().toISOString().split('T')[0],
      expiryDate: "",
      status: "draft",
      author: "Admin",
      attachments: []
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (!formData.publishDate) newErrors.publishDate = "Publish date is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    
    // Date validation
    if (formData.publishDate && formData.expiryDate) {
      const publishDate = new Date(formData.publishDate);
      const expiryDate = new Date(formData.expiryDate);
      
      if (expiryDate <= publishDate) {
        newErrors.expiryDate = "Expiry date must be after publish date";
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
      attachments: formData.attachments || []
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
      <div className="modal-container notice-modal">
        <div className="modal-header">
          <h2>{editingNotice ? 'Edit Notice' : 'Add New Notice'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="notice-form">
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="title">Notice Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="e.g., Semester Registration Open"
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
                  <option value="Administrative">Administrative</option>
                  <option value="Admission">Admission</option>
                  <option value="Examination">Examination</option>
                  <option value="Event">Event</option>
                  <option value="General">General</option>
                  <option value="Important">Important</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority Level *</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
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
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g., Admin, Dr. John Smith"
                />
              </div>
            </div>

            {/* Date Information */}
            <div className="form-section">
              <h3>Date & Publication Details</h3>
              
              <div className="form-group">
                <label htmlFor="publishDate">Publish Date *</label>
                <input
                  type="date"
                  id="publishDate"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                  className={errors.publishDate ? 'error' : ''}
                />
                {errors.publishDate && <span className="error-text">{errors.publishDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date *</label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={errors.expiryDate ? 'error' : ''}
                />
                {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                <small>The notice will automatically expire after this date</small>
              </div>

              <div className="priority-info">
                <h4>Priority Guidelines:</h4>
                <ul>
                  <li><strong>Low:</strong> General information, non-urgent updates</li>
                  <li><strong>Medium:</strong> Important notices, regular deadlines</li>
                  <li><strong>High:</strong> Critical information, upcoming deadlines</li>
                  <li><strong>Urgent:</strong> Immediate action required, emergency notices</li>
                </ul>
              </div>

              <div className="category-info">
                <h4>Category Guidelines:</h4>
                <ul>
                  <li><strong>Academic:</strong> Course-related, semester information</li>
                  <li><strong>Administrative:</strong> Policy changes, office hours</li>
                  <li><strong>Admission:</strong> Application deadlines, requirements</li>
                  <li><strong>Examination:</strong> Exam schedules, results</li>
                  <li><strong>Event:</strong> Conferences, seminars, workshops</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Content Section - Full Width */}
          <div className="form-section full-width-section">
            <h3>Notice Content</h3>
            
            <div className="form-group">
              <label htmlFor="content">Notice Content *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className={errors.content ? 'error' : ''}
                rows={8}
                placeholder="Write the complete notice content here. Include all relevant details, instructions, and important information that students and faculty need to know..."
              />
              {errors.content && <span className="error-text">{errors.content}</span>}
              <small>Provide clear, detailed information. Use proper formatting and include any necessary contact information or deadlines.</small>
            </div>

            <div className="content-tips">
              <h4>Content Writing Tips:</h4>
              <ul>
                <li>Start with the most important information</li>
                <li>Use clear, simple language</li>
                <li>Include specific dates, times, and locations</li>
                <li>Provide contact information for questions</li>
                <li>Use bullet points for multiple items</li>
                <li>Include any required actions or next steps</li>
              </ul>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingNotice ? 'Update Notice' : 'Publish Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeModal;
