import React, { useState, useEffect } from "react";
import "./Achievements.css";
import AchievementService from "../api/AchievementService";

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

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AchievementService.getAll()
      .then(data => {
        console.log("Fetched achievements:", data);
        setAchievements(data);
      })
      .catch(error => {
        console.error("Error fetching achievements:", error);
        setAchievements([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

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
        text: `${achievement.team_name || "N/A"} achieved ${achievement.title} - ${achievement.description}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `${achievement.title} - ${achievement.team_name || "N/A"}: ${achievement.description}\n${window.location.href}`
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
  {achievements.filter(
    a =>
      (a.awarding_organization || '').includes('Gold') ||
      (a.awarding_organization || '').includes('1st') ||
      (a.awarding_organization || '').includes('Champion')
  ).length}
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
                    {achievement.awarding_organization || "N/A"}
                  </span>
                </div>
              </div>
              <div className="event-content">
                <div className="event-title">{achievement.title}</div>
                <div className="event-description">{achievement.description}</div>
                <div className="event-details-list">
                  <div className="event-detail"><strong>Participant:</strong> {achievement.team_name || "N/A"}</div>
                  <div className="event-detail"><strong>Date:</strong> {achievement.date}</div>
                  <div className="event-detail"><strong>Location:</strong> {"N/A"}</div>
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
                    <p className="event-full-details">{achievement.description}</p>
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
