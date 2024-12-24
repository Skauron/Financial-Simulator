import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../helpers/GlobalContext";
import { deleteSimulation, getSimulation } from "../services";
import { Theme } from "../components/Theme";

function Home() {
  const [listOfSimulations, setListOfSimulations] = useState([]);
  const { authState } = useContext(GlobalContext);
  let navigate = useNavigate();

  const onSuccessDelete = (id) => {
    setListOfSimulations(
      listOfSimulations.filter((value) => {
        return value.id !== id;
      })
    );
  };

  const onSuccessGet = (data) => {
    setListOfSimulations(data);
  };

  const onErrorGet = (data) => {
    alert(data);
  };

  const deleteSimulationById = (id) => {
    deleteSimulation({ onSuccessDelete, id });
  };

  const Logout = () => {
    localStorage.removeItem("accessToken");
    authState.isValid = false;
    navigate(`/login`);
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    if (authState.isLoading) return;

    if (!authState.isValid) {
      alert("Debes de iniciar sesión para acceder a esta página.");
      navigate(`/login`);
    } else {
      getSimulation({ onSuccessGet, onErrorGet });
    }
  }, [authState.isLoading, authState.isValid, navigate]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-1 flex items-center space-x-4 right-1">
        <Theme />
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white  cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          onClick={() => {
            Logout();
          }}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
          />
        </svg>
      </div>
      <div className="absolute end-10 bottom-2 right-1">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            navigate(`/createsimulation`);
          }}
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      <div className="top-14">
        <div className="mb-1 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mis simulaciones
          </h1>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          {listOfSimulations.map((value, key) => {
            return (
              <a
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                key={key}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/simulation/${value.id}`);
                }}
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {value.amount}
                </h5>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Término de pago
                    <span className="font-normal text-gray-700 dark:text-gray-400">
                      {value.paymentTerm}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Fecha de disposición
                    <span className="font-normal text-gray-700 dark:text-gray-400">
                      {value.startDate}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Plazo máximo de pago
                    <span className="font-normal text-gray-700 dark:text-gray-400">
                      {value.endDate}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Tasa de interés
                    <span className="font-normal text-gray-700 dark:text-gray-400">
                      {value.rate}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Deuda total
                    <span className="font-normal text-gray-700 dark:text-gray-400">
                      {value.debt}
                    </span>
                  </span>
                </div>
                <span
                  className="icon-[flowbite--trash-bin-solid] w-7 h-7 dark:bg-white"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteSimulationById(value.id);
                  }}
                ></span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
