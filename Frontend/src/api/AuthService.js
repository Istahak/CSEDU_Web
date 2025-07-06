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
      const response = await ApiService.postForm(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        username: email, // FastAPI expects 'username' for OAuth2 password flow
        password: password
      });
      
      // Store token in localStorage
      if (response.access_token) {
        this.setToken(response.access_token);
        
        try {
          // Get user profile after successful login
          const userData = await this.getCurrentUser();
          // Store user data in localStorage
          this.setUserData(userData);
          return { user: userData, token: response.access_token };
        } catch (userError) {
          console.error('Error fetching user profile:', userError);
          // If we can't get the user profile but have a token, create a basic user object
          const basicUserData = { email: email };
          this.setUserData(basicUserData);
          return { user: basicUserData, token: response.access_token };
        }
      } else {
        throw new Error('No access token received');
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
      const response = await ApiService.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user profile
   * @returns {Promise} - Promise with user data
   */
  async getCurrentUser() {
    try {
      const response = await ApiService.get(API_CONFIG.ENDPOINTS.AUTH.ME);
      return response;
    } catch (error) {
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
    localStorage.setItem('userData', JSON.stringify(userData));
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
    const demoCredentials = {
      student: { 
        email: "student@gmail.com", 
        password: "123",
        full_name: "Demo Student",
        role: "student"
      },
      faculty: { 
        email: "faculty@gmail.com", 
        password: "123",
        full_name: "Demo Faculty",
        role: "faculty"
      },
      admin: { 
        email: "admin@gmail.com", 
        password: "123",
        full_name: "Demo Admin",
        role: "admin"
      }
    };
    
    return demoCredentials[role];
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
