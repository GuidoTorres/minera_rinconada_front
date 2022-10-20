import React from "react";
import { Outlet } from "react-router-dom";
import AdministracionLayout from "../components/administracion/AdministracionLayout";

const Administrador = () => {
  return (
    <div style={{ height: "100%" }}>
      <AdministracionLayout/>
      <h1></h1>
    </div>
  );
};

export default Administrador;
