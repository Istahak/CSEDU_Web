import apiService from './ApiService';

const BASE_PATH = '/classrooms';

const ClassroomService = {
  // Create a new classroom
  async create(classroomData) {
    return apiService.post(`${BASE_PATH}`, classroomData);
  },

  // Get all classrooms (with optional pagination)
  async getAll(params = {}) {
    return apiService.get(`${BASE_PATH}`, { params });
  },

  // Get classroom by ID
  async getById(classroomId) {
    return apiService.get(`${BASE_PATH}/by-id/${classroomId}`);
  },

  // Update classroom by ID
  async update(classroomId, classroomData) {
    return apiService.put(`${BASE_PATH}/${classroomId}`, classroomData);
  },

  // Delete classroom by ID
  async delete(classroomId) {
    return apiService.delete(`${BASE_PATH}/${classroomId}`);
  },
};

export default ClassroomService;