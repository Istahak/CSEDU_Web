import React, { useState } from 'react';

const RequestManagement = ({
  getFilteredRequests,
  getRequestStats,
  requestFilter,
  setRequestFilter,
  handleViewRequest,
  handleRequestAction,
  handleDeleteRequest,
  selectedRequest,
  showRequestModal,
  setShowRequestModal
}) => {
  const filteredRequests = getFilteredRequests();
  const stats = getRequestStats();

  // Request Detail Modal
  const RequestModal = () => {
    const [adminNotes, setAdminNotes] = useState("");

    const handleAction = (action) => {
      handleRequestAction(selectedRequest.id, action, adminNotes);
    };

    if (!selectedRequest) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content large-modal">
          <div className="modal-header">
            <h3>Request Details - {selectedRequest.type}</h3>
            <button
              className="close-btn"
              onClick={() => setShowRequestModal(false)}
            >
              ✕
            </button>
          </div>

          <div className="request-details">
            <div className="request-info-grid">
              <div className="info-section">
                <h4>Applicant Information</h4>
                <div className="info-item">
                  <label>Name:</label>
                  <span>{selectedRequest.applicantName}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{selectedRequest.applicantEmail}</span>
                </div>
                <div className="info-item">
                  <label>Department:</label>
                  <span>{selectedRequest.department}</span>
                </div>
              </div>

              <div className="info-section">
                <h4>Request Information</h4>
                <div className="info-item">
                  <label>Type:</label>
                  <span
                    className={`role-badge ${selectedRequest.type
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {selectedRequest.type}
                  </span>
                </div>
                <div className="info-item">
                  <label>Category:</label>
                  <span
                    className={`role-badge ${selectedRequest.category.toLowerCase()}`}
                  >
                    {selectedRequest.category}
                  </span>
                </div>
                <div className="info-item">
                  <label>Priority:</label>
                  <span
                    className={`priority-badge ${selectedRequest.priority}`}
                  >
                    {selectedRequest.priority}
                  </span>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`status-badge ${selectedRequest.status}`}>
                    {selectedRequest.status.replace("_", " ")}
                  </span>
                </div>
                <div className="info-item">
                  <label>Submission Date:</label>
                  <span>{selectedRequest.submissionDate}</span>
                </div>
              </div>
            </div>

            <div className="request-content">
              <h4>Subject</h4>
              <p>
                <strong>{selectedRequest.subject}</strong>
              </p>

              <h4>Description</h4>
              <p>{selectedRequest.description}</p>

              {selectedRequest.additionalInfo && (
                <>
                  <h4>Additional Information</h4>
                  <div className="additional-info">
                    {Object.entries(selectedRequest.additionalInfo).map(
                      ([key, value]) => (
                        <div key={key} className="info-item">
                          <label>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            :
                          </label>
                          <span>
                            {Array.isArray(value) ? value.join(", ") : value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {selectedRequest.attachments &&
                selectedRequest.attachments.length > 0 && (
                  <>
                    <h4>Attachments</h4>
                    <div className="attachments-list">
                      {selectedRequest.attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          <span className="file-icon">📎</span>
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">({file.size})</span>
                          <button className="download-btn" type="button">
                            📥 Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

              {selectedRequest.reviewedBy && (
                <>
                  <h4>Review Information</h4>
                  <div className="review-info">
                    <div className="info-item">
                      <label>Reviewed By:</label>
                      <span>{selectedRequest.reviewedBy}</span>
                    </div>
                    <div className="info-item">
                      <label>Review Date:</label>
                      <span>{selectedRequest.reviewedDate}</span>
                    </div>
                    {selectedRequest.adminNotes && (
                      <div className="info-item">
                        <label>Admin Notes:</label>
                        <span>{selectedRequest.adminNotes}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {(selectedRequest.status === "pending" ||
              selectedRequest.status === "under_review") && (
              <div className="admin-actions">
                <h4>Admin Actions</h4>
                <div className="form-group">
                  <label>Admin Notes (Optional)</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add any notes or feedback..."
                    rows="3"
                  />
                </div>
                <div className="action-buttons">
                  {selectedRequest.status === "pending" && (
                    <button
                      className="edit-btn"
                      onClick={() => handleAction("under_review")}
                      type="button"
                    >
                      👁️ Mark as Under Review
                    </button>
                  )}
                  <button
                    className="save-btn"
                    onClick={() => handleAction("approved")}
                    type="button"
                  >
                    ✅ Approve Request
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleAction("rejected")}
                    type="button"
                  >
                    ❌ Reject Request
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button
              className="cancel-btn"
              onClick={() => setShowRequestModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Request Management</h2>
        <div className="header-actions">
          <button
            className={`filter-btn ${
              requestFilter === "all" ? "active" : ""
            }`}
            onClick={() => setRequestFilter("all")}
          >
            📋 All Requests ({stats.total})
          </button>
          <button
            className={`filter-btn ${
              requestFilter === "pending" ? "active" : ""
            }`}
            onClick={() => setRequestFilter("pending")}
          >
            ⏳ Pending ({stats.pending})
          </button>
          <button
            className={`filter-btn ${
              requestFilter === "under_review" ? "active" : ""
            }`}
            onClick={() => setRequestFilter("under_review")}
          >
            👁️ Under Review ({stats.underReview})
          </button>
          <button
            className={`filter-btn ${
              requestFilter === "approved" ? "active" : ""
            }`}
            onClick={() => setRequestFilter("approved")}
          >
            ✅ Approved ({stats.approved})
          </button>
          <button
            className={`filter-btn ${
              requestFilter === "rejected" ? "active" : ""
            }`}
            onClick={() => setRequestFilter("rejected")}
          >
            ❌ Rejected ({stats.rejected})
          </button>
        </div>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Applicant</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>
                  <span
                    className={`role-badge ${request.type
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {request.type}
                  </span>
                </td>
                <td>
                  <strong>{request.applicantName}</strong>
                  <br />
                  <small>{request.applicantEmail}</small>
                </td>
                <td>
                  <strong>{request.subject}</strong>
                  <br />
                  <small>{request.description.substring(0, 60)}...</small>
                </td>
                <td>
                  <span
                    className={`role-badge ${request.category.toLowerCase()}`}
                  >
                    {request.category}
                  </span>
                </td>
                <td>{request.department}</td>
                <td>
                  <span className={`priority-badge ${request.priority}`}>
                    {request.priority}
                  </span>
                </td>
                <td>{request.submissionDate}</td>
                <td>
                  <span className={`status-badge ${request.status}`}>
                    {request.status.replace("_", " ")}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleViewRequest(request)}
                    title="View Details"
                  >
                    👁️ View
                  </button>
                  {request.status === "pending" && (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleRequestAction(request.id, "under_review")
                        }
                        title="Mark as Under Review"
                      >
                        👁️ Review
                      </button>
                      <button
                        className="save-btn"
                        onClick={() =>
                          handleRequestAction(request.id, "approved")
                        }
                        title="Approve Request"
                      >
                        ✅ Approve
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleRequestAction(request.id, "rejected")
                        }
                        title="Reject Request"
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRequest(request.id)}
                    title="Delete Request"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <div className="empty-state">
            <p>No requests found for the selected filter.</p>
          </div>
        )}
      </div>
      {showRequestModal && <RequestModal />}
    </div>
  );
};

export default RequestManagement;
