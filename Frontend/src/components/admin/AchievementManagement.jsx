import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaArchive, FaUndo } from 'react-icons/fa';

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
        <div className="section-header-text">
          <h2>Achievement Management</h2>
          <p>Manage achievements and recognitions</p>
        </div>
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
            className="add-btn primary"
            onClick={() => setShowAchievementModal(true)}
          >
            <FaPlus /> Add New Achievement
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
                    <div className="achievement-action-buttons">
                      <button
                        className="course-action-btn primary"
                        onClick={() => {
                          setEditingAchievement(achievement);
                          setShowAchievementModal(true);
                        }}
                        title="Edit Achievement"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="course-action-btn secondary"
                        onClick={() =>
                          handleArchiveAchievement(achievement.id)
                        }
                        title="Archive Achievement"
                      >
                        <FaArchive /> Archive
                      </button>
                      <button
                        className="course-action-btn archive"
                        onClick={() =>
                          handleDeleteAchievement(achievement.id)
                        }
                        title="Delete Achievement"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  ) : (
                    <div className="achievement-action-buttons">
                      <button
                        className="course-action-btn primary"
                        onClick={() =>
                          handleRestoreAchievement(achievement.id)
                        }
                        title="Restore Achievement"
                      >
                        <FaUndo /> Restore
                      </button>
                      <button
                        className="course-action-btn archive"
                        onClick={() =>
                          handleDeleteAchievement(achievement.id)
                        }
                        title="Delete Achievement"
                      >
                        <FaTrash /> Delete
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
