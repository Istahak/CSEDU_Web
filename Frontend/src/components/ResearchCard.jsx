import React, { useState } from "react";
import "./ResearchCard.css";

const ResearchCard = ({ project, onMarkFinished, onViewDetails, onEdit, onArchive, onComplete, completed, archived }) => {
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleFinish = () => {
    setShowCompletionForm(true);
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleEditSubmit = (editData) => {
    if (onEdit) onEdit(project.id, editData);
    setShowEditForm(false);
  };

  const handleCompletionSubmit = (completionData) => {
    if (onMarkFinished) onMarkFinished(project.id, completionData);
    setShowCompletionForm(false);
  };

  const getStatusBadge = () => {
    if (completed || project.status === "completed") {
      return <div className="status-badge completed">Completed</div>;
    }
    if (archived || project.status === "archived") {
      return <div className="status-badge archived">Archived</div>;
    }
    return <div className="status-badge active">Active</div>;
  };

  const CompletionForm = () => {
    const [formData, setFormData] = useState({
      completionDate: '',
      finalAbstract: project.abstract || '',
      methodology: '',
      actualOutcomes: '',
      projectTimeline: '',
      resourcesUsed: '',
      projectImpact: '',
      publications: '',
      projectFiles: ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.completionDate && formData.finalAbstract && formData.methodology && formData.actualOutcomes) {
        handleCompletionSubmit(formData);
      } else {
        alert("Please fill in all required fields (marked with *)");
      }
    };

    return (
      <div className="completion-form-overlay">
        <div className="completion-form">
          <div className="form-header">
            <h3>Complete Project Details</h3>
            <p className="form-subtitle">Fill in the final project information for: <strong>{project.title}</strong></p>
            <button className="close-btn" onClick={() => setShowCompletionForm(false)}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="completion-form-content">
            <div className="form-section">
              <h4>📅 Basic Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Completion Date *</label>
                  <input
                    type="date"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Project Files/Repository</label>
                  <input
                    type="text"
                    name="projectFiles"
                    value={formData.projectFiles}
                    onChange={handleInputChange}
                    placeholder="e.g., GitHub repository, shared drive link"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>📝 Abstract</h4>
              <div className="form-group full-width">
                <label>Final Abstract *</label>
                <textarea
                  name="finalAbstract"
                  value={formData.finalAbstract}
                  onChange={handleInputChange}
                  placeholder="Provide the complete final abstract of your research project..."
                  rows="4"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h4>🔬 Project Details</h4>
              <div className="form-group full-width">
                <label>Methodology *</label>
                <textarea
                  name="methodology"
                  value={formData.methodology}
                  onChange={handleInputChange}
                  placeholder="Describe the methodology used in this project, including research approach, tools, and techniques employed..."
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Actual Outcomes *</label>
                <textarea
                  name="actualOutcomes"
                  value={formData.actualOutcomes}
                  onChange={handleInputChange}
                  placeholder="Describe the actual outcomes and results achieved, including key findings and deliverables..."
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Project Timeline</label>
                <textarea
                  name="projectTimeline"
                  value={formData.projectTimeline}
                  onChange={handleInputChange}
                  placeholder="Describe the project timeline, major milestones, and phases completed..."
                  rows="3"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Resources Used</label>
                <textarea
                  name="resourcesUsed"
                  value={formData.resourcesUsed}
                  onChange={handleInputChange}
                  placeholder="List the resources utilized including facilities, tools, databases, collaborations..."
                  rows="3"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Project Impact</label>
                <textarea
                  name="projectImpact"
                  value={formData.projectImpact}
                  onChange={handleInputChange}
                  placeholder="Describe the impact of this research on academic community, industry, or society..."
                  rows="3"
                />
              </div>
            </div>

            <div className="form-section">
              <h4>📚 Publications & Outputs</h4>
              <div className="form-group full-width">
                <label>Publications & Presentations</label>
                <textarea
                  name="publications"
                  value={formData.publications}
                  onChange={handleInputChange}
                  placeholder="List any papers published, conferences presented, or submissions made as a result of this project..."
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="secondary-action-btn" onClick={() => setShowCompletionForm(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-action-btn">
                Complete Project
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const EditForm = () => {
    const [formData, setFormData] = useState({
      title: project.title || '',
      year: project.year || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
      authors: project.authors || '',
      supervisor: project.supervisor || '',
      abstract: project.abstract || ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.title && formData.year && formData.tags && formData.authors && formData.supervisor && formData.abstract) {
        const editData = {
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        };
        handleEditSubmit(editData);
      } else {
        alert("Please fill in all required fields");
      }
    };

    return (
      <div className="completion-form-overlay">
        <div className="completion-form">
          <div className="form-header">
            <h3>Edit Research Project</h3>
            <p className="form-subtitle">Update project information for: <strong>{project.title}</strong></p>
            <button className="close-btn" onClick={() => setShowEditForm(false)}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="completion-form-content">
            <div className="form-section">
              <h4>📝 Project Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Year *</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Research Areas (comma separated) *</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., NLP, Deep Learning"
                  />
                </div>
                <div className="form-group">
                  <label>Authors *</label>
                  <input
                    type="text"
                    name="authors"
                    value={formData.authors}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Supervisor *</label>
                  <input
                    type="text"
                    name="supervisor"
                    value={formData.supervisor}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>📝 Abstract</h4>
              <div className="form-group full-width">
                <label>Project Abstract *</label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed abstract of your research project..."
                  rows="6"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="secondary-action-btn" onClick={() => setShowEditForm(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-action-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`course-card research-card${completed ? ' completed' : ''}${archived ? ' archived' : ''}`}>
        <div className="course-card-header">
          <h3 className="course-title">{project.title}</h3>
          {project.year && <span className="course-badge project-year">{project.year}</span>}
          {getStatusBadge()}
        </div>
        <div className="course-description">
          {project.tags && project.tags.length > 0 && (
            <div className="course-info-row">
              <span className="course-info-label">🏷️ Research Areas:</span>
              <span className="course-info-value">
                {Array.isArray(project.tags) ? project.tags.join(", ") : project.tags}
              </span>
            </div>
          )}
          {project.authors && (
            <div className="course-info-row">
              <span className="course-info-label">👥 Authors:</span>
              <span className="course-info-value">{project.authors}</span>
            </div>
          )}
          {project.supervisor && (
            <div className="course-info-row">
              <span className="course-info-label">🧑‍🏫 Supervisor:</span>
              <span className="course-info-value">{project.supervisor}</span>
            </div>
          )}
          {project.abstract && (
            <div className="course-info-row">
              <span className="course-info-label">📝 Abstract:</span>
              <span className="course-info-value abstract-text">
                {project.abstract.length > 100 ? `${project.abstract.substring(0, 100)}...` : project.abstract}
              </span>
            </div>
          )}
        </div>
        <div className="course-footer">
          <span className="course-semester">{project.status === "completed" ? "Completed" : project.status === "archived" ? "Archived" : "Active"}</span>
          <div className="course-actions">
            {!completed && !archived && project.status === "active" && (
              <>
                <button className="course-action-btn secondary" onClick={handleEdit}>Edit</button>
                <button className="course-action-btn complete" onClick={handleFinish}>Mark as Finished</button>
                <button className="course-action-btn archive" onClick={() => onArchive && onArchive(project)}>Archive</button>
              </>
            )}
          </div>
        </div>
      </div>

      {showCompletionForm && <CompletionForm />}
      {showEditForm && <EditForm />}
      {showEditForm && <EditForm />}
    </>
  );
};

export default ResearchCard;
