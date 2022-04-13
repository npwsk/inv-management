import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Heading from '../../components/Heading';
import LocationForm from '../../components/LocationForm';

import { createLocation } from '../../actions/location';

const NewLocation = () => {
  const initialValues = {
    building: '',
    room: '',
  };

  const [location, setLocation] = useState(initialValues);
  const [sumbitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const startNewLocation = () => {
    setLocation(initialValues);
    setSubmitted(false);
  };

  const handleSubmit = (values) => {
    dispatch(createLocation(values))
      .then((data) => {
        setLocation(data);
        setSubmitted(true);
        console.log(data);
      })
      .catch(console.log);
  };

  return (
    <>
      {sumbitted ? (
        <>
          <Heading className="text-center mb-2">Локация добавлена!</Heading>
          <Stack gap={2} className="col-md-5 mx-auto">
            <LinkContainer to="/locations">
              <Button variant="outline-primary" size="lg">
                К списку локаций
              </Button>
            </LinkContainer>
            <Button variant="success" size="lg" onClick={startNewLocation}>
              Добавить
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Heading>Добавить новую локацию</Heading>
          <LocationForm onSubmit={handleSubmit} initialValues={location} />
        </>
      )}
    </>
  );
};

export default NewLocation;
