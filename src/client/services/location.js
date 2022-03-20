import http from '../http-common.js';

class LocationDataService {
  getAll() {
    return http.get('/locations');
  }

  get(id) {
    return http.get(`/locations/${id}`);
  }

  create(data) {
    return http.post('/locations', data);
  }

  update(id, data) {
    return http.put(`/locations/${id}`, data);
  }
}

export default new LocationDataService();
