import { useSelector } from 'react-redux';
import { Row, Col, Form, Container, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormInput from './FormInput';
import FormSelect from './FormSelect';
import * as format from '../utils/format';

const BoardForm = ({ handleSubmit }) => {
  const locations = useSelector((state) => state.locations);
  const staffMembers = useSelector((state) => state.staff);
  const boardsNums = useSelector((state) => state.boards).map((board) => board.inventoryNumber);

  const today = new Date().toISOString().slice(0, 10);

  const schema = yup.object({
    manufacturer: yup.string().required('Это обязательное поле'),
    model: yup.string().required('Это обязательное поле'),
    diagSize: yup
      .number('Значение должно быть числом')
      .required('Это обязательное поле')
      .integer('Значение должно быть целым')
      .positive('Значение должно быть положительным'),
    inventoryNumber: yup
      .string()
      .required('Это обязательное поле')
      .notOneOf(boardsNums, 'Этот номер уже используется'),
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
    staffMember: yup.string().required('Это обязательное поле'),
    location: yup.string().required('Это обязательное поле'),
  });

  return (
    <Container>
      <Row>
        <Col>
          {locations && locations.length && staffMembers && staffMembers.length ? (
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(false);
              }}
              initialValues={{
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
                staffMember: '',
                location: '',
              }}
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
                      <option>Инфракрасная</option>
                      <option>Оптическая</option>
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
                      label="Дата регистрации"
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
                      label="Срок амортизации"
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
                      <option>Исправно</option>
                      <option>Не исправно</option>
                      <option>В ремонте</option>
                    </FormSelect>
                    {values.state === 'В ремонте' ? (
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
                      name="staffMember"
                    >
                      <option value="">Выбрать сотрудника</option>
                      {staffMembers.map((staff) => (
                        <option key={`staff-option-${staff.id}`}>{format.staffToStr(staff)}</option>
                      ))}
                    </FormSelect>
                    <FormSelect
                      as={Col}
                      sm="12"
                      md="6"
                      controlId="locationFormik"
                      label="Место нахождения"
                      type="text"
                      name="location"
                    >
                      <option value="">Выбрать место</option>
                      {locations.map((location) => (
                        <option key={`location-option-${location.id}`}>
                          {format.locationToStr(location)}
                        </option>
                      ))}
                    </FormSelect>
                  </Row>
                  <Row>
                    <Button variant="success" size="lg" type="submit">
                      Сохранить
                    </Button>
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
