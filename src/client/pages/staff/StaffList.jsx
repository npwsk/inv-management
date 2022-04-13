import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

import Heading from '../../components/Heading';
import DataTable from '../../components/DataTable';

import { getStaffMembers } from '../../actions/staff';

const StaffList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStaffMembers());
  }, [dispatch]);

  const staff = useSelector((state) => state.staff);

  const tableHeadings = {
    id: 'Код',
    last_name: 'Корпус',
    first_name: 'Аудитория',
    middle_name: 'Аудитория',
  };

  return (
    <>
      <Heading>Сотрудники</Heading>
      <LinkContainer to="new" className="mb-3 lh-1" title="Добавить локацию">
        <Button variant="outline-primary">
          <PlusLg className="me-1" />
          Добавить
        </Button>
      </LinkContainer>
      <DataTable rows={{ data: staff, idProp: 'id' }} tableHeadings={tableHeadings} />
    </>
  );
};

export default StaffList;
