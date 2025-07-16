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
                <strong>Computer Science & Engineering Department</strong>
              </p>
              <p>Science Complex, University of Dhaka</p>
              <p>Shahbagh, Dhaka-1000, Bangladesh</p>
              <p className="coordinates">
                <small>📍 Plus Code: P9HX+FJ6</small>
              </p>
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
                    Science Complex, University of Dhaka
                    <br />
                    Shahbagh, Dhaka-1000
                    <br />
                    Plus Code: P9HX+FJ6
                  </p>
                </div>
              </div>
            </div>

            <div className="map-section">
              <h3>Find Us on Map</h3>
              <div className="interactive-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1865647!2d90.39678!3d23.72874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ef3976bbbd%3A0x1b3140066a1d7bb8!2sDepartment%20of%20Computer%20Science%20and%20Engineering%2C%20University%20of%20Dhaka!5e0!3m2!1sen!2sbd!4v1642234567890!5m2!1sen!2sbd"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Department of Computer Science and Engineering, University of Dhaka"
                ></iframe>
                <div className="map-overlay">
                  <button
                    className="view-in-google-maps"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/place/Department+of+Computer+Science+and+Engineering,+University+of+Dhaka/@23.7339668,90.3744711,2503m/data=!3m1!1e3!4m10!1m2!2m1!1sdu+cse+department+google+map+location+latitude+and+longitude!3m6!1s0x3755b8ef3976bbbd:0x1b3140066a1d7bb8!8m2!3d23.7287386!4d90.3990829!15sCjxkdSBjc2UgZGVwYXJ0bWVudCBnb29nbGUgbWFwIGxvY2F0aW9uIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUiA4gBAZIBFXVuaXZlcnNpdHlfZGVwYXJ0bWVudKoB0wEKDS9nLzExYzU5cDBnOG4KCS9tLzA0NWM3YgoIL20vMDRfdGIKCS9tLzA3dzVycRABKj0iOWNzZSBkZXBhcnRtZW50IGdvb2dsZSBtYXAgbG9jYXRpb24gbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSgAMh8QASIbiD2CLaSBVQ4BJWT7z_NWA5yDzzmk7iS-b2QyMkAQAiI8ZHUgY3NlIGRlcGFydG1lbnQgZ29vZ2xlIG1hcCBsb2NhdGlvbiBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRl4AEA!16s%2Fg%2F11b8t85phy!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D",
                        "_blank"
                      )
                    }
                  >
                    🗺️ View in Google Maps
                  </button>
                </div>
              </div>
              <div className="directions-info">
                <p>
                  <strong>Directions:</strong> The CSE Department is located in
                  the Science Complex building within the University of Dhaka
                  campus in Shahbagh area. The Science Complex houses modern
                  computer labs, classrooms, and research facilities for the
                  department. You can reach here by rickshaw, bus, or car from
                  any part of Dhaka city. Use Plus Code P9HX+FJ6 for precise GPS
                  navigation.
                </p>
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
