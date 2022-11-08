import React, { useContext } from "react";
import { PlanillaContext } from "../../../context/PlanillaContext";

const Fechas = ({ data }) => {
    const {fechas} = useContext(PlanillaContext)
    console.log(fechas);
  return (
    <>
      <label>{fechas?.nombre}</label>
    </>
  );
};

export default Fechas;
