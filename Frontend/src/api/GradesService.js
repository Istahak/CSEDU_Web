import apiService from './ApiService';

const BASE_PATH = '/grades';

const GradesService = {
  // Create a grade
  async create(data) {
    return apiService.post(`${BASE_PATH}`, data);
  },

  // Get a grade by ID
  async getById(gradeId) {
    return apiService.get(`${BASE_PATH}/${gradeId}`);
  },

  // Get all grades (with pagination)
  async getAll(params = {}) {
    return apiService.get(`${BASE_PATH}`, { params });
  },

  // Get grades by course
  async getByCourse(courseId) {
    return apiService.get(`${BASE_PATH}/by-course/${courseId}`);
  },

  // Get grades by student
  async getByStudent(studentId) {
    return apiService.get(`${BASE_PATH}/by-student/${studentId}`);
  },

  // Get grade by course and student
  async getByCourseAndStudent(courseId, studentId) {
    return apiService.get(`${BASE_PATH}/by-course-student`, { params: { course_id: courseId, student_id: studentId } });
  },

  // Update grade
  async update(gradeId, data) {
    return apiService.put(`${BASE_PATH}/${gradeId}`, data);
  },

  // Delete grade
  async delete(gradeId) {
    return apiService.delete(`${BASE_PATH}/${gradeId}`);
  },
};

export default GradesService;
