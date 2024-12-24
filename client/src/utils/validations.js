import * as Yup from "yup";

export const validationSchemaUser = Yup.object().shape({
  email: Yup.string()
    .email("Debes de ingresa un correo.")
    .required("Requerido"),
  password: Yup.string()
    .min(4, "La contraseña debe de tener más de 4 digitos.")
    .max(20, "No puede superar 20 caracteres.")
    .required("Requerido"),
});

export const validationSchemaSimulation = Yup.object().shape({
  amount: Yup.number("Debes de ingresar un monto valido a la simulación.")
    .required("Debes de ingresar un monto a la simulación.")
    .positive("Debes de ingresar solo valores positivos.")
    .integer("Debes de ingresar solo valores enteros")
    .typeError("Debes de ingresar un monto valido a la simulación."),
  rate: Yup.number("Debes de ingresar una tasa valida a la simulación.")
    .moreThan(0, "Debes de ingresar una tasa valida a la simulación.")
    .required("Debes de ingresar una tasa de interés.")
    .positive("Debes de ingresar solo valores positivos.")
    .typeError("Debes de ingresar una tasa valida a la simulación.")
    .min(0.1, "Debes de ingresar una tasa valida a la simulación."),
});

