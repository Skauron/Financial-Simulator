import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateSimulation from "./pages/CreateSimulation";
import Simulation from "./pages/Simulation";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/createsimulation" exact Component={CreateSimulation} />
          <Route path="/simulation/:id" exact Component={Simulation} />
          <Route path="/registration" exact Component={Registration} />
          <Route path="/login" exact Component={Login} />
        </Routes>
      </Router>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
    </div>
  );
}

export default App;
