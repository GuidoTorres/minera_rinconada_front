import React from "react";
import Header from "../header/Header";
import OpcionUsuario from "./OpcionUsuario";

const AdministracionLayout = () => {
  return (
    <>
      <Header back={false} text={"Administración"} user={"Usuario"} ruta={"/administracion"}/>
      <OpcionUsuario />
    </>
  );
};

export default AdministracionLayout;
