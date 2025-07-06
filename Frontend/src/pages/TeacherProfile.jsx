import React, { useState } from "react";
import "./TeacherProfile.css";

const TeacherProfile = ({
  onBack,
  teacherData: propTeacherData,
  onEditProfile,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddResearchForm, setShowAddResearchForm] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);

  // Archive states
  const [archivedCourses, setArchivedCourses] = useState([]);
  const [archivedStudents, setArchivedStudents] = useState([]);
  const [archivedResearch, setArchivedResearch] = useState([]);

  // Current items state (in a real app, this would come from props or API)
  const [currentCourses, setCurrentCourses] = useState([
    {
      id: 1,
      title: "CSE 408 - Software Development",
      section: "Section A",
      schedule: "Sunday, Tuesday - 10:00 AM - 11:30 AM",
      students: 45,
      room: "Room 301",
    },
    {
      id: 2,
      title: "CSE 412 - Machine Learning",
      section: "Section B",
      schedule: "Monday, Wednesday - 2:00 PM - 3:30 PM",
      students: 38,
      room: "Room 205",
    },
    {
      id: 3,
      title: "CSE 498 - Thesis Supervision",
      section: "Research",
      students: 8,
      schedule: "By Appointment",
    },
  ]);

  const [currentStudents, setCurrentStudents] = useState([
    {
      id: 1,
      name: "Mohammad Rahman",
      studentId: "CSE-2020-1001",
      type: "thesis",
      topic: "Machine Learning for Stock Price Prediction",
      progress: "75%",
    },
    {
      id: 2,
      name: "Fatima Khan",
      studentId: "CSE-2020-1015",
      type: "thesis",
      topic: "Natural Language Processing for Bengali",
      progress: "60%",
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      studentId: "CSE-2021-1025",
      type: "research-assistant",
      topic: "Deep Learning",
      duration: "6 months",
    },
  ]);

  const [currentResearch, setCurrentResearch] = useState([
    {
      id: 1,
      title: "Deep Learning for Medical Image Analysis",
      funding: "NSF Grant - $125,000",
      duration: "January 2023 - December 2025",
      collaborators:
        "Dr. John Smith (Medical College), Dr. Jane Doe (Engineering Dept)",
      status: "active",
    },
    {
      id: 2,
      title: "Natural Language Processing for Bengali Text",
      funding: "University Research Grant - $50,000",
      duration: "March 2024 - February 2026",
      collaborators: "",
      status: "active",
    },
  ]);

  // Administrative tasks state
  const [administrativeTasks, setAdministrativeTasks] = useState([
    {
      id: 1,
      title: "Graduate Application Reviews",
      deadline: "March 30, 2024",
      description: "15/25 applications reviewed",
      status: "in-progress",
      progress: "60%",
    },
    {
      id: 2,
      title: "Course Curriculum Update - CSE 412",
      deadline: "April 15, 2024",
      description: "Pending committee approval",
      status: "pending",
      progress: "80%",
    },
    {
      id: 3,
      title: "Faculty Performance Evaluations",
      deadline: "May 1, 2024",
      description: "Not started",
      status: "todo",
      progress: "0%",
    },
  ]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [newResearchProject, setNewResearchProject] = useState({
    title: "",
    fundingSource: "",
    fundingAmount: "",
    startDate: "",
    endDate: "",
    collaborators: "",
    description: "",
    status: "active",
  });
  const [newStudent, setNewStudent] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
    type: "thesis", // thesis, research-assistant
    topic: "",
    progress: "0",
    duration: "",
    researchArea: "",
  });
  const [newCourse, setNewCourse] = useState({
    courseCode: "",
    title: "",
    section: "",
    schedule: "",
    room: "",
    capacity: "",
    enrolledStudents: "0",
    semester: "",
    year: "",
    credits: "",
  });

  const handleNewResearchInputChange = (field, value) => {
    setNewResearchProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitNewResearch = () => {
    if (!newResearchProject.title || !newResearchProject.startDate) {
      alert("Please fill in the required fields (Title and Start Date)");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("New Research Project:", newResearchProject);

    // Reset form and close modal
    setNewResearchProject({
      title: "",
      fundingSource: "",
      fundingAmount: "",
      startDate: "",
      endDate: "",
      collaborators: "",
      description: "",
      status: "active",
    });
    setShowAddResearchForm(false);

    alert("Research project added successfully!");
  };

  const handleCancelNewResearch = () => {
    setShowAddResearchForm(false);
    setNewResearchProject({
      title: "",
      fundingSource: "",
      fundingAmount: "",
      startDate: "",
      endDate: "",
      collaborators: "",
      description: "",
      status: "active",
    });
  };

  // Student form handlers
  const handleNewStudentInputChange = (field, value) => {
    setNewStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitNewStudent = () => {
    if (!newStudent.name || !newStudent.studentId || !newStudent.email) {
      alert("Please fill in the required fields (Name, Student ID, and Email)");
      return;
    }

    console.log("New Student:", newStudent);

    // Reset form and close modal
    setNewStudent({
      name: "",
      studentId: "",
      email: "",
      phone: "",
      type: "thesis",
      topic: "",
      progress: "0",
      duration: "",
      researchArea: "",
    });
    setShowAddStudentForm(false);

    alert("Student added successfully!");
  };

  const handleCancelNewStudent = () => {
    setShowAddStudentForm(false);
    setNewStudent({
      name: "",
      studentId: "",
      email: "",
      phone: "",
      type: "thesis",
      topic: "",
      progress: "0",
      duration: "",
      researchArea: "",
    });
  };

  // Course form handlers
  const handleNewCourseInputChange = (field, value) => {
    setNewCourse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitNewCourse = () => {
    if (!newCourse.courseCode || !newCourse.title || !newCourse.section) {
      alert(
        "Please fill in the required fields (Course Code, Title, and Section)"
      );
      return;
    }

    console.log("New Course:", newCourse);

    // Reset form and close modal
    setNewCourse({
      courseCode: "",
      title: "",
      section: "",
      schedule: "",
      room: "",
      capacity: "",
      enrolledStudents: "0",
      semester: "",
      year: "",
      credits: "",
    });
    setShowAddCourseForm(false);

    alert("Course added successfully!");
  };

  const handleCancelNewCourse = () => {
    setShowAddCourseForm(false);
    setNewCourse({
      courseCode: "",
      title: "",
      section: "",
      schedule: "",
      room: "",
      capacity: "",
      enrolledStudents: "0",
      semester: "",
      year: "",
      credits: "",
    });
  };

  // Archive handler functions
  const handleArchiveCourse = (courseId) => {
    const courseToArchive = currentCourses.find(
      (course) => course.id === courseId
    );
    if (courseToArchive) {
      setArchivedCourses((prev) => [
        ...prev,
        { ...courseToArchive, archivedDate: new Date().toISOString() },
      ]);
      setCurrentCourses((prev) =>
        prev.filter((course) => course.id !== courseId)
      );
      alert(
        `Course "${courseToArchive.title}" has been archived successfully!`
      );
    }
  };

  const handleArchiveStudent = (studentId) => {
    const studentToArchive = currentStudents.find(
      (student) => student.id === studentId
    );
    if (studentToArchive) {
      setArchivedStudents((prev) => [
        ...prev,
        { ...studentToArchive, archivedDate: new Date().toISOString() },
      ]);
      setCurrentStudents((prev) =>
        prev.filter((student) => student.id !== studentId)
      );
      alert(
        `Student "${studentToArchive.name}" has been archived successfully!`
      );
    }
  };

  const handleArchiveResearch = (researchId) => {
    const researchToArchive = currentResearch.find(
      (research) => research.id === researchId
    );
    if (researchToArchive) {
      setArchivedResearch((prev) => [
        ...prev,
        { ...researchToArchive, archivedDate: new Date().toISOString() },
      ]);
      setCurrentResearch((prev) =>
        prev.filter((research) => research.id !== researchId)
      );
      alert(
        `Research project "${researchToArchive.title}" has been archived successfully!`
      );
    }
  };

  const handleRestoreFromArchive = (type, itemId) => {
    if (type === "course") {
      const courseToRestore = archivedCourses.find(
        (course) => course.id === itemId
      );
      if (courseToRestore) {
        const { archivedDate, ...restoredCourse } = courseToRestore;
        setCurrentCourses((prev) => [...prev, restoredCourse]);
        setArchivedCourses((prev) =>
          prev.filter((course) => course.id !== itemId)
        );
        alert(
          `Course "${courseToRestore.title}" has been restored successfully!`
        );
      }
    } else if (type === "student") {
      const studentToRestore = archivedStudents.find(
        (student) => student.id === itemId
      );
      if (studentToRestore) {
        const { archivedDate, ...restoredStudent } = studentToRestore;
        setCurrentStudents((prev) => [...prev, restoredStudent]);
        setArchivedStudents((prev) =>
          prev.filter((student) => student.id !== itemId)
        );
        alert(
          `Student "${studentToRestore.name}" has been restored successfully!`
        );
      }
    } else if (type === "research") {
      const researchToRestore = archivedResearch.find(
        (research) => research.id === itemId
      );
      if (researchToRestore) {
        const { archivedDate, ...restoredResearch } = researchToRestore;
        setCurrentResearch((prev) => [...prev, restoredResearch]);
        setArchivedResearch((prev) =>
          prev.filter((research) => research.id !== itemId)
        );
        alert(
          `Research project "${researchToRestore.title}" has been restored successfully!`
        );
      }
    }
  };

  // Administrative task handlers
  const handleMarkTaskDone = (taskId) => {
    const taskToComplete = administrativeTasks.find(
      (task) => task.id === taskId
    );
    if (taskToComplete) {
      const completedTask = {
        ...taskToComplete,
        status: "completed",
        completedDate: new Date().toISOString(),
        progress: "100%",
      };

      setCompletedTasks((prev) => [...prev, completedTask]);
      setAdministrativeTasks((prev) =>
        prev.filter((task) => task.id !== taskId)
      );
      alert(`Task "${taskToComplete.title}" has been marked as completed!`);
    }
  };

  const handleRestoreTask = (taskId) => {
    const taskToRestore = completedTasks.find((task) => task.id === taskId);
    if (taskToRestore) {
      const { completedDate, ...restoredTask } = taskToRestore;
      setAdministrativeTasks((prev) => [
        ...prev,
        { ...restoredTask, status: "in-progress" },
      ]);
      setCompletedTasks((prev) => prev.filter((task) => task.id !== taskId));
      alert(`Task "${taskToRestore.title}" has been restored to active tasks!`);
    }
  };

  const handleUpdateTaskProgress = (taskId, newProgress) => {
    setAdministrativeTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, progress: newProgress } : task
      )
    );
  };

  const teacherData = propTeacherData || {
    name: "Dr. Sarah Wilson",
    facultyId: "CSEDU-FAC-001",
    email: "sarah.wilson@csedu.ac.bd",
    phone: "+880 1987 654321",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    specialization: "Machine Learning, Artificial Intelligence",
    officeRoom: "Room 402, CSEDU Building",
    officeHours: "Sunday-Thursday: 10:00 AM - 12:00 PM",
    joiningDate: "January 15, 2018",
    education: "PhD in Computer Science, Stanford University",
    experience: "8 years",
    researchInterests:
      "Deep Learning, Natural Language Processing, Computer Vision",
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="tab-content">
            <div className="overview-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{teacherData.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Faculty ID:</span>
                  <span className="value">{teacherData.facultyId}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{teacherData.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{teacherData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Designation:</span>
                  <span className="value">{teacherData.designation}</span>
                </div>
                <div className="info-item">
                  <span className="label">Department:</span>
                  <span className="value">{teacherData.department}</span>
                </div>
                <div className="info-item">
                  <span className="label">Specialization:</span>
                  <span className="value">{teacherData.specialization}</span>
                </div>
                <div className="info-item">
                  <span className="label">Office Room:</span>
                  <span className="value">{teacherData.officeRoom}</span>
                </div>
                <div className="info-item">
                  <span className="label">Office Hours:</span>
                  <span className="value">{teacherData.officeHours}</span>
                </div>
                <div className="info-item">
                  <span className="label">Joining Date:</span>
                  <span className="value">{teacherData.joiningDate}</span>
                </div>
                <div className="info-item">
                  <span className="label">Education:</span>
                  <span className="value">{teacherData.education}</span>
                </div>
                <div className="info-item">
                  <span className="label">Experience:</span>
                  <span className="value">{teacherData.experience}</span>
                </div>
                <div className="info-item">
                  <span className="label">Research Interests:</span>
                  <span className="value">{teacherData.researchInterests}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "courses":
        return (
          <div className="tab-content">
            <div className="courses-section">
              <div className="courses-header">
                <h3>Current Courses</h3>
                <button
                  className="add-course-btn"
                  onClick={() => setShowAddCourseForm(true)}
                >
                  + Add New Course
                </button>
              </div>

              {showAddCourseForm && (
                <div className="add-course-form">
                  <div className="form-header">
                    <h4>Add New Course</h4>
                    <button
                      className="close-btn"
                      onClick={handleCancelNewCourse}
                    >
                      ×
                    </button>
                  </div>

                  <div className="form-content">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Course Code *</label>
                        <input
                          type="text"
                          value={newCourse.courseCode}
                          onChange={(e) =>
                            handleNewCourseInputChange(
                              "courseCode",
                              e.target.value
                            )
                          }
                          placeholder="e.g., CSE 408"
                        />
                      </div>

                      <div className="form-group">
                        <label>Course Title *</label>
                        <input
                          type="text"
                          value={newCourse.title}
                          onChange={(e) =>
                            handleNewCourseInputChange("title", e.target.value)
                          }
                          placeholder="e.g., Software Development"
                        />
                      </div>

                      <div className="form-group">
                        <label>Section *</label>
                        <input
                          type="text"
                          value={newCourse.section}
                          onChange={(e) =>
                            handleNewCourseInputChange(
                              "section",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Section A"
                        />
                      </div>

                      <div className="form-group">
                        <label>Schedule</label>
                        <input
                          type="text"
                          value={newCourse.schedule}
                          onChange={(e) =>
                            handleNewCourseInputChange(
                              "schedule",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Sunday, Tuesday - 10:00 AM - 11:30 AM"
                        />
                      </div>

                      <div className="form-group">
                        <label>Room</label>
                        <input
                          type="text"
                          value={newCourse.room}
                          onChange={(e) =>
                            handleNewCourseInputChange("room", e.target.value)
                          }
                          placeholder="e.g., Room 301"
                        />
                      </div>

                      <div className="form-group">
                        <label>Capacity</label>
                        <input
                          type="number"
                          value={newCourse.capacity}
                          onChange={(e) =>
                            handleNewCourseInputChange(
                              "capacity",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 45"
                        />
                      </div>

                      <div className="form-group">
                        <label>Credits</label>
                        <input
                          type="number"
                          value={newCourse.credits}
                          onChange={(e) =>
                            handleNewCourseInputChange(
                              "credits",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 3"
                        />
                      </div>

                      <div className="form-group">
                        <label>Semester</label>
                        <select
                          value={newCourse.semester}
                          onChange={(e) =>
                            handleNewCourseInputChange(
                              "semester",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select Semester</option>
                          <option value="spring">Spring</option>
                          <option value="summer">Summer</option>
                          <option value="fall">Fall</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Year</label>
                        <input
                          type="number"
                          value={newCourse.year}
                          onChange={(e) =>
                            handleNewCourseInputChange("year", e.target.value)
                          }
                          placeholder="e.g., 2024"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        className="cancel-btn"
                        onClick={handleCancelNewCourse}
                      >
                        Cancel
                      </button>
                      <button
                        className="submit-btn"
                        onClick={handleSubmitNewCourse}
                      >
                        Add Course
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="course-list">
                {currentCourses.map((course) => (
                  <div key={course.id} className="course-item">
                    <div className="course-header">
                      <h4>{course.title}</h4>
                      <span className="course-code">{course.section}</span>
                    </div>
                    <p>
                      <strong>Schedule:</strong> {course.schedule}
                    </p>
                    <p>
                      <strong>Students Enrolled:</strong> {course.students}
                    </p>
                    {course.room && (
                      <p>
                        <strong>Room:</strong> {course.room}
                      </p>
                    )}
                    <div className="course-actions">
                      <button className="action-btn primary">
                        View Students
                      </button>
                      <button className="action-btn secondary">
                        Manage Grades
                      </button>
                      <button className="action-btn secondary">
                        Attendance
                      </button>
                      <button
                        className="action-btn archive"
                        onClick={() => handleArchiveCourse(course.id)}
                      >
                        Archive Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {archivedCourses.length > 0 && (
                <div className="archived-section">
                  <h4>📁 Archived Courses</h4>
                  <div className="archived-list">
                    {archivedCourses.map((course) => (
                      <div key={course.id} className="archived-item">
                        <div className="archived-header">
                          <h5>{course.title}</h5>
                          <span className="archived-date">
                            Archived:{" "}
                            {new Date(course.archivedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p>
                          <strong>Section:</strong> {course.section}
                        </p>
                        <p>
                          <strong>Students:</strong> {course.students}
                        </p>
                        <div className="archived-actions">
                          <button
                            className="action-btn restore"
                            onClick={() =>
                              handleRestoreFromArchive("course", course.id)
                            }
                          >
                            Restore
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "research":
        return (
          <div className="tab-content">
            <div className="research-section">
              <div className="research-header">
                <h3>Research Activities</h3>
                <button
                  className="add-research-btn"
                  onClick={() => setShowAddResearchForm(true)}
                >
                  + Add New Research Project
                </button>
              </div>

              {showAddResearchForm && (
                <div className="add-research-form">
                  <div className="form-header">
                    <h4>Add New Research Project</h4>
                    <button
                      className="close-btn"
                      onClick={handleCancelNewResearch}
                    >
                      ×
                    </button>
                  </div>

                  <div className="form-content">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Project Title *</label>
                        <input
                          type="text"
                          value={newResearchProject.title}
                          onChange={(e) =>
                            handleNewResearchInputChange(
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Enter research project title"
                        />
                      </div>

                      <div className="form-group">
                        <label>Funding Source</label>
                        <input
                          type="text"
                          value={newResearchProject.fundingSource}
                          onChange={(e) =>
                            handleNewResearchInputChange(
                              "fundingSource",
                              e.target.value
                            )
                          }
                          placeholder="e.g., NSF Grant, University Research Grant"
                        />
                      </div>

                      <div className="form-group">
                        <label>Funding Amount</label>
                        <input
                          type="text"
                          value={newResearchProject.fundingAmount}
                          onChange={(e) =>
                            handleNewResearchInputChange(
                              "fundingAmount",
                              e.target.value
                            )
                          }
                          placeholder="e.g., $50,000"
                        />
                      </div>

                      <div className="form-group">
                        <label>Start Date *</label>
                        <input
                          type="date"
                          value={newResearchProject.startDate}
                          onChange={(e) =>
                            handleNewResearchInputChange(
                              "startDate",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>End Date</label>
                        <input
                          type="date"
                          value={newResearchProject.endDate}
                          onChange={(e) =>
                            handleNewResearchInputChange(
                              "endDate",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Status</label>
                        <select
                          value={newResearchProject.status}
                          onChange={(e) =>
                            handleNewResearchInputChange(
                              "status",
                              e.target.value
                            )
                          }
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="on-hold">On Hold</option>
                        </select>
                      </div>

                      <div className="form-group full-width">
                        <label>Collaborators</label>
                        <input
                          type="text"
                          value={newResearchProject.collaborators}
                          onChange={(e) =>
                            handleNewResearchInputChange(
                              "collaborators",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Dr. John Smith (Medical College), Dr. Jane Doe (Engineering Dept)"
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Project Description</label>
                        <textarea
                          value={newResearchProject.description}
                          onChange={(e) =>
                            handleNewResearchInputChange(
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Describe the research project objectives and methodology..."
                          rows="4"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        className="cancel-btn"
                        onClick={handleCancelNewResearch}
                      >
                        Cancel
                      </button>
                      <button
                        className="submit-btn"
                        onClick={handleSubmitNewResearch}
                      >
                        Add Research Project
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="research-subsection">
                <h4>Current Research Projects</h4>
                <div className="research-list">
                  {currentResearch.map((research) => (
                    <div key={research.id} className="research-item">
                      <div className="research-header">
                        <h5>{research.title}</h5>
                        <button
                          className="archive-btn"
                          onClick={() => handleArchiveResearch(research.id)}
                          title="Archive Research Project"
                        >
                          📁
                        </button>
                      </div>
                      <p>
                        <strong>Funding:</strong> {research.funding}
                      </p>
                      <p>
                        <strong>Duration:</strong> {research.duration}
                      </p>
                      {research.collaborators && (
                        <p>
                          <strong>Collaborators:</strong>{" "}
                          {research.collaborators}
                        </p>
                      )}
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className={`status-${research.status}`}>
                          {research.status}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {archivedResearch.length > 0 && (
                <div className="research-subsection">
                  <h4>📁 Archived Research Projects</h4>
                  <div className="archived-list">
                    {archivedResearch.map((research) => (
                      <div key={research.id} className="archived-item">
                        <div className="archived-header">
                          <h5>{research.title}</h5>
                          <span className="archived-date">
                            Archived:{" "}
                            {new Date(
                              research.archivedDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p>
                          <strong>Funding:</strong> {research.funding}
                        </p>
                        <p>
                          <strong>Duration:</strong> {research.duration}
                        </p>
                        <div className="archived-actions">
                          <button
                            className="action-btn restore"
                            onClick={() =>
                              handleRestoreFromArchive("research", research.id)
                            }
                          >
                            Restore
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="research-subsection">
                <h4>Recent Publications</h4>
                <div className="publication-list">
                  <div className="publication-item">
                    <h5>
                      "Advanced Deep Learning Techniques for Medical Diagnosis"
                    </h5>
                    <p>
                      <strong>Journal:</strong> IEEE Transactions on Medical
                      Imaging
                    </p>
                    <p>
                      <strong>Year:</strong> 2024
                    </p>
                    <p>
                      <strong>Impact Factor:</strong> 8.5
                    </p>
                  </div>
                  <div className="publication-item">
                    <h5>
                      "Bengali Text Classification using Transformer Models"
                    </h5>
                    <p>
                      <strong>Conference:</strong> EMNLP 2023
                    </p>
                    <p>
                      <strong>Year:</strong> 2023
                    </p>
                    <p>
                      <strong>Citations:</strong> 23
                    </p>
                  </div>
                  <div className="publication-item">
                    <h5>"Computer Vision Applications in Healthcare"</h5>
                    <p>
                      <strong>Journal:</strong> Pattern Recognition Letters
                    </p>
                    <p>
                      <strong>Year:</strong> 2023
                    </p>
                    <p>
                      <strong>Impact Factor:</strong> 4.2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "students":
        return (
          <div className="tab-content">
            <div className="students-section">
              <div className="students-header">
                <h3>Student Management</h3>
                <button
                  className="add-student-btn"
                  onClick={() => setShowAddStudentForm(true)}
                >
                  + Add New Student
                </button>
              </div>

              {showAddStudentForm && (
                <div className="add-student-form">
                  <div className="form-header">
                    <h4>Add New Student</h4>
                    <button
                      className="close-btn"
                      onClick={handleCancelNewStudent}
                    >
                      ×
                    </button>
                  </div>

                  <div className="form-content">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Student Name *</label>
                        <input
                          type="text"
                          value={newStudent.name}
                          onChange={(e) =>
                            handleNewStudentInputChange("name", e.target.value)
                          }
                          placeholder="Enter student full name"
                        />
                      </div>

                      <div className="form-group">
                        <label>Student ID *</label>
                        <input
                          type="text"
                          value={newStudent.studentId}
                          onChange={(e) =>
                            handleNewStudentInputChange(
                              "studentId",
                              e.target.value
                            )
                          }
                          placeholder="e.g., CSE-2020-1001"
                        />
                      </div>

                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          value={newStudent.email}
                          onChange={(e) =>
                            handleNewStudentInputChange("email", e.target.value)
                          }
                          placeholder="student@email.com"
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          value={newStudent.phone}
                          onChange={(e) =>
                            handleNewStudentInputChange("phone", e.target.value)
                          }
                          placeholder="+880 1234 567890"
                        />
                      </div>

                      <div className="form-group">
                        <label>Student Type</label>
                        <select
                          value={newStudent.type}
                          onChange={(e) =>
                            handleNewStudentInputChange("type", e.target.value)
                          }
                        >
                          <option value="thesis">Thesis Student</option>
                          <option value="research-assistant">
                            Research Assistant
                          </option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Progress (%)</label>
                        <input
                          type="number"
                          value={newStudent.progress}
                          onChange={(e) =>
                            handleNewStudentInputChange(
                              "progress",
                              e.target.value
                            )
                          }
                          placeholder="0-100"
                          min="0"
                          max="100"
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>
                          {newStudent.type === "thesis"
                            ? "Thesis Topic"
                            : "Research Area"}
                        </label>
                        <input
                          type="text"
                          value={
                            newStudent.type === "thesis"
                              ? newStudent.topic
                              : newStudent.researchArea
                          }
                          onChange={(e) =>
                            handleNewStudentInputChange(
                              newStudent.type === "thesis"
                                ? "topic"
                                : "researchArea",
                              e.target.value
                            )
                          }
                          placeholder={
                            newStudent.type === "thesis"
                              ? "e.g., Machine Learning for Stock Price Prediction"
                              : "e.g., Deep Learning"
                          }
                        />
                      </div>

                      {newStudent.type === "research-assistant" && (
                        <div className="form-group full-width">
                          <label>Duration</label>
                          <input
                            type="text"
                            value={newStudent.duration}
                            onChange={(e) =>
                              handleNewStudentInputChange(
                                "duration",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 6 months"
                          />
                        </div>
                      )}
                    </div>

                    <div className="form-actions">
                      <button
                        className="cancel-btn"
                        onClick={handleCancelNewStudent}
                      >
                        Cancel
                      </button>
                      <button
                        className="submit-btn"
                        onClick={handleSubmitNewStudent}
                      >
                        Add Student
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="students-subsection">
                <h4>Current Students</h4>
                <div className="student-list">
                  {currentStudents.map((student) => (
                    <div key={student.id} className="student-item">
                      <div className="student-info">
                        <div className="student-header">
                          <h5>{student.name}</h5>
                          <button
                            className="archive-btn"
                            onClick={() => handleArchiveStudent(student.id)}
                            title="Archive Student"
                          >
                            📁
                          </button>
                        </div>
                        <p>
                          <strong>Student ID:</strong> {student.studentId}
                        </p>
                        <p>
                          <strong>Type:</strong>{" "}
                          {student.type === "thesis"
                            ? "Thesis Student"
                            : "Research Assistant"}
                        </p>
                        <p>
                          <strong>
                            {student.type === "thesis"
                              ? "Thesis Topic"
                              : "Research Area"}
                            :
                          </strong>{" "}
                          {student.topic}
                        </p>
                        {student.progress && (
                          <p>
                            <strong>Progress:</strong> {student.progress}
                          </p>
                        )}
                        {student.duration && (
                          <p>
                            <strong>Duration:</strong> {student.duration}
                          </p>
                        )}
                      </div>
                      <div className="student-actions">
                        <button className="action-btn primary">
                          {student.type === "thesis"
                            ? "View Progress"
                            : "View Details"}
                        </button>
                        <button
                          className="action-btn secondary"
                          onClick={() => onNavigate("schedule-meeting")}
                        >
                          Schedule Meeting
                        </button>
                        {student.type === "research-assistant" && (
                          <button className="action-btn secondary">
                            Assign Tasks
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {archivedStudents.length > 0 && (
                <div className="students-subsection">
                  <h4>📁 Archived Students</h4>
                  <div className="archived-list">
                    {archivedStudents.map((student) => (
                      <div key={student.id} className="archived-item">
                        <div className="archived-header">
                          <h5>{student.name}</h5>
                          <span className="archived-date">
                            Archived:{" "}
                            {new Date(
                              student.archivedDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p>
                          <strong>Student ID:</strong> {student.studentId}
                        </p>
                        <p>
                          <strong>Type:</strong>{" "}
                          {student.type === "thesis"
                            ? "Thesis Student"
                            : "Research Assistant"}
                        </p>
                        <p>
                          <strong>Topic:</strong> {student.topic}
                        </p>
                        <div className="archived-actions">
                          <button
                            className="action-btn restore"
                            onClick={() =>
                              handleRestoreFromArchive("student", student.id)
                            }
                          >
                            Restore
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "schedule":
        return (
          <div className="tab-content">
            <div className="schedule-section">
              <h3>Weekly Schedule</h3>
              <div className="schedule-grid">
                <div className="schedule-header">
                  <div className="time-slot">Time</div>
                  <div className="day-slot">Sunday</div>
                  <div className="day-slot">Monday</div>
                  <div className="day-slot">Tuesday</div>
                  <div className="day-slot">Wednesday</div>
                  <div className="day-slot">Thursday</div>
                </div>

                <div className="schedule-row">
                  <div className="time-slot">9:00-10:30</div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 408</strong>
                      <span>Room 301</span>
                    </div>
                  </div>
                  <div className="schedule-cell">
                    <div className="meeting-item">
                      <strong>Research Meeting</strong>
                      <span>Lab 201</span>
                    </div>
                  </div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 408</strong>
                      <span>Room 301</span>
                    </div>
                  </div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 412</strong>
                      <span>Room 205</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                </div>

                <div className="schedule-row">
                  <div className="time-slot">10:30-12:00</div>
                  <div className="schedule-cell">
                    <div className="office-hours">
                      <strong>Office Hours</strong>
                      <span>Room 402</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="office-hours">
                      <strong>Office Hours</strong>
                      <span>Room 402</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="office-hours">
                      <strong>Office Hours</strong>
                      <span>Room 402</span>
                    </div>
                  </div>
                </div>

                <div className="schedule-row">
                  <div className="time-slot">2:00-3:30</div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 412</strong>
                      <span>Room 205</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="class-item">
                      <strong>CSE 412</strong>
                      <span>Room 205</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                </div>

                <div className="schedule-row">
                  <div className="time-slot">3:30-5:00</div>
                  <div className="schedule-cell">
                    <div className="committee-item">
                      <strong>Faculty Meeting</strong>
                      <span>Conference Room</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell empty"></div>
                  <div className="schedule-cell">
                    <div className="committee-item">
                      <strong>Curriculum Committee</strong>
                      <span>Conference Room</span>
                    </div>
                  </div>
                  <div className="schedule-cell empty"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "administrative":
        return (
          <div className="tab-content">
            <div className="administrative-section">
              <h3>Administrative Duties</h3>

              <div className="admin-subsection">
                <h4>Committee Memberships</h4>
                <div className="committee-list">
                  <div className="committee-item">
                    <h5>Curriculum Development Committee</h5>
                    <p>
                      <strong>Role:</strong> Member
                    </p>
                    <p>
                      <strong>Responsibilities:</strong> Review and update
                      course curricula, evaluate new course proposals
                    </p>
                    <p>
                      <strong>Meeting Schedule:</strong> First Wednesday of
                      every month
                    </p>
                  </div>
                  <div className="committee-item">
                    <h5>Admissions Committee</h5>
                    <p>
                      <strong>Role:</strong> Co-Chair
                    </p>
                    <p>
                      <strong>Responsibilities:</strong> Review graduate
                      applications, conduct interviews
                    </p>
                    <p>
                      <strong>Meeting Schedule:</strong> Bi-weekly during
                      admission season
                    </p>
                  </div>
                  <div className="committee-item">
                    <h5>Research Ethics Committee</h5>
                    <p>
                      <strong>Role:</strong> Member
                    </p>
                    <p>
                      <strong>Responsibilities:</strong> Review research
                      proposals for ethical compliance
                    </p>
                    <p>
                      <strong>Meeting Schedule:</strong> As needed
                    </p>
                  </div>
                </div>
              </div>

              <div className="admin-subsection">
                <h4>Current Administrative Tasks</h4>
                <div className="task-list">
                  {administrativeTasks.map((task) => (
                    <div key={task.id} className="task-item">
                      <div className="task-info">
                        <div className="task-header">
                          <h5>{task.title}</h5>
                          <div className="task-actions">
                            <button
                              className="mark-done-btn"
                              onClick={() => handleMarkTaskDone(task.id)}
                              title="Mark as completed"
                            >
                              ✓ Done
                            </button>
                          </div>
                        </div>
                        <p>
                          <strong>Deadline:</strong> {task.deadline}
                        </p>
                        <p>
                          <strong>Description:</strong> {task.description}
                        </p>
                        <div className="task-progress">
                          <label>
                            <strong>Progress:</strong>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={parseInt(task.progress)}
                              onChange={(e) =>
                                handleUpdateTaskProgress(
                                  task.id,
                                  `${e.target.value}%`
                                )
                              }
                              className="progress-slider"
                            />
                            <span className="progress-value">
                              {task.progress}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="task-status">
                        <span className={`status-${task.status}`}>
                          {task.status === "in-progress"
                            ? "In Progress"
                            : task.status === "pending"
                            ? "Pending"
                            : task.status === "todo"
                            ? "To Do"
                            : task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {administrativeTasks.length === 0 && (
                    <div className="no-tasks">
                      <p>🎉 All administrative tasks completed!</p>
                    </div>
                  )}
                </div>
              </div>

              {completedTasks.length > 0 && (
                <div className="admin-subsection">
                  <h4>✅ Completed Tasks</h4>
                  <div className="completed-task-list">
                    {completedTasks.map((task) => (
                      <div key={task.id} className="completed-task-item">
                        <div className="completed-task-info">
                          <div className="completed-task-header">
                            <h5>{task.title}</h5>
                            <span className="completion-date">
                              Completed:{" "}
                              {new Date(
                                task.completedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <p>
                            <strong>Deadline:</strong> {task.deadline}
                          </p>
                          <p>
                            <strong>Description:</strong> {task.description}
                          </p>
                        </div>
                        <div className="completed-task-actions">
                          <button
                            className="restore-task-btn"
                            onClick={() => handleRestoreTask(task.id)}
                          >
                            Restore
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "quick-actions":
        return (
          <div className="tab-content">
            <div className="quick-actions-section">
              <h3>Quick Actions</h3>
              <p className="section-description">
                Access frequently used teacher tools and functions
              </p>

              <div className="actions-grid">
                <div className="action-category">
                  <h4>📚 Course Management</h4>
                  <div className="action-buttons">
                    <button
                      className="quick-action-btn"
                      onClick={() =>
                        onNavigate
                          ? onNavigate("grade-assignment")
                          : alert("Grade Assignment - Coming Soon!")
                      }
                    >
                      <span className="btn-icon">📝</span>
                      <span className="btn-text">
                        <strong>Assign Grades</strong>
                        <small>Grade student assignments and exams</small>
                      </span>
                    </button>
                    <button
                      className="quick-action-btn"
                      onClick={() =>
                        onNavigate
                          ? onNavigate("mark-attendance")
                          : alert("Attendance Management - Coming Soon!")
                      }
                    >
                      <span className="btn-icon">✅</span>
                      <span className="btn-text">
                        <strong>Mark Attendance</strong>
                        <small>Record student attendance</small>
                      </span>
                    </button>
                    <button
                      className="quick-action-btn"
                      onClick={() =>
                        onNavigate
                          ? onNavigate("create-assignment")
                          : alert("Assignment Creation - Coming Soon!")
                      }
                    >
                      <span className="btn-icon">📄</span>
                      <span className="btn-text">
                        <strong>Create Assignment</strong>
                        <small>Create new assignments and projects</small>
                      </span>
                    </button>
                    <button
                      className="quick-action-btn"
                      onClick={() => onNavigate("upload-materials")}
                    >
                      <span className="btn-icon">📖</span>
                      <span className="btn-text">
                        <strong>Upload Materials</strong>
                        <small>Add course materials and resources</small>
                      </span>
                    </button>
                    <button
                      className="quick-action-btn"
                      onClick={() => onNavigate("reserve-room")}
                    >
                      <span className="btn-icon">🏛️</span>
                      <span className="btn-text">
                        <strong>Reserve Room</strong>
                        <small>Book classrooms and facilities</small>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="teacher-profile">
      <div className="profile-container">
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back to Dashboard
          </button>
        )}

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <img
                src="/api/placeholder/120/120"
                alt="Profile"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="avatar-placeholder">👩‍🏫</div>
            </div>
            <div className="profile-details">
              <h1>{teacherData.name}</h1>
              <p className="profile-title">{teacherData.designation}</p>
              <p className="profile-department">{teacherData.department}</p>
              <div className="profile-meta">
                <span className="meta-item">📧 {teacherData.email}</span>
                <span className="meta-item">📞 {teacherData.phone}</span>
                <span className="meta-item">🏢 {teacherData.officeRoom}</span>
              </div>
            </div>
            <div className="profile-actions">
              <button className="edit-profile-btn" onClick={onEditProfile}>
                Edit Profile
              </button>
              <button
                className="action-btn secondary"
                onClick={() => onNavigate("schedule-meeting")}
              >
                � Schedule Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="profile-nav">
          <button
            className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
          <button
            className={`nav-tab ${activeTab === "research" ? "active" : ""}`}
            onClick={() => setActiveTab("research")}
          >
            Research
          </button>
          <button
            className={`nav-tab ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`nav-tab ${activeTab === "schedule" ? "active" : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule
          </button>
          <button
            className={`nav-tab ${
              activeTab === "administrative" ? "active" : ""
            }`}
            onClick={() => setActiveTab("administrative")}
          >
            Administrative
          </button>
          <button
            className={`nav-tab ${
              activeTab === "quick-actions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("quick-actions")}
          >
            Quick Actions
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default TeacherProfile;
