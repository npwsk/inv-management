import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';

import { getBoards } from '../actions/board.js';
import { getLocations } from '../actions/location.js';
import { getStaffMembers } from '../actions/staff.js';

import Boards from './Boards';
import Board from './Board';
import NewBoard from './NewBoard';

const BoardsRouting = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
    dispatch(getLocations());
    dispatch(getStaffMembers());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path=":id" element={<Board />} />
        <Route path="new" element={<NewBoard />} />
      </Routes>
    </>
  );
};

export default BoardsRouting;
