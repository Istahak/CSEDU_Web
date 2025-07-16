/**
 * Faculty service for handling faculty data operations
 * This service handles CRUD operations for faculty members
 */
import ApiService from './ApiService';
import API_CONFIG from './config';
import authService from './AuthService'; 

class FacultyService {
  constructor() {
    // Ensure this is a singleton
    if (FacultyService.instance) {
      return FacultyService.instance;
    }
    FacultyService.instance = this;
    
    // Tahsin added - Define faculty endpoints
    this.endpoints = {
      BASE: '/faculty',
      GET_ALL: '/faculty',
      GET_BY_ID: (id) => `/faculty/${id}`,
      CREATE: '/faculty',
      UPDATE: (id) => `/faculty/${id}`,
      DELETE: (id) => `/faculty/${id}`,
    };
  }

  /**
   * Get all faculty members with optional pagination
   * @param {number} skip - Number of records to skip
   * @param {number} limit - Maximum number of records to return
   * @returns {Promise} - Promise with faculty data
   */
  async getAllFaculty(skip = 0, limit = 100) {
    try {
      const response = await ApiService.get(this.endpoints.GET_ALL, { skip, limit });
      return response;
    } catch (error) {
      console.error('Failed to get faculty data:', error);
      throw error;
    }
  }

  /**
   * Get faculty member by ID
   * @param {number} id - Faculty ID
   * @returns {Promise} - Promise with faculty data
   */
  async getFacultyById(id) {
    try {
      const response = await ApiService.get(this.endpoints.GET_BY_ID(id));
      return response;
    } catch (error) {
      console.error(`Failed to get faculty with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new faculty member with multipart/form-data
   * @param {FormData} formData - FormData object containing faculty information and profile photo
   * @returns {Promise} - Promise with created faculty data
   * 
   * Tahsin added - This method handles multipart/form-data submission for faculty creation
   * including profile photo upload
   */

async createFaculty(formData) {
  try {
    // Extract user-related data from formData (adjust keys as per your form)
    const userData = {
      user_name: formData.get('user_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      full_name: formData.get('name'),
      role: 'faculty'  // or get from formData if dynamic
    };


console.log("userData being sent to signup:", userData);



    // 1. Create the user first via signup API
    const userResponse = await authService.signup(userData);
    if (!userResponse || !userResponse.id) {
      throw new Error('User creation failed: no user ID returned');
    }

    const userId = userResponse.id;

    // 2. Append user_id to the faculty form data
    formData.set('user_id', userId); // overwrite if exists, or add

    // 3. Now create the faculty with user_id included
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${this.endpoints.CREATE}`;
    const token = localStorage.getItem('token');
    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // IMPORTANT: Don't set Content-Type when using FormData
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
      mode: 'cors'
    });

    return await ApiService.handleResponse(response);
  } catch (error) {
    console.error('Failed to create faculty and user:', error);
    throw error;
  }
}

  /**
   * Update an existing faculty member with multipart/form-data
   * @param {number} id - Faculty ID
   * @param {FormData} formData - FormData object containing faculty information and profile photo
   * @returns {Promise} - Promise with updated faculty data
   * 
   * Tahsin added - This method handles multipart/form-data submission for faculty updates
   * including profile photo upload
   */
  async updateFaculty(id, formData) {
    try {
      // Tahsin added - Special handling for multipart/form-data
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${this.endpoints.UPDATE(id)}`;
      
      // Get authentication token if available
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Make direct fetch call for multipart/form-data
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: formData,
        mode: 'cors'
      });
      
      // Use ApiService's response handler for consistent error handling
      return await ApiService.handleResponse(response);
    } catch (error) {
      console.error(`Failed to update faculty with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a faculty member
   * @param {number} id - Faculty ID
   * @returns {Promise} - Promise with deletion status
   */
  async deleteFaculty(id) {
    try {
      const response = await ApiService.delete(this.endpoints.DELETE(id));
      return response;
    } catch (error) {
      console.error(`Failed to delete faculty with ID ${id}:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const facultyService = new FacultyService();
export default facultyService;
