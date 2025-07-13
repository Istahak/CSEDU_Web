import apiService from './ApiService';

const BASE_PATH = '/achievements';

const AchievementService = {
  // Get all achievements
  getAll: () => apiService.get(BASE_PATH),

  // Get achievement by ID
  getById: (achievementId) => apiService.get(`${BASE_PATH}/${achievementId}`),

  // Get achievements by user ID
  getByUser: (userId) => apiService.get(`${BASE_PATH}/by-user/${userId}`),

  // Create a new achievement
  create: (data) => apiService.post(BASE_PATH, data),

  // Update an achievement
  update: (achievementId, data) => apiService.put(`${BASE_PATH}/${achievementId}`, data),

  // Delete an achievement
  delete: (achievementId) => apiService.delete(`${BASE_PATH}/${achievementId}`),
};

export default AchievementService;