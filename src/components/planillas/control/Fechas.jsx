import React, { useContext } from "react";
import { PlanillaContext } from "../../../context/PlanillaContext";

const Fechas = ({ data }) => {
  const { fechas } = useContext(PlanillaContext);
  console.log(fechas);
  return (
    <>
      {fechas?.fechas?.map((item) => (
        <label style={{ transform: "rotate(-90deg" }}>{item}</label>
      ))}
    </>
  );
};

export default Fechas;
