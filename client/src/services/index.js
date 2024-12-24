import axios from "axios";

export function setSimulation({onSuccess, onError, data}) {
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
