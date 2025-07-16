// StudentProfileService.js
// Service for fetching student profile data by student ID
import ApiService from './ApiService';

const StudentProfileService = {
  /**
   * Fetch all student profiles
   * @returns {Promise<Array>} Array of student profile objects
   */
  async getAllStudentProfiles() {
    // Adjust the endpoint to match your backend for fetching all student profiles
    return ApiService.get('/student_profile_get_all/all');
  },

  /**
   * Fetch student profile by student_id (UUID)
   * @param {string} studentId
   * @returns {Promise<Object>} Profile data (should include full name)
   */
  async getStudentProfile(studentId) {
    // Adjust the endpoint to match your backend for student profile by ID
    return ApiService.get(`/student_profile/by_user/${studentId}`);
  },
};

export default StudentProfileService;
