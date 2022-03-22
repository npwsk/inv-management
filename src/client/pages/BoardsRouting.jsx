import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const boards = useSelector((state) => state.boards);
  const locations = useSelector((state) => state.locations);
  const staffMembers = useSelector((state) => state.staff);

  const isLoaded =
    boards && boards.length && locations && locations.length && staffMembers && staffMembers.length;

  return (
    <>
      <Routes>
        <Route path="/" element={<Boards isLoaded={isLoaded} />} />
        <Route path=":id" element={<Board isLoaded={isLoaded} />} />
        <Route path="new" element={<NewBoard isLoaded={isLoaded} />} />
      </Routes>
    </>
  );
};

export default BoardsRouting;
