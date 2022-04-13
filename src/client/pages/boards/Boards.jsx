import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

import Heading from '../../components/Heading';
import DataTable from '../../components/DataTable';

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

  const tableHeadings = {
    inventoryNumber: 'Инвентарный номер',
    manufacturer: 'Производитель',
    model: 'Модель',
    diagSize: 'Диагональ (дюймы)',
    registrationDate: 'Дата принятия к учету',
    usageStartDate: 'Дата начала эксплуатации',
    deprecationPeriod: 'Период амортизации (месяцев)',
    repairStartDate: 'Дата начала ремонта',
    failureReason: 'Причина поломки',
    state: 'Состояние',
    technology: 'Технология',
    location: 'Место нахождения',
    staff: 'Ответственный сотрудник',
  };

  return (
    <>
      <Heading>Интерактивные доски</Heading>

      <LinkContainer to="/boards/new" className="mb-3 lh-1" title="Добавить устройство">
        <Button variant="outline-primary">
          <PlusLg className="me-1" />
          Добавить
        </Button>
      </LinkContainer>
      <DataTable
        rows={{ data: boards, idProp: 'inventoryNumber' }}
        tableHeadings={tableHeadings}
        editFormPath="/boards"
      />
    </>
  );
};

export default Boards;
