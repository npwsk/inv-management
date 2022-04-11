import {
  CREATE_STAFF_MEMBER,
  GET_STAFF_MEMBERS,
  GET_STAFF_MEMBER,
  UPDATE_STAFF_MEMBER,
} from '../actions/types.js';

const initialState = [];

const staffReducer = (staffMembers = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_STAFF_MEMBER:
      return [...staffMembers, payload];

    case GET_STAFF_MEMBERS:
      return payload;

    case GET_STAFF_MEMBER:
      return payload;

    case UPDATE_STAFF_MEMBER:
      return staffMembers.map((staffMember) => {
        if (staffMember.id === payload.id) {
          return {
            ...location,
            ...staffMember,
          };
        } else {
          return staffMember;
        }
      });

    default:
      return staffMembers;
  }
};
export default staffReducer;
