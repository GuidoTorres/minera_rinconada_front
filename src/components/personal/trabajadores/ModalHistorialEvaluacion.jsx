import React, { useContext, useEffect } from "react";
import {AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import ModalRegistroEvaluacion from "./ModalRegistroEvaluacion";
import Tabla from "../../tabla/Tabla";


import "../styles/modalHistorialEvaluacion.css";
import { historialEvaluacion } from "../../../data/dataTable";
import BuscadorEvaluacion from "../BuscadorEvaluacion";
import useSearch from "../../../hooks/useSearch";

const ModalHistorialEvaluacion = ({ selected, actualizarTrabajador }) => {
  const route = "evaluacion";
  const {
    setHistorialEvaluacion,
    setRegistrarEvaluacion,
    setDataToEdit,
    registrarEvaluacion,
  } = useContext(PersonalContext);

  const { getDataById, deleteData, data1, setData1 } = useContext(CrudContext);
  const {result} = useSearch(data1)

  const getEvaluacion = async () => {
    const response = await getDataById(route, selected.dni);
    setData1(response.data);
  };
  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarEvaluacion(true);
  };

  const handleDelete = (id) => {
    deleteData(route, id.evaluacion_id).then((res) => {
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

  useEffect(() => {
    getEvaluacion();
  }, []);

  const closeModal = () => {
    setHistorialEvaluacion(false);
    actualizarTrabajador();
    setData1([]);
  };

  const columns = historialEvaluacion(handleEdit, handleDelete);

  return (
    <div className="modal-evaluacion">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Historial de evaluación
            <AiOutlineClose onClick={closeModal} />
          </section>
          <section className="buscador">
            <BuscadorEvaluacion
              abrirModal={setRegistrarEvaluacion}
              registrar={true}
              data={selected}
            />
          </section>
          <Tabla columns={columns} table={result} />
        </div>
      </div>
      {registrarEvaluacion && (
        <ModalRegistroEvaluacion
          actualizarTabla={getEvaluacion}
          selected={selected}
          actualizarTrabajador={actualizarTrabajador}
        />
      )}
    </div>
  );
};

export default ModalHistorialEvaluacion;
