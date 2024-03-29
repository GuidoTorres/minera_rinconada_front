import React, { useContext, useEffect, useState } from "react";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { CrudContext } from "../../../context/CrudContext";
import ModalRegistrarContrato from "./ModalRegistrarContrato";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { empresaHistorialContrato } from "../../../data/dataTable";
import "../styles/modalHistorialContrato.css";

const ModalHistorialContrato = ({ selected }) => {
  const {
    getDataById,
    deleteData,
    data1,
    setData1,
    setDataToEdit,
    modal1,
    setModal1,
    modal2,
    setModal2,
  } = useContext(CrudContext);
  const [id, setId] = useState("");

  const getContrato = async () => {
    const route = "empresa";
    const response = await getDataById(route, selected.id);
    if (response.data.length > 0) {
      setData1(response.data);
    }
  };

  const handleEdit = (e) => {
    setDataToEdit(e.contratos);
    setModal1(true);
    setId(e);
  };

  const handleDelete = async (id) => {
    const response = await deleteData(id.contratoId, route);
    if (response) {
      notificacion(response.status, response.msg);
      getContrato();
    }
  };

  const closeModal = () => {
    setModal1(false);
    setDataToEdit(null)
  };

  useEffect(() => {
    getContrato();
  }, []);

  const columns = empresaHistorialContrato(handleEdit, handleDelete);

  return (
    <MainModal
      className={"modal-empresa-historial"}
      title={"Historial de contratos"}
      open={modal1}
      width={900}
      closeModal={closeModal}
    >
      <Buscador abrirModal={setModal2} registrar={true} modal={true} />
      <div className="container">
        <Tabla columns={columns} table={data1} />
      </div>

      {modal2 && (
        <ModalRegistrarContrato
          actualizarTabla={getContrato}
          selected={id}
          data={selected}
        />
      )}
    </MainModal>
  );
};

export default ModalHistorialContrato;
