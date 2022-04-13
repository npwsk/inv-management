import { useSelector } from 'react-redux';
import { Row, Col, Form, Container, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormInput from './FormInput';
import FormSelect from './FormSelect';

import buildings from '../../constants/locationBuildings';

const schema = yup.object({
  building: yup.string().required('Это обязательное поле'),
  room: yup
    .number('Значение должно быть числом')
    .required('Это обязательное поле')
    .integer('Значение должно быть целым')
    .positive('Значение должно быть положительным'),
});

const LocationForm = ({ initialValues, onSubmit, onRemove }) => {
  return (
    <Container>
      <Row>
        <Col>
          {initialValues ? (
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
              }}
              initialValues={initialValues}
            >
              {({ handleSubmit, handleChange, values, errors, isValid, isSubmitting }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  {console.log(values)}
                  <Row>
                    <FormSelect
                      as={Col}
                      sm="12"
                      md="4"
                      lg="2"
                      controlId="buildingFormik"
                      label="Корпус"
                      type="text"
                      name="building"
                    >
                      <option value="">Выбрать кропус</option>
                      {Object.entries(buildings).map(([building, val]) => (
                        <option key={building}>{val}</option>
                      ))}
                    </FormSelect>
                    {/* <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      lg="2"
                      controlId="roomFormik"
                      label="Аудитория"
                      type="number"
                      name="room"
                    /> */}
                  </Row>

                  <Row>
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      lg="2"
                      controlId="roomFormik"
                      label="Аудитория"
                      type="number"
                      name="room"
                    />
                  </Row>
                  <Row>
                    <div className="d-flex gap-4">
                      <Button variant="success" size="lg" type="submit">
                        Сохранить
                      </Button>
                      {onRemove ? (
                        <Button variant="danger" size="lg" onClick={onRemove}>
                          Удалить
                        </Button>
                      ) : null}
                    </div>
                  </Row>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LocationForm;
