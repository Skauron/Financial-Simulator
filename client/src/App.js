import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfSimulations, setListOfSimulations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/simulation").then((response) => {
      setListOfSimulations(response.data);
    });
  }, []);
  return (
    <div className="App">
      {listOfSimulations.map((value, key) => {
        return (
          <div className="simulation">
            <div className=""></div>
            {value.amount}
          </div>
        );
      })}
    </div>
  );
}

export default App;
