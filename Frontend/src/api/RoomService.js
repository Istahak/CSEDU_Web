import ApiService from './ApiService';
import API_CONFIG from './config';

class RoomService {
  // Get office room by ID
  async getRoomById(roomId) {
    // Adjust endpoint as needed to match backend (e.g., /rooms/{id})
    return ApiService.get(`/office-rooms/${roomId}`);
  }
}

const roomService = new RoomService();
export default roomService;
