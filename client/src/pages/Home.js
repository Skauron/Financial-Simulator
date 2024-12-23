import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfSimulations, setListOfSimulations] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const deleteSimulation = (id) => {
    axios
      .delete(`http://localhost:3001/simulation/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfSimulations(
          listOfSimulations.filter((value) => {
            return value.id !== id;
          })
        );
      });
  };

  useEffect(() => {
    console.log(authState.status);
    if (authState.status) {
      //!AYUDA ESTO DA UN BUG FEO
      //alert("Debes de iniciar sesión para acceder a esta página.");
      //navigate(`/login`);
    } else {
      axios
        .get("http://localhost:3001/simulation", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            console.log(response.data);
            setListOfSimulations(response.data);
          }
        });
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("accessToken");
    authState.status = false;
    navigate(`/login`);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="mb-11">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Mis simulaciones
        </h1>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white absolute top-10 right-10 cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate(`/login`);
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
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Monto
              </th>
              <th scope="col" className="px-6 py-3">
                Término de pago
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de disposición
              </th>
              <th scope="col" className="px-6 py-3">
                Plazo
              </th>
              <th scope="col" className="px-6 py-3">
                Tasa de interés
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {listOfSimulations.map((value, key) => {
              return (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  key={key}
                  onClick={() => {
                    navigate(`/simulation/${value.id}`);
                  }}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {value.amount}
                  </th>
                  <td className="px-6 py-4">{value.paymentTerm}</td>
                  <td className="px-6 py-4">{value.startDate}</td>
                  <td className="px-6 py-4">{value.endDate}</td>
                  <td className="px-6 py-4">{value.rate}</td>
                  <td className="px-6 py-4">
                    <svg
                      className="text-gray-400 dark:text-gray-500 w-7 h-7 mb-3.5 mx-auto"
                      aria-hidden="true"
                      fillRule="currentColor"
                      viewBox="0 0 20 20"
                      onClick={() => {
                        console.log("Delete");
                        deleteSimulation(value.id);
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="fixed end-10 bottom-10 group">
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
    </div>
  );
}

export default Home;
