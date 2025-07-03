import React, { useState } from "react";
import "./Contact.css";

const Contact = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
        )}

        <div className="contact-content">
          <div className="contact-info">
            <h1>Contact Us</h1>
            <p className="contact-description">
              We're here to help! Whether you have questions about admissions,
              academics, campus life, or anything else, our team is ready to
              assist you. Reach out to us through the contact form below, or
              find our address and an interactive map to our campus.
            </p>

            <div className="contact-form-section">
              <h2>Contact Form</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter the subject"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
                    rows="6"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>

          <div className="location-section">
            <h2>Our Location</h2>
            <div className="location-info">
              <p>
                <strong>Dhaka University</strong>
              </p>
              <p>Shahbagh, Dhaka-1000</p>
              <p>Bangladesh</p>
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <span className="icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>info@csedu.ac.bd</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>+880-2-9661920</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>
                    Computer Science & Engineering Department
                    <br />
                    Dhaka University, Shahbagh, Dhaka-1000
                  </p>
                </div>
              </div>
            </div>

            <div className="map-section">
              <div className="map-placeholder">
                <div className="map-grid">
                  <div className="map-icon">🗺️</div>
                  <p>Interactive Campus Map</p>
                  <p className="map-subtitle">
                    Click to view detailed campus location
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="additional-info">
          <div className="info-cards">
            <div className="info-card">
              <h3>🕒 Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="info-card">
              <h3>🎓 Admissions Office</h3>
              <p>For admission inquiries, please contact:</p>
              <p>Email: admissions@csedu.ac.bd</p>
              <p>Phone: +880-2-9661921</p>
            </div>

            <div className="info-card">
              <h3>🔬 Research Inquiries</h3>
              <p>For research collaboration:</p>
              <p>Email: research@csedu.ac.bd</p>
              <p>Phone: +880-2-9661922</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
