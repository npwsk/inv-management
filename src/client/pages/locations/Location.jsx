import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Spinner, Alert } from 'react-bootstrap';

import LocationDataService from '../../services/location';
import { updateLocation } from '../../actions/location';

import Heading from '../../components/Heading';
import LocationForm from '../../components/LocationForm';

const Location = () => {
  const { locationId } = useParams();

  const [currentValues, setCurrentValues] = useState(null);
  const [alert, setAlert] = useState({ shown: false, message: '' });

  const dispatch = useDispatch();

  const getCurrentLocation = (id) => {
    LocationDataService.get(id)
      .then((response) => {
        setCurrentValues(response.data);
        console.log(response.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getCurrentLocation(locationId);
  }, [locationId]);

  const saveLocation = (values) => {
    dispatch(updateLocation(locationId, values))
      .then((response) => {
        console.log(response);
        setAlert({ shown: true, message: 'Изменения сохранены' });
      })
      .catch(console.log);
  };

  const navigate = useNavigate();

  return (
    <>
      <Heading>{`Локация #${locationId}`}</Heading>
      {alert.shown ? (
        <Alert variant="success" onClose={() => navigate('/locations')} dismissible>
          <Alert.Heading>{alert.message}</Alert.Heading>
        </Alert>
      ) : currentValues ? (
        <LocationForm onSubmit={saveLocation} initialValues={currentValues} />
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

export default Location;
