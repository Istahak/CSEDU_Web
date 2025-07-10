import React, { useState } from 'react';

const CourseModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingCourse 
}) => {
  const [formData, setFormData] = useState(
    editingCourse || {
      code: "",
      title: "",
      instructor: "",
      credits: 3,
      semester: "Fall",
      year: new Date().getFullYear(),
      description: "",
      prerequisites: "",
      maxStudents: 50,
      schedule: "",
      location: "",
      department: "CSE",
      duration: "3 months",
      difficulty: "Beginner",
      courseImage: "",
      syllabus: "",
      learningOutcomes: "",
      assessmentMethods: "",
      textbooks: "",
      status: "active"
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.code.trim()) newErrors.code = "Course code is required";
    if (!formData.title.trim()) newErrors.title = "Course title is required";
    if (!formData.instructor.trim()) newErrors.instructor = "Instructor is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.schedule.trim()) newErrors.schedule = "Schedule is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    
    // Course code validation (e.g., CSE-101)
    const codeRegex = /^[A-Z]{2,4}-\d{3}$/;
    if (formData.code && !codeRegex.test(formData.code)) {
      newErrors.code = "Course code should be in format: CSE-101";
    }

    // Credits validation
    if (formData.credits < 1 || formData.credits > 6) {
      newErrors.credits = "Credits should be between 1 and 6";
    }

    // Max students validation
    if (formData.maxStudents < 1 || formData.maxStudents > 200) {
      newErrors.maxStudents = "Max students should be between 1 and 200";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Process data
    const processedData = {
      ...formData,
      credits: parseInt(formData.credits),
      maxStudents: parseInt(formData.maxStudents),
      year: parseInt(formData.year),
      students: editingCourse ? editingCourse.students : 0, // Keep existing student count or start at 0
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
      <div className="modal-container course-modal">
        <div className="modal-header">
          <h2>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-grid">
            {/* Basic Course Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="code">Course Code *</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={errors.code ? 'error' : ''}
                  placeholder="e.g., CSE-101"
                />
                {errors.code && <span className="error-text">{errors.code}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="title">Course Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="e.g., Introduction to Programming"
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="instructor">Instructor *</label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  className={errors.instructor ? 'error' : ''}
                  placeholder="e.g., Dr. John Smith"
                />
                {errors.instructor && <span className="error-text">{errors.instructor}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="EEE">Electrical & Electronic Engineering</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="Math">Mathematics</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="courseImage">Course Image URL</label>
                <input
                  type="url"
                  id="courseImage"
                  name="courseImage"
                  value={formData.courseImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Academic Details */}
            <div className="form-section">
              <h3>Academic Details</h3>
              
              <div className="form-group">
                <label htmlFor="credits">Credits *</label>
                <input
                  type="number"
                  id="credits"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  className={errors.credits ? 'error' : ''}
                  min="1"
                  max="6"
                />
                {errors.credits && <span className="error-text">{errors.credits}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="2020"
                  max="2030"
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty Level</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 3 months, 1 semester"
                />
              </div>

              <div className="form-group">
                <label htmlFor="prerequisites">Prerequisites</label>
                <input
                  type="text"
                  id="prerequisites"
                  name="prerequisites"
                  value={formData.prerequisites}
                  onChange={handleChange}
                  placeholder="e.g., CSE-100, MAT-101"
                />
                <small>Separate multiple prerequisites with commas</small>
              </div>
            </div>

            {/* Logistics Information */}
            <div className="form-section">
              <h3>Schedule & Logistics</h3>
              
              <div className="form-group">
                <label htmlFor="schedule">Schedule *</label>
                <input
                  type="text"
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  className={errors.schedule ? 'error' : ''}
                  placeholder="e.g., Mon, Wed, Fri 10:00-11:00 AM"
                />
                {errors.schedule && <span className="error-text">{errors.schedule}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? 'error' : ''}
                  placeholder="e.g., Room 101, Building A"
                />
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="maxStudents">Max Students *</label>
                <input
                  type="number"
                  id="maxStudents"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleChange}
                  className={errors.maxStudents ? 'error' : ''}
                  min="1"
                  max="200"
                />
                {errors.maxStudents && <span className="error-text">{errors.maxStudents}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description Section - Full Width */}
          <div className="form-section full-width-section">
            <h3>Course Description & Details</h3>
            
            <div className="form-group">
              <label htmlFor="description">Course Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
                rows={4}
                placeholder="Provide a comprehensive description of the course, its objectives, and what students will learn..."
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="learningOutcomes">Learning Outcomes</label>
              <textarea
                id="learningOutcomes"
                name="learningOutcomes"
                value={formData.learningOutcomes}
                onChange={handleChange}
                rows={3}
                placeholder="List the key learning outcomes and skills students will acquire (one per line)..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="syllabus">Course Syllabus</label>
              <textarea
                id="syllabus"
                name="syllabus"
                value={formData.syllabus}
                onChange={handleChange}
                rows={4}
                placeholder="Outline the weekly topics and course structure..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="assessmentMethods">Assessment Methods</label>
              <textarea
                id="assessmentMethods"
                name="assessmentMethods"
                value={formData.assessmentMethods}
                onChange={handleChange}
                rows={3}
                placeholder="Describe how students will be assessed (exams, assignments, projects, etc.)..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="textbooks">Required Textbooks</label>
              <textarea
                id="textbooks"
                name="textbooks"
                value={formData.textbooks}
                onChange={handleChange}
                rows={3}
                placeholder="List required and recommended textbooks and materials..."
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingCourse ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
