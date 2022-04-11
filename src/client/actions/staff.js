import {
  CREATE_STAFF_MEMBER,
  GET_STAFF_MEMBERS,
  GET_STAFF_MEMBER,
  UPDATE_STAFF_MEMBER,
} from './types.js';
import StaffDataService from '../services/staff.js';

export const createStaffMember = (data) => async (dispatch) => {
  try {
    const res = await StaffDataService.create(data);

    dispatch({
      type: CREATE_STAFF_MEMBER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getStaffMembers = () => async (dispatch) => {
  try {
    const res = await StaffDataService.getAll();

    dispatch({
      type: GET_STAFF_MEMBERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getStaffMember = (id) => async (dispatch) => {
  try {
    const res = await StaffDataService.get(id);

    dispatch({
      type: GET_STAFF_MEMBER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updStaffMember = (id, data) => async (dispatch) => {
  try {
    const res = await StaffDataService.update(id, data);

    dispatch({
      type: UPDATE_STAFF_MEMBER,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
