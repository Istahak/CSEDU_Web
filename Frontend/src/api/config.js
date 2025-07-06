/**
 * API configuration settings
 */
const API_CONFIG = {
  BASE_URL: '',
  API_VERSION: '/api/v1',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      ME: '/auth/me',
    },
    HOMEPAGE: {
      ALL: '/homepage/all',
      OVERVIEW: '/homepage/overview',
      ANNOUNCEMENTS: '/homepage/announcements',
      QUICKLINKS: '/homepage/quick-links',
    }
  },
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;
