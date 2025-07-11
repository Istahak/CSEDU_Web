import apiService from './ApiService';

const BASE_PATH = '/achievements';

const AchievementService = {
  // Get all achievements
  getAll: () => apiService.get(BASE_PATH),

  // Get achievement by ID
  getById: (achievementId) => apiService.get(`${BASE_PATH}/${achievementId}`),

  // Get achievements by user ID
  getByUser: (userId) => apiService.get(`${BASE_PATH}/by-user/${userId}`),
};

export default AchievementService;