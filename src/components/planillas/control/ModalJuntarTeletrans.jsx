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
import { planillaControl, sumarTeletrans } from "../../../data/dataTable";
import { CrudContext } from "../../../context/CrudContext";
import TablaUnirTeletrans from "../../tabla/TablaUnirTeletrans";
import "../style/modalJuntarTeletrans.css";
import BuscadorJuntarTeletrans from "../BuscadorJuntarTeletrans";
import ModalPagarVarios from "./ModalPagarVarios";
import useSearch from "../../../hooks/useSearch";

const ModalJuntarTeletrans = ({ selected, actualizarTabla }) => {
  const [contrato, setContrato] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const {  setJuntarTeletrans, pagarVarios, setPagarVarios,
    setValidacionPagos,
    multiplesTeletrans,
    pago,
    setPago,
    validacionPagosAsociacion,
    setValidacionPagosAsociacion,} =
    useContext(PlanillaContext);
  const { getData, data1, setData1 } = useContext(CrudContext);
  const {result} = useSearch(data1)

  const closeModal = () => {
    setJuntarTeletrans(false);
  };

  const getTrabajadores = async () => {
    const route = "planilla/teletrans";
    const response = await getData(route);
    setData1(response.data);
  };

  useEffect(() => {
    getTrabajadores();
  }, []);

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

  const columns = sumarTeletrans(handleValidacion, handlePagos);

  return (
    <div className="modal-juntar">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Juntar Teletrans
            <AiOutlineClose onClick={closeModal} />
          </section>
          <BuscadorJuntarTeletrans registrar={true}/>
          <TablaUnirTeletrans columns={columns} table={result} />
        </div>
      </div>

      {pagarVarios && (
        <ModalPagarVarios
          data={selected}
          selected={dataSelected}
          actualizarTabla={actualizarTabla}
        />
      )}
    </div>
  );
};

export default ModalJuntarTeletrans;
