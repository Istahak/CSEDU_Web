import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaArchive, FaUndo } from 'react-icons/fa';

const NoticeManagement = ({ 
  notices, 
  showArchivedNotices, 
  setShowArchivedNotices, 
  setShowNoticeModal, 
  handleNoticeStatusChange, 
  setEditingNotice, 
  handleArchiveNotice, 
  handleDeleteNotice, 
  handleRestoreNotice 
}) => {
  const filteredNotices = showArchivedNotices
    ? notices.filter((notice) => notice.status === "archived")
    : notices.filter((notice) => notice.status !== "archived");

  return (
    <div className="user-management">
      <div className="section-header">
        <div className="section-header-text">
          <h2>Notice Management</h2>
          <p>Manage notices and announcements</p>
        </div>
        <div className="header-actions">
          <button
            className={`filter-btn ${!showArchivedNotices ? "active" : ""}`}
            onClick={() => setShowArchivedNotices(false)}
          >
            📋 Active Notices
          </button>
          <button
            className={`filter-btn ${showArchivedNotices ? "active" : ""}`}
            onClick={() => setShowArchivedNotices(true)}
          >
            📦 Archived Notices
          </button>
          <button
            className="add-btn primary"
            onClick={() => setShowNoticeModal(true)}
          >
            <FaPlus /> Add New Notice
          </button>
        </div>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Publish Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Attachments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.map((notice) => (
              <tr key={notice.id}>
                <td>
                  <strong>{notice.title}</strong>
                </td>
                <td>
                  <span
                    className={`role-badge ${notice.category.toLowerCase()}`}
                  >
                    {notice.category}
                  </span>
                </td>
                <td>
                  <span className={`priority-badge ${notice.priority}`}>
                    {notice.priority}
                  </span>
                </td>
                <td>{notice.publishDate}</td>
                <td>{notice.expiryDate}</td>
                <td>
                  {!showArchivedNotices ? (
                    <select
                      value={notice.status}
                      onChange={(e) =>
                        handleNoticeStatusChange(notice.id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  ) : (
                    <span className="status-badge archived">Archived</span>
                  )}
                </td>
                <td>
                  {notice.attachments && notice.attachments.length > 0 ? (
                    <span className="attachment-count">
                      📎 {notice.attachments.length} file(s)
                    </span>
                  ) : (
                    <span className="no-attachments">No files</span>
                  )}
                </td>
                <td>
                  {!showArchivedNotices ? (
                    <div className="notice-action-buttons">
                      <button
                        className="course-action-btn primary"
                        onClick={() => {
                          setEditingNotice(notice);
                          setShowNoticeModal(true);
                        }}
                        title="Edit Notice"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="course-action-btn secondary"
                        onClick={() => handleArchiveNotice(notice.id)}
                        title="Archive Notice"
                      >
                        <FaArchive /> Archive
                      </button>
                      <button
                        className="course-action-btn archive"
                        onClick={() => handleDeleteNotice(notice.id)}
                        title="Delete Notice"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  ) : (
                    <div className="notice-action-buttons">
                      <button
                        className="course-action-btn primary"
                        onClick={() => handleRestoreNotice(notice.id)}
                        title="Restore Notice"
                      >
                        <FaUndo /> Restore
                      </button>
                      <button
                        className="course-action-btn archive"
                        onClick={() => handleDeleteNotice(notice.id)}
                        title="Delete Notice"
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
        {filteredNotices.length === 0 && (
          <div className="empty-state">
            <p>
              {showArchivedNotices
                ? "No archived notices found."
                : "No active notices found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeManagement;
