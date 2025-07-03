import React from "react";
import "./Projects.css";

const projects = [
  {
    title: "Enhancing Machine Learning Models for Climate Predictions",
    description: "Research on improving ML algorithms to better predict climate change impacts.",
    tags: ["AI", "Climate"],
    image: "🌱",
    team: "Dr. Alice Smith, John Doe"
  },
  {
    title: "The Impact of Social Media on Political Discourse",
    description: "Analyzing how social media platforms influence political opinions and elections.",
    tags: ["Social", "Data Science"],
    image: "💬",
    team: "Dr. Bob Lee, Jane Roe"
  },
  {
    title: "Developing Sustainable Energy Solutions for Urban Areas",
    description: "Innovative approaches to energy efficiency in cities.",
    tags: ["Energy", "Sustainability"],
    image: "⚡",
    team: "Dr. Carol White"
  },
  {
    title: "Advancements in Robotics for Urban Food-Delivery",
    description: "Building and testing autonomous robots for last-mile delivery.",
    tags: ["Robotics", "AI"],
    image: "🤖",
    team: "Prof. Frank Brooks, Hao Chen"
  },
  {
    title: "Exploring the Ethics of Artificial Intelligence",
    description: "A multidisciplinary study on the ethical implications of AI.",
    tags: ["AI", "Ethics"],
    image: "🧠",
    team: "Dr. Lisa Patel, Dr. Omar Faruk"
  },
  {
    title: "Innovations in Cybersecurity for Financial Institutions",
    description: "Securing digital assets and transactions in the banking sector.",
    tags: ["Cybersecurity", "Finance"],
    image: "🔒",
    team: "Dr. Emily Zhang"
  }
];

const Projects = () => (
  <div className="projects-page">
    <p className="page-subtitle">
      Explore the innovative research and projects undertaken by our students and faculty.
    </p>
    <div className="projects-filter">
      <span className="filter-label">Filter</span>
      <button className="filter-btn">Tag</button>
      <button className="filter-btn">Supervisor</button>
    </div>
    <h2 className="section-title projects-section-title">Projects</h2>
    <div className="projects-grid">
      {projects.map((proj, idx) => (
        <div className="project-card" key={idx}>
          <div className="project-image">{proj.image}</div>
          <div className="project-content">
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-description">{proj.description}</p>
            <div className="project-meta">
              <span className="project-tags">
                {proj.tags.map((tag, i) => (
                  <span className="project-tag" key={i}>{tag}</span>
                ))}
              </span>
              <span className="project-team">{proj.team}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ textAlign: "right", marginTop: "2rem" }}>
      <button className="view-details-btn">View Details</button>
    </div>
  </div>
);

export default Projects;
