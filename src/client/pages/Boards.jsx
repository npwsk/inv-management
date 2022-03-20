import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getBoards } from '../actions/board.js';
import { getLocations } from '../actions/location.js';
import { getStaffMembers } from '../actions/staff.js';

import BoardsList from '../components/BoardsList';

const Boards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
    dispatch(getLocations());
    dispatch(getStaffMembers());
  }, [dispatch]);

  return (
    <>
      <h1 className="fs-2 mb-4">Электронные интерактивные доски</h1>
      <BoardsList />
    </>
  );
};

export default Boards;
