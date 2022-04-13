import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Heading from '../../components/Heading';
import StaffForm from '../../components/StaffForm';

import { createStaffMember } from '../../actions/staff';

const NewStaff = () => {
  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
  };

  const [staff, setStaff] = useState(initialValues);
  const [sumbitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const startNewStaff = () => {
    setStaff(initialValues);
    setSubmitted(false);
  };

  const handleSubmit = (values) => {
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([key, val]) => [key, val.trim()])
    );

    dispatch(createStaffMember(trimmed))
      .then((data) => {
        setStaff(data);
        console.log(data);
        setSubmitted(true);
      })
      .catch(console.log);
  };

  return (
    <>
      {sumbitted ? (
        <>
          <Heading className="text-center mb-2">Сотрудник добавлен!</Heading>
          <Stack gap={3} className="col-md-5 mx-auto mt-3">
            <LinkContainer to="/staff">
              <Button variant="outline-primary">К списку сотрудников</Button>
            </LinkContainer>
            <Button variant="success" onClick={startNewStaff}>
              Добавить
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Heading>Добавить сотрудника</Heading>
          <StaffForm onSubmit={handleSubmit} initialValues={staff} />
        </>
      )}
    </>
  );
};

export default NewStaff;
