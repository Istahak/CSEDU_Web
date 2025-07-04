import React, { useState } from "react";
import "./Achievements.css";

const Achievements = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: "🏆" },
    { id: "programming", name: "Programming Contests", icon: "💻" },
    { id: "sports", name: "Sports & Athletics", icon: "🏅" },
    { id: "research", name: "Research & Innovation", icon: "🔬" },
    { id: "academic", name: "Academic Excellence", icon: "📚" },
  ];

  const years = [
    { id: "all", name: "All Years" },
    { id: "2024", name: "2024" },
    { id: "2023", name: "2023" },
  ];

  const achievements = [
    {
      id: 1,
      category: "programming",
      title: "ICPC World Finals 2024",
      participant: "Team ByteForce",
      date: "April 15, 2024",
      description:
        "Secured 23rd position in the International Collegiate Programming Contest World Finals, representing Asia-Pacific region.",
      image: "/api/placeholder/300/200",
      details:
        "The team consisting of Md. Rahman, Fatima Ahmed, and Rajesh Kumar solved 7 out of 12 problems in 5 hours, demonstrating exceptional problem-solving skills and algorithmic thinking.",
      award: "Bronze Medal",
      location: "Astana, Kazakhstan",
    },
    {
      id: 2,
      category: "sports",
      title: "Inter-University Cricket Championship",
      participant: "CSEDU Cricket Team",
      date: "March 10, 2024",
      description:
        "Won the championship defeating 16 universities from across the country in a thrilling final match.",
      image: "/api/placeholder/300/200",
      details:
        "Led by captain Arif Hassan, the team remained undefeated throughout the tournament, showcasing exceptional teamwork and sportsmanship.",
      award: "Gold Medal",
      location: "Dhaka, Bangladesh",
    },
    {
      id: 3,
      category: "research",
      title: "Best Paper Award - IEEE Conference",
      participant: "Dr. Aisha Rahman & Students",
      date: "February 28, 2024",
      description:
        "Research on 'AI-driven Healthcare Diagnostics' won the best paper award at the IEEE International Conference on Medical Informatics.",
      image: "/api/placeholder/300/200",
      details:
        "The research presents a novel machine learning approach for early disease detection with 95% accuracy, potentially revolutionizing healthcare diagnostics.",
      award: "Best Paper Award",
      location: "Singapore",
    },
    {
      id: 4,
      category: "academic",
      title: "Dean's List Recognition",
      participant: "Nusrat Jahan",
      date: "January 15, 2024",
      description:
        "Achieved perfect CGPA of 4.0 for consecutive 6 semesters, earning a place in the Dean's List of academic excellence.",
      image: "/api/placeholder/300/200",
      details:
        "Demonstrated exceptional academic performance across all computer science courses while actively participating in research projects and community service.",
      award: "Dean's List",
      location: "University of Dhaka",
    },
    {
      id: 5,
      category: "programming",
      title: "Google Hash Code 2024",
      participant: "Team AlgoMasters",
      date: "February 20, 2024",
      description:
        "Ranked 15th globally and 1st in Bangladesh in Google's annual team programming competition.",
      image: "/api/placeholder/300/200",
      details:
        "The team optimized traffic flow algorithms for smart cities, demonstrating innovative approaches to real-world problems.",
      award: "Global Recognition",
      location: "Online Competition",
    },
    {
      id: 6,
      category: "sports",
      title: "National Programming Marathon",
      participant: "CSEDU Athletics Team",
      date: "November 12, 2023",
      description:
        "Won gold in men's 4x400m relay and silver in women's long jump at the National University Games.",
      image: "/api/placeholder/300/200",
      details:
        "Athletes trained rigorously for months, balancing academic excellence with athletic performance to achieve these remarkable results.",
      award: "Gold & Silver Medal",
      location: "Chittagong, Bangladesh",
    },
    {
      id: 7,
      category: "research",
      title: "Patent Granted - Smart Campus System",
      participant: "Prof. Dr. Karim & Research Team",
      date: "December 5, 2023",
      description:
        "Received patent for innovative IoT-based smart campus management system that optimizes resource utilization.",
      image: "/api/placeholder/300/200",
      details:
        "The system integrates sensors, AI, and cloud computing to create an intelligent campus environment that reduces energy consumption by 30%.",
      award: "Patent Certificate",
      location: "Bangladesh Patent Office",
    },
    {
      id: 8,
      category: "academic",
      title: "International Scholarship Award",
      participant: "Md. Tanvir Hossain",
      date: "October 8, 2023",
      description:
        "Received full scholarship for PhD studies at Stanford University based on exceptional academic performance and research potential.",
      image: "/api/placeholder/300/200",
      details:
        "Selected from thousands of applicants worldwide, demonstrating outstanding academic credentials and research contributions in machine learning.",
      award: "Full Scholarship",
      location: "Stanford University, USA",
    },
  ];

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesCategory =
      selectedCategory === "all" || achievement.category === selectedCategory;
    const matchesYear =
      selectedYear === "all" || achievement.date.includes(selectedYear);
    const matchesSearch =
      searchTerm === "" ||
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.participant
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesYear && matchesSearch;
  });

  const handleViewMore = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleShare = (achievement) => {
    if (navigator.share) {
      navigator.share({
        title: achievement.title,
        text: `${achievement.participant} achieved ${achievement.title} - ${achievement.description}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `${achievement.title} - ${achievement.participant}: ${achievement.description}\n${window.location.href}`
      );
      alert("Achievement details copied to clipboard!");
    }
  };

  return (
    <div className="achievements-page">
      <div className="achievements-container">
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
        )}

        <div className="achievements-header">
          <h1>Achievements & Excellence</h1>
          <p className="achievements-subtitle">
            Celebrating the outstanding accomplishments of our students,
            faculty, and department in academics, research, sports, and
            innovation.
          </p>
        </div>

        <div className="search-and-filters">
          <div className="search-section">
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search achievements, participants, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="year-filter">
            <select
              className="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="achievements-stats">
          <div className="stat-item">
            <span className="stat-number">{achievements.length}</span>
            <span className="stat-label">Total Achievements</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {achievements.filter((a) => a.category === "programming").length}
            </span>
            <span className="stat-label">Programming Contests</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {achievements.filter((a) => a.category === "sports").length}
            </span>
            <span className="stat-label">Sports Awards</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {achievements.filter((a) => a.category === "research").length}
            </span>
            <span className="stat-label">Research Recognition</span>
          </div>
        </div>

        <div className="achievements-grid">
          {filteredAchievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-image">
                <img src={achievement.image} alt={achievement.title} />
                <div className="achievement-category">
                  <span className={`category-badge ${achievement.category}`}>
                    {
                      categories.find((c) => c.id === achievement.category)
                        ?.icon
                    }
                    {
                      categories.find((c) => c.id === achievement.category)
                        ?.name
                    }
                  </span>
                </div>
              </div>

              <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                <div className="achievement-meta">
                  <span className="participant">
                    👤 {achievement.participant}
                  </span>
                  <span className="date">📅 {achievement.date}</span>
                  <span className="location">📍 {achievement.location}</span>
                </div>

                <p className="achievement-description">
                  {achievement.description}
                </p>

                {expandedCard === achievement.id && (
                  <div className="achievement-details">
                    <p>{achievement.details}</p>
                    <div className="achievement-award">
                      <span className="award-badge">
                        🏆 {achievement.award}
                      </span>
                    </div>
                  </div>
                )}

                <div className="achievement-actions">
                  <button
                    className="view-more-btn"
                    onClick={() => handleViewMore(achievement.id)}
                  >
                    {expandedCard === achievement.id
                      ? "View Less"
                      : "View More"}
                  </button>
                  <button
                    className="share-btn"
                    onClick={() => handleShare(achievement)}
                    title="Share this achievement"
                  >
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="no-achievements">
            <span className="no-achievements-icon">🏆</span>
            <h3>No achievements found</h3>
            <p>
              No achievements match the selected category. Try selecting a
              different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
