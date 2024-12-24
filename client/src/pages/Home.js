import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../helpers/GlobalContext";

function Home() {
  const [listOfSimulations, setListOfSimulations] = useState([]);
  const { authState, themeState, setThemeState } = useContext(GlobalContext);

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
    if (authState.isLoading) return;
    
    if (!authState.isValid) {
      alert("Debes de iniciar sesión para acceder a esta página.");
      navigate(`/login`);
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
  }, [authState.isLoading, authState.isValid]);

  const Logout = () => {
    localStorage.removeItem("accessToken");
    authState.isValid = false;
    navigate(`/login`);
  };

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setThemeState({ theme: "light" });
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      setThemeState({ theme: "dark" });
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="mb-11">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Mis simulaciones
        </h1>
        <div className="absolute top-10 right-10 flex items-center space-x-4">
          <button
            id="theme-toggle"
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            onClick={toggleTheme}
          >
            <svg
              id="theme-toggle-dark-icon"
              className={themeState.theme === "light" ? "hidden" : "w-5 h-5"}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              id="theme-toggle-light-icon"
              className={themeState.theme === "dark" ? "hidden" : "w-5 h-5"}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
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
                  onClick={(event) => {
                    event.stopPropagation();
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
                  <td className="px-6 py-4 flex justify-center">
                    <span
                      className="icon-[flowbite--trash-bin-solid] w-7 h-7"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteSimulation(value.id);
                      }}
                    ></span>
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
