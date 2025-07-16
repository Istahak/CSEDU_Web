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
    // Tahsin added - Faculty endpoints
    FACULTY: {
      BASE: '/faculty',
      GET_ALL: '/faculty',
      GET_BY_ID: (id) => `/faculty/${id}`,
      CREATE: '/faculty',
      UPDATE: (id) => `/faculty/${id}`,
      DELETE: (id) => `/faculty/${id}`,
    },
    EVENT: {
      BASE: "/event",
      GET_ALL: "/event/",                               // GET all events
      GET_BY_ID: (id) => `/event/${id}`,                // GET event by ID
      CREATE: "/event/",                                // POST new event
      UPDATE: (id) => `/event/${id}`,                   // PUT update event
      DELETE: (id) => `/event/${id}`,                   // DELETE event
      UPDATE_IMAGE: (id) => `/event/${id}/image`,       // PUT update event image
    },
    PROFILE: '/profile'
  },
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;
