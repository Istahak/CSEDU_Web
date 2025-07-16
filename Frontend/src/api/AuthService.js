/**
 * Authentication service for handling login, signup, and user management
 */
import ApiService from './ApiService';
import API_CONFIG from './config';

// Create a singleton instance
class AuthService {
  constructor() {
    // Ensure this is a singleton
    if (AuthService.instance) {
      return AuthService.instance;
    }
    AuthService.instance = this;
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Promise with user data and token
   */
  async login(email, password) {
    try {
      // added by miraj
      console.log('Login attempt with email:', email);
      
      const response = await ApiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email: email,
        password: password
      });
      
      console.log('Login response:', response);
      
      // Store token in localStorage
      if (response.token) {
        this.setToken(response.token);
        
        // Create user data object from response
        const userData = {
          user_id: response.user_id,
          email: email,
          role: response.role,
          profile_id: response.profile_id // <-- Save profile_id too
        };
        
        // Store user data in localStorage
        this.setUserData(userData);
        // Debug: Immediately read back and log what was just saved
        const savedUserData = localStorage.getItem('userData');
        console.log('[DEBUG] userData just saved to localStorage:', savedUserData);
        return { user: userData, token: response.token };
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Promise with user data
   */
  async signup(userData) {
    try {
      // added by miraj
      console.log('AuthService signup called with:', userData);
      
      const signupData = {
        user_name: userData.user_name || userData.username || userData.email.split('@')[0],
        email: userData.email,
        password: userData.password,
        full_name: userData.full_name || userData.name,
        role: userData.role
      };
      
      console.log('Formatted signup data:', signupData);
      console.log('Sending to endpoint:', API_CONFIG.ENDPOINTS.AUTH.SIGNUP);
      
      const response = await ApiService.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, signupData);
      console.log('Signup response:', response);
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  /**
   * Get current user profile
   * @returns {Promise} - Promise with user data
   */
  // async getCurrentUser() {
  //   try {
  //     const response = await ApiService.get(API_CONFIG.ENDPOINTS.AUTH.ME);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async getCurrentUser() {
    try {
      const profileId = localStorage.getItem('profile_id');
      if (!profileId) {
        throw new Error('No profile ID found in localStorage');
      }
      console.log('Fetching User profile with profile_id:', profileId);
      const response = await ApiService.get(`/profile/${profileId}`);
      console.log('getCurrentUser response:', response);
      return response;
    } catch (error) {
      console.error('Get User profile error:', error);
      throw error;
    }
  }

    async getCurrentAdmin() {
    try {
      const profileId = localStorage.getItem('profile_id');
      if (!profileId) {
        throw new Error('No profile ID found in localStorage');
      }
      console.log('Fetching Admin profile with profile_id:', profileId);
      const response = await ApiService.get(`/admin-profiles/${profileId}`);
      console.log('getCurrentAdmin response:', response);
      return response;
    } catch (error) {
      console.error('Get User profile error:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if user is authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Get user role
   * @returns {string|null} - User role or null if not authenticated
   */
  getUserRole() {
    const userData = this.getUserData();
    return userData ? userData.role : null;
  }

  /**
   * Get stored user data
   * @returns {Object|null} - User data or null if not authenticated
   */
  getUserData() {
    const userDataStr = localStorage.getItem('userData');
    return userDataStr ? JSON.parse(userDataStr) : null;
  }

  /**
   * Store user data in localStorage
   * @param {Object} userData - User data to store
   */
  setUserData(userData) {
    console.log('[DEBUG] setUserData called with:', userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    // Debug: Immediately verify what was saved
    const verify = localStorage.getItem('userData');
    console.log('[DEBUG] userData in localStorage after setUserData:', verify);
  }

  /**
   * Get token from localStorage
   * @returns {string|null} - Token or null if not authenticated
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Set token in localStorage
   * @param {string} token - JWT token
   */
  setToken(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  /**
   * Get demo user data for fallback
   * @param {string} role - User role
   * @returns {Object} - Demo user data
   */
  getDemoUserData(role) {
    // added by miraj - updated with working test accounts
    const demoCredentials = {
      student: { 
        user_name: "teststudent123",
        email: "student123@test.com", 
        password: "student123",
        full_name: "Test Student",
        role: "student"
      },
      faculty: { 
        user_name: "testfaculty123",
        email: "faculty123@test.com", 
        password: "faculty123",
        full_name: "Test Faculty",
        role: "faculty"
      },
      admin: { 
        user_name: "testadmin123",
        email: "admin123@test.com", 
        password: "admin123",
        full_name: "Test Admin",
        role: "admin"
      }
    };
    
    return demoCredentials[role];
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
