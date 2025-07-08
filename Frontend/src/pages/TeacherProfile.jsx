import React, { useState } from "react";
import CourseCard from "../components/CourseCard";
import ResearchCard from "../components/ResearchCard";
import StudentCard from "../components/StudentCard";
import "./TeacherProfile.css";

// Sample courses data - only academic courses (moved outside component)
const initialCoursesData = [
  {
    id: 1,
    code: "CSE 408",
    title: "Software Development",
    section: "Batch 20",
    schedule: "Sunday, Tuesday - 10:00 AM - 11:30 AM",
    studentsEnrolled: 45,
    room: "Room 301",
    semester: "Fall 2024",
    status: "active"
  },
  {
    id: 2,
    code: "CSE 412",
    title: "Machine Learning",
    section: "Batch 19",
    schedule: "Monday, Wednesday - 2:00 PM - 3:30 PM",
    studentsEnrolled: 38,
    room: "Room 205",
    semester: "Fall 2024",
    status: "active"
  },
  {
    id: 3,
    code: "CSE 410",
    title: "Computer Graphics",
    section: "Batch 20",
    schedule: "Thursday - 9:00 AM - 12:00 PM",
    studentsEnrolled: 32,
    room: "Lab 104",
    semester: "Fall 2024",
    status: "active"
  },
  {
    id: 4,
    code: "CSE 414",
    title: "Database Systems",
    section: "Batch 18",
    schedule: "Sunday, Wednesday - 1:00 PM - 2:30 PM",
    studentsEnrolled: 42,
    room: "Room 203",
    semester: "Fall 2024",
    status: "active"
  },
  {
    id: 5,
    code: "CSE 416",
    title: "Artificial Intelligence",
    section: "Batch 19",
    schedule: "Tuesday, Thursday - 11:00 AM - 12:30 PM",
    studentsEnrolled: 28,
    room: "Room 305",
    semester: "Fall 2024",
    status: "active"
  }
];

// Sample students data
const initialThesisStudents = [
  {
    id: "CSE-2020-1001",
    name: "Mohammad Rahman",
    thesisTopic: "Machine Learning for Stock Price Prediction",
    progress: 75,
    progressLevel: "high",
    startDate: "Jan 2023",
    year: "Final",
    level: "Undergraduate"
  },
  {
    id: "CSE-2020-1015",
    name: "Fatima Khan",
    thesisTopic: "Natural Language Processing for Bengali",
    progress: 60,
    progressLevel: "medium",
    startDate: "Feb 2023",
    year: "Final",
    level: "Undergraduate"
  },
  {
    id: "CSE-2019-1008",
    name: "Ali Hassan",
    thesisTopic: "Blockchain Technology in Healthcare",
    progress: 40,
    progressLevel: "low",
    startDate: "Sep 2022",
    year: "Final",
    level: "Undergraduate"
  }
];

const initialResearchAssistants = [
  {
    id: "CSE-2021-1025",
    name: "Ahmed Hassan",
    researchArea: "Deep Learning",
    duration: "6 months",
    joinDate: "Aug 2024",
    level: "Undergraduate"
  },
  {
    id: "CSE-2022-1030",
    name: "Samira Ahmed",
    researchArea: "Computer Vision",
    duration: "8 months",
    joinDate: "Jun 2024",
    level: "Graduate"
  },
  {
    id: "CSE-2021-1042",
    name: "Nadia Islam",
    researchArea: "Natural Language Processing",
    duration: "4 months",
    joinDate: "Oct 2024",
    level: "Undergraduate"
  }
];

const TeacherProfile = ({
  onBack,
  teacherData: propTeacherData,
  onEditProfile,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [courses, setCourses] = useState(initialCoursesData);
  const [thesisStudents, setThesisStudents] = useState(initialThesisStudents);
  const [researchAssistants, setResearchAssistants] = useState(initialResearchAssistants);
  const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);
  const [showCreateResearchForm, setShowCreateResearchForm] = useState(false);

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

  // Research projects state (reactive)
  const [researchProjects, setResearchProjects] = useState([
    {
      id: 1,
      title: "Deep Learning for Medical Image Analysis",
      year: "2023",
      tags: ["Medical Imaging", "Deep Learning"],
      authors: "Dr. Sarah Wilson, Dr. John Smith",
      supervisor: "Dr. Jane Doe",
      abstract: "This project explores deep learning techniques for medical image analysis, aiming to improve diagnostic accuracy.",
      status: "active"
    },
    {
      id: 2,
      title: "Natural Language Processing for Bengali Text",
      year: "2024",
      tags: ["NLP", "Bengali Language"],
      authors: "Dr. Sarah Wilson",
      supervisor: "Dr. Jane Doe",
      abstract: "Developing NLP tools and datasets for Bengali text to advance language technology research.",
      status: "active"
    },
    {
      id: 3,
      title: "Computer Vision for Autonomous Vehicles",
      year: "2022",
      tags: ["Computer Vision", "AI"],
      authors: "Dr. Sarah Wilson, Dr. Mike Johnson",
      supervisor: "Dr. Jane Doe",
      abstract: "Research on improving computer vision algorithms for autonomous vehicle navigation systems.",
      status: "active"
    },
    {
      id: 4,
      title: "Blockchain Security in IoT Networks",
      year: "2021",
      tags: ["Blockchain", "IoT", "Security"],
      authors: "Dr. Sarah Wilson",
      supervisor: "Dr. Jane Doe",
      abstract: "Investigating blockchain-based security solutions for Internet of Things network architectures.",
      status: "completed"
    }
  ]);

  // Course action handlers
  const handleViewStudents = (course) => {
    console.log("Viewing students for:", course.title);
    if (onNavigate) {
      onNavigate("course-students", { courseId: course.id });
    }
  };

  const handleManageGrades = (course) => {
    console.log("Managing grades for:", course.title);
    if (onNavigate) {
      onNavigate("grade-assignment", { courseId: course.id });
    }
  };

  const handleAttendance = (course) => {
    console.log("Managing attendance for:", course.title);
    if (onNavigate) {
      onNavigate("mark-attendance", { courseId: course.id });
    }
  };

  const handleArchive = (course) => {
    const confirmArchive = window.confirm(
      `Are you sure you want to archive ${course.code} - ${course.title}? This course will be moved to archived courses.`
    );

    if (confirmArchive) {
      setCourses(prevCourses =>
        prevCourses.map(c =>
          c.id === course.id ? { ...c, status: "archived" } : c
        )
      );
      console.log("Course archived:", course.title);
    }
  };

  const handleCreateCourse = () => {
    // Always show the modal form for creating courses
    console.log("Create course button clicked");
    console.log("Current showCreateCourseForm state:", showCreateCourseForm);
    setShowCreateCourseForm(true);
    console.log("Set showCreateCourseForm to true");
  };

  const handleCreateCourseSubmit = (newCourseData) => {
    const newCourse = {
      id: Math.max(...courses.map(c => c.id), 0) + 1,
      ...newCourseData,
      semester: "Fall 2024",
      status: "active"
    };

    setCourses(prevCourses => [...prevCourses, newCourse]);
    setShowCreateCourseForm(false);
    console.log("New course created:", newCourse);
  };

  const CreateCourseForm = () => {
    console.log("CreateCourseForm component is rendering");
    const [formData, setFormData] = useState({
      code: '',
      title: '',
      section: '',
      schedule: '',
      studentsEnrolled: 0,
      room: ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'studentsEnrolled' ? parseInt(value) || 0 : value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.code && formData.title && formData.section && formData.schedule && formData.room) {
        handleCreateCourseSubmit(formData);
      } else {
        alert("Please fill in all required fields");
      }
    };

    return (
      <div className="create-course-form-overlay">
        <div className="create-course-form">
          <div className="form-header">
            <h3>Create New Course</h3>
            <button
              className="close-btn"
              onClick={() => setShowCreateCourseForm(false)}
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Course Code *</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="e.g., CSE 420"
                  required
                />
              </div>
              <div className="form-group">
                <label>Course Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Data Structures"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Batch *</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  placeholder="e.g., Batch 21"
                  required
                />
              </div>
              <div className="form-group">
                <label>Room *</label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  placeholder="e.g., Room 305"
                  required
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Schedule *</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                placeholder="e.g., Monday, Wednesday - 9:00 AM - 10:30 AM"
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Expected Students</label>
              <input
                type="number"
                name="studentsEnrolled"
                value={formData.studentsEnrolled}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="secondary-action-btn"
                onClick={() => setShowCreateCourseForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="primary-action-btn">
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Handler to add a new research project
  const handleCreateResearchProject = () => {
    setShowCreateResearchForm(true);
  };

  const handleCreateResearchSubmit = (newProjectData) => {
    const newProject = {
      id: Math.max(...researchProjects.map(p => p.id), 0) + 1,
      ...newProjectData,
      status: "active",
      tags: newProjectData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    setResearchProjects(prev => [...prev, newProject]);
    setShowCreateResearchForm(false);
    console.log("New research project created:", newProject);
  };

  // Handler to mark a project as finished
  const handleMarkProjectFinished = (projectId, completionData = null) => {
    setResearchProjects(prev => prev.map(p =>
      p.id === projectId ? {
        ...p,
        status: "completed",
        completionData: completionData,
        completedDate: completionData?.completionDate || new Date().toISOString().split('T')[0],
        // Update project fields with completion data if provided
        ...(completionData && {
          abstract: completionData.finalAbstract || p.abstract,
          methodology: completionData.methodology,
          outcomes: completionData.actualOutcomes,
          timeline: completionData.projectTimeline,
          resources: completionData.resourcesUsed,
          impact: completionData.projectImpact,
          publications: completionData.publications,
          projectFiles: completionData.projectFiles
        })
      } : p
    ));

    if (completionData) {
      console.log('Project completed with detailed data:', {
        projectId,
        completionData
      });
    }
  };

  const CreateResearchForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      year: '',
      tags: '', // comma separated
      authors: '',
      supervisor: '',
      abstract: ''
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.title && formData.year && formData.tags && formData.authors && formData.supervisor && formData.abstract) {
        handleCreateResearchSubmit({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        });
      } else {
        alert("Please fill in all required fields");
      }
    };
    return (
      <div className="create-course-form-overlay">
        <div className="create-course-form">
          <div className="form-header">
            <h3>Create New Research Project</h3>
            <button className="close-btn" onClick={() => setShowCreateResearchForm(false)}>×</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Project Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Year *</label>
                <input type="text" name="year" value={formData.year} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Research Areas (comma separated) *</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} required placeholder="e.g., NLP, Deep Learning" />
              </div>
              <div className="form-group">
                <label>Authors *</label>
                <input type="text" name="authors" value={formData.authors} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Supervisor *</label>
                <input type="text" name="supervisor" value={formData.supervisor} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Short Abstract *</label>
                <textarea name="abstract" value={formData.abstract} onChange={handleInputChange} required maxLength={200} placeholder="Brief summary (max 200 chars)" />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="secondary-action-btn" onClick={() => setShowCreateResearchForm(false)}>Cancel</button>
              <button type="submit" className="primary-action-btn">Create Project</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Student action handlers
  const handleViewProgress = (student) => {
    console.log("Viewing progress for:", student.name);
    if (onNavigate) {
      onNavigate("student-progress", { studentId: student.id });
    }
  };

  const handleScheduleMeeting = (student) => {
    console.log("Scheduling meeting with:", student.name);
    if (onNavigate) {
      onNavigate("schedule-meeting", { studentId: student.id });
    }
  };

  const handleViewDetails = (student) => {
    console.log("Viewing details for:", student.name);
    if (onNavigate) {
      onNavigate("student-details", { studentId: student.id });
    }
  };

  const handleAssignTasks = (student) => {
    console.log("Assigning tasks to:", student.name);
    if (onNavigate) {
      onNavigate("assign-tasks", { studentId: student.id });
    }
  };

  // Research project action handlers
  const handleEditResearch = (projectId, editData) => {
    if (editData) {
      // Handle inline edit from modal
      setResearchProjects(prevProjects =>
        prevProjects.map(p =>
          p.id === projectId ? { ...p, ...editData } : p
        )
      );
      console.log("Research project updated:", editData);
    } else {
      // Fallback to navigation (for external edit page if needed)
      console.log("Editing research project:", projectId);
      if (onNavigate) {
        onNavigate("edit-project", { projectId });
      }
    }
  };

  const handleArchiveResearch = (project) => {
    const confirmArchive = window.confirm(
      `Are you sure you want to archive "${project.title}"? This project will be moved to archived projects.`
    );

    if (confirmArchive) {
      setResearchProjects(prevProjects =>
        prevProjects.map(p =>
          p.id === project.id ? { ...p, status: "archived" } : p
        )
      );
      console.log("Research project archived:", project.title);
    }
  };

  const handleCompleteResearch = (project) => {
    const confirmComplete = window.confirm(
      `Are you sure you want to mark "${project.title}" as completed?`
    );

    if (confirmComplete) {
      setResearchProjects(prevProjects =>
        prevProjects.map(p =>
          p.id === project.id ? { ...p, status: "completed" } : p
        )
      );
      console.log("Research project completed:", project.title);
    }
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
        const activeCourses = courses.filter(course => course.status === "active");
        const archivedCourses = courses.filter(course => course.status === "archived");
        return (
          <div className="tab-content">
            <div className="courses-section">
              <div className="section-header">
                <div className="section-header-content">
                  <div className="section-header-text">
                    <h3>Current Courses</h3>
                    <p className="section-subtitle">Manage your course assignments and track student progress</p>
                  </div>
                  <button
                    className="create-course-btn"
                    onClick={() => {
                      handleCreateCourse();
                    }}
                  >
                    + Create Course
                  </button>
                </div>
              </div>
              <div className="notices-grid">
                {activeCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onViewStudents={handleViewStudents}
                    onManageGrades={handleManageGrades}
                    onAttendance={handleAttendance}
                    onArchive={handleArchive}
                  />
                ))}
              </div>
              {activeCourses.length === 0 && (
                <div className="no-courses">
                  <div className="no-courses-content">
                    <span className="no-courses-icon">📚</span>
                    <h3>No active courses</h3>
                    <p>You don't have any active courses. Create your first course to get started!</p>
                    <button className="create-first-course-btn" onClick={handleCreateCourse}>
                      Create Your First Course
                    </button>
                  </div>
                </div>
              )}
              {archivedCourses.length > 0 && (
                <div className="archived-courses-section">
                  <div className="section-header" style={{ marginTop: '2.5rem' }}>
                    <h3 style={{ color: '#6c757d' }}>Archived Courses</h3>
                    <p className="section-subtitle">These courses have been archived and are no longer active</p>
                  </div>
                  <div className="notices-grid">
                    {archivedCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onViewStudents={handleViewStudents}
                        archived={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {showCreateCourseForm && <CreateCourseForm />}
          </div>
        );
      case "research":
        const activeProjects = researchProjects.filter(project => project.status === "active");
        const completedProjects = researchProjects.filter(project => project.status === "completed");
        const archivedProjects = researchProjects.filter(project => project.status === "archived");

        return (
          <div className="tab-content">
            <div className="research-section">
              <div className="section-header">
                <div className="section-header-content">
                  <div className="section-header-text">
                    <h3>Research Activities</h3>
                    <p className="section-subtitle">Manage your research projects and track progress</p>
                  </div>
                  <button 
                    className="create-course-btn" 
                    onClick={handleCreateResearchProject}
                  >
                    + Create Project
                  </button>
                </div>
              </div>

              <div className="notices-grid">
                {activeProjects.map((project) => (
                  <ResearchCard 
                    key={project.id} 
                    project={project} 
                    onMarkFinished={handleMarkProjectFinished}
                    onEdit={handleEditResearch}
                    onArchive={handleArchiveResearch}
                    onComplete={handleCompleteResearch}
                  />
                ))}
              </div>

              {activeProjects.length === 0 && (
                <div className="no-courses">
                  <div className="no-courses-content">
                    <span className="no-courses-icon">🔬</span>
                    <h3>No active research projects</h3>
                    <p>You don't have any active research projects. Create your first project to get started!</p>
                    <button className="create-first-course-btn" onClick={handleCreateResearchProject}>
                      Create Your First Project
                    </button>
                  </div>
                </div>
              )}

              {completedProjects.length > 0 && (
                <div className="completed-projects-section">
                  <div className="section-header" style={{ marginTop: '2.5rem' }}>
                    <h3 style={{ color: '#28a745' }}>Completed Projects</h3>
                    <p className="section-subtitle">These projects have been successfully completed</p>
                  </div>
                  <div className="notices-grid">
                    {completedProjects.map((project) => (
                      <ResearchCard 
                        key={project.id} 
                        project={project} 
                        completed={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {archivedProjects.length > 0 && (
                <div className="archived-projects-section">
                  <div className="section-header" style={{ marginTop: '2.5rem' }}>
                    <h3 style={{ color: '#6c757d' }}>Archived Projects</h3>
                    <p className="section-subtitle">These projects have been archived and are no longer active</p>
                  </div>
                  <div className="notices-grid">
                    {archivedProjects.map((project) => (
                      <ResearchCard 
                        key={project.id} 
                        project={project} 
                        archived={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {showCreateResearchForm && <CreateResearchForm />}
            </div>
          </div>
        );
      case "students":
        return (
          <div className="tab-content">
      <div className="students-section">
        <div className="section-header">
          <h3>Student Management</h3>
          <p className="section-subtitle">Track thesis progress and manage research assistants</p>
        </div>

        <div className="students-subsection">
          <div className="students-subsection-header">
            <h4>Thesis Students</h4>
            <button
              className="create-course-btn"
              style={{ marginLeft: 'auto' }}
              onClick={() => alert('Add Thesis Student (form/modal coming soon!)')}
            >
              + Add Student
            </button>
          </div>
          <div className="notices-grid">
            {thesisStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                type="thesis"
                onViewProgress={handleViewProgress}
                onScheduleMeeting={handleScheduleMeeting}
              />
            ))}
          </div>
          {thesisStudents.length === 0 && (
            <div className="no-students">
              <div className="no-students-content">
                <span className="no-students-icon">🎓</span>
                <h3>No thesis students</h3>
                <p>You don't have any thesis students assigned yet.</p>
              </div>
            </div>
          )}
        </div>

        <div className="students-subsection">
          <div className="students-subsection-header">
            <h4>Research Assistants</h4>
            <button
              className="create-course-btn"
              style={{ marginLeft: 'auto' }}
              onClick={() => alert('Add Research Assistant (form/modal coming soon!)')}
            >
              + Add Research Assistant
            </button>
          </div>
          <div className="notices-grid">
            {researchAssistants.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                type="assistant"
                onViewDetails={handleViewDetails}
                onAssignTasks={handleAssignTasks}
              />
            ))}
          </div>
          {researchAssistants.length === 0 && (
            <div className="no-students">
              <div className="no-students-content">
                <span className="no-students-icon">🔬</span>
                <h3>No research assistants</h3>
                <p>You don't have any research assistants assigned yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
          </div>
        );
      case "schedule":
        return (
          <div className="tab-content">
            <div className="schedule-section">
              <div className="section-header">
                <h3>Weekly Schedule</h3>
                <p className="section-subtitle">View your teaching schedule and meeting commitments</p>
              </div>
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
              <div className="section-header">
                <h3>Administrative Duties</h3>
                <p className="section-subtitle">Committee memberships and administrative responsibilities</p>
              </div>

              <div className="admin-subsection">
                <h4>Committee Memberships</h4>
                <div className="content-grid">
                  <div className="content-card admin-card">
                    <div className="card-header">
                      <div className="role-badge member">Member</div>
                      <div className="committee-meta">
                        <h4>Curriculum Development Committee</h4>
                        <p className="meeting-schedule">First Wednesday of every month</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">🎯 Responsibilities:</span>
                        <span className="info-value">Review and update course curricula, evaluate new course proposals</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card admin-card">
                    <div className="card-header">
                      <div className="role-badge chair">Co-Chair</div>
                      <div className="committee-meta">
                        <h4>Admissions Committee</h4>
                        <p className="meeting-schedule">Bi-weekly during admission season</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">🎯 Responsibilities:</span>
                        <span className="info-value">Review graduate applications, conduct interviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card admin-card">
                    <div className="card-header">
                      <div className="role-badge member">Member</div>
                      <div className="committee-meta">
                        <h4>Research Ethics Committee</h4>
                        <p className="meeting-schedule">As needed</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">🎯 Responsibilities:</span>
                        <span className="info-value">Review research proposals for ethical compliance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-subsection">
                <h4>Current Administrative Tasks</h4>
                <div className="content-grid">
                  <div className="content-card task-card">
                    <div className="card-header">
                      <div className="status-badge progress">In Progress</div>
                      <div className="task-meta">
                        <h4>Graduate Application Reviews</h4>
                        <p className="task-deadline">Deadline: March 30, 2024</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📊 Progress:</span>
                        <span className="info-value">15/25 applications reviewed</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card task-card">
                    <div className="card-header">
                      <div className="status-badge pending">Pending</div>
                      <div className="task-meta">
                        <h4>Course Curriculum Update - CSE 412</h4>
                        <p className="task-deadline">Deadline: April 15, 2024</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📋 Status:</span>
                        <span className="info-value">Pending committee approval</span>
                      </div>
                    </div>
                  </div>
                  <div className="content-card task-card">
                    <div className="card-header">
                      <div className="status-badge todo">To Do</div>
                      <div className="task-meta">
                        <h4>Faculty Performance Evaluations</h4>
                        <p className="task-deadline">Deadline: May 1, 2024</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">📋 Status:</span>
                        <span className="info-value">Not started</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    <div className="teacher-profile-page">
      <div className="teacher-profile-container">
        {/* Header Section - Consistent with Notices */}
        <div className="teacher-profile-header">
          <h1 className="profile-title">{teacherData.name}</h1>
          <p className="profile-subtitle">
            {teacherData.designation} • {teacherData.department}
          </p>
        </div>

        {/* Profile Info Section */}
        <div className="profile-info-section">
          <div className="profile-avatar-section">
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
          </div>
          <div className="profile-details-section">
            <h2 className="teacher-name">{teacherData.name}</h2>
            <p className="teacher-designation">{teacherData.designation}</p>
            <p className="teacher-department">{teacherData.department}</p>
            <div className="profile-meta">
              <span className="meta-item">📧 {teacherData.email}</span>
              <span className="meta-item">📞 {teacherData.phone}</span>
              <span className="meta-item">🏢 {teacherData.officeRoom}</span>
            </div>
          </div>
          <div className="profile-actions-section">
            <button className="primary-action-btn" onClick={onEditProfile}>
              Edit Profile
            </button>
            <button
              className="secondary-action-btn"
              onClick={() => onNavigate("schedule-meeting")}
            >
              Schedule Meeting
            </button>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="profile-navigation-section">
          <button
            className={`profile-nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "research" ? "active" : ""}`}
            onClick={() => setActiveTab("research")}
          >
            Research
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "schedule" ? "active" : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "administrative" ? "active" : ""
              }`}
            onClick={() => setActiveTab("administrative")}
          >
            Administrative
          </button>
          <button
            className={`profile-nav-tab ${activeTab === "quick-actions" ? "active" : ""
              }`}
            onClick={() => setActiveTab("quick-actions")}
          >
            Quick Actions
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content-section">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default TeacherProfile;
