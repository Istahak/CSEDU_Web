import React, { useState, useEffect } from "react";
import cseduImg from "../assets/images/csedu.jpg";
import { homepageService } from "../api";

// We'll use the homepageService for demo data instead of static constants

const Home = ({ setCurrentPage }) => {
  const [overview, setOverview] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch homepage data from API
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        const data = await homepageService.getAllHomepageData();
        
        // If we have data from the API, use it
        if (data) {
          if (data.overview) {
            setOverview(data.overview);
          }
          
          if (data.announcements && data.announcements.length > 0) {
            setAnnouncements(data.announcements);
          } else {
            // Prefix static data
            setAnnouncements(staticAnnouncements.map(a => ({
              ...a,
              title: `Static ${a.title}`
            })));
          }
          
          if (data.quick_links && data.quick_links.length > 0) {
            setQuickLinks(data.quick_links);
          } else {
            // Prefix static data
            setQuickLinks(staticQuickLinks.map(ql => ({
              ...ql,
              title: `Static ${ql.title}`
            })));
          }
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        // Use static data with prefix
        // Add 'Static' prefix to demo data
        const demoAnnouncements = homepageService.getDemoAnnouncements();
        setAnnouncements(demoAnnouncements.map(a => ({
          ...a,
          title: `Static ${a.title}`
        })));
        // Add 'Static' prefix to demo data
        const demoQuickLinks = homepageService.getDemoQuickLinks();
        setQuickLinks(demoQuickLinks.map(ql => ({
          ...ql,
          title: `Static ${ql.title}`
        })));
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomepageData();
  }, []);
  
  const handleNavigation = (page) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <img src={overview.image_url || cseduImg} alt="CSEDU Building" className="hero-img-actual" />
        </div>
        <div className="hero-content">
          {overview.title && <h1 className="hero-title">{overview.title}</h1>}
          <p className="hero-description">
            {overview.description}
          </p>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="announcements-section">
        <h2 className="section-title">Announcements</h2>
        {loading ? (
          <div className="loading">Loading announcements...</div>
        ) : (
          <div className="notices-grid">
            {announcements.map((a) => (
              <div className="notice-card" key={a.id}>
                <div className="notice-card-header">
                  <h3 className="notice-title">{a.title}</h3>
                  <span className={`notice-badge ${a.type?.color_code || 'general'}`}>
                    {a.type?.name || 'General'}
                  </span>
                </div>
                <p className="notice-description">{a.description}</p>
                <div className="notice-footer">
                  <span className="notice-date">
                    {new Date(a.publish_date || a.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <h2 className="section-title">Quick Links</h2>
        {loading ? (
          <div className="loading">Loading quick links...</div>
        ) : (
          <div className="quick-links-grid">
            {quickLinks.map((link) => (
              <div 
                className="quick-link-card" 
                key={link.id}
                onClick={() => handleNavigation(link.url)}
              >
                <div className="card-icon">
                  {renderIcon(link.icon)}
                </div>
                <h3>{link.title}</h3>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// Helper function to render icons based on icon name
const renderIcon = (iconName) => {
  switch (iconName) {
    case 'graduation-cap':
      return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12l-10-7-10 7 10 7 10-7z"/><path d="M2 12v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7"/></svg>;
    case 'flask':
      return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
    case 'users':
      return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>;
    case 'book':
      return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>;
    default:
      return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
  }
};

export default Home;
