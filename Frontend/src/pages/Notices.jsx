import React, { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../api/config"; 
import "./Notices.css";


// Edited by Tanzim (Date: 2025-07-11)


const Notices = ({ onBack, onNoticeSelect }) => {
  const [selectedNoticeType, setSelectedNoticeType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [archiveSearchTerm, setArchiveSearchTerm] = useState("");
  const [activeNotices, setActiveNotices] = useState([]);
  const [archivedNotices, setArchivedNotices] = useState([]);
  const [error, setError] = useState(null);

  const noticeTypes = ["All", "Academic", "Administrative", "General"];
  const years = ["All", "2024", "2023", "2022"];
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Fetch notices from backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/notices`,
          { params: { skip: 0, limit: 100 } }
        );
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          // Map backend fields to frontend expectations
          const mappedNotices = response.data.map((notice) => ({
            id: notice.id,
            title: notice.title,
            description: notice.content, // Map content to description
            type: notice.category, // Map category to type
            date: notice.expiry_date || notice.created_at || "2024-01-01", // Fallback date
            status: notice.status || "Published", // Default to Published if missing
          }));
          // Split into active and archived
          const active = mappedNotices.filter(
            (notice) => notice.status === "Published"
          );
          const archived = mappedNotices.filter(
            (notice) => notice.status === "Archived"
          );
          setActiveNotices(active);
          setArchivedNotices(archived);
          setError(null);
        } else {
          setError("Invalid response format from server");
        }
      } catch (err) {
        console.error("Fetch Error:", err.message, err.response?.data);
        setError(`Failed to fetch notices: ${err.message}`);
        // Fallback to static notices
        setActiveNotices([
          {
            id: 1,
            title: "Academic Calendar for Fall 2024",
            description: "View the full academic calendar...",
            type: "Academic",
            date: "2024-07-01",
            status: "active",
          },
          {
            id: 2,
            title: "New Administrative Procedures",
            description: "Learn about the new procedures...",
            type: "Administrative",
            date: "2024-06-28",
            status: "active",
          },
          {
            id: 3,
            title: "Department-Wide Announcements",
            description: "Find out about upcoming events...",
            type: "General",
            date: "2024-06-25",
            status: "active",
          },
        ]);
        setArchivedNotices([
          {
            id: 4,
            title: "Changes to Course Offerings for Spring 2024",
            description: "Important updates to course offerings...",
            type: "Academic",
            date: "2023-10-15",
            status: "archived",
          },
          {
            id: 5,
            title: "Departmental Research Grant Applications Open",
            description: "Applications are now open...",
            type: "Administrative",
            date: "2023-09-20",
            status: "archived",
          },
          {
            id: 6,
            title: "Welcome Back Event for Students and Faculty",
            description: "Join us for our annual welcome back event...",
            type: "General",
            date: "2023-08-05",
            status: "archived",
          },
        ]);
      }
    };
    fetchNotices();
  }, []);

  const getFilteredActiveNotices = () => {
    return activeNotices.filter((notice) => {
      const typeMatch =
        selectedNoticeType === "All" || notice.type === selectedNoticeType;
      const searchMatch =
        searchTerm === "" ||
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchTerm.toLowerCase());
      return typeMatch && searchMatch;
    });
  };

  const getFilteredArchivedNotices = () => {
    return archivedNotices.filter((notice) => {
      const typeMatch =
        selectedNoticeType === "All" || notice.type === selectedNoticeType;
      const yearMatch =
        selectedYear === "All" ||
        new Date(notice.date).getFullYear().toString() === selectedYear;
      const monthMatch =
        selectedMonth === "All" ||
        months[new Date(notice.date).getMonth() + 1] === selectedMonth;
      const searchMatch =
        archiveSearchTerm === "" ||
        notice.title.toLowerCase().includes(archiveSearchTerm.toLowerCase()) ||
        notice.description.toLowerCase().includes(archiveSearchTerm.toLowerCase());
      return typeMatch && yearMatch && monthMatch && searchMatch;
    });
  };

  const getNoticeTypeColor = (type) => {
    switch (type) {
      case "Academic":
        return "academic";
      case "Administrative":
        return "administrative";
      case "General":
        return "general";
      default:
        return "general";
    }
  };

  const filteredActiveNotices = getFilteredActiveNotices();
  const filteredArchivedNotices = getFilteredArchivedNotices();

  return (
    <div className="notices-page">
      <div className="notices-container">

        {/* Header Section */}
        <div className="notices-header">
          <h1 className="notices-title">Notices & Announcements</h1>
          <p className="notices-subtitle">
            Stay updated with the latest academic announcements, administrative updates, and department news.
          </p>
        </div>

        {/* Modern Filter/Search Section */}
        <div className="directory-controls">
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label className="filter-label">Type</label>
              <select
                className="filter-select"
                value={selectedNoticeType}
                onChange={(e) => setSelectedNoticeType(e.target.value)}
              >
                {noticeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {selectedNoticeType !== "All" && (
              <div className="filter-group">
                <button
                  className="clear-filters-button"
                  onClick={() => setSelectedNoticeType("All")}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Notices Section */}
        <div className="active-notices-section">
          <h2 className="section-title">Active Notices</h2>

          <div className="notices-grid">
            {filteredActiveNotices.map((notice) => (
              <div key={notice.id} className="notice-card">
                <div className="notice-card-header">
                  <h3 className="notice-title-2">{notice.title}</h3>
                  <span
                    className={`notice-badge ${getNoticeTypeColor(
                      notice.type
                    )}`}
                  >
                    {notice.type}
                  </span>
                </div>
                <p className="notice-description">{notice.description}</p>
                <div className="notice-footer">
                  <span className="notice-date">
                    {new Date(notice.date).toLocaleDateString()}
                  </span>
                  <button
                    className="read-more-btn"
                    onClick={() => onNoticeSelect(notice)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredActiveNotices.length === 0 && (
            <div className="no-notices">
              <div className="no-notices-content">
                <span className="no-notices-icon">📢</span>
                <h3>No active notices found</h3>
                <p>No notices match your current filter criteria.</p>
              </div>
            </div>
          )}
        </div>

        {/* Notice Archive Section */}
        <div className="archive-section">
          <div className="archive-header">
            <h2 className="section-title">Notice Archive</h2>
          </div>

          <div className="archive-controls">
            <div className="archive-filters">
              <div className="archive-filter-group">
                <label className="archive-filter-label">Year</label>
                <select
                  className="archive-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="All">All Years</option>
                  {years.slice(1).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="archive-filter-group">
                <label className="archive-filter-label">Month</label>
                <select
                  className="archive-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="All">All Months</option>
                  {months.slice(1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="archive-search-section">
              <div className="archive-search-container">
                <span className="archive-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search archived notices..."
                  className="archive-search-input"
                  value={archiveSearchTerm}
                  onChange={(e) => setArchiveSearchTerm(e.target.value)}
                />
                {archiveSearchTerm && (
                  <button
                    className="clear-search-btn"
                    onClick={() => setArchiveSearchTerm("")}
                    aria-label="Clear archive search"
                    style={{right: '0.75rem'}}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="archive-notices">
            {filteredArchivedNotices.map((notice) => (
              <div key={notice.id} className="archive-notice-card">
                <div className="archive-notice-header">
                  <h4 className="archive-notice-title">{notice.title}</h4>
                  <span className="archive-notice-badge">
                    {notice.type}
                  </span>
                </div>
                <p className="archive-notice-description">{notice.description}</p>
                <div className="archive-notice-footer">
                  <span className="archive-notice-date">
                    {new Date(notice.date).toLocaleDateString()}
                  </span>
                  <button
                    className="archive-view-btn"
                    onClick={() => onNoticeSelect(notice)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredArchivedNotices.length === 0 && (
            <div className="no-notices">
              <div className="no-notices-content">
                <span className="no-notices-icon">📄</span>
                <h3>No archived notices found</h3>
                <p>No notices match your current search and filter criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;
