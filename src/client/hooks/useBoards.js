import { useSelector } from 'react-redux';
import { formatDate } from '../utils/format.js';

const useBoards = () => {
  const boards = useSelector((state) => state.boards);

  return boards?.map((board) => {
    const registrationDate = formatDate(board.registrationDate);
    const usageStartDate = formatDate(board.usageStartDate);
    const repairStartDate = board.repairStartDate ? formatDate(board.repairStartDate) : '';

    return {
      ...board,
      repairStartDate,
      registrationDate,
      usageStartDate,
    };
  });
};

export default useBoards;
