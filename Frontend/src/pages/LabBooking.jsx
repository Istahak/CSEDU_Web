import React, { useState } from "react";
import "./LabBooking.css";

const LabBooking = ({ onBack, onBookingComplete }) => {
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [datePickerMode, setDatePickerMode] = useState("dropdown"); // "dropdown" or "calendar"
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const equipment = [
    {
      id: 1,
      name: "GPU",
      category: "gpu",
      description:
        "High-performance graphics processing unit for machine learning and computational tasks",
      availability: "available",
      specifications: "NVIDIA RTX 4090, 24GB VRAM",
      image: "💻",
    },
    {
      id: 2,
      name: "Sensor",
      category: "sensor",
      description:
        "IoT sensors for environmental monitoring and data collection",
      availability: "available",
      specifications: "Temperature, Humidity, Light, Motion sensors",
      image: "📡",
    },
    {
      id: 3,
      name: "Camera",
      category: "camera",
      description:
        "High-resolution cameras for computer vision and image processing projects",
      availability: "booked",
      specifications: "4K Resolution, 60fps, USB 3.0",
      image: "📷",
    },
    {
      id: 4,
      name: "Microscope",
      category: "microscope",
      description:
        "Digital microscope for detailed component analysis and research",
      availability: "available",
      specifications: "1000x magnification, Digital display",
      image: "🔬",
    },
    {
      id: 5,
      name: "Oscilloscope",
      category: "measurement",
      description: "Digital oscilloscope for electrical signal analysis",
      availability: "available",
      specifications: "4-channel, 100MHz bandwidth",
      image: "📊",
    },
    {
      id: 6,
      name: "3D Printer",
      category: "fabrication",
      description: "3D printer for rapid prototyping and project development",
      availability: "maintenance",
      specifications: "PLA/ABS compatible, 200x200x200mm build volume",
      image: "🏭",
    },
  ];

  const categories = [
    { id: "all", name: "All Equipment", icon: "🔧" },
    { id: "gpu", name: "GPU", icon: "💻" },
    { id: "sensor", name: "Sensors", icon: "📡" },
    { id: "camera", name: "Cameras", icon: "📷" },
    { id: "microscope", name: "Microscopes", icon: "🔬" },
    { id: "measurement", name: "Measurement", icon: "📊" },
    { id: "fabrication", name: "Fabrication", icon: "🏭" },
  ];

  const timeSlots = [
    { id: "morning1", time: "09:00 AM - 11:00 AM", period: "Morning" },
    { id: "morning2", time: "11:00 AM - 01:00 PM", period: "Morning" },
    { id: "afternoon1", time: "02:00 PM - 04:00 PM", period: "Afternoon" },
    { id: "afternoon2", time: "04:00 PM - 06:00 PM", period: "Afternoon" },
    { id: "evening", time: "06:00 PM - 08:00 PM", period: "Evening" },
  ];

  const bookingHistory = [
    {
      id: 1,
      equipment: "GPU",
      date: "2024-08-15",
      time: "10:00 AM - 12:00 PM",
      status: "Approved",
    },
    {
      id: 2,
      equipment: "Sensor",
      date: "2024-08-20",
      time: "02:00 PM - 04:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      equipment: "Camera",
      date: "2024-09-05",
      time: "09:00 AM - 11:00 AM",
      status: "Rejected",
    },
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

  const handleBooking = () => {
    if (!selectedEquipment || !selectedDate || !selectedTime) {
      alert(
        "Please select equipment, date, and time slot to proceed with booking."
      );
      return;
    }

    // Generate booking reference
    const bookingRef = `BK${Date.now().toString().slice(-6)}`;

    // Get the selected equipment details
    const selectedEquipmentDetails = equipment.find(
      (item) => item.name === selectedEquipment
    );

    // Create booking data
    const bookingData = {
      bookingReference: bookingRef,
      equipment: selectedEquipment,
      equipmentDetails: selectedEquipmentDetails,
      date: selectedDate,
      time: selectedTime,
      status: "Confirmed",
      submittedAt: new Date().toISOString(),
      userInfo: {
        name: "Student Name",
        studentId: "CSE-2020-2021",
        email: "student@csedu.ac.bd",
      },
    };

    // Call the callback to navigate to success page
    onBookingComplete(bookingData);
  };

  // Generate available dates for the next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
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
          shortLabel: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Calendar functions
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return { calendar, monthName: monthNames[currentMonth], year: currentYear };
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const isDateDisabled = (day) => {
    const today = new Date();
    const checkDate = new Date(currentYear, currentMonth, day);
    return checkDate < today;
  };

  const formatDateForSelection = (day) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const { calendar, monthName, year } = generateCalendar();

  return (
    <div className="lab-booking-page">
      <div className="lab-booking-container">
        {/* Header Section */}
        <div className="booking-header">
          {onBack && (
            <button onClick={onBack} className="back-button">
              ← Back
            </button>
          )}
          <div className="header-content">
            <h1>Lab Equipment Booking</h1>
            <p>
              Reserve laboratory equipment for your research and academic
              projects
            </p>
          </div>
        </div>

        {/* Main Booking Interface */}
        <div className="booking-main">
          {/* Left Side - Equipment Selection */}
          <div className="equipment-panel">
            <div className="panel-header">
              <h2>Select Equipment</h2>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>

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
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Equipment Grid */}
            <div className="equipment-grid">
              {filteredEquipment.map((item) => (
                <div
                  key={item.id}
                  className={`equipment-card ${
                    selectedEquipment === item.name ? "selected" : ""
                  } ${item.availability}`}
                  onClick={() =>
                    item.availability === "available" &&
                    setSelectedEquipment(item.name)
                  }
                >
                  <div className="equipment-image">{item.image}</div>
                  <div className="equipment-info">
                    <h3>{item.name}</h3>
                    <p className="equipment-description">{item.description}</p>
                    <p className="equipment-specs">{item.specifications}</p>
                    <div className={`availability-status ${item.availability}`}>
                      {item.availability === "available" && "✅ Available"}
                      {item.availability === "booked" && "⏰ Booked"}
                      {item.availability === "maintenance" && "🔧 Maintenance"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Date & Time Selection */}
          <div className="booking-panel">
            <div className="panel-header">
              <h2>Select Date & Time</h2>
            </div>

            {/* Date Selection */}
            <div className="date-selection">
              <div className="date-selection-header">
                <h3>Select Date</h3>
                <div className="date-picker-toggle">
                  <button 
                    className={`toggle-btn ${datePickerMode === "dropdown" ? "active" : ""}`}
                    onClick={() => setDatePickerMode("dropdown")}
                  >
                    📋 Dropdown
                  </button>
                  <button 
                    className={`toggle-btn ${datePickerMode === "calendar" ? "active" : ""}`}
                    onClick={() => setDatePickerMode("calendar")}
                  >
                    📅 Calendar
                  </button>
                </div>
              </div>

              {datePickerMode === "dropdown" ? (
                <div className="dropdown-picker">
                  <div className="date-picker-container">
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="date-picker"
                    >
                      <option value="">Choose a date...</option>
                      {availableDates.map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedDate && (
                    <div className="selected-date-preview">
                      <span className="date-icon">📅</span>
                      <span className="date-text">
                        {availableDates.find(d => d.value === selectedDate)?.shortLabel}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="calendar-picker">
                  <div className="calendar-header">
                    <button
                      onClick={() => navigateMonth("prev")}
                      className="nav-btn"
                    >
                      ←
                    </button>
                    <h3>{monthName} {year}</h3>
                    <button
                      onClick={() => navigateMonth("next")}
                      className="nav-btn"
                    >
                      →
                    </button>
                  </div>

                  <div className="calendar-grid">
                    <div className="calendar-weekdays">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div key={day} className="weekday">
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="calendar-days">
                      {calendar.map((day, index) => (
                        <div
                          key={index}
                          className={`calendar-day ${day ? "active" : "inactive"} ${
                            day && isDateDisabled(day) ? "disabled" : ""
                          } ${
                            day && selectedDate === formatDateForSelection(day)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            day &&
                            !isDateDisabled(day) &&
                            setSelectedDate(formatDateForSelection(day))
                          }
                        >
                          {day || ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Time Slots */}
            <div className="time-slots-container">
              <h3>Available Time Slots</h3>
              <div className="time-slots">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    className={`time-slot ${
                      selectedTime === slot.time ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    <span className="time-period">{slot.period}</span>
                    <span className="time-range">{slot.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="label">Equipment:</span>
                  <span className="value">
                    {selectedEquipment || "Not selected"}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Date:</span>
                  <span className="value">
                    {selectedDate
                      ? new Date(selectedDate).toLocaleDateString()
                      : "Not selected"}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Time:</span>
                  <span className="value">
                    {selectedTime || "Not selected"}
                  </span>
                </div>
              </div>
              <button
                className="book-now-btn"
                onClick={handleBooking}
                disabled={!selectedEquipment || !selectedDate || !selectedTime}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="booking-history">
          <h2>Recent Bookings</h2>
          <div className="booking-table">
            <div className="table-header">
              <span>Equipment</span>
              <span>Date</span>
              <span>Time</span>
              <span>Status</span>
            </div>
            {bookingHistory.map((booking) => (
              <div key={booking.id} className="table-row">
                <span>{booking.equipment}</span>
                <span>{new Date(booking.date).toLocaleDateString()}</span>
                <span>{booking.time}</span>
                <span
                  className={`status-badge ${booking.status.toLowerCase()}`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabBooking;
