import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { Button, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Heading from '../../components/Heading';
import BoardForm from '../../components/BoardForm';

import { createBoard } from '../../actions/board';

const NewBoard = () => {
  const today = new Date().toISOString().slice(0, 10);

  const initialValues = {
    manufacturer: '',
    model: '',
    diagSize: 1,
    technology: 'Инфракрасная',
    inventoryNumber: '',
    registrationDate: today,
    usageStartDate: today,
    deprecationPeriod: 24,
    state: 'Исправно',
    repairStartDate: '',
    failureReason: '',
    staffId: '',
    locationId: '',
  };

  const [board, setBoard] = useState(initialValues);
  const [sumbitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const startNewBoard = () => {
    setBoard(initialValues);
    setSubmitted(false);
  };

  const handleSubmit = (values) => {
    dispatch(createBoard(values))
      .then((data) => {
        setBoard(data);
        setSubmitted(true);
        console.log(data);
      })
      .catch(console.log);
  };

  const boardsNums = useSelector((state) => {
    const { boards } = state;
    return boards ? boards.map((board) => board.inventoryNumber) : [];
  });

  const schema = {
    inventoryNumber: yup
      .string()
      .required('Это обязательное поле')
      .notOneOf(boardsNums, 'Этот номер уже используется'),
  };

  return (
    <>
      {sumbitted ? (
        <>
          <Heading className="text-center mb-2">Устройство добавлено!</Heading>
          <Stack gap={2} className="col-md-5 mx-auto">
            <LinkContainer to="/boards/" title="Добавить устройство">
              <Button variant="outline-primary" size="lg">
                К списку устройств
              </Button>
            </LinkContainer>
            <Button variant="success" size="lg" onClick={startNewBoard}>
              Добавить
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Heading>Добавить новое устройство</Heading>
          <BoardForm onSubmit={handleSubmit} initialValues={board} additionalSchema={schema} />
        </>
      )}
    </>
  );
};

export default NewBoard;
