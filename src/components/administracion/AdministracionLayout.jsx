import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import OpcionUsuario from "./OpcionUsuario";

const AdministracionLayout = () => {
  return (
    <>
      <Header user={"Usuario"} ruta={"/administracion"}/>
      <OpcionUsuario />
      <Outlet/>
    </>
  );
};

export default AdministracionLayout;
