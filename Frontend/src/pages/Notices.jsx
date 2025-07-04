import React, { useState } from "react";
import "./Notices.css";

const Notices = ({ onBack }) => {
  const [selectedNoticeType, setSelectedNoticeType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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
      date: "October 15, 2023",
      type: "Academic",
    },
    {
      id: 5,
      title: "Departmental Research Grant Applications Open",
      date: "September 20, 2023",
      type: "Administrative",
    },
    {
      id: 6,
      title: "Welcome Back Event for Students and Faculty",
      date: "August 5, 2023",
      type: "General",
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
        searchTerm === "" ||
        notice.title.toLowerCase().includes(searchTerm.toLowerCase());
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
        {/* <div className="notices-header">
          {onBack && (
            <button className="back-button" onClick={onBack}>
              ← Back
            </button>
          )}
          <h1 className="notices-title">Department Notices</h1>
          <p className="notices-subtitle">
            Stay informed with the latest updates from our department. Find
            important announcements, academic schedules, and general
            information.
          </p>
        </div> */}

        {/* Filter Section */}
        <div className="filter-section">
          <h2 className="filter-title">Filter Notices</h2>
          <div className="filter-underline"></div>

          <div className="notice-type-section">
            <h3 className="filter-subtitle">Notice Type</h3>
            <div className="notice-type-buttons">
              {noticeTypes.map((type) => (
                <button
                  key={type}
                  className={`notice-type-btn ${
                    selectedNoticeType === type ? "active" : ""
                  }`}
                  onClick={() => setSelectedNoticeType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Notices Section */}
        <div className="active-notices-section">
          <h2 className="section-title">Active Notices</h2>

          <div className="notices-grid">
            {filteredActiveNotices.map((notice) => (
              <div key={notice.id} className="notice-card">
                <div className="notice-card-header">
                  <h3 className="notice-title">{notice.title}</h3>
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
                  <button className="read-more-btn">Read More</button>
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
          <h2 className="section-title">Notice Archive</h2>

          <div className="archive-filters">
            <select
              className="archive-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="All">Select Year</option>
              {years.slice(1).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="archive-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="All">Select Month</option>
              {months.slice(1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="search-section">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search within archives"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="archive-notices">
            {filteredArchivedNotices.map((notice) => (
              <div key={notice.id} className="archive-notice-item">
                <div className="archive-notice-content">
                  <h4 className="archive-notice-title">{notice.title}</h4>
                  <span className="archive-notice-date">{notice.date}</span>
                </div>
                <button className="view-btn">View</button>
              </div>
            ))}
          </div>

          {filteredArchivedNotices.length === 0 && (
            <div className="no-archive">
              <p>No archived notices found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;
