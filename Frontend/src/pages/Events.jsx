import React, { useState } from "react";
import "./Events.css";

const Events = ({ onBack, onEventRegister }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  const events = [
    {
      id: 1,
      title: "Annual Science Fair",
      description:
        "Showcase of student research projects and scientific innovations.",
      date: "Friday, March 15, 2024",
      time: "09:00AM",
      location: "Main Auditorium",
      attendees: "245 attendees",
      category: "Academic",
      status: "PAID/ADM required",
      tags: ["Science", "Research", "Innovation"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Career Development Workshop",
      description:
        "Learn essential skills for professional success and networking.",
      date: "Monday, March 18, 2024",
      time: "02:00PM",
      location: "Conference Room A",
      attendees: "89 attendees",
      category: "Workshop",
      status: "PAID/ADM required",
      tags: ["Career", "Professional", "Networking"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Spring Music Concert",
      description:
        "An evening of beautiful music performed by our talented students.",
      date: "Friday, March 22, 2024",
      time: "07:00 PM",
      location: "Arts Center",
      attendees: "156 attendees",
      category: "Cultural",
      status: "FREE",
      tags: ["Music", "Performance", "Arts"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      title: "Tech Innovation Summit",
      description: "Exploring the latest trends in technology and innovation.",
      date: "Wednesday, March 27, 2024",
      time: "10:00AM",
      location: "Tech Hub",
      attendees: "320 attendees",
      category: "Technology",
      status: "PAID/ADM required",
      tags: ["Technology", "Innovation", "Summit"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 5,
      title: "Annual Cultural Festival",
      description:
        "Celebrating diversity through music, dance, and cultural performances.",
      date: "Saturday, March 30, 2024",
      time: "06:00PM",
      location: "Campus Grounds",
      attendees: "500+ attendees",
      category: "Cultural",
      status: "FREE",
      tags: ["Culture", "Festival", "Performance"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 6,
      title: "Research Paper Presentation",
      description:
        "Students present their latest research findings and methodologies.",
      date: "Tuesday, April 2, 2024",
      time: "02:30PM",
      location: "Research Center",
      attendees: "125 attendees",
      category: "Academic",
      status: "FREE",
      tags: ["Research", "Presentation", "Academic"],
      image: "/api/placeholder/300/200",
    },
  ];

  const categories = [
    "All Events",
    "Academic",
    "Workshop",
    "Cultural",
    "Technology",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All Events" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (event && onEventRegister) {
      onEventRegister(event);
    }
  };

  return (
    <div className="events-page">
      <div className="events-container">
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
        )}

        <div className="events-header">
          <h1>Upcoming Events</h1>
          <p className="events-subtitle">
            Discover and join exciting events happening at our university
          </p>
        </div>

        <div className="events-filters">
          <div className="search-section">
            <h3>Search Events</h3>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="category-section">
            <h3>Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <div className="event-placeholder">
                  <span className="event-icon">📅</span>
                </div>
                <div className="event-status">
                  <span
                    className={`status-badge ${
                      event.status === "FREE" ? "free" : "paid"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-details">
                  <div className="event-detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-icon">🕐</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-icon">📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-icon">👥</span>
                    <span>{event.attendees}</span>
                  </div>
                </div>

                <div className="event-tags">
                  {event.tags.map((tag) => (
                    <span key={tag} className="event-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="register-button"
                  onClick={() => handleRegister(event.id)}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <span className="no-events-icon">📅</span>
            <h3>No events found</h3>
            <p>
              Try adjusting your search criteria or check back later for new
              events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
