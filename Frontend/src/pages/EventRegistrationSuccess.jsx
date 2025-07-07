import React from "react";
import "./EventRegistrationSuccess.css";

const EventRegistrationSuccess = ({
  event,
  registrationData,
  onBackToEvents,
  onAddToCalendar,
}) => {
  const handleAddToCalendar = () => {
    if (onAddToCalendar) {
      onAddToCalendar(event);
    } else {
      // Create calendar event data
      const startDate = new Date(event.date);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

      const calendarData = {
        title: event.title,
        start: startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        end: endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        description: event.description,
        location: event.location || "Main Auditorium",
      };

      // Create calendar URL
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        calendarData.title
      )}&dates=${calendarData.start}/${
        calendarData.end
      }&details=${encodeURIComponent(
        calendarData.description
      )}&location=${encodeURIComponent(calendarData.location)}`;

      window.open(calendarUrl, "_blank");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "TBD";
    return timeString;
  };

  return (
    <div className="registration-success-page">
      <div className="registration-success-container">
        <div className="success-content">
          <div className="success-icon">
            <div className="checkmark-circle">
              <div className="checkmark">✓</div>
            </div>
          </div>

          <div className="success-header">
            <h1>Registration Successful!</h1>
            <p className="success-subtitle">
              You have successfully registered for{" "}
              <strong>{event?.title}</strong>
            </p>
          </div>

          <div className="event-details-card">
            <h2>Event Details</h2>
            <div className="event-info">
              <div className="info-item">
                <div className="info-content">
                  <span className="info-label">Date</span>
                  <span className="info-value">{formatDate(event?.date)}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-content">
                  <span className="info-label">Time</span>
                  <span className="info-value">{formatTime(event?.time)}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">{event?.location || "Main Auditorium"}</span>
                </div>
              </div>
              {event?.status !== "FREE" && (
                <div className="info-item">
                  <div className="info-content">
                    <span className="info-label">Registration Fee</span>
                    <span className="info-value">$50.00</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="registration-info-card">
            <h3>Your Registration Details</h3>
            <div className="registration-details">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">
                  {registrationData?.firstName} {registrationData?.lastName}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{registrationData?.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">
                  {registrationData?.phoneNumber}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">
                  {registrationData?.department}
                </span>
              </div>
              {registrationData?.studentId && (
                <div className="detail-row">
                  <span className="detail-label">Student ID:</span>
                  <span className="detail-value">
                    {registrationData?.studentId}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-calendar-btn" onClick={handleAddToCalendar}>
              Add to Calendar
            </button>
            <button className="back-to-events-btn" onClick={onBackToEvents}>
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationSuccess;
