import React from "react";
import { FaEdit, FaTrash, FaEye, FaCheck } from 'react-icons/fa';

const TaskManagement = ({
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
  const taskStats = getTaskStats();
  const filteredTasks = getFilteredTasks();

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "assigned":
        return "status-assigned";
      case "in_progress":
        return "status-in-progress";
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      case "overdue":
        return "status-overdue";
      default:
        return "status-pending";
    }
  };

  const isTaskOverdue = (task) => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today && task.status !== "completed";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAssignToFaculty = (faculty) => {
    setSelectedFacultyForTask(faculty);
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setSelectedFacultyForTask(null);
    setShowTaskModal(true);
  };

  const getProgressBarClass = (progress) => {
    if (progress >= 80) return "progress-high";
    if (progress >= 50) return "progress-medium";
    return "progress-low";
  };

  return (
    <div className="content-area">
      <div className="section-header">
        <div className="section-header-text">
          <h2>Task Assignment Management</h2>
          <p className="section-subtitle">
            Assign and manage tasks for faculty members
          </p>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            setEditingTask(null);
            setSelectedFacultyForTask(null);
            setShowTaskModal(true);
          }}
        >
          ➕ Assign New Task
        </button>
      </div>

      {/* Task Statistics */}
      <div className="stats-grid task-stats">
        <div className="stat-card">
          <div className="stat-number">{taskStats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{taskStats.assigned}</div>
          <div className="stat-label">Assigned</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{taskStats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{taskStats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{taskStats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-number">{taskStats.overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      {/* Faculty Quick Assign */}
      <div className="faculty-quick-assign">
        <h3>Quick Assign to Faculty</h3>
        <div className="faculty-grid">
          {users
            .filter((user) => user.role === "faculty")
            .map((faculty) => (
              <div key={faculty.id} className="faculty-card">
                <div className="faculty-info">
                  <h4>{faculty.name}</h4>
                  <p>{faculty.designation}</p>
                  <p className="faculty-department">{faculty.department}</p>
                </div>
                <div className="faculty-stats">
                  <span className="task-count">
                    {tasks.filter((t) => t.facultyId === faculty.id).length}{" "}
                    tasks
                  </span>
                  <span className="active-count">
                    {
                      tasks.filter(
                        (t) =>
                          t.facultyId === faculty.id &&
                          ["assigned", "in_progress"].includes(t.status)
                      ).length
                    }{" "}
                    active
                  </span>
                </div>
                <button
                  className="assign-btn"
                  onClick={() => handleAssignToFaculty(faculty)}
                >
                  Assign Task
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Task Filters */}
      <div className="filters-section">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${taskFilter === "all" ? "active" : ""}`}
            onClick={() => setTaskFilter("all")}
          >
            All Tasks ({taskStats.total})
          </button>
          <button
            className={`filter-tab ${
              taskFilter === "assigned" ? "active" : ""
            }`}
            onClick={() => setTaskFilter("assigned")}
          >
            Assigned ({taskStats.assigned})
          </button>
          <button
            className={`filter-tab ${
              taskFilter === "in_progress" ? "active" : ""
            }`}
            onClick={() => setTaskFilter("in_progress")}
          >
            In Progress ({taskStats.inProgress})
          </button>
          <button
            className={`filter-tab ${
              taskFilter === "completed" ? "active" : ""
            }`}
            onClick={() => setTaskFilter("completed")}
          >
            Completed ({taskStats.completed})
          </button>
          <button
            className={`filter-tab ${taskFilter === "pending" ? "active" : ""}`}
            onClick={() => setTaskFilter("pending")}
          >
            Pending ({taskStats.pending})
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="tasks-grid">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${
              isTaskOverdue(task) ? "overdue" : ""
            }`}
          >
            <div className="task-header">
              <div className="task-title-section">
                <h3 className="task-title">{task.title}</h3>
                <div className="task-badges">
                  <span
                    className={`priority-badge ${getPriorityBadgeClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`status-badge ${getStatusBadgeClass(
                      isTaskOverdue(task) ? "overdue" : task.status
                    )}`}
                  >
                    {isTaskOverdue(task) ? "Overdue" : task.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="task-body">
              <p className="task-description">{task.description}</p>
              
              <div className="task-details">
                <div className="task-detail-row">
                  <span className="detail-label">👨‍🏫 Assigned to:</span>
                  <span className="detail-value">{task.assignedTo}</span>
                </div>
                <div className="task-detail-row">
                  <span className="detail-label">📂 Category:</span>
                  <span className="detail-value">{task.category}</span>
                </div>
                <div className="task-detail-row">
                  <span className="detail-label">📅 Due Date:</span>
                  <span className="detail-value">{formatDate(task.dueDate)}</span>
                </div>
                <div className="task-detail-row">
                  <span className="detail-label">⏱️ Est. Hours:</span>
                  <span className="detail-value">{task.estimatedHours}h</span>
                </div>
                {task.completedDate && (
                  <div className="task-detail-row">
                    <span className="detail-label">✅ Completed:</span>
                    <span className="detail-value">{formatDate(task.completedDate)}</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-header">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${getProgressBarClass(task.progress)}`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              {task.notes && (
                <div className="task-notes">
                  <h4>Notes:</h4>
                  <p>{task.notes}</p>
                </div>
              )}
            </div>

            <div className="task-actions">
              <div className="status-actions">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleTaskStatusChange(task.id, e.target.value)
                  }
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="task-action-buttons">
                <button
                  className="course-action-btn primary"
                  onClick={() => handleEditTask(task)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="course-action-btn archive"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="no-tasks">
          <div className="no-tasks-content">
            <span className="no-tasks-icon">📋</span>
            <h3>No tasks found</h3>
            <p>
              {taskFilter === "all"
                ? "No tasks have been assigned yet."
                : `No tasks with status "${taskFilter.replace("_", " ")}" found.`}
            </p>
            <button
              className="add-btn"
              onClick={() => {
                setEditingTask(null);
                setSelectedFacultyForTask(null);
                setShowTaskModal(true);
              }}
            >
              ➕ Assign First Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
