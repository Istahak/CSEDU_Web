import React from "react";
import "./LabBookingSuccess.css";

const LabBookingSuccess = ({
  bookingData,
  onBackToBooking,
  onAddToCalendar,
}) => {
  const handleAddToCalendar = () => {
    if (onAddToCalendar) {
      onAddToCalendar(bookingData);
    } else {
      // Create calendar event data
      const startDate = new Date(
        bookingData.date + " " + bookingData.time.split(" - ")[0]
      );
      const endDate = new Date(
        bookingData.date + " " + bookingData.time.split(" - ")[1]
      );

      const calendarData = {
        title: `Lab Equipment Booking - ${bookingData.equipment}`,
        start: startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        end: endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        description: `Lab equipment booking for ${bookingData.equipment}. Please arrive 5 minutes early for setup.`,
        location: "Computer Science Lab, University of Dhaka",
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

  const generateBookingId = () => {
    return "LAB-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const bookingId = generateBookingId();

  return (
    <div className="lab-booking-success-page">
      <div className="lab-booking-success-container">
        <div className="success-content">
          <div className="success-icon">
            <div className="checkmark-circle">
              <div className="checkmark">✓</div>
            </div>
          </div>

          <div className="success-header">
            <h1>Booking Confirmed!</h1>
            <p className="success-subtitle">
              Your lab equipment booking has been successfully submitted and is
              pending approval.
            </p>
          </div>

          <div className="booking-reference">
            <div className="reference-card">
              <h3>Booking Reference</h3>
              <div className="booking-id">{bookingId}</div>
              <p>Please save this reference number for your records</p>
            </div>
          </div>

          <div className="booking-details-card">
            <h2>Booking Details</h2>
            <div className="booking-info">
              <div className="info-item">
                <div className="info-icon">🔧</div>
                <div className="info-content">
                  <span className="info-label">Equipment</span>
                  <span className="info-value">{bookingData?.equipment}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📅</div>
                <div className="info-content">
                  <span className="info-label">Date</span>
                  <span className="info-value">
                    {formatDate(bookingData?.date)}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">⏰</div>
                <div className="info-content">
                  <span className="info-label">Time Slot</span>
                  <span className="info-value">{bookingData?.time}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">
                    Computer Science Lab, University of Dhaka
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📋</div>
                <div className="info-content">
                  <span className="info-label">Status</span>
                  <span className="info-value">
                    <span className="status-badge pending">
                      Pending Approval
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-calendar-btn" onClick={handleAddToCalendar}>
              📅 Add to Calendar
            </button>
            <button className="back-to-booking-btn" onClick={onBackToBooking}>
              Make Another Booking
            </button>
          </div>

          <div className="approval-notice">
            <div className="notice-icon">⏳</div>
            <div className="notice-content">
              <h4>Approval Process</h4>
              <p>
                Your booking request will be reviewed by the lab administrator.
                You will receive an email notification within 24 hours regarding
                the approval status. Please check your email regularly.
              </p>
            </div>
          </div>

          <div className="important-info">
            <h3>Important Information</h3>
            <div className="info-cards">
              <div className="info-card">
                <div className="card-icon">📧</div>
                <h4>Email Confirmation</h4>
                <p>
                  A confirmation email with detailed instructions has been sent
                  to your registered email address.
                </p>
              </div>

              <div className="info-card">
                <div className="card-icon">🕐</div>
                <h4>Arrival Time</h4>
                <p>
                  Please arrive 10 minutes before your scheduled time slot for
                  equipment setup and orientation.
                </p>
              </div>

              <div className="info-card">
                <div className="card-icon">📱</div>
                <h4>Contact Information</h4>
                <p>
                  For urgent inquiries, contact the lab at{" "}
                  <strong>+880-123-456789</strong> or{" "}
                  <strong>lab@csedu.ac.bd</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h3>What Happens Next?</h3>
            <div className="steps-timeline">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Request Review</h4>
                  <p>
                    Lab administrator reviews your booking request and checks
                    equipment availability.
                  </p>
                  <span className="step-time">Within 24 hours</span>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Approval Notification</h4>
                  <p>
                    You'll receive an email with approval status and any
                    additional instructions.
                  </p>
                  <span className="step-time">Within 24-48 hours</span>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Equipment Usage</h4>
                  <p>
                    Arrive at the scheduled time with your student ID and
                    confirmation email.
                  </p>
                  <span className="step-time">On booking date</span>
                </div>
              </div>
            </div>
          </div>

          <div className="policies-section">
            <h3>Booking Policies</h3>
            <div className="policies-list">
              <div className="policy-item">
                <span className="policy-icon">⚠️</span>
                <span>
                  Cancellations must be made at least 2 hours before the
                  scheduled time.
                </span>
              </div>
              <div className="policy-item">
                <span className="policy-icon">🎓</span>
                <span>Valid student ID is required for equipment access.</span>
              </div>
              <div className="policy-item">
                <span className="policy-icon">🔒</span>
                <span>
                  Equipment must be returned in the same condition as received.
                </span>
              </div>
              <div className="policy-item">
                <span className="policy-icon">📖</span>
                <span>
                  Follow all safety guidelines and equipment usage protocols.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabBookingSuccess;
