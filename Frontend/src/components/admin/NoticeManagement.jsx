import React from 'react';

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
        <h2>Notice Management</h2>
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
            className="add-user-btn"
            onClick={() => setShowNoticeModal(true)}
          >
            ➕ Add New Notice
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
                    <div className="action-buttons" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        style={{ background: 'transparent !important', color: '#1769aa', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => {
                          setEditingNotice(notice);
                          setShowNoticeModal(true);
                        }}
                        title="Edit Notice"
                      >
                        ✏️
                      </button>
                      <button
                        style={{ background: 'transparent !important', color: '#ff9800', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => handleArchiveNotice(notice.id)}
                        title="Archive Notice"
                      >
                        📦
                      </button>
                      <button
                        style={{ background: 'transparent !important', color: '#c62828', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => handleDeleteNotice(notice.id)}
                        title="Delete Notice"
                      >
                        🗑️
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        style={{ background: 'transparent !important', color: '#4caf50', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => handleRestoreNotice(notice.id)}
                        title="Restore Notice"
                      >
                        🔄
                      </button>
                      <button
                        style={{ background: 'transparent !important', color: '#c62828', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => handleDeleteNotice(notice.id)}
                        title="Delete Notice"
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
