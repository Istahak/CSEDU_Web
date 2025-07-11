import React, { useState, useEffect } from "react";
import ProjectsService from "../api/ProjectsService";
import "./Projects.css";

// Main Projects component
const Projects = ({ onProjectSelect }) => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTag, setSelectedTag] = useState("All");
	const [selectedSupervisor, setSelectedSupervisor] = useState("All");

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		setError(null);
		ProjectsService.getAll()
			.then((response) => {
				if (isMounted) {
					setProjects(Array.isArray(response) ? response : []);
					setLoading(false);
				}
			})
			.catch((err) => {
				if (isMounted) {
					setError("Failed to load projects. Please try again later.");
					setLoading(false);
				}
			});
		return () => { isMounted = false; };
	}, []);

	const getAllTags = () => {
		const tags = new Set();
		projects.forEach((project) => {
			(project.tags || []).forEach((tag) => tags.add(tag));
		});
		return ["All", ...Array.from(tags).sort()];
	};

	const getAllSupervisors = () => {
		const supervisors = new Set();
		projects.forEach((project) => {
			if (project.supervisor) {
				supervisors.add(project.supervisor);
			}
		});
		return ["All", ...Array.from(supervisors).sort()];
	};

	const filteredProjects = projects.filter((project) => {
		const tagMatch = selectedTag === "All" || (project.tags || []).includes(selectedTag);
		const supervisorMatch = selectedSupervisor === "All" || project.supervisor === selectedSupervisor;
		const searchMatch = searchTerm === "" ||
			(project.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(project.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(project.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		return tagMatch && supervisorMatch && searchMatch;
	});

	const handleProjectClick = (project) => {
		if (onProjectSelect) {
			onProjectSelect(project);
		}
	};

	if (loading) {
		return (
			<div className="events-page">
				<div className="events-container">
					<div className="events-header">
						<h1 className="events-title">Research & Projects</h1>
						<p className="events-subtitle">Loading projects...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="events-page">
				<div className="events-container">
					<div className="events-header">
						<h1 className="events-title">Research & Projects</h1>
						<p className="events-subtitle error-message">{error}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="events-page">
			<div className="events-container">
				<div className="events-header">
					<h1 className="events-title">Research & Projects</h1>
					<p className="events-subtitle">
						Discover innovative research and real-world projects from our students and faculty
					</p>
				</div>

				<div className="directory-controls">
					<div className="search-section">
						<div className="search-bar">
							<input
								type="text"
								placeholder="Search projects by title, description, or tags..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="search-input"
							/>
							{searchTerm && (
								<button
									className="clear-search-btn"
									onClick={() => setSearchTerm("")}
									title="Clear search"
								>
									×
								</button>
							)}
						</div>
					</div>

					<div className="filters-row">
						<div className="filter-group">
							<label htmlFor="tag-select" className="filter-label">
								Tag
							</label>
							<select
								id="tag-select"
								value={selectedTag}
								onChange={(e) => setSelectedTag(e.target.value)}
								className="filter-select"
							>
								{getAllTags().map((tag) => (
									<option key={tag} value={tag}>
										{tag}
									</option>
								))}
							</select>
						</div>

						<div className="filter-group">
							<label htmlFor="supervisor-select" className="filter-label">
								Supervisor
							</label>
							<select
								id="supervisor-select"
								value={selectedSupervisor}
								onChange={(e) => setSelectedSupervisor(e.target.value)}
								className="filter-select"
							>
								{getAllSupervisors().map((supervisor) => (
									<option key={supervisor} value={supervisor}>
										{supervisor}
									</option>
								))}
							</select>
						</div>

						{(selectedTag !== "All" || selectedSupervisor !== "All" || searchTerm) && (
							<button
								className="clear-filters-button"
								onClick={() => {
									setSelectedTag("All");
									setSelectedSupervisor("All");
									setSearchTerm("");
								}}
							>
								Clear Filters
							</button>
						)}
					</div>
				</div>

				<div className="events-grid">
					{filteredProjects.map((project, index) => (
						<div key={index} className="event-card" onClick={() => handleProjectClick(project)}>
							<div className="event-header">
								<div className="event-meta">
									<span className={`event-type ${project.tags[0]?.toLowerCase()}`}>
										{project.tags[0]}
									</span>
									<span className="event-status project-year">
										{project.year}
									</span>
								</div>
							</div>

							<div className="event-content">
								<div className="project-emoji">
									{project.image}
								</div>
								<h3 className="event-title">{project.title}</h3>
								<p className="event-description">{project.description}</p>

								<div className="event-details">
									<div className="event-detail-item">
										<span className="detail-label">Team:</span>
										<span className="detail-value">{project.team}</span>
									</div>
									<div className="event-detail-item">
										<span className="detail-label">Authors:</span>
										<span className="detail-value">{project.authors}</span>
									</div>
									<div className="event-detail-item">
										<span className="detail-label">Supervisor:</span>
										<span className="detail-value">{project.supervisor}</span>
									</div>
									<div className="event-detail-item">
										<span className="detail-label">Year:</span>
										<span className="detail-value">{project.year}</span>
									</div>
								</div>

								<div className="event-tags">
									{project.tags.map((tag) => (
										<span key={tag} className="event-tag">
											{tag}
										</span>
									))}
								</div>
							</div>

							<div className="event-footer">
								<button
									className="register-button"
									onClick={(e) => {
										e.stopPropagation();
										handleProjectClick(project);
									}}
								>
									View Details
								</button>
							</div>
						</div>
					))}
				</div>

				{filteredProjects.length === 0 && (
					<div className="no-events-message">
						<h3>No projects found</h3>
						<p>
							Try adjusting your search criteria or check back later for new projects.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Projects;
