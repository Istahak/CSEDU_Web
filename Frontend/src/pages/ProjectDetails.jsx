import React, { useState } from "react";
import "./ProjectDetails.css";

const ProjectDetails = ({ project, onBack }) => {
  const [expandedSections, setExpandedSections] = useState({
    abstract: false,
    methodology: false,
    outcomes: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  if (!project) {
    return (
      <div className="notices-page">
        <div className="notices-container">
          <div className="notices-header">
            <h1 className="notices-title">Project not found</h1>
            <p className="notices-subtitle">The project you're looking for could not be found.</p>
          </div>
          <div className="no-notices">
            <div className="no-notices-content">
              <span className="no-notices-icon">🔍</span>
              <button onClick={onBack} className="view-more-btn">
                ← Back to Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notices-page">
      <div className="notices-container">
        {/* Header Section */}
        <div className="project-hero-header">
          <div className="project-hero-content">
            <div className="project-category-badge">
              {project.category || "Research Project"}
            </div>
            <h1 className="project-hero-title">{project.title}</h1>
            <p className="project-hero-description">
              {project.abstract ? 
                project.abstract.slice(0, 200) + (project.abstract.length > 200 ? "..." : "") :
                `${project.description} This research project represents a significant contribution to the field, exploring innovative approaches and methodologies.`}
            </p>
            <div className="project-hero-meta">
              <div className="hero-meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">{project.year || "2023"}</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-icon">👥</span>
                <span className="meta-text">{project.authors || project.team}</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-icon">🎓</span>
                <span className="meta-text">{project.supervisor || project.team}</span>
              </div>
            </div>
          </div>
          <div className="project-hero-visual">
            <div className="hero-icon-container">
              <span className="hero-project-icon">🔬</span>
            </div>
          </div>
        </div>

        {/* Project Meta Bar */}
        <div className="project-meta-bar">
          <span className="project-meta-item">
            <strong>Year:</strong> {project.year || "2023"}
          </span>
          <span className="project-meta-item">
            <strong>Authors:</strong> {project.authors || project.team}
          </span>
          <span className="project-meta-item">
            <strong>Supervisor:</strong> {project.supervisor || project.team}
          </span>
          {project.tags && (
            <span className="project-meta-item">
              <strong>Research Areas:</strong> {project.tags.join(", ")}
            </span>
          )}
        </div>

        {/* Project Content Grid */}
        <div className="project-details-grid">
          <div className="project-main-content">
            <div className="notice-card scrollable-card">
              <div className="notice-card-header">
                <h3 className="notice-title-2">Abstract</h3>
              </div>
              <div className="scrollable-content">
                <p className="notice-description">
                  {project.abstract || 
                   `${project.description} This research project represents a significant contribution to the field, exploring innovative approaches and methodologies. The project aims to address current challenges and provide practical solutions that can be implemented in real-world scenarios. Through comprehensive analysis and rigorous testing, the research team has developed insights that advance our understanding of the subject matter. The research methodology incorporates both theoretical frameworks and practical implementations to ensure robust and reliable results. Our findings contribute to the growing body of knowledge in this domain and offer new perspectives for future research directions. This comprehensive study builds upon existing literature while introducing novel concepts and methodologies that push the boundaries of current understanding. The interdisciplinary approach ensures that the research addresses real-world challenges and provides actionable insights for practitioners and researchers alike.`}
                </p>
              </div>
            </div>

            {project.tags && (
              <div className="notice-card">
                <div className="notice-card-header">
                  <h3 className="notice-title-2">Research Areas</h3>
                </div>
                <div className="project-tags-detail">
                  {project.tags.map((tag, i) => (
                    <span className="project-tag-detail" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="notice-card scrollable-card project-details-large">
              <div className="notice-card-header">
                <h3 className="notice-title-2">Project Details</h3>
              </div>
              <div className="scrollable-content">
                <div className="detail-item">
                  <strong>Methodology:</strong>
                  <p>
                    The project employs a mixed-methods approach combining quantitative analysis with qualitative insights to ensure comprehensive coverage of the research objectives. Our methodology includes systematic literature review, experimental design, data collection through surveys and interviews, statistical analysis using advanced computational tools, and validation through peer review processes. We utilize state-of-the-art equipment and follow established protocols to maintain research integrity and reproducibility. The research design incorporates multiple phases including preliminary studies, pilot testing, full-scale implementation, and comprehensive evaluation. Data collection methods are carefully selected to ensure both reliability and validity of results.
                  </p>
                </div>
                <div className="detail-item">
                  <strong>Expected Outcomes:</strong>
                  <p>
                    The research is expected to yield practical applications and contribute to the academic community through publications and potential patent applications. We anticipate developing new algorithms, frameworks, or methodologies that can be applied in real-world scenarios. The outcomes will include peer-reviewed publications in top-tier journals, conference presentations, open-source software tools, and potential commercialization opportunities. Additionally, the research will train graduate students and contribute to curriculum development. Expected deliverables include technical reports, software prototypes, demonstration systems, and comprehensive documentation. The project aims to establish new standards and best practices in the field while fostering collaboration between academia and industry.
                  </p>
                </div>
                <div className="detail-item">
                  <strong>Timeline:</strong>
                  <p>The project is currently in its active phase with ongoing data collection and analysis, expected to conclude by the end of the academic year. The timeline includes multiple milestones with regular progress reviews and adjustments as needed.</p>
                </div>
                <div className="detail-item">
                  <strong>Resources:</strong>
                  <p>The project utilizes cutting-edge laboratory facilities, high-performance computing resources, specialized software tools, and access to comprehensive databases. Collaboration with industry partners provides additional resources and real-world validation opportunities.</p>
                </div>
                <div className="detail-item">
                  <strong>Impact:</strong>
                  <p>The research is expected to have significant impact on both academic research and practical applications. Potential societal benefits include improved efficiency, cost reduction, enhanced user experience, and contributions to sustainable development goals.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="project-sidebar">
            <div className="simple-info-card">
              <h3 className="simple-card-title">Project Information</h3>
              
              <div className="simple-info-list">
                <div className="simple-info-item">
                  <span className="simple-info-label">Year:</span>
                  <span className="simple-info-value">{project.year || "2023"}</span>
                </div>
                
                <div className="simple-info-item">
                  <span className="simple-info-label">Team:</span>
                  <span className="simple-info-value">{project.authors || project.team}</span>
                </div>
                
                <div className="simple-info-item">
                  <span className="simple-info-label">Supervisor:</span>
                  <span className="simple-info-value">{project.supervisor || project.team}</span>
                </div>
                
                <div className="simple-info-item">
                  <span className="simple-info-label">Status:</span>
                  <span className="simple-info-value status-active">Active Research</span>
                </div>
                
                {project.tags && (
                  <div className="simple-info-item">
                    <span className="simple-info-label">Research Areas:</span>
                    <div className="simple-tags">
                      {project.tags.map((tag, i) => (
                        <span className="simple-tag" key={i}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="simple-action-card">
              <h3 className="simple-card-title">Actions</h3>
              <div className="simple-action-list">
                <button className="simple-action-btn">
                  View Demo
                </button>
                <button className="simple-action-btn">
                  Project Files
                </button>
                <button className="simple-action-btn back-btn" onClick={onBack}>
                  ← Back to Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
