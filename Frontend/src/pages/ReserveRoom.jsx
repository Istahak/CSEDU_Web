import React, { useState } from "react";
import "./ReserveRoom.css";

const ReserveRoom = ({ onBack }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    roomId: "",
    purpose: "class",
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    description: "",
    capacity: "",
    equipment: [],
    recurring: false,
    recurringType: "weekly",
    recurringEnd: "",
    notifyAdmin: true,
    priority: "normal",
  });

  // Sample room data
  const rooms = [
    {
      id: 1,
      name: "Room 301",
      type: "Classroom",
      capacity: 60,
      floor: "3rd Floor",
      building: "CSEDU Building",
      equipment: [
        "Projector",
        "Whiteboard",
        "Sound System",
        "Air Conditioning",
      ],
      availability: "Available",
      features: ["WiFi", "Power Outlets", "Natural Light"],
    },
    {
      id: 2,
      name: "Room 205",
      type: "Computer Lab",
      capacity: 40,
      floor: "2nd Floor",
      building: "CSEDU Building",
      equipment: [
        "30 Computers",
        "Projector",
        "Whiteboard",
        "Air Conditioning",
      ],
      availability: "Available",
      features: ["WiFi", "Network Ports", "Individual Workstations"],
    },
    {
      id: 3,
      name: "Conference Room A",
      type: "Meeting Room",
      capacity: 20,
      floor: "4th Floor",
      building: "CSEDU Building",
      equipment: [
        "Video Conferencing",
        "Smart Board",
        "Round Table",
        "Air Conditioning",
      ],
      availability: "Available",
      features: ["WiFi", "Video Calling", "Presentation Screen"],
    },
    {
      id: 4,
      name: "Auditorium",
      type: "Large Hall",
      capacity: 200,
      floor: "Ground Floor",
      building: "Main Building",
      equipment: [
        "Stage",
        "Microphones",
        "Projector",
        "Sound System",
        "Lighting",
      ],
      availability: "Limited",
      features: ["WiFi", "Stage Lighting", "Professional Audio"],
    },
    {
      id: 5,
      name: "Lab 201",
      type: "Research Lab",
      capacity: 15,
      floor: "2nd Floor",
      building: "Research Building",
      equipment: ["Research Equipment", "Computers", "Whiteboard"],
      availability: "Available",
      features: ["WiFi", "Specialized Equipment", "Climate Control"],
    },
    {
      id: 6,
      name: "Seminar Room B",
      type: "Seminar Room",
      capacity: 30,
      floor: "3rd Floor",
      building: "CSEDU Building",
      equipment: ["Projector", "Whiteboard", "Air Conditioning"],
      availability: "Partially Booked",
      features: ["WiFi", "Flexible Seating", "Natural Light"],
    },
  ];

  const bookingPurposes = [
    { value: "class", label: "Regular Class", icon: "📚" },
    { value: "exam", label: "Examination", icon: "📝" },
    { value: "meeting", label: "Faculty Meeting", icon: "👥" },
    { value: "seminar", label: "Seminar/Workshop", icon: "🎓" },
    { value: "research", label: "Research Activity", icon: "🔬" },
    { value: "event", label: "Academic Event", icon: "🎉" },
    { value: "other", label: "Other", icon: "💭" },
  ];

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  const equipmentOptions = [
    "Projector",
    "Whiteboard",
    "Sound System",
    "Video Conferencing",
    "Microphone",
    "Podium",
    "Flip Chart",
    "Markers",
    "Extension Cord",
  ];

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setBookingData((prev) => ({
      ...prev,
      roomId: room.id,
      capacity: room.capacity.toString(),
    }));
  };

  const handleEquipmentToggle = (equipment) => {
    setBookingData((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter((item) => item !== equipment)
        : [...prev.equipment, equipment],
    }));
  };

  const handleSubmit = (action) => {
    if (
      !selectedRoom ||
      !bookingData.date ||
      !bookingData.startTime ||
      !bookingData.endTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (bookingData.startTime >= bookingData.endTime) {
      alert("End time must be after start time");
      return;
    }

    const bookingInfo = {
      ...bookingData,
      room: selectedRoom,
      action: action,
    };

    console.log(`Room ${action}:`, bookingInfo);

    if (action === "book") {
      alert(
        "Room reserved successfully! Booking confirmation sent to your email."
      );
    } else {
      alert("Booking saved as draft. You can submit it later for approval.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Available":
        return "#28a745";
      case "Limited":
        return "#ffc107";
      case "Partially Booked":
        return "#fd7e14";
      case "Unavailable":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="reserve-room">
      <div className="reserve-room-container">
        <button onClick={onBack} className="main-back-button">
          ← Back to Profile
        </button>

        <div className="reserve-room-content">
          <div className="view-header">
            <div className="header-content">
              <h2>Reserve Room</h2>
              <p>Book classrooms and facilities for academic activities</p>
            </div>
            <button onClick={onBack} className="back-btn">
              ← Back
            </button>
          </div>

          {/* Room Selection */}
          <div className="room-selection">
            <h3>🏛️ Select Room</h3>
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`room-card ${
                    selectedRoom?.id === room.id ? "selected" : ""
                  }`}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className="room-info">
                    <div className="room-header">
                      <h4>{room.name}</h4>
                      <div className="room-badges">
                        <span className="room-type">{room.type}</span>
                        <span
                          className="availability-badge"
                          style={{
                            backgroundColor: getAvailabilityColor(
                              room.availability
                            ),
                          }}
                        >
                          {room.availability}
                        </span>
                      </div>
                    </div>
                    <div className="room-details">
                      <p>
                        <strong>Capacity:</strong> {room.capacity} people
                      </p>
                      <p>
                        <strong>Location:</strong> {room.floor}, {room.building}
                      </p>
                      <p>
                        <strong>Equipment:</strong>{" "}
                        {room.equipment.slice(0, 3).join(", ")}
                        {room.equipment.length > 3 ? "..." : ""}
                      </p>
                      <p>
                        <strong>Features:</strong> {room.features.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          {selectedRoom && (
            <div className="booking-form">
              <h3>📅 Booking Details</h3>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">🎯</span>
                  Booking Purpose
                </h4>
                <div className="purpose-selection">
                  {bookingPurposes.map((purpose) => (
                    <div
                      key={purpose.value}
                      className={`purpose-option ${
                        bookingData.purpose === purpose.value ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleInputChange("purpose", purpose.value)
                      }
                    >
                      <input
                        type="radio"
                        name="purpose"
                        value={purpose.value}
                        checked={bookingData.purpose === purpose.value}
                        onChange={() =>
                          handleInputChange("purpose", purpose.value)
                        }
                      />
                      <span className="icon">{purpose.icon}</span>
                      <span className="label">{purpose.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">📅</span>
                  Date & Time
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Time *</label>
                    <select
                      value={bookingData.startTime}
                      onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                      }
                    >
                      <option value="">Select start time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>End Time *</label>
                    <select
                      value={bookingData.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                    >
                      <option value="">Select end time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">📝</span>
                  Event Details
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Event Title *</label>
                    <input
                      type="text"
                      value={bookingData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Expected Attendees</label>
                    <input
                      type="number"
                      value={bookingData.capacity}
                      onChange={(e) =>
                        handleInputChange("capacity", e.target.value)
                      }
                      placeholder="Number of attendees"
                      max={selectedRoom.capacity}
                    />
                    <small>Maximum capacity: {selectedRoom.capacity}</small>
                  </div>
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      value={bookingData.priority}
                      onChange={(e) =>
                        handleInputChange("priority", e.target.value)
                      }
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={bookingData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe the event purpose and any special requirements..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">🔧</span>
                  Additional Equipment
                </h4>
                <div className="equipment-selection">
                  {equipmentOptions.map((equipment) => (
                    <div key={equipment} className="equipment-option">
                      <input
                        type="checkbox"
                        id={equipment}
                        checked={bookingData.equipment.includes(equipment)}
                        onChange={() => handleEquipmentToggle(equipment)}
                      />
                      <label htmlFor={equipment}>{equipment}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">🔄</span>
                  Recurring Booking
                </h4>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={bookingData.recurring}
                    onChange={(e) =>
                      handleInputChange("recurring", e.target.checked)
                    }
                  />
                  <label htmlFor="recurring">
                    Make this a recurring booking
                  </label>
                </div>

                {bookingData.recurring && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Repeat</label>
                      <select
                        value={bookingData.recurringType}
                        onChange={(e) =>
                          handleInputChange("recurringType", e.target.value)
                        }
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        value={bookingData.recurringEnd}
                        onChange={(e) =>
                          handleInputChange("recurringEnd", e.target.value)
                        }
                        min={bookingData.date}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">🔔</span>
                  Notifications
                </h4>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="notifyAdmin"
                    checked={bookingData.notifyAdmin}
                    onChange={(e) =>
                      handleInputChange("notifyAdmin", e.target.checked)
                    }
                  />
                  <label htmlFor="notifyAdmin">
                    Notify administration about this booking
                  </label>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="booking-summary">
                <h4>📋 Booking Summary</h4>
                <div className="summary-content">
                  <div className="summary-item">
                    <strong>Room:</strong> {selectedRoom.name} (
                    {selectedRoom.type})
                  </div>
                  <div className="summary-item">
                    <strong>Purpose:</strong>{" "}
                    {
                      bookingPurposes.find(
                        (p) => p.value === bookingData.purpose
                      )?.label
                    }
                  </div>
                  {bookingData.date && (
                    <div className="summary-item">
                      <strong>Date:</strong> {formatDate(bookingData.date)}
                    </div>
                  )}
                  {bookingData.startTime && bookingData.endTime && (
                    <div className="summary-item">
                      <strong>Time:</strong> {bookingData.startTime} -{" "}
                      {bookingData.endTime}
                    </div>
                  )}
                  <div className="summary-item">
                    <strong>Capacity:</strong> {selectedRoom.capacity} people
                    maximum
                  </div>
                  {bookingData.equipment.length > 0 && (
                    <div className="summary-item">
                      <strong>Equipment:</strong>{" "}
                      {bookingData.equipment.join(", ")}
                    </div>
                  )}
                  {bookingData.recurring && (
                    <div className="summary-item">
                      <strong>Recurring:</strong> {bookingData.recurringType}{" "}
                      until {bookingData.recurringEnd}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {selectedRoom && (
            <div className="action-buttons">
              <button
                className="action-btn secondary"
                onClick={() => handleSubmit("draft")}
              >
                Save as Draft
              </button>
              <button
                className="action-btn success"
                onClick={() => handleSubmit("book")}
                disabled={
                  !bookingData.date ||
                  !bookingData.startTime ||
                  !bookingData.endTime ||
                  !bookingData.title
                }
              >
                Reserve Room
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReserveRoom;
