import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

import Heading from '../components/Heading';
import BoardsList from '../components/BoardsList';
import useBoards from '../hooks/useBoards';
import useLocations from '../hooks/useLocations';
import useStaffMembers from '../hooks/useStaff';

const Boards = () => {
  const locations = useLocations();
  const staff = useStaffMembers();
  const boards = useBoards(locations, staff);

  return (
    <>
      <Heading>Интерактивные доски</Heading>
      <LinkContainer to="/boards/new" className="mb-3 lh-1" title="Добавить устройство">
        <Button variant="outline-primary">
          <PlusLg className="me-1" />
          Добавить
        </Button>
      </LinkContainer>
      <BoardsList boards={boards} locations={locations} staffMembers={staff} />
    </>
  );
};

export default Boards;
