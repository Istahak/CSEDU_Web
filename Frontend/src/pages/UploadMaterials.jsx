import React, { useState } from "react";
import "./UploadMaterials.css";

const UploadMaterials = ({ onBack, courseData: propCourseData }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [materialData, setMaterialData] = useState({
    title: "",
    description: "",
    category: "lecture",
    files: [],
    visibility: "all",
    availableFrom: "",
    availableUntil: "",
    allowDownload: true,
    notifyStudents: true,
  });

  // Sample course data
  const courseData = propCourseData || [
    {
      id: 1,
      code: "CSE 408",
      title: "Software Development",
      section: "A",
      studentsEnrolled: 45,
      schedule: "Sunday, Tuesday - 10:00 AM - 11:30 AM",
      room: "Room 301",
    },
    {
      id: 2,
      code: "CSE 412",
      title: "Machine Learning",
      section: "B",
      studentsEnrolled: 38,
      schedule: "Monday, Wednesday - 2:00 PM - 3:30 PM",
      room: "Room 205",
    },
    {
      id: 3,
      code: "CSE 498",
      title: "Thesis Supervision",
      section: "Research",
      studentsEnrolled: 8,
      schedule: "By Appointment",
      room: "Room 402",
    },
  ];

  const materialCategories = [
    { value: "lecture", label: "Lecture Notes", icon: "📖" },
    { value: "assignment", label: "Assignment Resources", icon: "📝" },
    { value: "reading", label: "Reading Materials", icon: "📚" },
    { value: "video", label: "Video Content", icon: "🎥" },
    { value: "code", label: "Code Examples", icon: "💻" },
    { value: "exam", label: "Exam Materials", icon: "📋" },
    { value: "reference", label: "Reference Materials", icon: "🔗" },
    { value: "other", label: "Other", icon: "📄" },
  ];

  const visibilityOptions = [
    { value: "all", label: "All Students" },
    { value: "active", label: "Active Students Only" },
    { value: "specific", label: "Specific Groups" },
  ];

  const handleInputChange = (field, value) => {
    setMaterialData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileDetails = files.map((file) => ({
      file: file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type || "Unknown",
      id: Date.now() + Math.random(),
    }));

    setMaterialData((prev) => ({
      ...prev,
      files: [...prev.files, ...fileDetails],
    }));
  };

  const removeFile = (fileId) => {
    setMaterialData((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f.id !== fileId),
    }));
  };

  const validateForm = () => {
    if (!materialData.title.trim()) {
      alert("Please enter a title for the materials");
      return false;
    }
    if (materialData.files.length === 0) {
      alert("Please upload at least one file");
      return false;
    }
    return true;
  };

  const handleSaveAsDraft = () => {
    if (!materialData.title.trim()) {
      alert("Please enter a title to save as draft");
      return;
    }

    // Simulate saving as draft
    alert(
      `Materials "${materialData.title}" saved as draft for ${selectedCourse.code}`
    );
  };

  const handlePublishMaterials = () => {
    if (!validateForm()) return;

    // Simulate publishing materials
    const materials = {
      ...materialData,
      courseId: selectedCourse.id,
      courseCode: selectedCourse.code,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "published",
    };

    let notificationMessage = `Materials "${materialData.title}" uploaded successfully for ${selectedCourse.code}!`;
    if (materialData.notifyStudents) {
      notificationMessage += `\n\nStudents have been notified automatically.`;
    }

    alert(notificationMessage);

    // Reset form
    setMaterialData({
      title: "",
      description: "",
      category: "lecture",
      files: [],
      visibility: "all",
      availableFrom: "",
      availableUntil: "",
      allowDownload: true,
      notifyStudents: true,
    });
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) return "📄";
    if (fileType.includes("image")) return "🖼️";
    if (fileType.includes("video")) return "🎥";
    if (fileType.includes("audio")) return "🎵";
    if (fileType.includes("document") || fileType.includes("word")) return "📝";
    if (fileType.includes("presentation")) return "📊";
    if (fileType.includes("spreadsheet")) return "📈";
    if (fileType.includes("zip") || fileType.includes("archive")) return "📦";
    return "📎";
  };

  const renderCourseSelection = () => (
    <div className="course-selection">
      <div className="view-header">
        <div className="header-content">
          <h2>📖 Upload Course Materials</h2>
          <p>Select a course to upload learning materials and resources</p>
        </div>
      </div>

      <div className="courses-grid">
        {courseData.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <div className="course-info">
                <h3>{course.code}</h3>
                <p className="course-title">{course.title}</p>
                <span className="course-section">Section {course.section}</span>
              </div>
              <div className="course-stats">
                <div className="stat-item">
                  <span className="stat-number">{course.studentsEnrolled}</span>
                  <span className="stat-label">Students</span>
                </div>
              </div>
            </div>

            <div className="course-details">
              <div className="detail-item">
                <span className="detail-label">Schedule:</span>
                <span className="detail-value">{course.schedule}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Room:</span>
                <span className="detail-value">{course.room}</span>
              </div>
            </div>

            <div className="course-actions">
              <button
                className="action-btn primary"
                onClick={() => setSelectedCourse(course)}
              >
                Upload Materials
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUploadForm = () => (
    <div className="upload-form">
      <div className="view-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => setSelectedCourse(null)}>
            ← Back to Courses
          </button>
          <h2>📚 Upload Materials for {selectedCourse.code}</h2>
          <p>
            {selectedCourse.title} • Section {selectedCourse.section}
          </p>
        </div>
      </div>

      <div className="form-container">
        <div className="form-section">
          <h3>Material Information</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title">Material Title *</label>
              <input
                type="text"
                id="title"
                value={materialData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter a descriptive title for the materials"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                value={materialData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="form-select"
              >
                {materialCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="visibility">Visibility</label>
              <select
                id="visibility"
                value={materialData.visibility}
                onChange={(e) =>
                  handleInputChange("visibility", e.target.value)
                }
                className="form-select"
              >
                {visibilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={materialData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Provide a brief description of the materials and how students should use them"
              rows="3"
              className="form-textarea"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>File Upload</h3>
          <div className="upload-area">
            <input
              type="file"
              id="fileUpload"
              multiple
              onChange={handleFileUpload}
              className="file-input"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.xlsx,.xls"
            />
            <label htmlFor="fileUpload" className="upload-label">
              <div className="upload-icon">📁</div>
              <div className="upload-text">
                <strong>Click to upload files</strong>
                <p>or drag and drop files here</p>
                <small>
                  Supports: PDF, Word, PowerPoint, Images, Videos, Archives
                </small>
              </div>
            </label>
          </div>

          {materialData.files.length > 0 && (
            <div className="files-list">
              <h4>Uploaded Files ({materialData.files.length})</h4>
              {materialData.files.map((fileDetail) => (
                <div key={fileDetail.id} className="file-item">
                  <div className="file-info">
                    <span className="file-icon">
                      {getFileIcon(fileDetail.type)}
                    </span>
                    <div className="file-details">
                      <span className="file-name">{fileDetail.name}</span>
                      <span className="file-meta">
                        {fileDetail.size} • {fileDetail.type}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(fileDetail.id)}
                    className="remove-file"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Availability Settings</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="availableFrom">Available From</label>
              <input
                type="date"
                id="availableFrom"
                value={materialData.availableFrom}
                onChange={(e) =>
                  handleInputChange("availableFrom", e.target.value)
                }
                className="form-input"
              />
              <small className="form-help">
                Leave empty to make available immediately
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="availableUntil">Available Until</label>
              <input
                type="date"
                id="availableUntil"
                value={materialData.availableUntil}
                onChange={(e) =>
                  handleInputChange("availableUntil", e.target.value)
                }
                className="form-input"
              />
              <small className="form-help">Leave empty for no expiration</small>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Access Settings</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="allowDownload"
                  checked={materialData.allowDownload}
                  onChange={(e) =>
                    handleInputChange("allowDownload", e.target.checked)
                  }
                />
                <label htmlFor="allowDownload">
                  <strong>Allow Download</strong>
                  <small>Students can download files to their devices</small>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="notifyStudents"
                  checked={materialData.notifyStudents}
                  onChange={(e) =>
                    handleInputChange("notifyStudents", e.target.checked)
                  }
                />
                <label htmlFor="notifyStudents">
                  <strong>Notify Students</strong>
                  <small>Send notification when materials are published</small>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleSaveAsDraft}
            className="action-btn secondary"
          >
            💾 Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublishMaterials}
            className="action-btn primary"
          >
            ✅ Publish Materials
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="upload-materials">
      <div className="upload-materials-container">
        {onBack && !selectedCourse && (
          <button onClick={onBack} className="main-back-button">
            ← Back to Quick Actions
          </button>
        )}

        <div className="upload-materials-content">
          {selectedCourse ? renderUploadForm() : renderCourseSelection()}
        </div>
      </div>
    </div>
  );
};

export default UploadMaterials;
