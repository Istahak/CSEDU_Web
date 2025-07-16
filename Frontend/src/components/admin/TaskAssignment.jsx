import React from "react";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaFlag,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle
} from "react-icons/fa";

const TaskAssignment = ({
  tasks,
  users,
  getFilteredTasks,
  getTaskStats,
  taskFilter,
  setTaskFilter,
  setShowTaskModal,
  setEditingTask,
  setSelectedFacultyForTask,
  handleTaskStatusChange,
  handleDeleteTask,
  adminData,
}) => {
  const activeTasks = tasks.filter(task => task.status !== "completed");

  const getStatusColor = (status) => {
    switch (status) {
      case "assigned":
        return "academic";
      case "in_progress":
        return "urgent";
      case "pending":
        return "event";
      default:
        return "general";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "urgent";
      case "medium":
        return "academic";
      case "low":
        return "general";
      default:
        return "general";
    }
  };

  const isOverdue = (dueDate, status) => {
    const due = new Date(dueDate);
    const today = new Date();
    return due < today && status !== "completed";
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <div className="section-header-text">
          <h2>Task Assignment</h2>
          <p>Assign and manage tasks for faculty members</p>
        </div>
        <button
          className="add-btn primary"
          onClick={() => setShowTaskModal(true)}
        >
          <FaPlus /> Assign New Task
        </button>
      </div>

      {/* Active Tasks Grid */}
      <div className="notices-grid">
        {activeTasks.map((task) => (
          <div key={task.id} className="course-card">
            <div className="course-card-header" style={{ backgroundColor: 'transparent' }}>
              <h3 className="course-title">{task.title}</h3>
            </div>

            <div className="course-description">
              <p>{task.description}</p>
              
              <div className="course-info-row">
                <span className="course-info-label"><FaUser /> Assigned to:</span>
                <span className="course-info-value">{task.assignedTo}</span>
              </div>
              <div className="course-info-row">
                <span className="course-info-label"><FaCalendarAlt /> Due Date:</span>
                <span className="course-info-value">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="course-footer">
              <span className="course-semester">
                Assigned: {new Date(task.assignedDate).toLocaleDateString()}
              </span>
              <div className="course-actions">
                <button
                  className="course-action-btn primary"
                  onClick={() => handleEditTask(task)}
                  title="Edit Task"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  className="course-action-btn archive"
                  onClick={() => handleDeleteTask(task.id)}
                  title="Delete Task"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeTasks.length === 0 && (
        <div className="no-courses">
          <div className="no-courses-content">
            <span className="no-courses-icon">✅</span>
            <h3>No active tasks</h3>
            <p>No tasks have been assigned yet. Create your first task to get started!</p>
            <button 
              className="create-first-course-btn" 
              onClick={() => setShowTaskModal(true)}
            >
              Assign First Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAssignment;
