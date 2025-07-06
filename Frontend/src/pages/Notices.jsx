import React, { useState } from "react";
import "./Notices.css";

const Notices = ({ onBack, onNoticeSelect }) => {
  const [selectedNoticeType, setSelectedNoticeType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [archiveSearchTerm, setArchiveSearchTerm] = useState("");

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

  const activeNotices = [
    {
      id: 1,
      title: "Academic Calendar for Fall 2024",
      description:
        "View the full academic calendar for detailed information on course registration, exams, and holidays. Important dates and deadlines for the upcoming semester.",
      type: "Academic",
      date: "2024-07-01",
      status: "active",
    },
    {
      id: 2,
      title: "New Administrative Procedures",
      description:
        "Learn about the new procedures for submitting documents, requesting approvals, and other administrative tasks. Changes to the department's administrative procedures.",
      type: "Administrative",
      date: "2024-06-28",
      status: "active",
    },
    {
      id: 3,
      title: "Department-Wide Announcements",
      description:
        "Find out about upcoming events, workshops, and other important news from the department. General announcements and updates for all students and staff.",
      type: "General",
      date: "2024-06-25",
      status: "active",
    },
  ];

  const archivedNotices = [
    {
      id: 4,
      title: "Changes to Course Offerings for Spring 2024",
      description:
        "Important updates to course offerings for the Spring 2024 semester. Please review the changes and contact your academic advisor if you have any questions.",
      date: "2023-10-15",
      type: "Academic",
      status: "archived",
    },
    {
      id: 5,
      title: "Departmental Research Grant Applications Open",
      description:
        "Applications are now open for departmental research grants. Faculty and graduate students are encouraged to apply for funding opportunities.",
      date: "2023-09-20",
      type: "Administrative",
      status: "archived",
    },
    {
      id: 6,
      title: "Welcome Back Event for Students and Faculty",
      description:
        "Join us for our annual welcome back event featuring networking opportunities, refreshments, and updates from the department.",
      date: "2023-08-05",
      type: "General",
      status: "archived",
    },
  ];

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
      const searchMatch =
        archiveSearchTerm === "" ||
        notice.title.toLowerCase().includes(archiveSearchTerm.toLowerCase()) ||
        notice.description.toLowerCase().includes(archiveSearchTerm.toLowerCase());
      return typeMatch && searchMatch;
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
