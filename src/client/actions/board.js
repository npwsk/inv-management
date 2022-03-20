import { CREATE_BOARD, GET_BOARDS, UPDATE_BOARD, DELETE_BOARD } from './types.js';
import BoardDataService from '../services/board.js';

export const createBoard = (props) => async (dispatch) => {
  try {
    const res = await BoardDataService.create(props);

    dispatch({
      type: CREATE_BOARD,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getBoards = () => async (dispatch) => {
  try {
    const res = await BoardDataService.getAll();

    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBoard = (id, data) => async (dispatch) => {
  try {
    const res = await BoardDataService.update(id, data);

    dispatch({
      type: UPDATE_BOARD,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteBoard = (id) => async (dispatch) => {
  try {
    await BoardDataService.delete(id);

    dispatch({
      type: DELETE_BOARD,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findBoardsByNumber = (number) => async (dispatch) => {
  try {
    const res = await BoardDataService.findByInventoryNumber(number);

    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const findBoardsByState = (state) => async (dispatch) => {
  try {
    const res = await BoardDataService.findByState(number);

    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const findBoardsByStaffId = (staffId) => async (dispatch) => {
  try {
    const res = await BoardDataService.findByState(staffId);

    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
