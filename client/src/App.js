import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateSimulation from "./pages/CreateSimulation";
import Simulation from "./pages/Simulation";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { GlobalContext } from "./helpers/GlobalContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    isValid: false,
    isLoading: true,
  });
  const [themeState, setThemeState] = useState({
    theme: "light",
  });

  useEffect(() => {
    //*Check theme on load
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setThemeState({ theme: "dark" });
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setThemeState({ theme: "light" });
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
    
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
            isValid: false,
            isLoading : false,
          });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            isValid: true,
            isLoading: false,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <GlobalContext.Provider value={{ authState, setAuthState, themeState, setThemeState }}>
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
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
