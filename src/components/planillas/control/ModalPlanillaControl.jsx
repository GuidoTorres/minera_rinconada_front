import React, { useContext } from "react";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import "../style/modalPlanillaControl.css";
import ModalPago from "./ModalPago";
import ModalValidacionPagos from "./ModalValidacionPagos";
import ModalValidacionPagosAsociacion from "./ModalValidacionPagosAsociacion";

const ModalPlanillaControl = ({ selected }) => {
  const {
    setPlanillaControl,
    validacionPagos,
    setValidacionPagos,
    pago,
    setPago,
    validacionPagosAsociacion, setValidacionPagosAsociacion
  } = useContext(PlanillaContext);
  const closeModal = () => {
    setPlanillaControl(false);
  };

  const handleValidacion = () => {
    if(selected.codigo){
      setValidacionPagosAsociacion(true)
    }else{

      setValidacionPagos(true);
    }
  };

  const handlePagos = () => {
    setPago(true);
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row?.id,
    },
    // {
    //   id: "id_Contrato",
    //   name: "Id contrato",
    //   sortable: true,
    //   center: true,
    //   selector: (row) => row?.codigo_contrato,
    // },
    {
      id: "fecha_inicio",
      name: "Fecha de inicio",
      selector: (row) => row?.fecha_inicio?.split(",")[0],
      sortable: true,
    },

    {
      id: "fecha_pago",
      name: "Fecha de pago",
      sortable: true,
      selector: (row) => row?.fecha_fin?.split(",")[0],
    },
    {
      id: "quincena",
      name: "Teletrans por quincena",
      selector: (row) => row?.teletrans ? 4 : 0,
    },
    {
      id: "estado",
      name: "Estado",
      button: true,
      selector: (row) => !row?.contrato?.estado ? "Pendiente" :"Despachado",

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
          <section className="buscador">
            <Buscador
              registrar={false}
              crear={false}
              exportar={false}
              cargar={false}
            />
          </section>
          <Tabla columns={planilla} table={selected.contrato} />
        </div>
      </div>

      {validacionPagos && <ModalValidacionPagos data={selected} />}
      {validacionPagosAsociacion && <ModalValidacionPagosAsociacion data={selected}/>}
      {pago && <ModalPago data={selected}/>}
    </div>
  );
};

export default ModalPlanillaControl;
