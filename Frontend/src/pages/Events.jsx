import React, { useState, useEffect } from "react";
import "./Events.css";
import eventService from "../api/EventService";

const Events = ({ onBack, onEventRegister }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const fallbackEvents = [
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
    "All",
    "Academic",
    "Workshop", 
    "Cultural",
    "Technology",
  ];

  const statuses = ["All", "FREE", "PAID/ADM required"];

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllEvents();
        console.log("Fetched events:", data);
        setEvents(data);
      } catch (error) {
        console.error("API failed, using fallback data:", error);
        console.warn("Using fallback event data.");
        setEvents(fallbackEvents); // fallback to hardcoded events
      }
    };

    fetchEvents();
  }, []);


  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || event.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
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
        {/* {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
        )} */}

        <div className="events-header">
          <h1 className="events-title">Upcoming Events</h1>
          <p className="events-subtitle">
            Discover and join exciting events happening at our university
          </p>
        </div>

        <div className="directory-controls">
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search events by title, description, or tags..."
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
              <label htmlFor="category-select" className="filter-label">
                Category
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="status-select" className="filter-label">
                Status
              </label>
              <select
                id="status-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {(selectedCategory !== "All" || selectedStatus !== "All" || searchTerm) && (
              <button
                className="clear-filters-button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <div className="event-meta">
                  <span className={`event-type ${event.category.toLowerCase()}`}>
                    {event.category}
                  </span>
                  <span className={`event-status ${event.status === "FREE" ? "free" : "paid"}`}>
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-details">
                  <div className="event-detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{event.date}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{event.time}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{event.location}</span>
                  </div>
                  <div className="event-detail-item">
                    <span className="detail-label">Attendees:</span>
                    <span className="detail-value">{event.attendees}</span>
                  </div>
                </div>

                <div className="event-tags">
                  {event.tags.map((tag) => (
                    <span key={tag} className="event-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="event-footer">
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
          <div className="no-events-message">
            <h3>No events found</h3>
            <p>
              Try adjusting your search criteria or check back later for new events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
