import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Datepicker } from "flowbite-react";
import { GlobalContext } from "../helpers/GlobalContext";
import { optionsRate, optionsDuration, initialValues } from "../utils/index";
import { setSimulation } from "../services";

function CreateSimulation() {
  let navigate = useNavigate();
  const [valueStart, onChangeStart] = useState(new Date());
  const [valueEnd, onChangeEnd] = useState("");
  const { authState } = useContext(GlobalContext);

  useEffect(() => {
    if (authState.isLoading) return;

    if (!authState.isValid) {
      alert("Debes de iniciar sesión para acceder a esta página.");
      navigate(`/login`);
    }
  }, [authState.isLoading, authState.isValid, navigate]);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Debes de ingresar un monto a la simulación.")
      .positive()
      .integer(),
    rate: Yup.number()
      .required("Debes de ingresar una tasa de interés.")
      .positive()
      .min(1),
  });

  const onSuccess = () => {
    navigate(`/`);
  };

  const onError = (response) => {
    alert(response);
    navigate(`/`);
  };

  const onSubmit = (data) => {
    data.startDate = new Date(
      valueStart.getFullYear(),
      valueStart.getMonth(),
      valueStart.getDate()
    );
    data.endDate = new Date(
      valueStart.getFullYear() + parseInt(valueEnd.value),
      valueStart.getMonth(),
      valueStart.getDate()
    );

    setSimulation({onSuccess, onError, data});
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="mb-11">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Simulador financiero
        </h1>
        <div className="max-w-sm mx-auto flex flex-col justify-center items-center gap-5 mt-10 bg-center bg-no-repeat bg-cover p-10 rounded-lg shadow-lg dark:bg-gray-800">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Monto:{" "}
              </label>
              <ErrorMessage
                name="amount"
                component="span"
                className="text-red-500"
              />
              <Field
                id="inputCreateSimulation"
                name="amount"
                placeholder="Monto..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">
                Término de pago:{" "}
              </label>
              <ErrorMessage
                name="paymentTerm"
                component="span"
                className="text-red-500"
              />
              <select
                id="inputCreateSimulation"
                name="paymentTerm"
                placeholder="Elija.."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue="Mensual">
                  Selecciona término de pago
                </option>
                <option value="Mensual">Mensual</option>
                <option value="Anual">Anual</option>
              </select>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">
                Fecha de disposición:{" "}
              </label>
              <ErrorMessage
                name="startDate"
                component="span"
                className="text-red-500"
              />
              <Datepicker
                id="inputCreateSimulation"
                name="startDate"
                onChange={onChangeStart}
                value={valueStart}
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">
                Plazo:{" "}
              </label>
              <ErrorMessage
                name="endDate"
                component="span"
                className="text-red-500"
              />
              <Select
                id="inputCreateSimulation"
                name="endDate"
                placeholder="Elija.."
                onChange={onChangeEnd}
                options={optionsDuration}
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">
                Tasa de interés:{" "}
              </label>
              <ErrorMessage
                name="rate"
                component="span"
                className="text-red-500"
              />
              <Field
                id="inputCreateSimulation"
                name="rate"
                placeholder="Tasa de interés..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="mb-5 flex flex-row justify-center items-center gap-5">
                <button
                  type="cancel"
                  className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-700 dark:hover:bg-gray-900 dark:focus:ring-gray-700 dark:border-gray-700 mt-5"
                  onClick={() => {
                    navigate(`/`);
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5"
                >
                  Guardar Simulación
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateSimulation;
