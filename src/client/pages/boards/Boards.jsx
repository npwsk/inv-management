import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

import Heading from '../../components/Heading';
import BoardsList from '../../components/BoardsList';

import { getBoards } from '../../actions/board.js';
import { getLocations } from '../../actions/location.js';
import { getStaffMembers } from '../../actions/staff.js';

import useBoards from '../../hooks/useBoards';

const Boards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
    dispatch(getLocations());
    dispatch(getStaffMembers());
  }, [dispatch]);

  const boards = useBoards();

  return (
    <>
      <Heading>Интерактивные доски</Heading>
      <LinkContainer to="/boards/new" className="mb-3 lh-1" title="Добавить устройство">
        <Button variant="outline-primary">
          <PlusLg className="me-1" />
          Добавить
        </Button>
      </LinkContainer>
      <BoardsList boards={boards} />
    </>
  );
};

export default Boards;
