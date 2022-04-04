import { Routes, Route } from 'react-router';

import Boards from './Boards';
import Board from './Board';
import NewBoard from './NewBoard';

const BoardsRouting = () => {
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
