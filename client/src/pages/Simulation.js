import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Simulation() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [simulationObject, setSimulation] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/simulation/byId/${id}`, {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          navigate(`/`);
        } else {
          setSimulation(response.data);
        }
      });
  }, []);
  return <div className="simulationPage">{simulationObject.amount}</div>;
}

export default Simulation;
