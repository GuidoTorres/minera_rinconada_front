import React from "react";
import TipoUsuario from "./TipoUsuario";
import "../administracion/styles/opcionUsuario.css"


const OpcionLayout = () => {
  return (
    <div className="opciones-usuario">
      <TipoUsuario text={"Listas de asistencia"} path={"asistencia"} />
      <TipoUsuario text={"Planillas"} path={"control"} />
    </div>
  );
};

export default OpcionLayout;
