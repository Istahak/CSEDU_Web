/**
 * Homepage service for handling homepage data
 */
import ApiService from './ApiService';
import API_CONFIG from './config';

class HomepageService {
  constructor() {
    // Ensure this is a singleton
    if (HomepageService.instance) {
      return HomepageService.instance;
    }
    HomepageService.instance = this;
  }

  /**
   * Get all homepage data (overview, announcements, quick links)
   * @returns {Promise} - Promise with homepage data
   */
  async getAllHomepageData() {
    try {
      const response = await ApiService.get(API_CONFIG.ENDPOINTS.HOMEPAGE.ALL);
      return response;
    } catch (error) {
      console.error('Failed to get homepage data:', error);
      // Return demo data if API fails
      return this.getDemoHomepageData();
    }
  }

  /**
   * Get overview data
   * @returns {Promise} - Promise with overview data
   */
  async getOverview() {
    try {
      const response = await ApiService.get(API_CONFIG.ENDPOINTS.HOMEPAGE.OVERVIEW);
      return response;
    } catch (error) {
      console.error('Failed to get overview data:', error);
      // Return demo data if API fails
      return this.getDemoOverview();
    }
  }

  /**
   * Get announcements
   * @returns {Promise} - Promise with announcements
   */
  async getAnnouncements() {
    try {
      const response = await ApiService.get(API_CONFIG.ENDPOINTS.HOMEPAGE.ANNOUNCEMENTS);
      return response;
    } catch (error) {
      console.error('Failed to get announcements:', error);
      // Return demo data if API fails
      return this.getDemoAnnouncements();
    }
  }

  /**
   * Get quick links
   * @returns {Promise} - Promise with quick links
   */
  async getQuickLinks() {
    try {
      const response = await ApiService.get(API_CONFIG.ENDPOINTS.HOMEPAGE.QUICKLINKS);
      return response;
    } catch (error) {
      console.error('Failed to get quick links:', error);
      // Return demo data if API fails
      return this.getDemoQuickLinks();
    }
  }

  /**
   * Get demo homepage data
   * @returns {Object} - Demo homepage data
   */
  getDemoHomepageData() {
    return {
      overview: this.getDemoOverview(),
      announcements: this.getDemoAnnouncements(),
      quick_links: this.getDemoQuickLinks()
    };
  }

  /**
   * Get demo overview data
   * @returns {Object} - Demo overview data
   */
  getDemoOverview() {
    return {
      title: "Department of Computer Science & Engineering",
      description: "Welcome to the Department of Computer Science & Engineering at the University of Dhaka. We are committed to excellence in teaching, research, and innovation in the field of computer science and engineering.",
      image_url: "https://cse.du.ac.bd/wp-content/uploads/2022/08/cropped-cropped-csedu-logo-1.png"
    };
  }

  /**
   * Get demo announcements
   * @returns {Array} - Demo announcements
   */
  getDemoAnnouncements() {
    return [
      {
        id: 1,
        title: "Registration for Fall 2023 Semester",
        description: "Registration for the Fall 2023 semester will begin on August 15, 2023. Please check your student portal for more information.",
        type: { name: "Academic", color_code: "academic" },
        publish_date: "2023-08-01T00:00:00Z",
        is_active: true
      },
      {
        id: 2,
        title: "Faculty Recruitment",
        description: "The department is looking for new faculty members in the areas of Artificial Intelligence and Cybersecurity. Applications are due by September 30, 2023.",
        type: { name: "Administrative", color_code: "administrative" },
        publish_date: "2023-08-05T00:00:00Z",
        is_active: true
      },
      {
        id: 3,
        title: "Annual Programming Contest",
        description: "The annual programming contest will be held on October 15, 2023. Registration opens on September 1, 2023.",
        type: { name: "General", color_code: "general" },
        publish_date: "2023-08-10T00:00:00Z",
        is_active: true
      }
    ];
  }

  /**
   * Get demo quick links
   * @returns {Array} - Demo quick links
   */
  getDemoQuickLinks() {
    return [
      {
        id: 1,
        title: "Student Portal",
        url: "/login",
        icon: "user-graduate",
        is_active: true
      },
      {
        id: 2,
        title: "Course Registration",
        url: "/academics",
        icon: "book",
        is_active: true
      },
      {
        id: 3,
        title: "Library Resources",
        url: "/resources",
        icon: "book-open",
        is_active: true
      },
      {
        id: 4,
        title: "Research Publications",
        url: "/research",
        icon: "flask",
        is_active: true
      }
    ];
  }
}

// Create and export a singleton instance
const homepageService = new HomepageService();
export default homepageService;
