import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Datepicker } from "flowbite-react";
import { getSimulationById, putSimulationById } from "../services";
import { GlobalContext } from "../helpers/GlobalContext";
import { Theme } from "../components/Theme";
import { CDT, optionsRate, optionsDuration } from "../utils/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaSimulation } from "../utils/validations";
import { format } from "date-fns";

function Simulation() {
  const [valueStart, onChangeStart] = useState(new Date());
  const [valueEnd, onChangeEnd] = useState("");
  const [valueTerm, onChangeTerm] = useState("");
  const [valueDisplayTerm, onChangeDisplayTerm] = useState("hidden");
  const [valueDisplayEndDate, onChangeDisplayEndDate] = useState("hidden");
  const { authState } = useContext(GlobalContext);

  var today = new Date();
  let { id } = useParams();
  let navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaSimulation) });

  const onSuccessGet = (data) => {
    let defaultValues = {};
    const resultStart = format(data.startDate, "yyyy");
    const resultEnd = format(data.endDate, "yyyy");
    const end = resultEnd - resultStart;

    onChangeStart(new Date(data.startDate));
    onChangeTerm(data.paymentTerm);
    onChangeEnd(end);
    defaultValues.amount = data.amount;
    defaultValues.rate = data.rate;
    reset({ ...defaultValues });
  };

  const onErrorGet = (data) => {
    alert(data.error);
    navigate(`/`);
  };

  const onSuccessPut = () => {
    navigate(`/`);
  };

  const onErrorPut = (data) => {
    alert(data.error);
    navigate(`/`);
  };

  const checkTerm = (e) => {
    onChangeTerm(e);
    onChangeDisplayTerm("hidden");
  };

  const checkEndDate = (e) => {
    onChangeEnd(e);
    onChangeDisplayEndDate("hidden");
  };

  const onSubmit = (data) => {
    data.startDate = new Date(
      valueStart.getFullYear(),
      valueStart.getMonth(),
      valueStart.getDate()
    );
    data.endDate = new Date(
      valueStart.getFullYear() + parseInt(valueEnd),
      valueStart.getMonth(),
      valueStart.getDate()
    );

    //*Validation for paymentTerm
    if (valueTerm === "" || valueTerm === "Selecciona término de pago") {
      onChangeDisplayTerm("");
      return;
    }

    //*Validation for endDate
    if (valueEnd === "" || valueEnd === "Selecciona un plazo") {
      onChangeDisplayEndDate("");
      return;
    }

    data.paymentTerm = valueTerm;
    data.debt = CDT(data.amount, data.rate, valueEnd);

    putSimulationById({ onSuccessPut, onErrorPut, id, data });
  };

  useEffect(() => {
    if (authState.isLoading) return;
    
    if (authState.isValid) {
      getSimulationById({ onSuccessGet, onErrorGet, id });
    }
  }, [authState.isLoading, authState.isValid, id]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white top-20">
          Simulador financiero
        </h1>
        <div className="absolute top-5 right-5 flex items-center space-x-4">
          <Theme />
        </div>
        <div className="max-w-sm mx-auto flex flex-col justify-center items-center gap-5 mt-1 bg-center bg-no-repeat bg-cover p-10 rounded-lg shadow-lg dark:bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Monto:
            </label>
            <p className="text-red-500 mb-1">{errors.amount?.message}</p>
            <input
              id="inputCreateSimulation"
              name="amount"
              placeholder="Monto..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              {...register("amount", { min: 1, max: 999999999 })}
            />
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white mt-5">
              Término de pago:
            </label>
            <p className={`text-red-500 mb-1 ${valueDisplayTerm}`}>
              {"Debes de seleccionar un término de pago."}
            </p>
            <select
              id="inputCreateSimulation"
              name="paymentTerm"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={valueTerm}
              onChange={(e) => {
                checkTerm(e.target.value);
              }}
            >
              {optionsRate.map((value, key) => {
                return (
                  <option value={value.value} key={key}>
                    {value.label}
                  </option>
                );
              })}
            </select>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white mt-5">
              Fecha de disposición:
            </label>
            <Datepicker
              id="inputCreateSimulation"
              name="startDate"
              minDate={
                new Date(today.getFullYear(), today.getMonth(), today.getDate())
              }
              onChange={onChangeStart}
              value={valueStart}
            />
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white mt-5">
              Plazo:
            </label>
            <p className={`text-red-500 mb-1 ${valueDisplayEndDate}`}>
              {"Debes de seleccionar un plazo de pago."}
            </p>
            <select
              id="inputCreateSimulation"
              name="endDate"
              placeholder="Elija.."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={valueEnd}
              onChange={(e) => checkEndDate(e.target.value)}
            >
              {optionsDuration.map((value, key) => {
                return (
                  <option value={value.value} key={key}>
                    {value.label}
                  </option>
                );
              })}
            </select>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white mt-5">
              Tasa de interés:
            </label>
            <p className="text-red-500 mb-1">{errors.rate?.message}</p>
            <input
              id="inputCreateSimulation"
              name="rate"
              placeholder="Tasa de interés..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="float"
              {...register("rate", { min: 1, max: 99 })}
            />
            <div className="mb-5 flex flex-row justify-center items-center gap-5">
              <button
                type="cancel"
                className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-700 dark:hover:bg-gray-900 dark:focus:ring-gray-700 dark:border-gray-700 mt-5"
                onClick={(e) => {
                  e.stopPropagation();
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Simulation;
