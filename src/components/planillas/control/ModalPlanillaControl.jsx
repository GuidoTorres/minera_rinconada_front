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

const ModalPlanillaControl = ({ selected, actualizarTabla }) => {
  const {
    setPlanillaControl,
    validacionPagos,
    setValidacionPagos,
    pago,
    setPago,
    validacionPagosAsociacion,
    setValidacionPagosAsociacion,
  } = useContext(PlanillaContext);
  const [contrato, setContrato] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const closeModal = () => {
    setPlanillaControl(false);
  };

  useEffect(() => {
    const filterContrato = selected.contrato.filter((item) => item !== null);
    setContrato(filterContrato);
  }, [selected]);

  console.log(contrato);
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

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      id: "fecha_inicio",
      name: "Fecha de inicio",
      selector: (row) => row?.fecha_inicio?.split("T")[0],
      sortable: true,
    },

    {
      id: "fecha_pago",
      name: "Fecha de pago",
      sortable: true,
      selector: (row) => row?.fecha_fin?.split("T")[0],
    },

    {
      id: "estado",
      name: "Estado",
      button: true,
      selector: (row) => (row?.estado !== true ? "Pendiente" : "Pagado"),
    },

    {
      id: "validacion",
      name: "Validacion de pagos",
      button: true,
      center: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleValidacion(e)} />
        </>
      ),
    },
    {
      id: "pagos",
      name: "Pagos",
      button: true,
      center: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handlePagos(e)} />
        </>
      ),
    },
  ];

  return (
    <div className="modal-planilla">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Control planilla
            <AiOutlineClose onClick={closeModal} />
          </section>

          <Tabla columns={planilla} table={contrato} />
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
          actualizarTabla={actualizarTabla}
        />
      )}
    </div>
  );
};

export default ModalPlanillaControl;
