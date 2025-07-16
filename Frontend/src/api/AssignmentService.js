// AssignmentService.js
// Provides frontend API calls for assignment management, mirroring backend assignment_service.py logic

import apiClient from './ApiService'; // Use the correct shared axios instance or fetch wrapper



const AssignmentService = {
  // Create a new assignment
  create: async (assignmentData) => {
    const res = await apiClient.post('/assignments/', assignmentData);
    return res.data;
  },

  // Get a single assignment by ID
  getById: async (assignmentId) => {
    const res = await apiClient.get(`/assignments/${assignmentId}`);
    return res.data;
  },

  // Get all assignments (optionally paginated)
  getAll: async (skip = 0, limit = 100) => {
    const res = await apiClient.get('/assignments/', { params: { skip, limit } });
    return res.data;
  },

  // Update an assignment by ID
  update: async (assignmentId, updateData) => {
    const res = await apiClient.put(`/assignments/${assignmentId}`, updateData);
    return res.data;
  },

  // Delete an assignment by ID
  delete: async (assignmentId) => {
    const res = await apiClient.delete(`/assignments/${assignmentId}`);
    return res.data;
  },

  // Get assignments for a specific course
  getByCourse: async (courseId, skip = 0, limit = 100) => {
    return await apiClient.get(`/assignments/by-course/${courseId}`, { params: { skip, limit } });
  },

  // Get active assignments for a specific course
  getActiveByCourse: async (courseId) => {
    const res = await apiClient.get(`/assignments/active/${courseId}`);
    return res.data;
  },

  // Get pending assignments for a student
  getPendingForStudent: async (studentId) => {
    const res = await apiClient.get(`/assignments/pending/${studentId}`);
    return res.data;
  },

  // Get submitted assignments for a student
  getSubmittedForStudent: async (studentId) => {
    const res = await apiClient.get(`/assignments/submitted/${studentId}`);
    return res.data;
  },

  // Get missing assignments for a student
  getMissingForStudent: async (studentId) => {
    const res = await apiClient.get(`/assignments/missing/${studentId}`);
    return res.data;
  },
};

export default AssignmentService;
