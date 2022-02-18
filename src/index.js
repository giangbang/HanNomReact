import React from "react";
import ReactDOM from "react-dom";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

import ROUTE from "./constant/route";
import Login from "./components/Login";
import "./index.css";
import Register from "./components/Register";
import Home from "./components/Home";
import ReadPage from "./components/ReadPage";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={ROUTE.LOGIN} element={<Login />} />
        <Route exact path={ROUTE.REGISTER} element={<Register />} />
        <Route exact path={ROUTE.HOME} element={<Home />} />
        <Route path={ROUTE.READBOOK + "/:id"} element={<ReadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
