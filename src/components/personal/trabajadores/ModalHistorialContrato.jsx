import React, { useContext, useEffect, useState } from "react";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { AiFillEye, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import "../styles/modalHistorialContrato.css";
import { PersonalContext } from "../../../context/PersonalContext";
import { CrudContext } from "../../../context/CrudContext";
import { alertaEliminarExito } from "../../../helpers/alertMessage";
import ModalRegistrarContrato from "./ModalRegistrarContrato";
import Swal from "sweetalert2";
import { historialContrato } from "../../../data/dataTable";
import BuscadorContrato from "../BuscadorContrato";
import useSearch from "../../../hooks/useSearch";

const ModalHistorialContrato = ({ selected }) => {
  const route = "contrato";
  const {
    setHistorialContrato,
    setRegistrarContrato,
    setDataToEdit,
    registrarContrato,
  } = useContext(PersonalContext);
  const { getDataById, deleteData, data1, setData1 } = useContext(CrudContext);
  const [id, setId] = useState("");
  const {result} = useSearch(data1)
  const getContrato = async () => {
    const route = "contrato";
    const response = await getDataById(route, selected.dni);

    // const prueba = response.data.filter((item) => item !== null);
    setData1(response.data);
  };
  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarContrato(true);
    setId(e);
  };

  const handleDelete = (id) => {
    deleteData(route, id.id).then((res) => {
      if (res.status === 200) {
        alertaEliminar(res.msg, res.status).then((res) => {
          closeModal();
          if (res.isConfirmed) {
            actualizarTabla();
          }
        });
      }
    });
  };

  const closeModal = () => {
    setHistorialContrato(false);
    setData1([]);
  };
  useEffect(() => {
    getContrato();
  }, []);

  const columns = historialContrato(handleEdit, handleDelete);
  return (
    <div className="modal-historial">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          Historial de contratos
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section className="buscador">
          <BuscadorContrato
            abrirModal={setRegistrarContrato}
            registrar={true}
            tipo={"contrato"}
            data={selected}
          />
        </section>
        <Tabla columns={columns} table={result} />
      </div>
      {registrarContrato && (
        <ModalRegistrarContrato
          actualizarTabla={getContrato}
          selected={id}
          data={selected}
        />
      )}
    </div>
  );
};

export default ModalHistorialContrato;
