import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Spinner, Alert } from 'react-bootstrap';

import BoardDataService from '../../services/board';
import { updateBoard, deleteBoard } from '../../actions/board';

import Heading from '../../components/Heading';
import BoardForm from '../../components/BoardForm';

const Board = () => {
  const { boardId } = useParams();

  const [currentValues, setCurrentValues] = useState(null);
  const [alert, setAlert] = useState({ shown: false, message: '' });

  const dispatch = useDispatch();

  const getCurrentBoard = (id) => {
    BoardDataService.get(id)
      .then((response) => {
        const board = response.data;
        const registrationDate = board.registrationDate.slice(0, 10);
        const usageStartDate = board.usageStartDate.slice(0, 10);
        const repairStartDate = board.repairStartDate ? board.repairStartDate.slice(0, 10) : '';
        setCurrentValues({ ...board, registrationDate, usageStartDate, repairStartDate });
        console.log(response.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getCurrentBoard(boardId);
  }, [boardId]);

  const saveBoard = (values) => {
    dispatch(updateBoard(boardId, values))
      .then((response) => {
        console.log(response);
        setAlert({ shown: true, message: 'Изменения сохранены' });
      })
      .catch(console.log);
  };

  const navigate = useNavigate();

  const removeBoard = () => {
    dispatch(deleteBoard(boardId))
      .then(() => {
        setAlert({ shown: true, message: 'Устройство удалено' });
      })
      .catch(console.log);
  };

  return (
    <>
      <Heading>{`Устройство #${boardId}`}</Heading>
      {alert.shown ? (
        <Alert variant="success" onClose={() => navigate('/boards')} dismissible>
          <Alert.Heading>{alert.message}</Alert.Heading>
        </Alert>
      ) : currentValues ? (
        <BoardForm onSubmit={saveBoard} onRemove={removeBoard} initialValues={currentValues} />
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

export default Board;
