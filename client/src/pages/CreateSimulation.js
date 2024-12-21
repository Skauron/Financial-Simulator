import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function CreateSimulation() {
  const optionsRate = [
    { value: "Mensual", label: "Mensual" },
    { value: "Anual", label: "Anual" },
  ];

  const optionsDuration = [
    { value: "1", label: "1 año" },
    { value: "2", label: "2 años" },
    { value: "3", label: "3 años" },
    { value: "4", label: "4 años" },
    { value: "5", label: "5 años" },
  ];

  let navigate = useNavigate();
  const initialValues = {
    amount: 0,
    paymentTerm: "Anual",
    startDate: "",
    endDate: "",
    rate: 1,
  };

  var today = new Date();
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Debes de ingresar un monto a la simulación.")
      .positive()
      .integer(),
    //TODO: paymentTerm : Yup.required(), Validar que este campo es necesario.
    startDate: Yup.date()
      .required("Debes de ingresar la fecha de inicio.")
      .min(new Date(today.getFullYear(), today.getMonth(), today.getDate())),
    //endDate: Yup.date().required(),
    rate: Yup.number()
      .required("Debes de ingresar una tasa de interés.")
      .positive(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/simulation", data).then((response) => {
      navigate(`/`);
    });
  };

  return (
    <div className="createSimulationPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Monto: </label>
          <ErrorMessage name="amount" component="span" />
          <Field
            id="inputCreateSimulation"
            name="amount"
            placeholder="Amount..."
          />
          <label>Término de pago: </label>
          <ErrorMessage name="paymentTerm" component="span" />
          <Select
            id="inputCreateSimulation"
            name="paymentTerm"
            placeholder="Elija.."
            options={optionsRate}
          />
          <label>Fecha de disposición: </label>
          <ErrorMessage name="startDate" component="span" />
          <Field
            id="inputCreateSimulation"
            name="startDate"
            placeholder="dd/mm/yyyy"
          />
          <label>Plazo: </label>
          <ErrorMessage name="endDate" component="span" />
          <Select
            id="inputCreateSimulation"
            name="endDate"
            placeholder="Elija.."
            options={optionsDuration}
          />
          <label>Tasa de interés: </label>
          <ErrorMessage name="rate" component="span" />
          <Field
            id="inputCreateSimulation"
            name="rate"
            placeholder="dd/mm/yyyy"
          />

          <button type="submit">Guardar Simulación</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateSimulation;
