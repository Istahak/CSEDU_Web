import React from 'react';

const AchievementManagement = ({ 
  achievements, 
  showArchivedAchievements, 
  setShowArchivedAchievements, 
  setShowAchievementModal, 
  handleAchievementStatusChange, 
  setEditingAchievement, 
  handleArchiveAchievement, 
  handleDeleteAchievement, 
  handleRestoreAchievement 
}) => {
  const filteredAchievements = showArchivedAchievements
    ? achievements.filter((achievement) => achievement.status === "archived")
    : achievements.filter((achievement) => achievement.status !== "archived");

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Achievement Management</h2>
        <div className="header-actions">
          <button
            className={`filter-btn ${
              !showArchivedAchievements ? "active" : ""
            }`}
            onClick={() => setShowArchivedAchievements(false)}
          >
            🏆 Active Achievements
          </button>
          <button
            className={`filter-btn ${
              showArchivedAchievements ? "active" : ""
            }`}
            onClick={() => setShowArchivedAchievements(true)}
          >
            📦 Archived Achievements
          </button>
          <button
            className="add-user-btn"
            onClick={() => setShowAchievementModal(true)}
          >
            ➕ Add New Achievement
          </button>
        </div>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Recipient</th>
              <th>Category</th>
              <th>Award Date</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Media</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAchievements.map((achievement) => (
              <tr key={achievement.id}>
                <td>
                  <strong>{achievement.title}</strong>
                </td>
                <td>
                  {achievement.recipientName}
                  <br />
                  <small
                    className={`role-badge ${achievement.recipientType}`}
                  >
                    {achievement.recipientType}
                  </small>
                </td>
                <td>
                  <span
                    className={`role-badge ${achievement.category.toLowerCase()}`}
                  >
                    {achievement.category}
                  </span>
                </td>
                <td>{achievement.awardDate}</td>
                <td>{achievement.awardingOrganization}</td>
                <td>
                  {!showArchivedAchievements ? (
                    <>
                      <select
                        value={achievement.status}
                        onChange={(e) =>
                          handleAchievementStatusChange(
                            achievement.id,
                            e.target.value
                          )
                        }
                        className="status-select"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                      {achievement.featured && (
                        <span className="featured-badge">⭐ Featured</span>
                      )}
                    </>
                  ) : (
                    <span className="status-badge archived">Archived</span>
                  )}
                </td>
                <td>
                  {achievement.imageUrl ? (
                    <span className="has-media">🖼️ Image</span>
                  ) : (
                    <span className="no-media">No media</span>
                  )}
                </td>
                <td>
                  {!showArchivedAchievements ? (
                    <div className="action-buttons" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        style={{ background: 'transparent !important', color: '#1769aa', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => {
                          setEditingAchievement(achievement);
                          setShowAchievementModal(true);
                        }}
                        title="Edit Achievement"
                      >
                        ✏️
                      </button>
                      <button
                        style={{ background: 'transparent !important', color: '#ff9800', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() =>
                          handleArchiveAchievement(achievement.id)
                        }
                        title="Archive Achievement"
                      >
                        📦
                      </button>
                      <button
                        style={{ background: 'transparent !important', color: '#c62828', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() =>
                          handleDeleteAchievement(achievement.id)
                        }
                        title="Delete Achievement"
                      >
                        🗑️
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        style={{ background: 'transparent !important', color: '#4caf50', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() =>
                          handleRestoreAchievement(achievement.id)
                        }
                        title="Restore Achievement"
                      >
                        🔄
                      </button>
                      <button
                        style={{ background: 'transparent !important', color: '#c62828', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() =>
                          handleDeleteAchievement(achievement.id)
                        }
                        title="Delete Achievement"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAchievements.length === 0 && (
          <div className="empty-state">
            <p>
              {showArchivedAchievements
                ? "No archived achievements found."
                : "No active achievements found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementManagement;
