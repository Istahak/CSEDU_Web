import React from "react";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <div className="building-placeholder">
            <div className="building-icon">🏢</div>
            <p>Computer Science Building</p>
          </div>
        </div>
        <div className="hero-content">
          <p className="hero-description">
            The Department of Computer Science at Academic Excellence University is dedicated to advancing the field of computing 
            through innovative research and comprehensive education. Our faculty are leaders in their respective fields, committed to 
            fostering collaborative and inclusive learning environment. We offer a wide range of programs, from undergraduate to 
            doctoral levels, designed to equip students with the knowledge and skills needed to excel in the rapidly evolving tech 
            industry.
          </p>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="announcements-section">
        <h2 className="section-title">Announcements</h2>
        
        <div className="announcement-item">
          <div className="announcement-content">
            <div className="announcement-date">October 20, 2024</div>
            <h3 className="announcement-title">Upcoming Conference on AI and Machine Learning</h3>
            <p className="announcement-description">
              Join us for a two-day conference featuring leading experts in artificial intelligence and 
              machine learning. Register now to secure your spot.
            </p>
          </div>
          <div className="announcement-image">
            <div className="announcement-placeholder ai-theme">
              <div className="announcement-icon">🤖</div>
            </div>
          </div>
        </div>

        <div className="announcement-item">
          <div className="announcement-content">
            <div className="announcement-date">October 15, 2024</div>
            <h3 className="announcement-title">New Research Grant Awarded to Dr. Evelyn Reed</h3>
            <p className="announcement-description">
              Dr. Evelyn Reed has been awarded a prestigious research grant to study the applications of 
              quantum computing in cybersecurity.
            </p>
          </div>
          <div className="announcement-image">
            <div className="announcement-placeholder quantum-theme">
              <div className="announcement-icon">⚛️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <h2 className="section-title">Quick Links</h2>
        <div className="quick-links-grid">
          <div className="quick-link-card">
            <div className="card-icon">🎓</div>
            <h3>Academic Programs</h3>
          </div>
          <div className="quick-link-card">
            <div className="card-icon">🔬</div>
            <h3>Research Areas</h3>
          </div>
          <div className="quick-link-card">
            <div className="card-icon">👥</div>
            <h3>Faculty Directory</h3>
          </div>
          <div className="quick-link-card">
            <div className="card-icon">📚</div>
            <h3>Course Catalog</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
