import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

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
      <LinkContainer to="/boards/new" className="mb-3 lh-1" title="Добавить">
        <Button variant="outline-primary">
          <PlusLg className="me-1" />
          Создать
        </Button>
      </LinkContainer>

      <BoardsList />
    </>
  );
};

export default Boards;
