import React, { useState } from "react";
import "./Achievements.css";

const Achievements = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 achievements initially
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFrom, setYearFrom] = useState("2023");
  const [yearTo, setYearTo] = useState("2024");

  const categories = [
    { id: "all", name: "All Categories", icon: "🏆" },
    { id: "programming", name: "Programming Contests", icon: "💻" },
    { id: "sports", name: "Sports & Athletics", icon: "🏅" },
    { id: "research", name: "Research & Innovation", icon: "🔬" },
    { id: "academic", name: "Academic Excellence", icon: "📚" },
  ];

  const years = [
    { id: "2023", name: "2023" },
    { id: "2024", name: "2024" },
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
    // Extract year from date string (assumes year is present in date string)
    const achievementYear = achievement.date.match(/\d{4}/)?.[0];
    const matchesYear =
      (!yearFrom || !yearTo) ||
      (achievementYear && achievementYear >= yearFrom && achievementYear <= yearTo);
    return matchesCategory && matchesYear;
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


  // Show more handler
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="achievements-page">
      <div className="achievements-container">
        <div className="achievements-header">
          <h1 className="achievements-title">Achievements & Excellence</h1>
          <p className="achievements-subtitle">
            Celebrating the outstanding accomplishments of our students,
            faculty, and department in academics, research, sports, and
            innovation.
          </p>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group" style={{display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'flex-end'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <label className="filter-label">Year From</label>
              <select
                className="filter-select"
                value={yearFrom}
                onChange={e => setYearFrom(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year.id} value={year.id}>{year.name}</option>
                ))}
              </select>
            </div>
            <span style={{marginBottom: '0.5rem', color: '#6c757d'}}>to</span>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <label className="filter-label">Year To</label>
              <select
                className="filter-select"
                value={yearTo}
                onChange={e => setYearTo(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year.id} value={year.id}>{year.name}</option>
                ))}
              </select>
            </div>
          </div>
          {(selectedCategory !== "all" || yearFrom !== "2023" || yearTo !== "2024") && (
            <button
              className="clear-filters-button"
              onClick={() => {
                setSelectedCategory("all");
                setYearFrom("2023");
                setYearTo("2024");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Stats/Summary Cards */}
        <div className="achievements-stats">
          <div className="stat-item">
            <span className="stat-number">{achievements.length}</span>
            <span className="stat-label">Total Achievements</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {achievements.filter(a => a.category === 'programming').length}
            </span>
            <span className="stat-label">Programming Contests</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {achievements.filter(a => a.category === 'sports').length}
            </span>
            <span className="stat-label">Sports Championships</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {achievements.filter(a => a.category === 'research').length}
            </span>
            <span className="stat-label">Research Awards</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {achievements.filter(a => a.category === 'academic').length}
            </span>
            <span className="stat-label">Academic Honors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {achievements.filter(a => a.award.includes('Gold') || a.award.includes('1st') || a.award.includes('Champion')).length}
            </span>
            <span className="stat-label">Gold/Champion Awards</span>
          </div>
        </div>

        <div className="achievements-grid">
          {filteredAchievements.slice(0, visibleCount).map((achievement) => (
            <div key={achievement.id} className="event-card">
              <div className="event-header">
                <div className="event-meta">
                  <span className={`event-type ${achievement.category}`}>
                    {categories.find((c) => c.id === achievement.category)?.name}
                  </span>
                  <span className="event-status">
                    {achievement.award}
                  </span>
                </div>
              </div>
              <div className="event-content">
                <div className="event-title">{achievement.title}</div>
                <div className="event-description">{achievement.description}</div>
                <div className="event-details-list">
                  <div className="event-detail"><strong>Participant:</strong> {achievement.participant}</div>
                  <div className="event-detail"><strong>Date:</strong> {achievement.date}</div>
                  <div className="event-detail"><strong>Location:</strong> {achievement.location}</div>
                </div>
                <div
                  className={`event-expanded${expandedCard === achievement.id ? ' expanded' : ''}`}
                  style={{
                    maxHeight: expandedCard === achievement.id ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
                    opacity: expandedCard === achievement.id ? 1 : 0,
                    marginTop: expandedCard === achievement.id ? '1rem' : '0',
                  }}
                >
                  {expandedCard === achievement.id && (
                    <p className="event-full-details">{achievement.details}</p>
                  )}
                </div>
              </div>
              <div className="event-footer">
                <button
                  className="view-more-btn"
                  onClick={() => handleViewMore(achievement.id)}
                >
                  {expandedCard === achievement.id ? "View Less" : "View More"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length > visibleCount && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <button className="view-more-btn" onClick={handleShowMore}>
              Show More Achievements ({filteredAchievements.length - visibleCount} more)
            </button>
          </div>
        )}

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
