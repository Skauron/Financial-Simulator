import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(20).required(),
});

function Registration() {
  let navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      navigate(`/login`);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            id="inputRegisterEmail"
            name="email"
            placeholder="Email@example.com"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputRegisterPassword"
            type="password"
            name="password"
            placeholder="Your password..."
          />

          <button type="submit">Registrarse</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
