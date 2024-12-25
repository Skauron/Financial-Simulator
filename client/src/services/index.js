import axios from "axios";

//* Function to set a simulation
export function setSimulation({ onSuccess, onError, data }) {
  axios
    .post(process.env.REACT_APP_API_URL+"/simulation", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      if (response.data.error) {
        onError(response.data.error);
      } else {
        onSuccess();
      }
    });
}

//* Function to delete a simulation
export function deleteSimulation({ onSuccessDelete, id }) {
  axios
    .delete(process.env.REACT_APP_API_URL+`/simulation/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      onSuccessDelete(id);
    });
}

//* Function to get a simulation
export function getSimulation({ onSuccessGet, onErrorGet }) {
  axios
    .get(process.env.REACT_APP_API_URL+"/simulation", {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      if (response.data.error) {
        onErrorGet(response.data.error);
      } else {
        onSuccessGet(response.data);
      }
    });
}

//* Function to Login a user
export function postLogin({ onSuccess, onError, data }) {
  axios.post(process.env.REACT_APP_API_URL+"/auth/login", data).then((response) => {
    if (response.data.error) {
      onError(response.data.error);
    } else {
      onSuccess(response.data);
    }
  });
}

//* Function to post Auth a user
export function postAuth({ onSuccess, data }) {
  axios.post(process.env.REACT_APP_API_URL+"/auth", data).then(() => {
    onSuccess();
  });
}

//* Function to get Auth of a user
export function getAuth({ onSuccess, onError }) {
  axios
    .get(process.env.REACT_APP_API_URL+"/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      if (response.data.error) {
        onError();
      } else {
        onSuccess(response.data);
      }
    });
}

//* Function to get a simulation by id
export function getSimulationById({ onSuccessGet, onErrorGet, id }) {
  axios
    .get(process.env.REACT_APP_API_URL+`/simulation/byId/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      if (response.data.error) {
        onErrorGet(response.data.error);
      } else {
        onSuccessGet(response.data);
      }
    });
}

//*Function to update a simulation by id
export function putSimulationById({ onSuccessPut, onErrorPut, id, data }) {
  axios
    .put(process.env.REACT_APP_API_URL+`/simulation/${id}`, data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      if (response.data.error) {
        onErrorPut(response.data);
      } else {
        onSuccessPut();
      }
    });
}
