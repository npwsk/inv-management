import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Heading from '../components/Heading';
import BoardForm from '../components/BoardForm';

import { createBoard } from '../actions/board';

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

  return (
    <>
      {sumbitted ? (
        <>
          <Heading>Устройство добавлено!</Heading>
          <LinkContainer to="/boards/new" className="mb-3 lh-1" title="Добавить устройство">
            <Button variant="outline-primary">К списку устройств</Button>
          </LinkContainer>
          <Button variant="success" size="lg" onClick={startNewBoard}>
            Добавить
          </Button>
        </>
      ) : (
        <>
          <Heading>Добавить новое устройство</Heading>
          <BoardForm onSubmit={handleSubmit} initialValues={initialValues} />
        </>
      )}
    </>
  );
};

export default NewBoard;
