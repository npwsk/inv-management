import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getBoards } from '../actions/board.js';
import { getLocations } from '../actions/location.js';
import { getStaffMembers } from '../actions/staff.js';

import BoardsList from '../components/BoardsList';
import Heading from '../components/Heading';

const Boards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
    dispatch(getLocations());
    dispatch(getStaffMembers());
  }, [dispatch]);

  return (
    <>
      <Heading>Интерактивные доски</Heading>
      <BoardsList />
    </>
  );
};

export default Boards;
