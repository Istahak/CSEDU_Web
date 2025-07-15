import React, { useState } from "react";
import "./EquipmentHistory.css";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDesktop, FaMicrochip, FaCog, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaUndoAlt } from "react-icons/fa";

const EquipmentHistory = ({ onBack }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const statusTypes = ["All", "Confirmed", "Pending", "Rejected", "Completed", "Cancelled"];
  const years = ["All", "2024", "2023", "2022"];
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Sample booking history data
  const bookingHistory = [
    {
      id: 1,
      bookingReference: "LAB001234",
      equipmentName: "High-Performance GPU Lab",
      location: "CSE Lab 101",
      category: "gpu",
      date: "2024-07-20",
      time: "09:00 AM - 11:00 AM",
      purpose: "Machine Learning Research Project",
      status: "confirmed",
      supervisor: "Dr. Ahmed Rahman",
      submittedDate: "2024-07-15",
      icon: <FaDesktop />,
      returnDate: null,
      specialRequests: "Need CUDA toolkit installed"
    },
    {
      id: 2,
      bookingReference: "LAB001235",
      equipmentName: "IoT Sensor Laboratory",
      location: "CSE Lab 102",
      category: "sensor",
      date: "2024-07-18",
      time: "02:00 PM - 04:00 PM",
      purpose: "Environmental Monitoring Assignment",
      status: "completed",
      supervisor: "Dr. Sara Khan",
      submittedDate: "2024-07-10",
      icon: <FaMicrochip />,
      returnDate: "2024-07-18",
      specialRequests: null
    },
    {
      id: 3,
      bookingReference: "LAB001236",
      equipmentName: "Computer Vision Lab",
      location: "CSE Lab 103",
      category: "camera",
      date: "2024-07-12",
      time: "11:00 AM - 01:00 PM",
      purpose: "Object Detection Project",
      status: "rejected",
      supervisor: "Dr. John Smith",
      submittedDate: "2024-07-08",
      icon: <FaCog />,
      returnDate: null,
      rejectionReason: "Lab already booked for that time slot"
    },
    {
      id: 4,
      bookingReference: "LAB001237",
      equipmentName: "Digital Analysis Lab",
      location: "CSE Lab 104",
      category: "microscope",
      date: "2024-07-25",
      time: "04:00 PM - 06:00 PM",
      purpose: "Component Analysis Research",
      status: "pending",
      supervisor: "Dr. Emily Chen",
      submittedDate: "2024-07-14",
      icon: <FaCog />,
      returnDate: null,
      specialRequests: null
    },
    {
      id: 5,
      bookingReference: "LAB001238",
      equipmentName: "Electronics Measurement Lab",
      location: "CSE Lab 105",
      category: "measurement",
      date: "2024-06-30",
      time: "09:00 AM - 11:00 AM",
      purpose: "Circuit Analysis Project",
      status: "completed",
      supervisor: "Dr. Michael Brown",
      submittedDate: "2024-06-25",
      icon: <FaCog />,
      returnDate: "2024-06-30",
      specialRequests: "Need oscilloscope calibration"
    },
    {
      id: 6,
      bookingReference: "LAB001239",
      equipmentName: "3D Fabrication Lab",
      location: "CSE Lab 106",
      category: "fabrication",
      date: "2024-06-15",
      time: "02:00 PM - 04:00 PM",
      purpose: "Prototype Development",
      status: "cancelled",
      supervisor: "Dr. Lisa Wong",
      submittedDate: "2024-06-10",
      icon: <FaCog />,
      returnDate: null,
      cancellationReason: "Equipment under maintenance"
    }
  ];

  const getFilteredHistory = () => {
    return bookingHistory.filter((booking) => {
      const statusMatch = selectedStatus === "All" || booking.status === selectedStatus.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        booking.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.purpose.toLowerCase().includes(searchTerm.toLowerCase());
      
      let dateMatch = true;
      if (selectedYear !== "All" || selectedMonth !== "All") {
        const bookingDate = new Date(booking.date);
        const yearMatch = selectedYear === "All" || bookingDate.getFullYear().toString() === selectedYear;
        const monthMatch = selectedMonth === "All" || bookingDate.toLocaleString('default', { month: 'long' }) === selectedMonth;
        dateMatch = yearMatch && monthMatch;
      }
      
      return statusMatch && searchMatch && dateMatch;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "confirmed";
      case "pending":
        return "pending";
      case "rejected":
        return "rejected";
      case "completed":
        return "completed";
      case "cancelled":
        return "cancelled";
      default:
        return "pending";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle />;
      case "pending":
        return <FaHourglassHalf />;
      case "rejected":
        return <FaTimesCircle />;
      case "completed":
        return <FaCheckCircle />;
      case "cancelled":
        return <FaTimesCircle />;
      default:
        return <FaHourglassHalf />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredHistory = getFilteredHistory();

  // Group bookings by status for better organization
  const activeBookings = filteredHistory.filter(booking => 
    ["confirmed", "pending"].includes(booking.status)
  );
  
  const completedBookings = filteredHistory.filter(booking => 
    ["completed", "rejected", "cancelled"].includes(booking.status)
  );

  return (
    <div className="equipment-history-page">
      <div className="equipment-history-container">
        
        {/* Header Section */}
        <div className="equipment-history-header">
          <div className="header-content">
            <button className="back-btn" onClick={() => onBack && onBack()}>
              ← Back to Booking
            </button>
            <h1 className="equipment-history-title">Equipment Booking History</h1>
            <p className="equipment-history-subtitle">
              Track your laboratory bookings, equipment usage, and booking status.
            </p>
          </div>
        </div>

        {/* Modern Filter/Search Section */}
        <div className="directory-controls">
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search bookings by equipment, reference, or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusTypes.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Year</label>
              <select
                className="filter-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "All" ? "All Years" : year}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Month</label>
              <select
                className="filter-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month === "All" ? "All Months" : month}
                  </option>
                ))}
              </select>
            </div>

            {(selectedStatus !== "All" || selectedYear !== "All" || selectedMonth !== "All") && (
              <div className="filter-group">
                <button
                  className="clear-filters-button"
                  onClick={() => {
                    setSelectedStatus("All");
                    setSelectedYear("All");
                    setSelectedMonth("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Bookings Section */}
        {activeBookings.length > 0 && (
          <div className="active-bookings-section">
            <h2 className="section-title">Active Bookings</h2>

            <div className="bookings-grid">
              {activeBookings.map((booking) => (
                <div key={booking.id} className="history-booking-card">
                  <div className="history-booking-header">
                    <div className="equipment-info">
                      <div className="equipment-icon small">{booking.icon}</div>
                      <div className="equipment-details">
                        <h4 className="history-booking-title">{booking.equipmentName}</h4>
                        <p className="history-booking-reference">#{booking.bookingReference}</p>
                      </div>
                    </div>
                    <span className={`booking-badge small ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {getStatusText(booking.status)}
                    </span>
                  </div>

                  <div className="history-booking-content">
                    <div className="history-details">
                      <div className="detail-item">
                        <FaMapMarkerAlt className="detail-icon" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="detail-item">
                        <FaCalendarAlt className="detail-icon" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-item">
                        <FaClock className="detail-icon" />
                        <span>{booking.time}</span>
                      </div>
                    </div>

                    <div className="purpose-brief">
                      <span>{booking.purpose}</span>
                    </div>

                    {booking.specialRequests && (
                      <div className="special-requests">
                        <strong>Special Requests:</strong> {booking.specialRequests}
                      </div>
                    )}
                  </div>

                  <div className="history-booking-footer">
                    <span className="submitted-date">
                      Submitted: {new Date(booking.submittedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking History Section */}
        <div className="history-section">
          <div className="history-header">
            <h2 className="section-title">Booking History</h2>
          </div>

          <div className="history-bookings">
            {completedBookings.map((booking) => (
              <div key={booking.id} className="history-booking-card">
                <div className="history-booking-header">
                  <div className="equipment-info">
                    <div className="equipment-icon small">{booking.icon}</div>
                    <div className="equipment-details">
                      <h4 className="history-booking-title">{booking.equipmentName}</h4>
                      <p className="history-booking-reference">#{booking.bookingReference}</p>
                    </div>
                  </div>
                  <span className={`booking-badge small ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    {getStatusText(booking.status)}
                  </span>
                </div>

                <div className="history-booking-content">
                  <div className="history-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <span>{booking.time}</span>
                    </div>
                    {booking.returnDate && (
                      <div className="detail-item">
                        <FaUndoAlt className="detail-icon" />
                        <span>Returned: {new Date(booking.returnDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="purpose-brief">
                    <span>{booking.purpose}</span>
                  </div>

                  {booking.rejectionReason && (
                    <div className="rejection-reason">
                      <strong>Rejection Reason:</strong> {booking.rejectionReason}
                    </div>
                  )}

                  {booking.cancellationReason && (
                    <div className="cancellation-reason">
                      <strong>Cancellation Reason:</strong> {booking.cancellationReason}
                    </div>
                  )}
                </div>

                <div className="history-booking-footer">
                  <span className="submitted-date">
                    Submitted: {new Date(booking.submittedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {completedBookings.length === 0 && (
            <div className="no-bookings">
              <div className="no-bookings-content">
                <span className="no-bookings-icon">📋</span>
                <h3>No booking history found</h3>
                <p>No bookings match your current search and filter criteria.</p>
              </div>
            </div>
          )}
        </div>

        {filteredHistory.length === 0 && (
          <div className="no-bookings">
            <div className="no-bookings-content">
              <span className="no-bookings-icon">📋</span>
              <h3>No bookings found</h3>
              <p>You haven't made any equipment bookings yet.</p>
              <button
                className="start-booking-btn"
                onClick={() => onBack && onBack()}
              >
                Make Your First Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentHistory;
