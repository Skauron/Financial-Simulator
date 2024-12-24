import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postAuth } from "../services";
import { Theme } from "../components/Theme";
import { validationSchemaUser } from "../utils/validations";

function Registration() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaUser) });

  const onSuccess = () => {
    navigate(`/login`);
  };

  const onSubmit = (data) => {
    postAuth({ onSuccess, data });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white ">
        Registro
      </h1>
      <div className="absolute top-10 right-10 flex items-center space-x-4">
        <Theme />
      </div>
      <form
        className="max-w-sm mx-auto flex flex-col justify-center items-center gap-5 mt-10 bg-center bg-no-repeat bg-cover p-10 rounded-lg shadow-lg dark:bg-gray-800"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu email
          </label>
          <p className="text-red-500 mb-1">{errors.email?.message}</p>
          <input
            id="inputRegisterEmail"
            name="email"
            placeholder="Email@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("email")}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña:{" "}
          </label>
          <p className="text-red-500 mb-1">{errors.password?.message}</p>
          <input
            id="inputRegisterPassword"
            type="password"
            name="password"
            placeholder="Tu contraseña..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("password")}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Registrarse
        </button>
      </form>
      <p
        className="text-blue-700 cursor-pointer"
        onClick={() => {
          navigate(`/login`);
        }}
      >
        ¿Ya tienes cuenta?
      </p>
    </div>
  );
}

export default Registration;
