// AssignmentSubmissionService.js
// Service for handling assignment submission API calls

import apiClient from './ApiService';

const AssignmentSubmissionService = {
  /**
   * Submit an assignment with file and comment
   * @param {Object} submissionData - { assignment_id, student_id, comment }
   * @param {File} file - The file to upload
   * @returns {Promise<Object>} - The created submission
   */
  async submit(submissionData, file) {
    const formData = new FormData();
    formData.append("assignment_id", submissionData.assignment_id);
    formData.append("student_id", submissionData.student_id);
    if (submissionData.comment) {
      formData.append("comment", submissionData.comment);
    }
    if (file) {
      formData.append("file", file);
    }
    // Use apiClient.post for file upload (make sure ApiService handles FormData correctly)
    return apiClient.post('/assignment_submissions/', formData);
  },

  /**
   * Fetch submissions for an assignment (optionally by student)
   * @param {string} assignmentId
   * @param {string} [studentId]
   * @returns {Promise<Array>} - List of submissions
   */
  async getByAssignment(assignmentId, studentId = null) {
    let url = `/assignment_submissions/by-assignment/${assignmentId}`;
    return apiClient.get(url);
  },

  /**
   * Fetch all submissions for a student
   * @param {string} studentId
   * @returns {Promise<Array>} - List of submissions
   */
  async getByStudent(studentId) {
    return apiClient.get(`/assignment_submissions/?student_id=${studentId}`);
  },

  /**
   * Delete a submission by ID
   * @param {string} submissionId
   * @returns {Promise<void>}
   */
  async delete(submissionId) {
    return apiClient.delete(`/assignment_submissions/${submissionId}/`);
  },
};

export default AssignmentSubmissionService;
