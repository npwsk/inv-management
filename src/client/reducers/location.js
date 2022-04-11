import { CREATE_LOCATION, GET_LOCATIONS, GET_LOCATION, UPDATE_LOCATION } from '../actions/types.js';

const initialState = [];

const locationReducer = (locations = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LOCATION:
      return [...locations, payload];

    case GET_LOCATIONS:
      return payload;

    case GET_LOCATION:
      return payload;

    case UPDATE_LOCATION:
      return locations.map((location) => {
        if (location.id === payload.id) {
          return {
            ...location,
            ...payload,
          };
        } else {
          return location;
        }
      });

    default:
      return locations;
  }
};
export default locationReducer;
