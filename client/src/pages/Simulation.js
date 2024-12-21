import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Simulation() {
  let { id } = useParams();
  const [simulationObject, setSimulation] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/simulation/byId/${id}`)
      .then((response) => {
        setSimulation(response.data);
      });
  }, []);
  return <div className="simulationPage">{simulationObject.amount}</div>;
}

export default Simulation;
