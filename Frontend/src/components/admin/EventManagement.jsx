import React, { useState } from 'react';

const EventManagement = ({ 
  events, 
  handleEditEvent, 
  handleDeleteEvent, 
  handleEventStatusChange, 
  handleToggleRegistration, 
  handleViewRegistrations,
  adminData 
}) => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEditEventClick = (event) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  // Event Modal for Create/Edit
  const EventModal = () => {
    const [formData, setFormData] = useState(
      editingEvent || {
        title: "",
        description: "",
        category: "Academic",
        date: "",
        time: "",
        endTime: "",
        venue: "",
        capacity: 50,
        registrationFee: 0,
        image: "",
        registrationDeadline: "",
        organizer: adminData.name,
        contact: adminData.email,
        requirements: "",
        agenda: "",
        status: "active",
        registrationOpen: true,
      }
    );
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(editingEvent?.image || "");

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    };

    const handleRemoveImage = () => {
      setSelectedImage(null);
      setImagePreview("");
      setFormData({ ...formData, image: "" });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingEvent) {
        handleEditEvent(editingEvent.id, {
          ...formData,
          image: imagePreview || formData.image,
        });
      } else {
        const newEvent = {
          id: Date.now(),
          ...formData,
          image: imagePreview,
          registrations: [],
        };
        handleEditEvent(null, newEvent);
      }
      setShowEventModal(false);
      setEditingEvent(null);
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content large-modal">
          <div className="modal-header">
            <h3>{editingEvent ? "Edit Event" : "Add New Event"}</h3>
            <button
              className="close-btn"
              onClick={() => {
                setShowEventModal(false);
                setEditingEvent(null);
              }}
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form event-form">
            <div className="form-section">
              <h4>Event Image</h4>
              <div className="image-upload-section">
                <div className="current-image">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Event Preview"
                      className="event-image-preview"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>🎫</span>
                      <p>No event image uploaded</p>
                    </div>
                  )}
                </div>
                <div className="image-controls">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="eventImage"
                    className="file-input"
                  />
                  <label htmlFor="eventImage" className="upload-btn">
                    📷 Upload Event Image
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="remove-btn"
                    >
                      🗑️ Remove Image
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="form-section">
              <h4>Basic Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    placeholder="Event Title"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Academic">Academic</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Technology">Technology</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Conference">Conference</option>
                    <option value="Competition">Competition</option>
                    <option value="Social">Social</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Time *</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Venue *</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    required
                    placeholder="Event Venue"
                  />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: parseInt(e.target.value) || 0,
                      })
                    }
                    min="1"
                    max="1000"
                  />
                </div>
                <div className="form-group">
                  <label>Registration Fee (৳)</label>
                  <input
                    type="number"
                    value={formData.registrationFee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationFee: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Event Details</h4>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    placeholder="Event Description"
                    rows="4"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Registration Deadline</label>
                  <input
                    type="date"
                    value={formData.registrationDeadline}
                    onChange={(e) =>
                      setFormData({ ...formData, registrationDeadline: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Organizer</label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) =>
                      setFormData({ ...formData, organizer: e.target.value })
                    }
                    placeholder="Organizer Name"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    placeholder="Contact Email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Requirements</label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    placeholder="Event Requirements (optional)"
                    rows="3"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Agenda</label>
                  <textarea
                    value={formData.agenda}
                    onChange={(e) =>
                      setFormData({ ...formData, agenda: e.target.value })
                    }
                    placeholder="Event Agenda (optional)"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowEventModal(false);
                  setEditingEvent(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Event Management</h2>
        <button className="add-user-btn" onClick={handleAddEvent}>
          ➕ Add New Event
        </button>
      </div>
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Capacity</th>
              <th>Fee</th>
              <th>Status</th>
              <th>Registration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>
                  <div className="event-image">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="event-thumbnail"
                      />
                    ) : (
                      <div className="event-image-placeholder">🎫</div>
                    )}
                  </div>
                </td>
                <td>
                  <strong>{event.title}</strong>
                </td>
                <td>{event.category}</td>
                <td>{event.date}</td>
                <td>
                  {event.time} - {event.endTime}
                </td>
                <td>{event.venue}</td>
                <td>{event.capacity}</td>
                <td>
                  {event.registrationFee > 0
                    ? `${event.registrationFee}৳`
                    : "Free"}
                </td>
                <td>
                  <select
                    value={event.status}
                    onChange={(e) =>
                      handleEventStatusChange(event.id, e.target.value)
                    }
                    className="status-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
                <td>
                  <button
                    className={`toggle-btn ${
                      event.registrationOpen ? "open" : "closed"
                    }`}
                    onClick={() => handleToggleRegistration(event.id)}
                    title={
                      event.registrationOpen
                        ? "Close Registration"
                        : "Open Registration"
                    }
                  >
                    {event.registrationOpen ? "🟢 Open" : "🔴 Closed"}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditEventClick(event)}
                      title="Edit Event"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteEvent(event.id)}
                      title="Delete Event"
                    >
                      🗑️ Delete
                    </button>
                    <button
                      className="view-btn"
                      onClick={() => handleViewRegistrations(event.id)}
                      title="View Registrations"
                    >
                      👥 Registrations
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="empty-state">
            <p>No events found.</p>
          </div>
        )}
      </div>
      {showEventModal && <EventModal />}
    </div>
  );
};

export default EventManagement;
