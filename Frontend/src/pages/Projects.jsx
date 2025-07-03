import React, { useState } from "react";
import "./Projects.css";

const projects = [
  {
    title: "Enhancing Machine Learning Models for Climate Predictions",
    description: "Research on improving ML algorithms to better predict climate change impacts.",
    tags: ["AI", "Climate"],
    image: "🌱",
    team: "Dr. Alice Smith, John Doe",
    year: "2023",
    authors: "John Doe, Sarah Wilson",
    supervisor: "Dr. Alice Smith",
    abstract: "This project explores innovative strategies to enhance machine learning models for more accurate climate predictions. Through a mixed methods approach, we investigate the impact of advanced algorithms, data preprocessing techniques, and ensemble methods on prediction accuracy. The findings suggest that incorporating these strategies can significantly improve model performance and contribute to better climate change understanding."
  },
  {
    title: "The Impact of Social Media on Political Discourse",
    description: "Analyzing how social media platforms influence political opinions and elections.",
    tags: ["Social", "Data Science"],
    image: "💬",
    team: "Dr. Bob Lee, Jane Roe",
    year: "2023",
    authors: "Jane Roe, Michael Brown",
    supervisor: "Dr. Bob Lee",
    abstract: "This comprehensive study examines the role of social media platforms in shaping political discourse and electoral outcomes. Using advanced data analytics and sentiment analysis, we analyze millions of social media posts to understand patterns of political engagement and influence. The research provides insights into how digital platforms are transforming democratic participation."
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
    abstract: "This project focuses on developing sustainable energy solutions specifically designed for urban environments. We explore innovative technologies including smart grid systems, renewable energy integration, and energy-efficient building designs. The research aims to create practical solutions that cities can implement to reduce their carbon footprint and achieve sustainability goals."
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
    abstract: "This cutting-edge research project focuses on developing autonomous robots capable of efficient last-mile food delivery in urban environments. The project combines advanced robotics, artificial intelligence, and navigation systems to create robots that can safely navigate city streets, avoid obstacles, and deliver food to customers. The research addresses key challenges in urban logistics and autonomous navigation."
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
  },
  {
    title: "Smart Agriculture Using IoT Sensors",
    description: "Deploying IoT devices to optimize crop yield and resource usage.",
    tags: ["IoT", "Agriculture"],
    image: "🌾",
    team: "Dr. Nabila Rahman, Sifat Hossain"
  },
  {
    title: "Blockchain for Secure Voting Systems",
    description: "Implementing blockchain technology to ensure secure and transparent elections.",
    tags: ["Blockchain", "Security"],
    image: "🗳️",
    team: "Dr. Mahmudul Hasan"
  },
  {
    title: "AI-Powered Medical Diagnosis Assistant",
    description: "Using deep learning to assist doctors in diagnosing diseases from medical images.",
    tags: ["AI", "Healthcare"],
    image: "🩺",
    team: "Dr. Farhana Islam, Samiul Alam"
  },
  {
    title: "Autonomous Drone Delivery Network",
    description: "Designing a network of drones for efficient package delivery in urban areas.",
    tags: ["Drones", "Logistics"],
    image: "🚁",
    team: "Dr. Imran Chowdhury"
  },
  {
    title: "Virtual Reality for STEM Education",
    description: "Creating immersive VR experiences to enhance STEM learning in schools.",
    tags: ["VR", "Education"],
    image: "🎮",
    team: "Dr. Nusrat Jahan, Tanjim Ahmed"
  },
  {
    title: "Natural Language Processing for Bangla Texts",
    description: "Developing NLP tools for Bangla language understanding and translation.",
    tags: ["NLP", "Bangla"],
    image: "📝",
    team: "Dr. Shamsul Arefin"
  },
  {
    title: "Smart Traffic Management System",
    description: "Leveraging AI and sensors to reduce congestion and improve road safety.",
    tags: ["AI", "Transportation"],
    image: "🚦",
    team: "Dr. Rashedul Islam"
  },
  {
    title: "Emotion Recognition from Speech",
    description: "Building models to detect emotions from audio signals for call centers.",
    tags: ["Speech", "AI"],
    image: "🎤",
    team: "Dr. Tasnim Jahan"
  },
  {
    title: "Personal Finance Management App",
    description: "A mobile app to help users track expenses and manage budgets.",
    tags: ["Finance", "Mobile"],
    image: "📱",
    team: "Dr. Khaled Mahmud"
  },
  {
    title: "Renewable Energy Forecasting",
    description: "Predicting solar and wind energy output using machine learning.",
    tags: ["Energy", "ML"],
    image: "🔋",
    team: "Dr. Sadiqur Rahman"
  },
  {
    title: "E-commerce Recommendation Engine",
    description: "Improving product recommendations using collaborative filtering.",
    tags: ["E-commerce", "AI"],
    image: "🛒",
    team: "Dr. Fahim Rahman"
  },
  {
    title: "Disaster Response Coordination Platform",
    description: "A web platform to coordinate resources and volunteers during disasters.",
    tags: ["Web", "Crisis"],
    image: "🌪️",
    team: "Dr. Nilufa Yasmin"
  },
  {
    title: "Smart Home Automation System",
    description: "Integrating devices for energy efficiency and security in homes.",
    tags: ["IoT", "Home"],
    image: "🏠",
    team: "Dr. Ziaul Haque"
  },
  {
    title: "Innovations in Cybersecurity for Financial Institutions",
    description: "Securing digital assets and transactions in the banking sector.",
    tags: ["Cybersecurity", "Finance"],
    image: "🔒",
    team: "Dr. Emily Zhang"
  },
  {
    title: "Smart Agriculture Using IoT Sensors",
    description: "Deploying IoT devices to optimize crop yield and resource usage.",
    tags: ["IoT", "Agriculture"],
    image: "🌾",
    team: "Dr. Nabila Rahman, Sifat Hossain"
  },
  {
    title: "Blockchain for Secure Voting Systems",
    description: "Implementing blockchain technology to ensure secure and transparent elections.",
    tags: ["Blockchain", "Security"],
    image: "🗳️",
    team: "Dr. Mahmudul Hasan"
  },
  {
    title: "AI-Powered Medical Diagnosis Assistant",
    description: "Using deep learning to assist doctors in diagnosing diseases from medical images.",
    tags: ["AI", "Healthcare"],
    image: "🩺",
    team: "Dr. Farhana Islam, Samiul Alam"
  },
  {
    title: "Autonomous Drone Delivery Network",
    description: "Designing a network of drones for efficient package delivery in urban areas.",
    tags: ["Drones", "Logistics"],
    image: "🚁",
    team: "Dr. Imran Chowdhury"
  },
  {
    title: "Virtual Reality for STEM Education",
    description: "Creating immersive VR experiences to enhance STEM learning in schools.",
    tags: ["VR", "Education"],
    image: "🎮",
    team: "Dr. Nusrat Jahan, Tanjim Ahmed"
  },
  {
    title: "Natural Language Processing for Bangla Texts",
    description: "Developing NLP tools for Bangla language understanding and translation.",
    tags: ["NLP", "Bangla"],
    image: "📝",
    team: "Dr. Shamsul Arefin"
  },
  {
    title: "Smart Traffic Management System",
    description: "Leveraging AI and sensors to reduce congestion and improve road safety.",
    tags: ["AI", "Transportation"],
    image: "🚦",
    team: "Dr. Rashedul Islam"
  },
  {
    title: "Emotion Recognition from Speech",
    description: "Building models to detect emotions from audio signals for call centers.",
    tags: ["Speech", "AI"],
    image: "🎤",
    team: "Dr. Tasnim Jahan"
  },
  {
    title: "Personal Finance Management App",
    description: "A mobile app to help users track expenses and manage budgets.",
    tags: ["Finance", "Mobile"],
    image: "📱",
    team: "Dr. Khaled Mahmud"
  },
  {
    title: "Renewable Energy Forecasting",
    description: "Predicting solar and wind energy output using machine learning.",
    tags: ["Energy", "ML"],
    image: "🔋",
    team: "Dr. Sadiqur Rahman"
  },
  {
    title: "E-commerce Recommendation Engine",
    description: "Improving product recommendations using collaborative filtering.",
    tags: ["E-commerce", "AI"],
    image: "🛒",
    team: "Dr. Fahim Rahman"
  },
  {
    title: "Disaster Response Coordination Platform",
    description: "A web platform to coordinate resources and volunteers during disasters.",
    tags: ["Web", "Crisis"],
    image: "🌪️",
    team: "Dr. Nilufa Yasmin"
  },
];

const Projects = ({ onProjectSelect }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const handleShowMore = () => setVisibleCount((prev) => prev + 8);
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const handleProjectClick = (project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  return (
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
        {visibleProjects.map((proj, idx) => (
          <div 
            className="project-card" 
            key={idx}
            onClick={() => handleProjectClick(proj)}
          >
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
      {hasMore && (
        <div style={{ textAlign: "right", marginTop: "2rem", marginBottom: "2rem" }}>
          <button className="show-more-btn" onClick={handleShowMore}>Show More</button>
        </div>
      )}
    </div>
  );
};

export default Projects;
