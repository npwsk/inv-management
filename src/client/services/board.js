import http from '../http-common';

class BoardDataService {
  getAll() {
    return http.get('/boards');
  }

  get(id) {
    return http.get(`/boards/${id}`);
  }

  create(data) {
    return http.post('/boards', data);
  }

  update(id, data) {
    return http.put(`/boards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/boards/${id}`);
  }

  findByInventoryNumber(number) {
    return http.get(`/boards?inventoryNumber=${number}`);
  }

  findByState(state) {
    return http.get(`/boards?state=${state}`);
  }

  findByStaffId(id) {
    return http.get(`/boards?staffId=${id}`);
  }
}

export default new BoardDataService();
