import ApiService from './ApiService';

const ENDPOINT = '/project';

const ProjectsService = {
  // Get all projects
  async getAll() {
    return ApiService.get(`${ENDPOINT}`);
  },

  // Get project by id
  async getById(projectId) {
    return ApiService.get(`${ENDPOINT}/${projectId}`);
  },

  // Get projects by supervisor id
  async getBySupervisorId(supervisorId) {
    return ApiService.get(`${ENDPOINT}/by-supervisor/${supervisorId}`);
  },

  // Get projects by author id
  async getByAuthorId(authorId) {
    return ApiService.get(`${ENDPOINT}/by-author/${authorId}`);
  },
};

export default ProjectsService;
