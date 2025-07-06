/**
 * Base API service for handling HTTP requests
 */
import API_CONFIG from './config';

class ApiService {
  constructor() {
    // Ensure this is a singleton
    if (ApiService.instance) {
      return ApiService.instance;
    }
    ApiService.instance = this;
  }
  
  /**
   * Make a POST request with form data (for OAuth2)
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Form data
   * @returns {Promise} - Promise with response data
   */
  async postForm(endpoint, data = {}) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
    
    // Convert data object to URLSearchParams for form submission
    const formData = new URLSearchParams();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
        mode: 'cors'
      });
      
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Make a GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise} - Promise with response data
   */
  async get(endpoint, params = {}) {
    const url = new URL(`${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`);
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });
    
    const headers = this.getHeaders();
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
        mode: 'cors'
      });
      
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Make a POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise} - Promise with response data
   */
  async post(endpoint, data = {}) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
    const headers = this.getHeaders();
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        mode: 'cors'
      });
      
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Make a PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise} - Promise with response data
   */
  async put(endpoint, data = {}) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
    const headers = this.getHeaders();
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
        mode: 'cors'
      });
      
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Make a DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise} - Promise with response data
   */
  async delete(endpoint) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
    const headers = this.getHeaders();
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers,
        mode: 'cors'
      });
      
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Get request headers including authorization if token exists
   * @returns {Object} - Headers object
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
  
  /**
   * Handle API response
   * @param {Response} response - Fetch API response
   * @returns {Promise} - Promise with response data
   */
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: error.detail || error.message || 'Something went wrong',
        data: error
      };
    }
    
    // Check if response is empty
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  }
  
  /**
   * Handle API error
   * @param {Error} error - Error object
   * @throws {Object} - Throws error object
   */
  handleError(error) {
    throw {
      status: 500,
      message: error.message || 'Something went wrong',
      data: error
    };
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
