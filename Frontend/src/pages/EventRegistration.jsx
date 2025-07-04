import React, { useState } from "react";
import "./EventRegistration.css";

const EventRegistration = ({ event, onBack, onRegisterComplete }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    specialRequests: "",
    paymentMethod: "credit-card",
    acceptTerms: false,
    studentId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const departments = [
    "Computer Science & Engineering",
    "Electrical & Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Physics",
    "Chemistry",
    "Mathematics",
    "English",
    "Other",
  ];

  const isPaidEvent = event?.status !== "FREE";
  const eventFee = isPaidEvent ? 50 : 0; // Example fee

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (isPaidEvent && !showPayment) {
      setShowPayment(true);
      setIsSubmitting(false);
      return;
    }

    // Complete registration
    setIsSubmitting(false);

    if (onRegisterComplete) {
      onRegisterComplete(formData);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    if (onRegisterComplete) {
      onRegisterComplete(formData);
    }
  };

  if (!event) {
    return (
      <div className="registration-page">
        <div className="registration-container">
          <div className="error-message">
            <h2>Event not found</h2>
            <p>Please select an event to register for.</p>
            {onBack && (
              <button onClick={onBack} className="back-button">
                ← Back to Events
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">
      <div className="registration-container">
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back to Events
          </button>
        )}

        <div className="registration-content">
          {/* Event Details Section */}
          <div className="event-summary">
            <div className="event-summary-image">
              <div className="event-summary-placeholder">
                <span className="event-summary-icon">📅</span>
              </div>
              <div className="event-summary-badge">
                <span
                  className={`status-badge ${
                    event.status === "FREE" ? "free" : "paid"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </div>

            <div className="event-summary-details">
              <h2 className="event-summary-title">{event.title}</h2>
              <div className="event-summary-category">
                <span className="category-tag">{event.category}</span>
              </div>

              <div className="event-summary-info">
                <div className="summary-info-item">
                  <span className="info-icon">📅</span>
                  <div>
                    <strong>Date & Time</strong>
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                </div>

                <div className="summary-info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>{event.location}</p>
                  </div>
                </div>

                <div className="summary-info-item">
                  <span className="info-icon">👥</span>
                  <div>
                    <strong>Attendance</strong>
                    <p>{event.attendees}</p>
                  </div>
                </div>
              </div>

              {/* Event Agenda */}
              <div className="event-agenda">
                <h3>Event Agenda</h3>
                <div className="agenda-item">
                  <span className="agenda-time">09:00 AM</span>
                  <span className="agenda-activity">
                    Registration & Welcome
                  </span>
                </div>
                <div className="agenda-item">
                  <span className="agenda-time">10:00 AM</span>
                  <span className="agenda-activity">Opening Ceremony</span>
                </div>
                <div className="agenda-item">
                  <span className="agenda-time">11:00 AM</span>
                  <span className="agenda-activity">Main Presentation</span>
                </div>
                <div className="agenda-item">
                  <span className="agenda-time">01:00 PM</span>
                  <span className="agenda-activity">Lunch Break</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form Section */}
          <div className="registration-form-section">
            {!showPayment ? (
              <>
                <h2>Event Registration</h2>
                <form onSubmit={handleSubmit} className="registration-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Department/Major *</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="specialRequests">
                      Special Requests or Accommodations
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special accommodations or requests"
                      rows="4"
                    />
                  </div>

                  <div className="requirements-section">
                    <h3>Requirements</h3>
                    <div className="requirement-item">
                      <span className="requirement-icon">✓</span>
                      <span>Student ID required</span>
                    </div>
                    <div className="requirement-item">
                      <span className="requirement-icon">✓</span>
                      <span>Business casual attire recommended</span>
                    </div>
                    {isPaidEvent && (
                      <div className="requirement-item">
                        <span className="requirement-icon">💳</span>
                        <span>Payment required: ${eventFee}</span>
                      </div>
                    )}
                  </div>

                  <div className="terms-section">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="checkmark"></span>I accept the terms and
                      conditions and privacy policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="registration-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : isPaidEvent
                      ? "Proceed to Payment"
                      : "Complete Registration"}
                  </button>
                </form>
              </>
            ) : (
              /* Payment Form */
              <>
                <h2>Payment Information</h2>
                <div className="payment-summary">
                  <div className="payment-item">
                    <span>Event Registration Fee</span>
                    <span>${eventFee}</span>
                  </div>
                  <div className="payment-item total">
                    <span>
                      <strong>Total Amount</strong>
                    </span>
                    <span>
                      <strong>${eventFee}</strong>
                    </span>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="payment-form">
                  <div className="payment-methods">
                    <h3>Payment Method</h3>
                    <div className="payment-options">
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === "credit-card"}
                          onChange={handleInputChange}
                        />
                        <span>Credit/Debit Card</span>
                      </label>
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={formData.paymentMethod === "bank-transfer"}
                          onChange={handleInputChange}
                        />
                        <span>Bank Transfer</span>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "credit-card" && (
                    <div className="card-details">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input type="text" placeholder="MM/YY" />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input type="text" placeholder="123" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Cardholder Name</label>
                        <input type="text" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "bank-transfer" && (
                    <div className="bank-details">
                      <h4>Bank Transfer Details</h4>
                      <p>
                        <strong>Account Name:</strong> University Events
                      </p>
                      <p>
                        <strong>Account Number:</strong> 1234567890
                      </p>
                      <p>
                        <strong>Bank:</strong> University Bank
                      </p>
                      <p>
                        <strong>Reference:</strong> {event.title} -{" "}
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                  )}

                  <div className="payment-actions">
                    <button
                      type="button"
                      className="back-to-form-btn"
                      onClick={() => setShowPayment(false)}
                    >
                      ← Back to Registration
                    </button>
                    <button
                      type="submit"
                      className="payment-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Processing Payment..."
                        : `Pay $${eventFee}`}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
