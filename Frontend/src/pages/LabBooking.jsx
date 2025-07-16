import React, { useState } from "react";
import "./LabBooking.css";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDesktop, FaMicrochip, FaCog } from "react-icons/fa";

const LabBooking = ({ onBack, onBookingComplete }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    purpose: "",
    specialRequests: "",
    supervisorEmail: "",
    acceptTerms: false,
  });

  const equipment = [
    {
      id: 1,
      name: "High-Performance GPU Lab",
      category: "gpu",
      description: "High-performance graphics processing unit for machine learning and computational tasks",
      availability: "available",
      specifications: "NVIDIA RTX 4090, 24GB VRAM",
      location: "CSE Lab 101",
      capacity: "8 Students",
      supervisor: "Dr. Ahmed Rahman",
      icon: <FaDesktop />,
      features: ["CUDA Support", "Deep Learning", "Parallel Computing", "Research Projects"],
    },
    {
      id: 2,
      name: "IoT Sensor Laboratory",
      category: "sensor",
      description: "IoT sensors for environmental monitoring and data collection",
      availability: "available",
      specifications: "Temperature, Humidity, Light, Motion sensors",
      location: "CSE Lab 102",
      capacity: "12 Students",
      supervisor: "Dr. Sara Khan",
      icon: <FaMicrochip />,
      features: ["Arduino Integration", "Real-time Data", "Wireless Connectivity", "Environmental Monitoring"],
    },
    {
      id: 3,
      name: "Computer Vision Lab",
      category: "camera",
      description: "High-resolution cameras for computer vision and image processing projects",
      availability: "booked",
      specifications: "4K Resolution, 60fps, USB 3.0",
      location: "CSE Lab 103",
      capacity: "10 Students",
      supervisor: "Dr. John Smith",
      icon: <FaCog />,
      features: ["Image Processing", "Object Detection", "Video Analysis", "Pattern Recognition"],
    },
    {
      id: 4,
      name: "Digital Analysis Lab",
      category: "microscope",
      description: "Digital microscope for detailed component analysis and research",
      availability: "available",
      specifications: "1000x magnification, Digital display",
      location: "CSE Lab 104",
      capacity: "6 Students",
      supervisor: "Dr. Emily Chen",
      icon: <FaCog />,
      features: ["Digital Imaging", "Component Analysis", "Research Support", "High Magnification"],
    },
    {
      id: 5,
      name: "Electronics Measurement Lab",
      category: "measurement",
      description: "Digital oscilloscope for electrical signal analysis",
      availability: "available",
      specifications: "4-channel, 100MHz bandwidth",
      location: "CSE Lab 105",
      capacity: "15 Students",
      supervisor: "Dr. Michael Brown",
      icon: <FaCog />,
      features: ["Signal Analysis", "Circuit Testing", "Electronics Projects", "Measurements"],
    },
    {
      id: 6,
      name: "3D Fabrication Lab",
      category: "fabrication",
      description: "3D printer for rapid prototyping and project development",
      availability: "maintenance",
      specifications: "PLA/ABS compatible, 200x200x200mm build volume",
      location: "CSE Lab 106",
      capacity: "8 Students",
      supervisor: "Dr. Lisa Wong",
      icon: <FaCog />,
      features: ["3D Printing", "Rapid Prototyping", "Design Iteration", "Material Testing"],
    },
  ];

  const categories = [
    { id: "all", name: "All Labs", icon: <FaCog /> },
    { id: "gpu", name: "GPU Computing", icon: <FaDesktop /> },
    { id: "sensor", name: "IoT Sensors", icon: <FaMicrochip /> },
    { id: "camera", name: "Computer Vision", icon: <FaCog /> },
    { id: "microscope", name: "Digital Analysis", icon: <FaCog /> },
    { id: "measurement", name: "Measurement", icon: <FaCog /> },
    { id: "fabrication", name: "3D Fabrication", icon: <FaCog /> },
  ];

  const timeSlots = [
    { id: "morning1", time: "09:00 AM - 11:00 AM", period: "Morning" },
    { id: "morning2", time: "11:00 AM - 01:00 PM", period: "Late Morning" },
    { id: "afternoon1", time: "02:00 PM - 04:00 PM", period: "Afternoon" },
    { id: "afternoon2", time: "04:00 PM - 06:00 PM", period: "Late Afternoon" },
    { id: "evening", time: "06:00 PM - 08:00 PM", period: "Evening" },
  ];

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (hasSubmitted && type !== "checkbox") {
      // Allow users to clear validation errors by typing
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // Check for validation errors
    const hasRequiredFieldErrors = !selectedEquipment || !selectedDate || !selectedTime || !formData.purpose;
    
    if (hasRequiredFieldErrors) {
      alert("Please fill in all required fields and make your selections.");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate booking reference
    const bookingRef = `LAB${Date.now().toString().slice(-6)}`;

    // Create booking data
    const bookingData = {
      bookingReference: bookingRef,
      equipment: selectedEquipment,
      date: selectedDate,
      time: selectedTime,
      purpose: formData.purpose,
      specialRequests: formData.specialRequests,
      supervisorEmail: formData.supervisorEmail,
      status: "Confirmed",
      submittedAt: new Date().toISOString(),
    };

    setIsSubmitting(false);

    if (onBookingComplete) {
      onBookingComplete(bookingData);
    }
  };

  // Generate available dates for the next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i < 31; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
        });
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  if (!selectedEquipment) {
    return (
      <div className="lab-booking-page">
        <div className="equipment-header-row">
          <h2 className="header-title">Select Laboratory</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search laboratories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>


        <div className="lab-booking-container">
          <div className="equipment-selection">
            {/* <h2>Select Lab</h2> */}
            {/* <h2>Select Laboratory</h2> */}
            {/* <div className="equipment-header-block">
              <h2 className="header-title">Select Laboratory</h2>
            </div> */}
            {/* Category Filter */}
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            {/* <div className="search-container">
              <input
                type="text"
                placeholder="Search laboratories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div> */}

            {/* Equipment Grid */}
            <div className="equipment-grid">
              {filteredEquipment.map((item) => (
                <div
                  key={item.id}
                  className={`equipment-card ${
                    item.availability === "available" ? "clickable" : "disabled"
                  }`}
                  onClick={() =>
                    item.availability === "available" &&
                    setSelectedEquipment(item)
                  }
                >
                  <div className="equipment-header">
                    <div className="equipment-icon">{item.icon}</div>
                    <div className={`availability-badge ${item.availability}`}>
                      {item.availability === "available" && "Available"}
                      {item.availability === "booked" && "Booked"}
                      {item.availability === "maintenance" && "Maintenance"}
                    </div>
                  </div>
                  
                  <div className="equipment-content">
                    <h3>{item.name}</h3>
                    <p className="equipment-description">{item.description}</p>
                    
                    <div className="equipment-details">
                      <div className="detail-item">
                        <FaMapMarkerAlt className="detail-icon" />
                        <span>{item.location}</span>
                      </div>
                      <div className="detail-item">
                        <FaClock className="detail-icon" />
                        <span>{item.capacity}</span>
                      </div>
                    </div>

                    <div className="equipment-features">
                      {item.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="lab-booking-page">
      <div className="lab-booking-container">
        <div className="booking-content">
          {/* Lab Details Section */}
          <div className="lab-summary">
            <div className="lab-summary-image">
              <div className="lab-summary-placeholder">
                {selectedEquipment.icon}
              </div>
              <div className="lab-summary-badge">
                <span className={`status-badge ${selectedEquipment.availability}`}>
                  {selectedEquipment.availability === "available" ? "Available" : 
                   selectedEquipment.availability === "booked" ? "Busy" : "Maintenance"}
                </span>
              </div>
            </div>

            <div className="lab-summary-details">
              <h2 className="lab-summary-title">{selectedEquipment.name}</h2>
              <div className="lab-summary-category">
                <span className="category-tag">
                  {categories.find(cat => cat.id === selectedEquipment.category)?.name}
                </span>
              </div>

              <div className="lab-summary-info">
                <div className="summary-info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <strong>Location</strong>
                    <p>{selectedEquipment.location}</p>
                  </div>
                </div>

                <div className="summary-info-item">
                  <FaClock className="info-icon" />
                  <div>
                    <strong>Capacity</strong>
                    <p>{selectedEquipment.capacity}</p>
                  </div>
                </div>

                <div className="summary-info-item">
                  <FaDesktop className="info-icon" />
                  <div>
                    <strong>Supervisor</strong>
                    <p>{selectedEquipment.supervisor}</p>
                  </div>
                </div>
              </div>

              {/* Lab Features */}
              <div className="lab-features">
                <h3>Lab Features</h3>
                {selectedEquipment.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              <div className="lab-specifications">
                <h3>Equipment Specifications</h3>
                <p>{selectedEquipment.specifications}</p>
              </div>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="booking-form-section">
            <h2>Lab Booking Request</h2>
            <form onSubmit={handleSubmit} className="booking-form" noValidate>
              <div className="form-group">
                <label htmlFor="selectedDate">Select Date *</label>
                <select
                  id="selectedDate"
                  name="selectedDate"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={hasSubmitted && !selectedDate ? "invalid" : ""}
                >
                  <option value="">Choose a date...</option>
                  {availableDates.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="selectedTime">Select Time Slot *</label>
                <select
                  id="selectedTime"
                  name="selectedTime"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className={hasSubmitted && !selectedTime ? "invalid" : ""}
                >
                  <option value="">Choose a time slot...</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.time}>
                      {slot.time} ({slot.period})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="purpose">Purpose of Booking *</label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Describe the purpose of your lab booking (research project, assignment, etc.)"
                  rows="4"
                  className={hasSubmitted && !formData.purpose ? "invalid" : ""}
                />
              </div>

              <div className="form-group">
                <label htmlFor="supervisorEmail">Supervisor Email</label>
                <input
                  type="email"
                  id="supervisorEmail"
                  name="supervisorEmail"
                  value={formData.supervisorEmail}
                  onChange={handleInputChange}
                  placeholder="supervisor@csedu.ac.bd"
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Special Requirements</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or accommodations needed"
                  rows="3"
                />
              </div>

              <div className="requirements-section">
                <h3>Booking Requirements</h3>
                <div className="requirement-item">
                  <span>Valid student ID required</span>
                </div>
                <div className="requirement-item">
                  <span>Lab safety guidelines must be followed</span>
                </div>
                <div className="requirement-item">
                  <span>Supervisor approval may be required</span>
                </div>
              </div>

              <div className="terms-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                  />
                  {/* <span className="checkmark"></span> */}
                  I accept the terms and
                  conditions and lab safety regulations
                </label>
              </div>

              <button
                type="submit"
                className="booking-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit Booking Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabBooking;
