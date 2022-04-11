import {
  CREATE_BOARD,
  GET_BOARDS,
  GET_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
} from '../actions/types.js';

const initialState = [];

const boardReducer = (boards = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BOARD:
      return [...boards, payload];

    case GET_BOARDS:
      return payload;

    case GET_BOARD:
      return payload;

    case UPDATE_BOARD:
      return boards.map((board) => {
        if (board.inventoryNumber === payload.id) {
          return {
            ...board,
            ...payload,
          };
        } else {
          return board;
        }
      });

    case DELETE_BOARD:
      return boards.filter(({ inventoryNumber }) => inventoryNumber !== payload.id);

    default:
      return boards;
  }
};
export default boardReducer;
