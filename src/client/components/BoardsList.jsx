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

const BoardsList = ({ boards, locations, staffMembers, ...props }) => {
  const isLoaded = boards && locations && staffMembers;

  return (
    <>
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
        {isLoaded ? (
          <tbody>
            {boards.map((board) => (
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
        ) : null}
      </Table>
    </>
  );
};

export default BoardsList;
