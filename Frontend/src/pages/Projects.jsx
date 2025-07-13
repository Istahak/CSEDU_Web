import React, { useState, useEffect } from "react";
import ProjectsService from "../api/ProjectsService";
import ProfileService from "../api/ProfileService";
import "./Projects.css";

// Main Projects component
const Projects = ({ onProjectSelect }) => {
	const [projects, setProjects] = useState([]);
	const [userMap, setUserMap] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTag, setSelectedTag] = useState("All");
	const [selectedSupervisor, setSelectedSupervisor] = useState("All");

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		setError(null);

		// Fetch all profiles and projects in parallel, then update state
		Promise.all([
			ProfileService.getAllProfiles(1, 100),
			ProjectsService.getAll()
		]).then(([profileResp, projectsResp]) => {
			if (!isMounted) return;
			const map = {};
			(profileResp.data || []).forEach(profile => {
				if (profile.user && profile.user.id && profile.full_name) {
					map[profile.user.id] = profile.full_name;
				}
			});
			setUserMap(map);
			const mapped = (Array.isArray(projectsResp) ? projectsResp : []).map(project => ({
				id: project.id,
				title: project.title || "",
				abstract: project.abstract || "",
				keywords: project.keywords || "",
				link: project.link || "",
				is_thesis: project.is_thesis || false,
				supervisor_id: project.supervisor_id || "",
				authors: Array.isArray(project.authors)
					? project.authors.map(a => ({
						id: a.id,
						user_id: a.user_id,
						ownership_rank: a.ownership_rank
					}))
					: [],
				created_at: project.created_at,
				updated_at: project.updated_at,
			}));
			setProjects(mapped);
			setLoading(false);
		}).catch((err) => {
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
		// Supervisor IDs are mapped to names if available
		const supervisors = new Set();
		projects.forEach((project) => {
			if (project.supervisor_id) {
				supervisors.add(userMap[project.supervisor_id] || project.supervisor_id);
			}
		});
		return ["All", ...Array.from(supervisors).sort()];
	};

	const filteredProjects = projects.filter((project) => {
		const tagMatch = selectedTag === "All" || (project.tags || []).includes(selectedTag);
		const supervisorName = userMap[project.supervisor_id] || project.supervisor_id;
		const supervisorMatch = selectedSupervisor === "All" || supervisorName === selectedSupervisor;
		const searchMatch = searchTerm === "" ||
			(project.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(project.abstract || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(project.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		return tagMatch && supervisorMatch && searchMatch;
	});

	const handleProjectClick = (project) => {
		if (onProjectSelect) {
			onProjectSelect(project, userMap);
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

					<div className="events-grid">
						{filteredProjects.map((project, index) => (
							<div key={project.id || index} className="event-card" onClick={() => handleProjectClick(project)}>
								<div className="event-content">
									<h3 className="event-title">{project.title}</h3>
									<p className="event-description">{project.abstract}</p>
									<div className="event-details">
										<div className="event-detail-item">
											<span className="detail-label">Authors:</span>
											<span className="detail-value">
												{project.authors && project.authors.length > 0
													? project.authors.map(a => userMap[a.user_id] || a.user_id).join(", ")
													: "N/A"}
											</span>
										</div>
										<div className="event-detail-item">
											<span className="detail-label">Supervisor:</span>
											<span className="detail-value">{userMap[project.supervisor_id] || project.supervisor_id}</span>
										</div>
										<div className="event-detail-item">
											<span className="detail-label">Type:</span>
											<span className="detail-value">{project.is_thesis ? "Thesis" : "Project"}</span>
										</div>
										<div className="event-detail-item">
											<span className="detail-label">Keywords:</span>
											<span className="detail-value">{project.keywords}</span>
										</div>
										<div className="event-detail-item">
											<span className="detail-label">Link:</span>
											<span className="detail-value">
												<a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
											</span>
										</div>
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
		</div>
	);
};

export default Projects;
