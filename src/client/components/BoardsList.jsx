import { Table, Button, Spinner } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const tableHeadings = {
  inventoryNumber: 'Инвентарный номер',
  manufacturer: 'Производитель',
  model: 'Модель',
  diagSize: 'Диагональ (дюймы)',
  registrationDate: 'Дата регистрации',
  usageStartDate: 'Дата начала эксплуатации',
  deprecationPeriod: 'Период амортизации (месяцев)',
  repairStartDate: 'Дата начала ремонта',
  failureReason: 'Причина поломки',
  state: 'Состояние',
  technology: 'Технология',
  location: 'Место нахождения',
  staff: 'Ответственный сотрудник',
};

const BoardsList = ({ boards, ...props }) => {
  return (
    <>
      {boards && boards.length ? (
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
            {boards.map((board) => (
              <tr key={`row-${board.inventoryNumber}`}>
                <td>
                  <LinkContainer to={`/boards/${board.inventoryNumber}`}>
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
                  <td key={`${board.inventoryNumber}-${prop}`}>{board[prop]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
};

export default BoardsList;
