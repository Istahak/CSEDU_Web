import ApiService from './ApiService';
import API_CONFIG from './config';

/**
 * Service for handling profile-related API calls
 */
class ProfileService {
  /**
   * Get all user profiles (paginated)
   * @param {number} page_no - Page number (default 1)
   * @param {number} page_size - Page size (default 100)
   * @returns {Promise<Object>} Paginated profile response
   */
  async getAllProfiles(page_no = 1, page_size = 100) {
    try {
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/all`, { page_no, page_size });
      return response;
    } catch (error) {
      console.error('Error fetching all profiles:', error);
      return { data: [], total_item_count: 0 };
    }
  }

  /**
   * Get the current user's profile
   * @returns {Promise<Object>} The user profile data
   */
  async getMyProfile() {
    try {
      console.log('Fetching user profile...');
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/me`);
      console.log('Profile data received:', response);
      return response;
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Return demo profile data as fallback
      return this.getDemoProfile();
    }
  }

  /**
   * Update the current user's profile
   * @param {Object} profileData - The profile data to update
   * @returns {Promise<Object>} The updated profile data
   */
  async updateMyProfile(profileData) {
    try {
      console.log('Updating user profile with data:', profileData);
      const response = await ApiService.put(`${API_CONFIG.ENDPOINTS.PROFILE}/me`, profileData);
      console.log('Profile updated successfully:', response);
      return response;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  /**
   * Get student's academic records
   * @returns {Promise<Array>} List of academic records
   */
  async getAcademicRecords() {
    try {
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/student/academic-records`);
      return response;
    } catch (error) {
      console.error('Error fetching academic records:', error);
      return this.getDemoAcademicRecords();
    }
  }

  /**
   * Get student's courses
   * @returns {Promise<Array>} List of courses
   */
  async getCourses() {
    try {
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/student/courses`);
      return response;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return this.getDemoCourses();
    }
  }

  /**
   * Get student's projects
   * @returns {Promise<Array>} List of projects
   */
  async getProjects() {
    try {
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/student/projects`);
      return response;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return this.getDemoProjects();
    }
  }

  /**
   * Get student's assignments
   * @returns {Promise<Array>} List of assignments
   */
  async getAssignments() {
    try {
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/student/assignments`);
      return response;
    } catch (error) {
      console.error('Error fetching assignments:', error);
      return this.getDemoAssignments();
    }
  }

  /**
   * Get student's payments
   * @returns {Promise<Array>} List of payments
   */
  async getPayments() {
    try {
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/student/payments`);
      return response;
    } catch (error) {
      console.error('Error fetching payments:', error);
      return this.getDemoPayments();
    }
  }

  /**
   * Get faculty's teaching courses
   * @returns {Promise<Array>} List of courses
   */
  async getTeachingCourses() {
    try {
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/faculty/courses`);
      return response;
    } catch (error) {
      console.error('Error fetching teaching courses:', error);
      return this.getDemoTeachingCourses();
    }
  }

  /**
   * Get demo profile data for fallback
   * @returns {Object} Demo profile data
   */
  getDemoProfile() {
    // Return different demo data based on user role (can be determined from localStorage or context)
    const userRole = localStorage.getItem('userRole') || 'student';
    
    if (userRole === 'student') {
      return {
        id: 1,
        user_id: 1,
        name: 'John Doe',
        studentId: 'CSE-2018-001',
        email: 'john.doe@example.com',
        phone: '+880 1712345678',
        batch: '2018',
        semester: '8th',
        cgpa: 3.75,
        department: 'Computer Science & Engineering',
        address: '123 University Road, Dhaka',
        profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
        bio: 'Computer Science student with interest in AI and Machine Learning',
        type: 'student'
      };
    } else if (userRole === 'faculty') {
      return {
        id: 2,
        user_id: 2,
        name: 'Dr. Jane Smith',
        facultyId: 'FAC-2010-001',
        email: 'jane.smith@example.com',
        phone: '+880 1812345678',
        designation: 'Associate Professor',
        department: 'Computer Science & Engineering',
        office_location: 'Room 301, CSE Building',
        office_hours: 'Sunday, Tuesday: 2:00 PM - 4:00 PM',
        research_interests: 'Artificial Intelligence, Computer Vision, Machine Learning',
        publications: 45,
        profile_image: 'https://randomuser.me/api/portraits/women/1.jpg',
        bio: 'Experienced faculty member with research focus on AI and Computer Vision',
        type: 'faculty'
      };
    } else {
      return {
        id: 3,
        user_id: 3,
        name: 'Admin User',
        adminId: 'ADM-2020-001',
        email: 'admin@example.com',
        phone: '+880 1912345678',
        department: 'Administration',
        role_description: 'System Administrator',
        permissions_level: 3,
        profile_image: 'https://randomuser.me/api/portraits/men/10.jpg',
        type: 'admin'
      };
    }
  }

  /**
   * Get demo academic records for fallback
   * @returns {Array} Demo academic records
   */
  getDemoAcademicRecords() {
    return [
      { id: 1, semester: '1st', gpa: 3.7, credits: 18, year: '2018' },
      { id: 2, semester: '2nd', gpa: 3.8, credits: 21, year: '2019' },
      { id: 3, semester: '3rd', gpa: 3.9, credits: 19, year: '2019' },
      { id: 4, semester: '4th', gpa: 3.75, credits: 20, year: '2020' },
      { id: 5, semester: '5th', gpa: 3.8, credits: 18, year: '2020' },
      { id: 6, semester: '6th', gpa: 3.85, credits: 19, year: '2021' },
      { id: 7, semester: '7th', gpa: 3.9, credits: 17, year: '2021' }
    ];
  }

  /**
   * Get demo courses for fallback
   * @returns {Array} Demo courses
   */
  getDemoCourses() {
    return [
      { id: 1, course_code: 'CSE-101', title: 'Introduction to Computer Science', credits: 3, instructor_name: 'Dr. Jane Smith' },
      { id: 2, course_code: 'CSE-201', title: 'Data Structures', credits: 4, instructor_name: 'Dr. Robert Johnson' },
      { id: 3, course_code: 'CSE-301', title: 'Algorithms', credits: 4, instructor_name: 'Dr. Emily Brown' },
      { id: 4, course_code: 'CSE-401', title: 'Artificial Intelligence', credits: 3, instructor_name: 'Dr. Jane Smith' },
      { id: 5, course_code: 'CSE-402', title: 'Machine Learning', credits: 3, instructor_name: 'Dr. Michael Wilson' },
      { id: 6, course_code: 'CSE-403', title: 'Computer Vision', credits: 3, instructor_name: 'Dr. Sarah Davis' }
    ];
  }

  /**
   * Get demo projects for fallback
   * @returns {Array} Demo projects
   */
  getDemoProjects() {
    return [
      { id: 1, title: 'E-Learning Platform', description: 'Web-based learning management system', start_date: '2021-01-15', end_date: '2021-05-30', status: 'Completed', grade: 'A' },
      { id: 2, title: 'Face Recognition System', description: 'AI-based face recognition for attendance', start_date: '2021-06-10', end_date: '2021-12-20', status: 'Completed', grade: 'A+' },
      { id: 3, title: 'Smart Campus App', description: 'Mobile app for campus navigation and services', start_date: '2022-01-05', end_date: null, status: 'In Progress', grade: null }
    ];
  }

  /**
   * Get demo assignments for fallback
   * @returns {Array} Demo assignments
   */
  getDemoAssignments() {
    return [
      { id: 1, title: 'AI Research Paper', description: 'Research on recent AI advancements', due_date: '2023-04-15', submission_date: '2023-04-14', status: 'Submitted', grade: 'A', course_title: 'Artificial Intelligence' },
      { id: 2, title: 'ML Model Implementation', description: 'Implement a neural network from scratch', due_date: '2023-04-30', submission_date: null, status: 'Pending', grade: null, course_title: 'Machine Learning' },
      { id: 3, title: 'Computer Vision Project', description: 'Object detection system implementation', due_date: '2023-05-20', submission_date: null, status: 'Pending', grade: null, course_title: 'Computer Vision' }
    ];
  }

  /**
   * Get demo payments for fallback
   * @returns {Array} Demo payments
   */
  getDemoPayments() {
    return [
      { id: 1, amount: 25000, description: 'Tuition Fee - Spring 2023', due_date: '2023-01-15', payment_date: '2023-01-10', status: 'Paid' },
      { id: 2, amount: 5000, description: 'Lab Fee - Spring 2023', due_date: '2023-01-20', payment_date: '2023-01-10', status: 'Paid' },
      { id: 3, amount: 25000, description: 'Tuition Fee - Summer 2023', due_date: '2023-05-15', payment_date: null, status: 'Unpaid' }
    ];
  }

  /**
   * Get demo teaching courses for faculty
   * @returns {Array} Demo teaching courses
   */
  getDemoTeachingCourses() {
    return [
      { id: 1, course_code: 'CSE-101', title: 'Introduction to Computer Science', credits: 3, description: 'Fundamentals of computer science and programming' },
      { id: 4, course_code: 'CSE-401', title: 'Artificial Intelligence', credits: 3, description: 'Introduction to AI concepts and algorithms' },
      { id: 7, course_code: 'CSE-501', title: 'Advanced Machine Learning', credits: 3, description: 'Advanced topics in machine learning and deep learning' }
    ];
  }
  /**
   * Get a user profile by user id
   * @param {string|number} userId
   * @returns {Promise<Object>} The user profile data
   */
  async getProfileById(userId) {
    try {
      const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.PROFILE}/${userId}`);
      return response;
    } catch (error) {
      console.error('Error fetching profile by id:', error);
      return null;
    }
  }
}

// Export a singleton instance
export default new ProfileService();
