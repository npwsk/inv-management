import AddBoardsPath from '../assets/boards-add.png';
import Heading from '../components/Heading';

const Manual = () => {
  const addBoards = new Image();
  addBoards.src = AddBoardsPath;

  return (
    <>
      <Heading>Руководство пользователя</Heading>
    </>
  );
};

export default Manual;
