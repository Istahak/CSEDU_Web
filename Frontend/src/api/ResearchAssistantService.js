// ResearchAssistantService.js
// Implements frontend API functions for research assistant management
// Mirrors backend research_assistant_service functions

import ApiService from './ApiService';

const BASE_URL = '/research-assistants';

const ResearchAssistantService = {
  // Get all research assistants
  async getAll() {
    return ApiService.get(`${BASE_URL}`);
  },

  // Get research assistants by supervisor ID
  async getBySupervisorId(supervisorId) {
    const resp = await ApiService.get(`${BASE_URL}/by-supervisor/${supervisorId}`);
    console.log('[RA API] Raw response:', resp);
    return resp;
  },

  // Get research assistant by ID
  async getById(raId) {
    return ApiService.get(`${BASE_URL}/${raId}`);
  },

  // Create a new research assistant
  async create(data) {
    return ApiService.post(`${BASE_URL}`, data);
  },

  // Update a research assistant
  async update(raId, data) {
    return ApiService.put(`${BASE_URL}/${raId}`, data);
  },

  // Delete a research assistant
  async delete(raId) {
    return ApiService.delete(`${BASE_URL}/${raId}`);
  },
};

export default ResearchAssistantService;
