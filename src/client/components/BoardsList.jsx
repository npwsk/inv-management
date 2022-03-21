import { useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const tableHeadings = {
  board_id: '#',
  inventory_number: 'Инвентарный номер',
  manufacturer: 'Производитель',
  model: 'Модель',
  diag_size: 'Диагональ (дюймы)',
  registration_date: 'Дата регистрации',
  usage_start_date: 'Дата начала эксплуатации',
  deprecation_period: 'Период амортизации (месяцев)',
  repair_start_date: 'Дата начала ремонта',
  failure_reason: 'Причина поломки',
  state: 'Состояние',
  technology: 'Технология',
  location: 'Место нахождения',
  staff: 'Ответственный сотрудник',
};

const staffToStr = (obj = {}) =>
  Object.entries(obj)
    .filter(([prop]) => prop !== 'id')
    .map(([, val]) => val)
    .join(' ');

const locationToStr = (location = {}) => `${location.building}, ${location.room} каб.`;

const formatDate = (str) => new Date(str).toLocaleDateString('ru-RU');

const BoardsList = () => {
  const locations = useSelector((state) => state.locations);

  const staffMembers = useSelector((state) => state.staff);

  const boards = useSelector((state) => state.boards).map((board) => {
    const location = locations?.find(({ id }) => id === board.location_id);
    const staff = staffMembers?.find(({ id }) => id === board.staff_id);

    const registration_date = formatDate(board.registration_date);
    const usage_start_date = formatDate(board.usage_start_date);

    return {
      ...board,
      registration_date,
      usage_start_date,
      location: locationToStr(location),
      staff: staffToStr(staff),
    };
  });

  console.log(boards);

  return (
    <div>
      <Table responsive bordered hover className="align-middle">
        <thead className="table-dark">
          <tr>
            <th></th>
            {Object.entries(tableHeadings).map(([key, text]) => (
              <th key={key} className="align-middle text-center">
                {text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {boards &&
            boards.length &&
            locations &&
            locations.length &&
            staffMembers &&
            staffMembers.length &&
            boards.map((board) => (
              <tr key={`row-${board.board_id}`}>
                <td>
                  <LinkContainer to={`/boards/${board.board_id}`}>
                    <Button
                      variant="link"
                      size="sm"
                      className="d-flex align-items-center px-1"
                      title="Редактировать"
                    >
                      <PencilSquare />
                    </Button>
                  </LinkContainer>
                </td>
                {Object.keys(tableHeadings).map((prop) => (
                  <td key={`${board.id}-${prop}`}>{board[prop]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BoardsList;
