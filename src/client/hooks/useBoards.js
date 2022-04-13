import { useSelector } from 'react-redux';
import { formatDate, staffToStr, locationToStr } from '../utils/format.js';

const useBoards = () => {
  const boardsRaw = useSelector((state) => state.boards);
  const locations = useSelector((state) => state.locations);
  const staffMembers = useSelector((state) => state.staff);

  const boardsNormalized = boardsRaw?.map((board) => {
    const registrationDate = formatDate(board.registrationDate);
    const usageStartDate = formatDate(board.usageStartDate);
    const repairStartDate = board.repairStartDate ? formatDate(board.repairStartDate) : '';
    const location =
      board.location || locationToStr(locations.find(({ id }) => id === board.locationId));
    const staff = board.staff || staffToStr(staffMembers.find(({ id }) => id === board.staffId));

    return {
      ...board,
      repairStartDate,
      registrationDate,
      usageStartDate,
      location,
      staff,
    };
  });

  return boardsNormalized;
};

export default useBoards;
