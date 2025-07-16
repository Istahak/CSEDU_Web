import apiService from './ApiService';

const BASE_PATH = '/attendance';

const AttendanceService = {
  // Get all attendance records
  async getAll(params = {}) {
    return apiService.get(`${BASE_PATH}`, { params });
  },

  // Get attendance by course
  async getByCourse(courseId) {
    return apiService.get(`${BASE_PATH}/by-course/${courseId}`);
  },

  // Get attendance by student
  async getByStudent(studentId) {
    return apiService.get(`${BASE_PATH}/by-student/${studentId}`);
  },

  // Get attendance by date
  async getByDate(date) {
    return apiService.get(`${BASE_PATH}/by-date/${date}`);
  },

  // Get attendance by status (present/absent)
  async getByStatus(isPresent) {
    return apiService.get(`${BASE_PATH}/by-status/${isPresent}`);
  },

  // Get attendance by filters (course, student, date, is_present)
  async filter(params = {}) {
    return apiService.get(`${BASE_PATH}/filter`, { params });
  },

  // Create attendance record
  async create(data) {
    return apiService.post(`${BASE_PATH}`, data);
  },

  // Update attendance record
  async update(attendanceId, data) {
    return apiService.put(`${BASE_PATH}/${attendanceId}`, data);
  },

  // Delete attendance record
  async delete(attendanceId) {
    return apiService.delete(`${BASE_PATH}/${attendanceId}`);
  },
};

export default AttendanceService;
