import apiService from './ApiService';

const BASE_PATH = '/courses';

const CourseService = {
  // List all courses
  async getAll(params = {}) {
    return apiService.get(`${BASE_PATH}`, { params });
  },

  // Get course by id
  async getById(courseId) {
    return apiService.get(`${BASE_PATH}/${courseId}`);
  },

  // Filter courses by semester
  async filterBySemester(semester, params = {}) {
    return apiService.get(`${BASE_PATH}/filter/semester`, { params: { semester, ...params } });
  },

  // Filter courses by instructor
  async filterByInstructor(instructor_id, params = {}) {
    return apiService.get(`${BASE_PATH}/filter/instructor`, { instructor_id, ...params });
  },

  // Filter courses by classroom
  async filterByClassroom(classroom_id, params = {}) {
    return apiService.get(`${BASE_PATH}/filter/classroom`, { params: { classroom_id, ...params } });
  },
  // Create a new course
  async create(courseData) {
    return apiService.post(`${BASE_PATH}`, courseData);
  },
};

export default CourseService;
