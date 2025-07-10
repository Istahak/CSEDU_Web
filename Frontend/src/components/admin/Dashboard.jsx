import React from 'react';

const Dashboard = ({ adminData, stats, setActiveTab }) => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>CSEDU Admin Dashboard</h2>
        <p>Welcome back, {adminData.name}. Here's your system overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h3>{stats.totalFaculty}</h3>
            <p>Faculty Members</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{stats.totalCourses}</h3>
            <p>Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-info">
            <h3>{stats.activeProjects}</h3>
            <p>Active Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.totalNotices}</h3>
            <p>Published Notices</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.pendingRequests}</h3>
            <p>Pending Requests</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setActiveTab("users")}>
            👨‍🏫 Manage Faculty
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("courses")}
          >
            📚 Manage Courses
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("notices")}
          >
            📢 Manage Notices
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("achievements")}
          >
            🏆 Manage Achievements
          </button>
          <button className="action-btn" onClick={() => setActiveTab("events")}>
            📅 Manage Events
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("requests")}
          >
            📋 Manage Requests
          </button>
          <button
            className="action-btn"
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ System Settings
          </button>
          <button className="action-btn">📊 Generate Reports</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
