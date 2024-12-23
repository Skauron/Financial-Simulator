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
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white ">Registro</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="max-w-sm mx-auto flex flex-col justify-center items-center gap-5 mt-10 bg-center bg-no-repeat bg-cover p-10 rounded-lg shadow-lg dark:bg-gray-800">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tu email
            </label>
            <ErrorMessage name="email" component="span" className="text-red-500"/>
            <Field
              id="inputRegisterEmail"
              name="email"
              placeholder="Email@gmail.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña: </label>
            <ErrorMessage name="password" component="span" className="text-red-500"/>
            <Field
              id="inputRegisterPassword"
              type="password"
              name="password"
              placeholder="Tu contraseña..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Registrarse
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
