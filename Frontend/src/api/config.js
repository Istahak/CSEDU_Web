/**
 * API configuration settings
 */
const API_CONFIG = {
  // added by miraj - set the correct base URL for the backend
  BASE_URL: 'http://localhost:8000',
  API_VERSION: '/api/v1',
  ENDPOINTS: {
    AUTH: {
      // added by miraj - updated to match backend endpoints
      LOGIN: '/auth/signin',
      SIGNUP: '/auth/signup',
      ME: '/auth/me',
    },
    HOMEPAGE: {
      ALL: '/homepage/all',
      OVERVIEW: '/homepage/overview',
      ANNOUNCEMENTS: '/homepage/announcements',
      QUICKLINKS: '/homepage/quick-links',
    },
    PROFILE: '/profile'
  },
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;
