import React, { useState } from "react";
import "./Projects.css";

const projects = [
	{
		title: "Enhancing Machine Learning Models for Climate Predictions",
		description:
			"Research on improving ML algorithms to better predict climate change impacts.",
		tags: ["AI", "Climate"],
		image: "🌱",
		team: "Dr. Alice Smith, John Doe",
		year: "2023",
		authors: "John Doe, Sarah Wilson",
		supervisor: "Dr. Alice Smith",
		abstract:
			"This project explores innovative strategies to enhance machine learning models for more accurate climate predictions. Through a mixed methods approach, we investigate the impact of advanced algorithms, data preprocessing techniques, and ensemble methods on prediction accuracy. The findings suggest that incorporating these strategies can significantly improve model performance and contribute to better climate change understanding.",
	},
	{
		title: "The Impact of Social Media on Political Discourse",
		description:
			"Analyzing how social media platforms influence political opinions and elections.",
		tags: ["Social", "Data Science"],
		image: "💬",
		team: "Dr. Bob Lee, Jane Roe",
		year: "2023",
		authors: "Jane Roe, Michael Brown",
		supervisor: "Dr. Bob Lee",
		abstract:
			"This comprehensive study examines the role of social media platforms in shaping political discourse and electoral outcomes. Using advanced data analytics and sentiment analysis, we analyze millions of social media posts to understand patterns of political engagement and influence. The research provides insights into how digital platforms are transforming democratic participation.",
	},
	{
		title: "Developing Sustainable Energy Solutions for Urban Areas",
		description: "Innovative approaches to energy efficiency in cities.",
		tags: ["Energy", "Sustainability"],
		image: "⚡",
		team: "Dr. Carol White",
		year: "2023",
		authors: "Dr. Carol White, Alex Johnson",
		supervisor: "Dr. Carol White",
		abstract:
			"This project focuses on developing sustainable energy solutions specifically designed for urban environments. We explore innovative technologies including smart grid systems, renewable energy integration, and energy-efficient building designs. The research aims to create practical solutions that cities can implement to reduce their carbon footprint and achieve sustainability goals.",
	},
	{
		title: "Advancements in Robotics for Urban Food-Delivery",
		description: "Building and testing autonomous robots for last-mile delivery.",
		tags: ["Robotics", "AI"],
		image: "🤖",
		team: "Prof. Frank Brooks, Hao Chen",
		year: "2023",
		authors: "Hao Chen, Lisa Zhang",
		supervisor: "Prof. Frank Brooks",
		abstract:
			"This cutting-edge research project focuses on developing autonomous robots capable of efficient last-mile food delivery in urban environments. The project combines advanced robotics, artificial intelligence, and navigation systems to create robots that can safely navigate city streets, avoid obstacles, and deliver food to customers. The research addresses key challenges in urban logistics and autonomous navigation.",
	},
	{
		title: "Exploring the Ethics of Artificial Intelligence",
		description: "A multidisciplinary study on the ethical implications of AI.",
		tags: ["AI", "Ethics"],
		image: "🧠",
		team: "Dr. Lisa Patel, Dr. Omar Faruk",
		year: "2023",
		authors: "Dr. Lisa Patel, Dr. Omar Faruk",
		supervisor: "Dr. Lisa Patel",
		abstract:
			"This interdisciplinary research examines the ethical considerations surrounding artificial intelligence development and deployment.",
	},
	{
		title: "Innovations in Cybersecurity for Financial Institutions",
		description: "Securing digital assets and transactions in the banking sector.",
		tags: ["Cybersecurity", "Finance"],
		image: "🔒",
		team: "Dr. Emily Zhang",
		year: "2023",
		authors: "Dr. Emily Zhang, Security Team",
		supervisor: "Dr. Emily Zhang",
		abstract:
			"Research focused on developing advanced cybersecurity measures specifically designed for financial institutions.",
	},
	{
		title: "Smart Agriculture Using IoT Sensors",
		description:
			"Deploying IoT devices to optimize crop yield and resource usage.",
		tags: ["IoT", "Agriculture"],
		image: "🌾",
		team: "Dr. Nabila Rahman, Sifat Hossain",
		year: "2023",
		authors: "Dr. Nabila Rahman, Sifat Hossain",
		supervisor: "Dr. Nabila Rahman",
		abstract:
			"Implementation of IoT sensor networks to monitor and optimize agricultural processes for improved sustainability.",
	},
	{
		title: "Blockchain for Secure Voting Systems",
		description:
			"Implementing blockchain technology to ensure secure and transparent elections.",
		tags: ["Blockchain", "Security"],
		image: "🗳️",
		team: "Dr. Mahmudul Hasan",
		year: "2023",
		authors: "Dr. Mahmudul Hasan, Voting Research Group",
		supervisor: "Dr. Mahmudul Hasan",
		abstract:
			"Development of blockchain-based voting systems to enhance election security and transparency.",
	},
	{
		title: "AI-Powered Medical Diagnosis Assistant",
		description:
			"Using deep learning to assist doctors in diagnosing diseases from medical images.",
		tags: ["AI", "Healthcare"],
		image: "🩺",
		team: "Dr. Farhana Islam, Samiul Alam",
		year: "2023",
		authors: "Dr. Farhana Islam, Samiul Alam",
		supervisor: "Dr. Farhana Islam",
		abstract:
			"Development of AI systems to assist medical professionals in accurate disease diagnosis using medical imaging.",
	},
	{
		title: "Autonomous Drone Delivery Network",
		description:
			"Designing a network of drones for efficient package delivery in urban areas.",
		tags: ["Drones", "Logistics"],
		image: "🚁",
		team: "Dr. Imran Chowdhury",
		year: "2023",
		authors: "Dr. Imran Chowdhury, Drone Team",
		supervisor: "Dr. Imran Chowdhury",
		abstract:
			"Research on creating autonomous drone networks for last-mile delivery solutions in urban environments.",
	},
	{
		title: "Virtual Reality for STEM Education",
		description:
			"Creating immersive VR experiences to enhance STEM learning in schools.",
		tags: ["VR", "Education"],
		image: "🎮",
		team: "Dr. Nusrat Jahan, Tanjim Ahmed",
		year: "2023",
		authors: "Dr. Nusrat Jahan, Tanjim Ahmed",
		supervisor: "Dr. Nusrat Jahan",
		abstract:
			"Development of VR applications designed to improve STEM education through immersive learning experiences.",
	},
	{
		title: "Natural Language Processing for Bangla Texts",
		description:
			"Developing NLP tools for Bangla language understanding and translation.",
		tags: ["NLP", "Bangla"],
		image: "📝",
		team: "Dr. Shamsul Arefin",
		year: "2023",
		authors: "Dr. Shamsul Arefin, NLP Research Group",
		supervisor: "Dr. Shamsul Arefin",
		abstract:
			"Research on developing natural language processing tools specifically for Bangla language applications.",
	},
	{
		title: "Smart Traffic Management System",
		description:
			"Leveraging AI and sensors to reduce congestion and improve road safety.",
		tags: ["AI", "Transportation"],
		image: "🚦",
		team: "Dr. Rashedul Islam",
		year: "2023",
		authors: "Dr. Rashedul Islam, Traffic Research Team",
		supervisor: "Dr. Rashedul Islam",
		abstract:
			"Implementation of AI-driven traffic management systems to optimize urban transportation networks.",
	},
	{
		title: "Emotion Recognition from Speech",
		description:
			"Building models to detect emotions from audio signals for call centers.",
		tags: ["Speech", "AI"],
		image: "🎤",
		team: "Dr. Tasnim Jahan",
		year: "2023",
		authors: "Dr. Tasnim Jahan, Speech Team",
		supervisor: "Dr. Tasnim Jahan",
		abstract:
			"Development of speech emotion recognition systems for improving customer service applications.",
	},
	{
		title: "Personal Finance Management App",
		description:
			"A mobile app to help users track expenses and manage budgets.",
		tags: ["Finance", "Mobile"],
		image: "📱",
		team: "Dr. Khaled Mahmud",
		year: "2023",
		authors: "Dr. Khaled Mahmud, App Development Team",
		supervisor: "Dr. Khaled Mahmud",
		abstract:
			"Mobile application development for personal financial management and budgeting assistance.",
	},
	{
		title: "Renewable Energy Forecasting",
		description:
			"Predicting solar and wind energy output using machine learning.",
		tags: ["Energy", "ML"],
		image: "🔋",
		team: "Dr. Sadiqur Rahman",
		year: "2023",
		authors: "Dr. Sadiqur Rahman, Energy Research Group",
		supervisor: "Dr. Sadiqur Rahman",
		abstract:
			"Machine learning models for predicting renewable energy generation to optimize grid management.",
	},
	{
		title: "E-commerce Recommendation Engine",
		description:
			"Improving product recommendations using collaborative filtering.",
		tags: ["E-commerce", "AI"],
		image: "🛒",
		team: "Dr. Fahim Rahman",
		year: "2023",
		authors: "Dr. Fahim Rahman, Recommendation Team",
		supervisor: "Dr. Fahim Rahman",
		abstract:
			"Development of advanced recommendation systems for e-commerce platforms using collaborative filtering techniques.",
	},
	{
		title: "Disaster Response Coordination Platform",
		description:
			"A web platform to coordinate resources and volunteers during disasters.",
		tags: ["Web", "Crisis"],
		image: "🌪️",
		team: "Dr. Nilufa Yasmin",
		year: "2023",
		authors: "Dr. Nilufa Yasmin, Crisis Management Team",
		supervisor: "Dr. Nilufa Yasmin",
		abstract:
			"Web-based platform for coordinating disaster response efforts and managing emergency resources.",
	},
	{
		title: "Smart Home Automation System",
		description:
			"Integrating devices for energy efficiency and security in homes.",
		tags: ["IoT", "Home"],
		image: "🏠",
		team: "Dr. Ziaul Haque",
		year: "2023",
		authors: "Dr. Ziaul Haque, Smart Home Team",
		supervisor: "Dr. Ziaul Haque",
		abstract:
			"IoT-based home automation system for improving energy efficiency and security in residential buildings.",
	},
];

const Projects = ({ onProjectSelect }) => {
	const [visibleCount, setVisibleCount] = useState(8);
	const [selectedTag, setSelectedTag] = useState("All");
	const [selectedSupervisor, setSelectedSupervisor] = useState("All");
	const [showTagDropdown, setShowTagDropdown] = useState(false);
	const [showSupervisorDropdown, setShowSupervisorDropdown] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// Get unique tags and supervisors
	const getAllTags = () => {
		const tags = new Set();
		projects.forEach((project) => {
			project.tags.forEach((tag) => tags.add(tag));
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

	// Filter projects based on selected filters and search term
	const getFilteredProjects = () => {
		return projects.filter((project) => {
			const tagMatch =
				selectedTag === "All" || project.tags.includes(selectedTag);
			const supervisorMatch =
				selectedSupervisor === "All" ||
				project.supervisor === selectedSupervisor;
			const searchMatch =
				searchTerm === "" ||
				project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.tags.some((tag) =>
					tag.toLowerCase().includes(searchTerm.toLowerCase())
				);

			return tagMatch && supervisorMatch && searchMatch;
		});
	};

	const filteredProjects = getFilteredProjects();
	const visibleProjects = filteredProjects.slice(0, visibleCount);
	const hasMore = visibleCount < filteredProjects.length;

	const handleShowMore = () => setVisibleCount((prev) => prev + 8);

	const handleProjectClick = (project) => {
		if (onProjectSelect) {
			onProjectSelect(project);
		}
	};

	const clearFilters = () => {
		setSelectedTag("All");
		setSelectedSupervisor("All");
		setSearchTerm("");
		setVisibleCount(8);
	};

	// --- Modernized UI ---
	return (
		<div className="projects-modern-root">
			<section className="projects-hero">
				<div className="hero-content">
					<h1 className="hero-title">Research & Projects</h1>
					<p className="hero-desc">
						Discover the most innovative research and real-world projects from
						our students and faculty. Filter by topic, supervisor, or search for
						your interests.
					</p>
				</div>
			</section>

			<div className="projects-filters-bar">
				<div className="projects-search-modern">
					<input
						className="projects-search-input"
						type="text"
						placeholder="Search projects, tags, or keywords..."
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setVisibleCount(8);
						}}
					/>
					{searchTerm && (
						<button
							className="projects-search-clear"
							onClick={() => setSearchTerm("")}
						>
							✕
						</button>
					)}
				</div>
				<div className="projects-filters-group">
					<div className="projects-filter-dropdown">
						<button
							className={`projects-filter-btn${
								selectedTag !== "All" ? " active" : ""
							}`}
							onClick={() => setShowTagDropdown((v) => !v)}
						>
							<span>{selectedTag}</span>
							<span className="dropdown-arrow">▼</span>
						</button>
						{showTagDropdown && (
							<div className="projects-dropdown-list">
								{getAllTags().map((tag) => (
									<button
										key={tag}
										className={`dropdown-item${
											selectedTag === tag ? " selected" : ""
										}`}
										onClick={() => {
											setSelectedTag(tag);
											setShowTagDropdown(false);
											setVisibleCount(8);
										}}
									>
										{tag}
									</button>
								))}
							</div>
						)}
					</div>
					<div className="projects-filter-dropdown">
						<button
							className={`projects-filter-btn${
								selectedSupervisor !== "All" ? " active" : ""
							}`}
							onClick={() => setShowSupervisorDropdown((v) => !v)}
						>
							<span>
								{selectedSupervisor === "All"
									? "Supervisor"
									: selectedSupervisor.split(" ").slice(-1)[0]}
							</span>
							<span className="dropdown-arrow">▼</span>
						</button>
						{showSupervisorDropdown && (
							<div className="projects-dropdown-list">
								{getAllSupervisors().map((supervisor) => (
									<button
										key={supervisor}
										className={`dropdown-item${
											selectedSupervisor === supervisor ? " selected" : ""
										}`}
										onClick={() => {
											setSelectedSupervisor(supervisor);
											setShowSupervisorDropdown(false);
											setVisibleCount(8);
										}}
									>
										{supervisor}
									</button>
								))}
							</div>
						)}
					</div>
					{(selectedTag !== "All" ||
						selectedSupervisor !== "All" ||
						searchTerm) && (
						<button
							className="projects-clear-filters"
							onClick={clearFilters}
						>
							Clear
						</button>
					)}
				</div>
			</div>

			<div className="projects-results-info">
				<span className="projects-results-count">
					{filteredProjects.length} project
					{filteredProjects.length !== 1 ? "s" : ""} found
				</span>
			</div>

			{filteredProjects.length === 0 ? (
				<div className="projects-no-results">
					<span className="no-results-emoji">🔍</span>
					<h3>No projects found</h3>
					<button className="projects-reset-btn" onClick={clearFilters}>
						Reset Filters
					</button>
				</div>
			) : (
				<div className="projects-modern-grid">
					{visibleProjects.map((proj, idx) => (
						<div
							className="projects-modern-card"
							key={idx}
							onClick={() => handleProjectClick(proj)}
						>
							<div className="card-emoji">{proj.image}</div>
							<div className="card-content">
								<h3 className="card-title">{proj.title}</h3>
								<p className="card-desc">{proj.description}</p>
								<div className="card-meta">
									<div className="card-tags">
										{proj.tags.slice(0, 3).map((tag, i) => (
											<span className="card-tag" key={i}>
												{tag}
											</span>
										))}
										{proj.tags.length > 3 && (
											<span className="card-tag more">
												+{proj.tags.length - 3}
											</span>
										)}
									</div>
									{proj.supervisor && (
										<div className="card-supervisor">
											{proj.supervisor}
										</div>
									)}
									{proj.year && (
										<span className="card-year">{proj.year}</span>
									)}
								</div>
							</div>
							<div className="card-overlay">
								<span>View Details</span>
							</div>
						</div>
					))}
				</div>
			)}
			{hasMore && filteredProjects.length > 0 && (
				<div className="projects-show-more-bar">
					<button className="projects-show-more-btn" onClick={handleShowMore}>
						Show More Projects
						<span className="show-more-count">
							({filteredProjects.length - visibleCount} remaining)
						</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default Projects;
