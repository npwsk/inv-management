import { Row, Col, Form, Container, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormInput from './FormInput';

const schema = yup.object({
  firstName: yup.string().required('Это обязательное поле'),
  middleName: yup.string(),
  lastName: yup.string().required('Это обязательное поле'),
});

const StaffForm = ({ initialValues, onSubmit }) => {
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
              {({ handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row>
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      lg="2"
                      controlId="lastNameFormik"
                      label="Фамилия"
                      type="text"
                      name="lastName"
                    />
                  </Row>
                  <Row>
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      lg="2"
                      controlId="firstNameFormik"
                      label="Имя"
                      type="text"
                      name="firstName"
                    />
                  </Row>
                  <Row>
                    <FormInput
                      as={Col}
                      sm="12"
                      md="4"
                      lg="2"
                      controlId="middleNameFormik"
                      label="Отчество"
                      type="text"
                      name="middleName"
                    />
                  </Row>
                  <Row>
                    <div className="d-flex gap-4">
                      <Button variant="success" size="lg" type="submit">
                        Сохранить
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

export default StaffForm;
