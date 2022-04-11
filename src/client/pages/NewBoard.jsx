import Heading from '../components/Heading';
import BoardForm from '../components/BoardForm';

const NewBoard = () => {
  return (
    <>
      <Heading>Добавить новое устройство</Heading>

      <BoardForm handleSubmit={console.log} />
    </>
  );
};

export default NewBoard;
