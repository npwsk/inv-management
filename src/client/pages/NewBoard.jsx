import { Formik } from 'formik';

import Heading from '../components/Heading';
import BoardForm from '../components/BoardForm';

const NewBoard = ({ isLoaded, ...props }) => {
  return (
    <>
      <Heading>Добавить новое устройство</Heading>

      <BoardForm handleSubmit={console.log} />
    </>
  );
};

export default NewBoard;
