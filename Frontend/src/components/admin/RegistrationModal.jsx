import React, { useState } from 'react';

const RegistrationModal = ({
  selectedEvent,
  selectedEventRegistrations,
  setSelectedEventRegistrations,
  setShowRegistrationModal,
  handleEditEvent,
  handleIssueCertificate,
  handleUpdatePaymentStatus,
  handleMarkAttendance
}) => {
  // State for adding a new registration
  const [newReg, setNewReg] = useState({
    studentId: "",
    name: "",
    email: "",
    phone: "",
    year: "",
    department: "",
    registrationDate: new Date().toISOString().split("T")[0],
    paymentStatus: "pending",
    paymentMethod: "",
    transactionId: "",
    attendance: "registered",
    certificate: "pending",
  });
  const [addError, setAddError] = useState("");
  const [editRegId, setEditRegId] = useState(null);
  const [editReg, setEditReg] = useState(null);

  // Add new registration handler
  const handleAddRegistration = (e) => {
    e.preventDefault();
    if (!newReg.studentId || !newReg.name || !newReg.email) {
      setAddError("Please fill in all required fields (Student ID, Name, Email)");
      return;
    }
    
    const updatedRegs = [
      ...selectedEventRegistrations,
      {
        ...newReg,
        id: Date.now(),
      },
    ];
    handleEditEvent(selectedEvent.id, {
      ...selectedEvent,
      registrations: updatedRegs,
    });
    setSelectedEventRegistrations(updatedRegs);
    setNewReg({
      studentId: "",
      name: "",
      email: "",
      phone: "",
      year: "",
      department: "",
      registrationDate: new Date().toISOString().split("T")[0],
      paymentStatus: "pending",
      paymentMethod: "",
      transactionId: "",
      attendance: "registered",
      certificate: "pending",
    });
    setAddError("");
  };

  // Remove registration handler
  const handleRemoveRegistration = (regId) => {
    if (window.confirm("Remove this registration?")) {
      const updatedRegs = selectedEventRegistrations.filter(
        (reg) => reg.id !== regId
      );
      handleEditEvent(selectedEvent.id, {
        ...selectedEvent,
        registrations: updatedRegs,
      });
      setSelectedEventRegistrations(updatedRegs);
    }
  };

  // Start editing a registration
  const handleEditRegistration = (reg) => {
    setEditRegId(reg.id);
    setEditReg({ ...reg });
  };

  // Save edited registration
  const handleSaveEditRegistration = () => {
    if (!editReg.studentId || !editReg.name || !editReg.email) {
      setAddError("Please fill in all required fields (Student ID, Name, Email)");
      return;
    }
    
    const updatedRegs = selectedEventRegistrations.map((reg) =>
      reg.id === editRegId ? { ...editReg } : reg
    );
    handleEditEvent(selectedEvent.id, {
      ...selectedEvent,
      registrations: updatedRegs,
    });
    setSelectedEventRegistrations(updatedRegs);
    setEditRegId(null);
    setEditReg(null);
    setAddError("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditRegId(null);
    setEditReg(null);
    setAddError("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content large-modal">
        <div className="modal-header">
          <h3>Event Registrations - {selectedEvent?.title}</h3>
          <button
            className="close-btn"
            onClick={() => setShowRegistrationModal(false)}
          >
            ✕
          </button>
        </div>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Year</th>
                <th>Department</th>
                <th>Reg. Date</th>
                <th>Payment</th>
                <th>Attendance</th>
                <th>Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedEventRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: "center" }}>
                    No registrations found.
                  </td>
                </tr>
              ) : (
                selectedEventRegistrations.map((reg) =>
                  editRegId === reg.id ? (
                    <tr key={reg.id} className="editing-row">
                      <td>
                        <input
                          type="text"
                          value={editReg.studentId}
                          onChange={(e) =>
                            setEditReg({
                              ...editReg,
                              studentId: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editReg.name}
                          onChange={(e) =>
                            setEditReg({ ...editReg, name: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          value={editReg.email}
                          onChange={(e) =>
                            setEditReg({ ...editReg, email: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editReg.phone}
                          onChange={(e) =>
                            setEditReg({ ...editReg, phone: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editReg.year}
                          onChange={(e) =>
                            setEditReg({ ...editReg, year: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editReg.department}
                          onChange={(e) =>
                            setEditReg({
                              ...editReg,
                              department: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editReg.registrationDate}
                          onChange={(e) =>
                            setEditReg({
                              ...editReg,
                              registrationDate: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <select
                          value={editReg.paymentStatus}
                          onChange={(e) =>
                            setEditReg({
                              ...editReg,
                              paymentStatus: e.target.value,
                            })
                          }
                        >
                          <option value="paid">Paid</option>
                          <option value="pending">Pending</option>
                          <option value="free">Free</option>
                        </select>
                        {editReg.paymentStatus === "paid" && (
                          <>
                            <br />
                            <input
                              type="text"
                              value={editReg.paymentMethod || ""}
                              onChange={(e) =>
                                setEditReg({
                                  ...editReg,
                                  paymentMethod: e.target.value,
                                })
                              }
                              placeholder="Method (bkash, cash)"
                              style={{ width: "80px" }}
                            />
                            <input
                              type="text"
                              value={editReg.transactionId || ""}
                              onChange={(e) =>
                                setEditReg({
                                  ...editReg,
                                  transactionId: e.target.value,
                                })
                              }
                              placeholder="Txn ID"
                              style={{ width: "80px" }}
                            />
                          </>
                        )}
                      </td>
                      <td>
                        <select
                          value={editReg.attendance}
                          onChange={(e) =>
                            setEditReg({
                              ...editReg,
                              attendance: e.target.value,
                            })
                          }
                        >
                          <option value="registered">Registered</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                        </select>
                      </td>
                      <td>
                        {editReg.certificate === "issued"
                          ? "Issued"
                          : "Pending"}
                        {editReg.attendance === "present" &&
                          editReg.certificate !== "issued" && (
                            <button
                              className="issue-btn"
                              onClick={() =>
                                handleIssueCertificate(
                                  selectedEvent.id,
                                  editReg.id
                                )
                              }
                              type="button"
                            >
                              🎓 Issue
                            </button>
                          )}
                      </td>
                      <td>
                        <button
                          className="save-btn"
                          onClick={handleSaveEditRegistration}
                          type="button"
                        >
                          💾 Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={handleCancelEdit}
                          type="button"
                        >
                          ✕ Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={reg.id}>
                      <td>{reg.studentId}</td>
                      <td>{reg.name}</td>
                      <td>{reg.email}</td>
                      <td>{reg.phone}</td>
                      <td>{reg.year}</td>
                      <td>{reg.department}</td>
                      <td>{reg.registrationDate}</td>
                      <td>
                        <select
                          value={reg.paymentStatus}
                          onChange={(e) =>
                            handleUpdatePaymentStatus(
                              selectedEvent.id,
                              reg.id,
                              e.target.value,
                              reg.paymentMethod,
                              reg.transactionId
                            )
                          }
                        >
                          <option value="paid">Paid</option>
                          <option value="pending">Pending</option>
                          <option value="free">Free</option>
                        </select>
                        {reg.paymentStatus === "paid" && (
                          <>
                            <br />
                            <input
                              type="text"
                              value={reg.paymentMethod || ""}
                              onChange={(e) =>
                                handleUpdatePaymentStatus(
                                  selectedEvent.id,
                                  reg.id,
                                  reg.paymentStatus,
                                  e.target.value,
                                  reg.transactionId
                                )
                              }
                              placeholder="Method (bkash, cash)"
                              style={{ width: "80px" }}
                            />
                            <input
                              type="text"
                              value={reg.transactionId || ""}
                              onChange={(e) =>
                                handleUpdatePaymentStatus(
                                  selectedEvent.id,
                                  reg.id,
                                  reg.paymentStatus,
                                  reg.paymentMethod,
                                  e.target.value
                                )
                              }
                              placeholder="Txn ID"
                              style={{ width: "80px" }}
                            />
                          </>
                        )}
                      </td>
                      <td>
                        <select
                          value={reg.attendance}
                          onChange={(e) =>
                            handleMarkAttendance(
                              selectedEvent.id,
                              reg.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="registered">Registered</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                        </select>
                      </td>
                      <td>
                        {reg.certificate === "issued" ? "Issued" : "Pending"}
                        {reg.attendance === "present" &&
                          reg.certificate !== "issued" && (
                            <button
                              className="issue-btn"
                              onClick={() =>
                                handleIssueCertificate(
                                  selectedEvent.id,
                                  reg.id
                                )
                              }
                              type="button"
                            >
                              🎓 Issue
                            </button>
                          )}
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEditRegistration(reg)}
                          type="button"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleRemoveRegistration(reg.id)}
                          type="button"
                        >
                          🗑️ Remove
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
              {/* Add new registration row */}
              <tr>
                <td>
                  <input
                    type="text"
                    value={newReg.studentId}
                    onChange={(e) =>
                      setNewReg({ ...newReg, studentId: e.target.value })
                    }
                    placeholder="Student ID"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newReg.name}
                    onChange={(e) =>
                      setNewReg({ ...newReg, name: e.target.value })
                    }
                    placeholder="Name"
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={newReg.email}
                    onChange={(e) =>
                      setNewReg({ ...newReg, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newReg.phone}
                    onChange={(e) =>
                      setNewReg({ ...newReg, phone: e.target.value })
                    }
                    placeholder="Phone"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newReg.year}
                    onChange={(e) =>
                      setNewReg({ ...newReg, year: e.target.value })
                    }
                    placeholder="Year"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newReg.department}
                    onChange={(e) =>
                      setNewReg({ ...newReg, department: e.target.value })
                    }
                    placeholder="Department"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={newReg.registrationDate}
                    onChange={(e) =>
                      setNewReg({
                        ...newReg,
                        registrationDate: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <select
                    value={newReg.paymentStatus}
                    onChange={(e) =>
                      setNewReg({ ...newReg, paymentStatus: e.target.value })
                    }
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="free">Free</option>
                  </select>
                  {newReg.paymentStatus === "paid" && (
                    <>
                      <br />
                      <input
                        type="text"
                        value={newReg.paymentMethod}
                        onChange={(e) =>
                          setNewReg({
                            ...newReg,
                            paymentMethod: e.target.value,
                          })
                        }
                        placeholder="Method"
                        style={{ width: "80px" }}
                      />
                      <input
                        type="text"
                        value={newReg.transactionId}
                        onChange={(e) =>
                          setNewReg({
                            ...newReg,
                            transactionId: e.target.value,
                          })
                        }
                        placeholder="Txn ID"
                        style={{ width: "80px" }}
                      />
                    </>
                  )}
                </td>
                <td>
                  <select
                    value={newReg.attendance}
                    onChange={(e) =>
                      setNewReg({ ...newReg, attendance: e.target.value })
                    }
                  >
                    <option value="registered">Registered</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </td>
                <td>
                  {newReg.certificate === "issued" ? "Issued" : "Pending"}
                </td>
                <td>
                  <button
                    className="save-btn"
                    onClick={handleAddRegistration}
                    type="button"
                  >
                    ➕ Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {addError && <div className="error-message">{addError}</div>}
        </div>
        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={() => setShowRegistrationModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
