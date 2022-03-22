import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Field } from 'formik';

const FormInput = ({ as, md, controlId, label, name, type, inputGroupPrepend }) => {
  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group as={as} md={md} controlId={controlId} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                type={type}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
              />

              <Form.Control.Feedback type="invalid">
                {form.errors[field.name]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
    </Field>
  );
};

FormInput.defaultProps = {
  type: 'text',
  inputGroupPrepend: null,
};

export default FormInput;
