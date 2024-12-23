import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateSimulation from "./pages/CreateSimulation";
import Simulation from "./pages/Simulation";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            email: "",
            id: 0,
            status: false,
          });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route
              path="/createsimulation"
              exact
              Component={CreateSimulation}
            />
            <Route path="/simulation/:id" exact Component={Simulation} />
            <Route path="/registration" exact Component={Registration} />
            <Route path="/login" exact Component={Login} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
