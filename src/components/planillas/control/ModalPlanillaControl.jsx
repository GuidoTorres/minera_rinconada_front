import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import "../style/modalPlanillaControl.css";
import ModalPago from "./ModalPago";
import ModalValidacionPagos from "./ModalValidacionPagos";
import ModalValidacionPagosAsociacion from "./ModalValidacionPagosAsociacion";
import { planillaControl } from "../../../data/dataTable";

const ModalPlanillaControl = ({ selected, actualizarTabla }) => {
  const [contrato, setContrato] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const {
    setPlanillaControl,
    validacionPagos,
    setValidacionPagos,
    pago,
    setPago,
    validacionPagosAsociacion,
    setValidacionPagosAsociacion,
  } = useContext(PlanillaContext);
  const closeModal = () => {
    setPlanillaControl(false);
  };

  useEffect(() => {
    setContrato([selected.contrato]);
  }, [selected]);

  const handleValidacion = () => {
    if (selected.codigo) {
      setValidacionPagosAsociacion(true);
    } else {
      setValidacionPagos(true);
    }
  };

  const handlePagos = (e) => {
    setPago(true);
    setDataSelected(e);
  };

  const columns = planillaControl(handleValidacion, handlePagos);

  return (
    <div className="modal-planilla">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Control planilla
            <AiOutlineClose onClick={closeModal} />
          </section>

          <Tabla columns={columns} table={contrato} />
        </div>
      </div>

      {validacionPagos && <ModalValidacionPagos data={selected} />}
      {validacionPagosAsociacion && (
        <ModalValidacionPagosAsociacion data={selected} />
      )}
      {pago && (
        <ModalPago
          data={selected}
          selected={dataSelected}
          evaluacion_id={selected.evaluacion_id}
          actualizarTabla={actualizarTabla}
        />
      )}
    </div>
  );
};

export default ModalPlanillaControl;
