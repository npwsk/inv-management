import { useSelector } from 'react-redux';
import { Row, Col, Form, Container, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormInput from './FormInput';
import FormSelect from './FormSelect';
import * as format from '../utils/format';
import states from '../../constants/boardStates';
import technologies from '../../constants/boardTechnologies';

const initialSchema = {
  manufacturer: yup.string().required('Это обязательное поле'),
  model: yup.string().required('Это обязательное поле'),
  diagSize: yup
    .number('Значение должно быть числом')
    .required('Это обязательное поле')
    .integer('Значение должно быть целым')
    .positive('Значение должно быть положительным'),
  registrationDate: yup.date().required('Это обязательное поле'),
  usageStartDate: yup.date().required('Это обязательное поле'),
  deprecationPeriod: yup
    .number()
    .required('Это обязательное поле')
    .integer('Значение должно быть целым')
    .positive('Значение должно быть положительным')
    .max(1000, 'Значение не должно превышать 1000'),
  state: yup.string().required('Это обязательное поле'),
  repairStartDate: yup.date('Это обязательное поле').when('state', {
    is: 'В ремонте',
    then: (schema) => schema.required('Это обязательное поле'),
    otherwise: (schema) => schema.nullable(),
  }),
  staffId: yup.number().required('Это обязательное поле'),
  locationId: yup.number().required('Это обязательное поле'),
};

const BoardForm = ({ initialValues, onSubmit, onRemove, additionalSchema }) => {
  const locations = useSelector((state) => state.locations);
  const staffMembers = useSelector((state) => state.staff);

  const schema = yup.object({
    ...initialSchema,
    ...additionalSchema,
  });

  return (
    <Container>
      <Row>
        <Col>
          {locations && locations.length && staffMembers && staffMembers.length && initialValues ? (
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                onSubmit({
                  ...values,
                  repairStartDate:
                    values.state === states.IN_REPAIR ? values.repairStartDate : null,
                  failureReason: values.state === states.IN_REPAIR ? values.failureReason : null,
                  staffId: Number(values.staffId),
                  locationId: Number(values.locationId),
                });
                setSubmitting(false);
              }}
              initialValues={initialValues}
            >
              {({ handleSubmit, handleChange, values, errors, isValid, isSubmitting }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row>
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="manufacturerFormik"
                      label="Производитель"
                      type="text"
                      name="manufacturer"
                    />
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="modelFormik"
                      label="Модель"
                      type="text"
                      name="model"
                    />
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      lg="2"
                      controlId="diagFormik"
                      label="Диагональ (дюйм)"
                      type="number"
                      name="diagSize"
                    />
                    <FormSelect
                      as={Col}
                      sm="12"
                      md="4"
                      lg="2"
                      controlId="technologyFormik"
                      label="Технология"
                      type="text"
                      name="technology"
                    >
                      {Object.entries(technologies).map(([techn, val]) => (
                        <option key={techn}>{val}</option>
                      ))}
                    </FormSelect>
                  </Row>

                  <Row>
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="numberFormik"
                      label="Инвентарный номер"
                      type="text"
                      name="inventoryNumber"
                    />
                  </Row>
                  <Row>
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="regDateFormik"
                      label="Дата принятия к учету"
                      type="date"
                      name="registrationDate"
                    />
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="usageDateFormik"
                      label="Дата начала эксплуатации"
                      type="date"
                      name="usageStartDate"
                    />
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="deprPeriodFormik"
                      label="Срок амортизации (месяцев)"
                      type="number"
                      name="deprecationPeriod"
                    />
                  </Row>

                  <Row>
                    <FormSelect
                      as={Col}
                      sm="12"
                      md="4"
                      controlId="stateFormik"
                      label="Состояние устройства"
                      type="text"
                      name="state"
                    >
                      {Object.entries(states).map(([state, val]) => (
                        <option key={state}>{val}</option>
                      ))}
                    </FormSelect>
                    {values.state === states.IN_REPAIR ? (
                      <>
                        <FormInput
                          as={Col}
                          sm="12"
                          md="4"
                          controlId="repairDateFormik"
                          label="Дата поступления в ремонт"
                          type="date"
                          name="repairStartDate"
                        />
                        <FormInput
                          as={Col}
                          sm="12"
                          md="4"
                          controlId="failureReasonFormik"
                          label="Причина поломки"
                          type="text"
                          name="failureReason"
                        />
                      </>
                    ) : null}
                  </Row>
                  <Row>
                    <FormSelect
                      as={Col}
                      sm="12"
                      md="6"
                      controlId="staffFormik"
                      label="Ответственный сотрудник"
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
                      label="Место нахождения"
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

export default BoardForm;
