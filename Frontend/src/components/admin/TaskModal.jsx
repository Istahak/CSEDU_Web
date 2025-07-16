import React, { useState, useEffect } from "react";

const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  editingTask,
  selectedFaculty,
  facultyList,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    facultyId: "",
    category: "Academic",
    priority: "medium",
    dueDate: "",
    estimatedHours: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        assignedTo: editingTask.assignedTo || "",
        facultyId: editingTask.facultyId || "",
        category: editingTask.category || "Academic",
        priority: editingTask.priority || "medium",
        dueDate: editingTask.dueDate || "",
        estimatedHours: editingTask.estimatedHours || "",
        notes: editingTask.notes || "",
      });
    } else if (selectedFaculty) {
      setFormData({
        title: "",
        description: "",
        assignedTo: selectedFaculty.name,
        facultyId: selectedFaculty.id,
        category: "Academic",
        priority: "medium",
        dueDate: "",
        estimatedHours: "",
        notes: "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        facultyId: "",
        category: "Academic",
        priority: "medium",
        dueDate: "",
        estimatedHours: "",
        notes: "",
      });
    }
    setErrors({});
  }, [editingTask, selectedFaculty, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Auto-fill faculty name when faculty is selected
    if (name === "facultyId") {
      const faculty = facultyList.find(f => f.id === parseInt(value));
      if (faculty) {
        setFormData({ 
          ...formData, 
          [name]: value,
          assignedTo: faculty.name 
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Task description is required";
    }

    if (!formData.facultyId) {
      newErrors.facultyId = "Please select a faculty member";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    if (!formData.estimatedHours || formData.estimatedHours <= 0) {
      newErrors.estimatedHours = "Please enter valid estimated hours";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      estimatedHours: parseInt(formData.estimatedHours),
      facultyId: parseInt(formData.facultyId),
    };

    onSave(taskData);
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      facultyId: "",
      category: "Academic",
      priority: "medium",
      dueDate: "",
      estimatedHours: "",
      notes: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content task-modal">
        <div className="modal-header">
          <h2>{editingTask ? "Edit Task" : "Assign New Task"}</h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">
              Task Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              className={errors.title ? "error" : ""}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the task in detail"
              rows="4"
              className={errors.description ? "error" : ""}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="facultyId">
                Assign to Faculty <span className="required">*</span>
              </label>
              <select
                id="facultyId"
                name="facultyId"
                value={formData.facultyId}
                onChange={handleInputChange}
                className={errors.facultyId ? "error" : ""}
              >
                <option value="">Select Faculty Member</option>
                {facultyList.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name} - {faculty.designation}
                  </option>
                ))}
              </select>
              {errors.facultyId && (
                <span className="error-message">{errors.facultyId}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Academic">Academic</option>
                <option value="Administrative">Administrative</option>
                <option value="Research">Research</option>
                <option value="Technical">Technical</option>
                <option value="Committee">Committee</option>
                <option value="Event">Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">
                Due Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                min={getMinDate()}
                className={errors.dueDate ? "error" : ""}
              />
              {errors.dueDate && (
                <span className="error-message">{errors.dueDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="estimatedHours">
                Estimated Hours <span className="required">*</span>
              </label>
              <input
                type="number"
                id="estimatedHours"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleInputChange}
                placeholder="Hours"
                min="1"
                max="200"
                className={errors.estimatedHours ? "error" : ""}
              />
              {errors.estimatedHours && (
                <span className="error-message">{errors.estimatedHours}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any additional instructions or notes"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingTask ? "Update Task" : "Assign Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
