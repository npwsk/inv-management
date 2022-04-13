import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Spinner, Alert } from 'react-bootstrap';

import StaffDataService from '../../services/staff';
import { updateStaffMember } from '../../actions/staff';

import Heading from '../../components/Heading';
import StaffForm from '../../components/StaffForm';

const StaffMember = () => {
  const { staffId } = useParams();

  const [currentValues, setCurrentValues] = useState(null);
  const [alert, setAlert] = useState({ shown: false, message: '' });

  const dispatch = useDispatch();

  const getCurrentStaff = (id) => {
    StaffDataService.get(id)
      .then((response) => {
        setCurrentValues(response.data);
        console.log(response.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getCurrentStaff(staffId);
  }, [staffId]);

  const saveStaff = (values) => {
    dispatch(updateStaffMember(staffId, values))
      .then((response) => {
        console.log(response);
        setAlert({ shown: true, message: 'Изменения сохранены' });
      })
      .catch(console.log);
  };

  const navigate = useNavigate();

  return (
    <>
      <Heading>{`Сотрудник #${staffId}`}</Heading>
      {alert.shown ? (
        <Alert variant="success" onClose={() => navigate('/staff')} dismissible>
          <Alert.Heading>{alert.message}</Alert.Heading>
        </Alert>
      ) : currentValues ? (
        <StaffForm onSubmit={saveStaff} initialValues={currentValues} />
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

export default StaffMember;
