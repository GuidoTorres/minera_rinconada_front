import React from "react";
import TipoUsuario from "./TipoUsuario";
import "../../components/administracion/styles/opcionUsuario.css"

const OpcionUsuario = () => {
  return (
    <div className='opciones-usuario'>
    
      <TipoUsuario text={"Trabajadores"} path={"trabajador"} />
      <TipoUsuario text={"Grupales"} path={"asociacion"} />
      <TipoUsuario text={"Empresas"} path={"empresa"} />
      <TipoUsuario text={"Socios"} path={"socio"} />
    </div>
  );
};

export default OpcionUsuario;
