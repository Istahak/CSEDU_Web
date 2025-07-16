import ApiService from './ApiService';

class BookingService {
  constructor() {
    if (BookingService.instance) return BookingService.instance;
    BookingService.instance = this;

    this.endpoints = {
      BASE: '/equipment-bookings',
      CREATE: '/equipment-bookings',
      GET_ALL: '/equipment-bookings',
      GET_APPROVED: '/equipment-bookings/approved',
      GET_PENDING: '/equipment-bookings/pending',
      GET_BY_ID: (id) => `/equipment-bookings/by-id/${id}`,
      UPDATE: (id) => `/equipment-bookings/${id}`,
      DELETE: (id) => `/equipment-bookings/${id}`,
      APPROVE: (id) => `/equipment-bookings/${id}/approve`,
    };
  }

  async createBooking(data) {
    try {
      return await ApiService.post(this.endpoints.CREATE, data);
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  }

  async getAllBookings() {
    try {
      return await ApiService.get(this.endpoints.GET_ALL);
    } catch (error) {
      console.error('Failed to fetch all bookings:', error);
      throw error;
    }
  }

  async getApprovedBookings() {
    try {
      return await ApiService.get(this.endpoints.GET_APPROVED);
    } catch (error) {
      console.error('Failed to fetch approved bookings:', error);
      throw error;
    }
  }

  async getPendingBookings() {
    try {
      return await ApiService.get(this.endpoints.GET_PENDING);
    } catch (error) {
      console.error('Failed to fetch pending bookings:', error);
      throw error;
    }
  }

  async getBookingById(id) {
    try {
      return await ApiService.get(this.endpoints.GET_BY_ID(id));
    } catch (error) {
      console.error(`Failed to fetch booking ${id}:`, error);
      throw error;
    }
  }

  async updateBooking(id, data) {
    try {
      return await ApiService.put(this.endpoints.UPDATE(id), data);
    } catch (error) {
      console.error(`Failed to update booking ${id}:`, error);
      throw error;
    }
  }

  async deleteBooking(id) {
    try {
      return await ApiService.delete(this.endpoints.DELETE(id));
    } catch (error) {
      console.error(`Failed to delete booking ${id}:`, error);
      throw error;
    }
  }

  async approveBooking(id) {
    try {
      return await ApiService.put(this.endpoints.APPROVE(id));
    } catch (error) {
      console.error(`Failed to approve booking ${id}:`, error);
      throw error;
    }
  }
}

const bookingService = new BookingService();
export default bookingService;
