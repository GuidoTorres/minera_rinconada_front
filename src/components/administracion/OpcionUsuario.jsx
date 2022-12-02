import React from "react";
import TipoUsuario from "./TipoUsuario";
import "./styles/opcionUsuario.css";

const OpcionUsuario = () => {
  return (
    <div className="opciones-usuario">
      <TipoUsuario text={"Usuarios"} path={"/administracion/usuarios"} />
      <TipoUsuario text={"Roles o Puestos"} path={"/administracion/roles"} />
      <TipoUsuario text={"Campamentos"} path={"/administracion/campamentos"} />
    </div>
  );
};

export default OpcionUsuario;
