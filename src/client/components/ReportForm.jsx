import { useSelector } from 'react-redux';
import { Row, Col, Form, Container, Button, Spinner, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormInput from './FormInput';
import FormSelect from './FormSelect';
import * as format from '../utils/format';
import states from '../../constants/boardStates';

const schema = yup.object({
  state: yup.string(),
  staffId: yup.number(),
  locationId: yup.number(),
  regDateFrom: yup.date(),
  regDateTo: yup.date(),
});

const ReportForm = ({ initialValues, onSubmit }) => {
  const locations = useSelector((state) => state.locations);
  const staffMembers = useSelector((state) => state.staff);

  return (
    <Container>
      <Row>
        <Col>
          {locations && locations.length && staffMembers && staffMembers.length && initialValues ? (
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
              }}
              initialValues={initialValues}
            >
              {({ handleSubmit, values }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row>
                    <FormSelect
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="stateFormik"
                      label="По состоянию:"
                      type="text"
                      name="state"
                    >
                      <option value="">Выбрать состояние</option>
                      {Object.entries(states).map(([state, val]) => (
                        <option key={state}>{val}</option>
                      ))}
                    </FormSelect>
                  </Row>

                  <Row className="align-items-end">
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="regDateFromFormik"
                      label="По дате постановки на учет:"
                      type="date"
                      name="regDateFrom"
                      inputGroupPrepend={<InputGroup.Text>с</InputGroup.Text>}
                    />
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="regDateToFormik"
                      type="date"
                      name="regDateTo"
                      inputGroupPrepend={<InputGroup.Text>по</InputGroup.Text>}
                    />
                    {/* <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="deprPeriodFormik"
                      label="Срок амортизации"
                      type="number"
                      name="deprecationPeriod"
                    /> */}
                  </Row>

                  <Row>
                    <FormSelect
                      as={Col}
                      sm="12"
                      md="6"
                      controlId="staffFormik"
                      label="По сотруднику:"
                      type="text"
                      name="staffId"
                    >
                      <option value="">Выбрать сотрудника</option>
                      {staffMembers.map((staff) => (
                        <option key={`staff-option-${staff.id}`} value={staff.id}>
                          {format.staffToStr(staff)}
                        </option>
                      ))}
                    </FormSelect>
                    <FormSelect
                      as={Col}
                      sm="12"
                      md="6"
                      controlId="locationFormik"
                      label="По месту нахождения:"
                      type="text"
                      name="locationId"
                    >
                      <option value="">Выбрать место</option>
                      {locations.map((location) => (
                        <option key={`location-option-${location.id}`} value={location.id}>
                          {format.locationToStr(location)}
                        </option>
                      ))}
                    </FormSelect>
                  </Row>
                  <Row>
                    <div className="d-flex gap-4">
                      <Button variant="success" size="lg" type="submit">
                        Сформировать
                      </Button>
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

export default ReportForm;
