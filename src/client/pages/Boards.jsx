import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

import Heading from '../components/Heading';
import BoardsList from '../components/BoardsList';

const Boards = () => {
  return (
    <>
      <Heading>Интерактивные доски</Heading>
      <LinkContainer to="/boards/new" className="mb-3 lh-1" title="Добавить устройство">
        <Button variant="outline-primary">
          <PlusLg className="me-1" />
          Добавить
        </Button>
      </LinkContainer>
      <BoardsList />
    </>
  );
};

export default Boards;
