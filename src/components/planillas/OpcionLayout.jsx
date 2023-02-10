import React from "react";
import "../administracion/styles/opcionUsuario.css";
import MenuOpcion from "../menu-opciones/MenuOpcion";
import { BsCalendarWeek, BsListOl } from "react-icons/bs";

const OpcionLayout = () => {
  const asistencia = JSON.parse(
    localStorage.getItem("permisos")
  ).planillas_asistencia;
  const control = JSON.parse(
    localStorage.getItem("permisos")
  ).planillas_control;
  return (
    <div className="opciones-usuario">
      {asistencia ? (
        <MenuOpcion
          text={"Listas de asistencia"}
          path={"asistencia"}
          img={<BsCalendarWeek className="icon" />}
        />
      ) : (
        ""
      )}
      {control ? (
        <MenuOpcion
          text={"Planillas"}
          path={"control"}
          img={<BsListOl className="icon" />}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default OpcionLayout;
