import { CREATE_LOCATION, GET_LOCATIONS, UPDATE_LOCATION } from './types.js';
import LocationDataService from '../services/location.js';

export const createLocation = (data) => async (dispatch) => {
  try {
    const res = await LocationDataService.create(data);

    dispatch({
      type: CREATE_LOCATION,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getLocations = () => async (dispatch) => {
  try {
    const res = await LocationDataService.getAll();

    dispatch({
      type: GET_LOCATIONS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateLocation = (id, data) => async (dispatch) => {
  try {
    const res = await LocationDataService.update(id, data);

    dispatch({
      type: UPDATE_LOCATION,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
