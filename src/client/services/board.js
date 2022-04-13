import http from '../http-common.js';

class BoardDataService {
  getAll() {
    return http.get('/boards');
  }

  get(id) {
    console.log(id);
    return http.get(`/boards/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post('/boards', data);
  }

  update(id, data) {
    return http.put(`/boards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/boards/${id}`);
  }

  findByParams({ state, staffId, locationId, regDateFrom, regDateTo }) {
    const params = [];
    if (state) {
      params.push(`state=${state}`);
    }
    if (staffId) {
      params.push(`staffId=${staffId}`);
    }
    if (locationId) {
      params.push(`locationId=${locationId}`);
    }
    if (regDateFrom) {
      params.push(`fromRegDate=${regDateFrom}`);
    }
    if (regDateTo) {
      params.push(`toRegDate=${regDateTo}`);
    }
    console.log(`/boards?${params.join('&')}`);

    return http.get(`/boards?${params.join('&')}`);
  }

  findByState(state) {
    return http.get(`/boards?state=${state}`);
  }

  findByRegDate({ from, to }) {
    const params = [];
    if (from) {
      params.push(`fromRegDate=${from}`);
    }
    if (to) {
      params.push(`toRegDate=${to}`);
    }
    return http.get(`/boards?${params.join('&')}`);
  }

  findByStaffId(id) {
    return http.get(`/boards?staffId=${id}`);
  }
}

export default new BoardDataService();
