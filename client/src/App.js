import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContext } from "./helpers/GlobalContext";
import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

const Home = lazy(() => import("./pages/Home"));
const CreateSimulation = lazy(() => import("./pages/CreateSimulation"));
const Simulation = lazy(() => import("./pages/Simulation"));
const Registration = lazy(() => import("./pages/Registration"));
const Login = lazy(() => import("./pages/Login"));

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
            isLoading: false,
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
      <GlobalContext.Provider
        value={{ authState, setAuthState, themeState, setThemeState }}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/createsimulation"
              exact
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CreateSimulation />
                </Suspense>
              }
            />
            <Route
              path="/simulation/:id"
              exact
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Simulation />
                </Suspense>
              }
            />
            <Route
              path="/registration"
              exact
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Registration />
                </Suspense>
              }
            />
            <Route
              path="/login"
              exact
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
