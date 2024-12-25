import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../helpers/GlobalContext";
import { postLogin } from "../services";
import { Theme } from "../components/Theme";
import { validationSchemaUser } from "../utils/validations";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState, authState } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaUser) });

  const onSuccess = (data) => {
    localStorage.setItem("accessToken", data);
    setAuthState({
      email: data.email,
      id: data.id,
      isValid: true,
    });
    navigate(`/`);
  };

  const onError = (data) => {
    alert(data);
  };

  const onSubmit = () => {
    const data = { email: getValues("email"), password: getValues("password") };
    postLogin({ onSuccess, onError, data });
  };

  useEffect(() => {
    if (authState.isValid) {
      navigate(`/`);
    }
  }, [authState.isValid, navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white ">
        Iniciar sesión
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
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email@gmail.com"
            onChange={setEmail}
            {...register("email")}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu contraseña
          </label>
          <p className="text-red-500 mb-1">{errors.password?.message}</p>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tu contraseña..."
            onChange={setPassword}
            {...register("password")}
          />
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
      <p
        className="text-blue-700 cursor-pointer"
        onClick={() => {
          navigate(`/registration`);
        }}
      >
        ¿No tienes cuenta?
      </p>
    </div>
  );
}

export default Login;
