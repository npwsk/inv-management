import { Table, Button, Spinner } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const DataTable = ({ tableHeadings, rows: { idProp, data }, showEditBtn = true, editFormPath }) => {
  return (
    <>
      {data && data.length ? (
        <Table responsive bordered hover className="align-middle" size="sm">
          <thead>
            <tr>
              {showEditBtn ? <th></th> : null}
              {Object.entries(tableHeadings).map(([key, text]) => (
                <th key={key} className="align-middle">
                  {text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={`row-${data[idProp]}`}>
                {showEditBtn ? (
                  <td>
                    <LinkContainer
                      to={`${editFormPath ? [editFormPath, data[idProp]].join('/') : data[idProp]}`}
                    >
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
                ) : null}
                {Object.keys(tableHeadings).map((prop) => (
                  <td key={`${data[idProp]}-${prop}`}>{data[prop]}</td>
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

export default DataTable;
