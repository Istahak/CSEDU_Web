import ApiService from './ApiService';
import API_CONFIG from './config';

class EventService {
  constructor() {
    if (EventService.instance) return EventService.instance;
    EventService.instance = this;

    this.endpoints = {
      BASE: '/event',
      GET_ALL: '/event',
      GET_BY_ID: (id) => `/event/${id}`,
      CREATE: '/event',
      UPDATE: (id) => `/event/${id}`,
      DELETE: (id) => `/event/${id}`,
      UPDATE_IMAGE: (id) => `/event/${id}/image`,
    };
  }

  async getAllEvents() {
    try {
      return await ApiService.get(this.endpoints.GET_ALL);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw error;
    }
  }

  async getEventById(id) {
    try {
      return await ApiService.get(this.endpoints.GET_BY_ID(id));
    } catch (error) {
      console.error(`Failed to fetch event ${id}:`, error);
      throw error;
    }
  }

  async createEvent(eventData) {
    try {
      return await ApiService.post(this.endpoints.CREATE, eventData);
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  }

  async updateEvent(id, eventData) {
    try {
      return await ApiService.put(this.endpoints.UPDATE(id), eventData);
    } catch (error) {
      console.error(`Failed to update event ${id}:`, error);
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      return await ApiService.delete(this.endpoints.DELETE(id));
    } catch (error) {
      console.error(`Failed to delete event ${id}:`, error);
      throw error;
    }
  }

  async updateEventImage(id, imageBase64) {
    try {
      return await ApiService.put(this.endpoints.UPDATE_IMAGE(id), {
        image: imageBase64,
      });
    } catch (error) {
      console.error(`Failed to update event image ${id}:`, error);
      throw error;
    }
  }
}

const eventService = new EventService();
export default eventService;
