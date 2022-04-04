import { useSelector } from 'react-redux';
import { Row, Col, Form, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormInput from './FormInput';
import FormSelect from './FormSelect';
import * as format from '../utils/format';

const schema = yup.object({
  manufacturer: yup.string().required(),
  model: yup.string().required(),
  diagSize: yup.number().required().integer().positive(),
  inventoryNumber: yup
    .number()
    .required()
    .integer()
    .max(1e10 - 1)
    .min(1e9),
  registrationDate: yup.date().required(),
  usageStartDate: yup.date().required(),
  deprecationPeriod: yup.number().required().integer().positive().max(1000),
  state: yup.string().required(),
  repairStartDate: yup.date().required(),
  failureReason: yup.string().required(),
  staffMember: yup.string().required(),
  location: yup.string().required(),
});

const BoardForm = ({ handleSubmit, isLoaded }) => {
  const locations = useSelector((state) => state.locations);
  const staffMembers = useSelector((state) => state.staff);

  return (
    <Container>
      <Row>
        <Col>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              manufacturer: '',
              model: '',
              diagSize: 1,
              technology: 'Инфракрасная',
              inventoryNumber: '',
              registrationDate: new Date().toISOString().slice(0, 10),
              usageStartDate: new Date().toISOString().slice(0, 10),
              deprecationPeriod: 24,
              state: 'Исправно',
              repairStartDate: null,
              failureReason: '',
              staffMember: '',
              location: '',
              friends: [{ firstName: 'John', lastName: 'Snow' }],
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
                    {isLoaded
                      ? Object.entries(staffMembers).map((staff) => (
                          <option key={`staff-option-${staff.id}`}>{format.staffToStr}</option>
                        ))
                      : null}
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
                    {isLoaded
                      ? Object.entries(locations).map((location) => (
                          <option key={`location-option-${location.id}`}>
                            {format.locationToStr}
                          </option>
                        ))
                      : null}
                  </FormSelect>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default BoardForm;
