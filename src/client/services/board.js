import http from '../http-common.js';

class BoardDataService {
  getAll() {
    return http.get('/boards');
  }

  get(id) {
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

  findByParams({ state, staffId, locationId, regDate }) {
    const params = [];
    if (state) {
      params.push(`state=${state}`);
    }
    if (staffId) {
      params.push(`staffId=${staffId}`);
    }
    if (staffId) {
      params.push(`locationId=${locationId}`);
    }
    if (regDate?.from) {
      params.push(`fromRegDate=${regDate.from}`);
    }
    if (regDate?.to) {
      params.push(`toRegDate=${regDate.to}`);
    }

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
