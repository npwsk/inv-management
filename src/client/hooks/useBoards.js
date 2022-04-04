import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '../actions/board.js';
import { formatDate, locationToStr, staffToStr } from '../utils/format.js';

const useBoards = (locations, staffMembers) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const boards = useSelector((state) => state.boards);

  return boards.map((board) => {
    const location = locations?.find(({ id }) => id === board.location_id);
    const staff = staffMembers?.find(({ id }) => id === board.staff_id);

    const registration_date = formatDate(board.registration_date);
    const usage_start_date = formatDate(board.usage_start_date);

    return {
      ...board,
      registration_date,
      usage_start_date,
      location: locationToStr(location),
      staff: staffToStr(staff),
    };
  });
};

export default useBoards;
