import React from "react";
import "./ProjectDetails.css";

const ProjectDetails = ({ project, onBack }) => {
  if (!project) {
    return (
      <div className="project-details-page">
        <p>Project not found.</p>
        <button onClick={onBack} className="back-btn">
          ← Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="project-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>
          Projects
        </span>
        <span className="breadcrumb-separator"> / </span>
        <span className="breadcrumb-current">Project Details</span>
      </div>

      {/* Project Header */}
      <div className="project-header">
        <h1 className="project-details-title">
          Project Title: {project.title}
        </h1>
      </div>

      {/* Project Image Section */}
      <div className="project-hero">
        <div className="project-hero-image">
          <div className="project-hero-icon">{project.image}</div>
          <div className="project-hero-overlay">
            <div className="project-hero-content">
              <div className="project-status">Active Research Project</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Information Grid */}
      <div className="project-info-grid">
        <div className="project-info-item">
          <span className="info-label">Year</span>
          <span className="info-value">{project.year || "2023"}</span>
        </div>
        <div className="project-info-item">
          <span className="info-label">Topic</span>
          <span className="info-value">
            {project.tags?.join(", ") || "Research"}
          </span>
        </div>
        <div className="project-info-item">
          <span className="info-label">Authors</span>
          <span className="info-value">{project.authors || project.team}</span>
        </div>
        <div className="project-info-item">
          <span className="info-label">Supervisor</span>
          <span className="info-value">{project.supervisor || project.team}</span>
        </div>
      </div>

      {/* Abstract Section */}
      <div className="project-section">
        <h2 className="section-title">Abstract</h2>
        <p className="project-abstract">
          {project.abstract || 
           `${project.description} This research project represents a significant contribution to the field, exploring innovative approaches and methodologies. The project aims to address current challenges and provide practical solutions that can be implemented in real-world scenarios. Through comprehensive analysis and rigorous testing, the research team has developed insights that advance our understanding of the subject matter.`}
        </p>
      </div>

      {/* Project Tags */}
      <div className="project-section">
        <h2 className="section-title">Research Areas</h2>
        <div className="project-tags-detail">
          {project.tags?.map((tag, i) => (
            <span className="project-tag-detail" key={i}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Demo Section */}
      <div className="project-section">
        <h2 className="section-title">Demo</h2>
        <div className="demo-buttons">
          <button className="demo-btn primary">View Demo</button>
          <button className="demo-btn secondary">Project Files</button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="project-section">
        <h2 className="section-title">Project Details</h2>
        <div className="project-details-content">
          <div className="detail-item">
            <strong>Methodology:</strong>
            <p>The project employs a mixed-methods approach combining quantitative analysis with qualitative insights to ensure comprehensive coverage of the research objectives.</p>
          </div>
          <div className="detail-item">
            <strong>Expected Outcomes:</strong>
            <p>The research is expected to yield practical applications and contribute to the academic community through publications and potential patent applications.</p>
          </div>
          <div className="detail-item">
            <strong>Timeline:</strong>
            <p>The project is currently in its active phase with ongoing data collection and analysis, expected to conclude by the end of the academic year.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
