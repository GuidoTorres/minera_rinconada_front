import React from "react";
import TipoUsuario from "./TipoUsuario";
import "../../components/administracion/styles/opcionUsuario.css"

const OpcionUsuario = () => {
  return (
    <div className='opciones-usuario'>
    
      <TipoUsuario text={"Trabajador"} path={"trabajador"} />
      <TipoUsuario text={"Asociación"} path={"asociacion"} />
      <TipoUsuario text={"Empresa"} path={"empresa"} />
    </div>
  );
};

export default OpcionUsuario;
