import http from '../http-common';

class StaffDataService {
  getAll() {
    return http.get('/staff');
  }

  get(id) {
    return http.get(`/staff/${id}`);
  }

  create(data) {
    return http.post('/staff', data);
  }

  update(id, data) {
    return http.put(`/staff/${id}`, data);
  }
}

export default new StaffDataService();
