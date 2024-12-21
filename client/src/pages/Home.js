import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfSimulations, setListOfSimulations] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/simulation").then((response) => {
      setListOfSimulations(response.data);
    });
  }, []);
  return (
    <div className="App">
      {listOfSimulations.map((value, key) => {
        return (
          <div
            key={key}
            className="simulation"
            onClick={() => {
              navigate(`/simulation/${value.id}`);
            }}
          >
            <div className="amount">{value.amount}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;