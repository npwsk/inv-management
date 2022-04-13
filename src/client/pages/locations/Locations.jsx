import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

import Heading from '../../components/Heading';
import DataTable from '../../components/DataTable';

import { getLocations } from '../../actions/location';

const Locations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const locations = useSelector((state) => state.locations);

  const tableHeadings = {
    id: 'Код',
    building: 'Корпус',
    room: 'Аудитория',
  };

  return (
    <>
      <Heading>Локации</Heading>
      <LinkContainer to="new" className="mb-3 lh-1" title="Добавить локацию">
        <Button variant="outline-primary">
          <PlusLg className="me-1" />
          Добавить
        </Button>
      </LinkContainer>
      <DataTable rows={{ data: locations, idProp: 'id' }} tableHeadings={tableHeadings} />
    </>
  );
};

export default Locations;
