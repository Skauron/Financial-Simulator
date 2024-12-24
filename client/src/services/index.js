import axios from "axios";

//* Function to set a simulation
export function setSimulation({ onSuccess, onError, data }) {
  axios
    .post("http://localhost:3001/simulation", data, {
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
  console.log(id);
  axios
    .delete(`http://localhost:3001/simulation/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      onSuccessDelete(id);
    });
}

//* Function to get a simulation
export function getSimulation({ onSuccessGet, onErrorGet }) {
  axios
    .get("http://localhost:3001/simulation", {
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
  axios.post("http://localhost:3001/auth/login", data).then((response) => {
    if (response.data.error) {
      onError(response.data.error);
    } else {
      onSuccess(response.data);
    }
  });
}

//* Function to post Auth a user
export function postAuth({ onSuccess, data }) {
  axios.post("http://localhost:3001/auth", data).then(() => {
    onSuccess();
  });
}

//* Function to get Auth of a user
export function getAuth({ onSuccess, onError }) {
  axios
    .get("http://localhost:3001/auth/auth", {
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
    .get(`http://localhost:3001/simulation/byId/${id}`, {
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
    .put(`http://localhost:3001/simulation/${id}`, data, {
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
