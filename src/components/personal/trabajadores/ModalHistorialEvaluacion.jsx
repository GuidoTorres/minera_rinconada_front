import React, { useContext, useEffect } from "react";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import { alertaEliminarExito } from "../../../helpers/alertMessage";
import ModalRegistroEvaluacion from "./ModalRegistroEvaluacion";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import Swal from "sweetalert2";

import "../styles/modalHistorialEvaluacion.css";

const ModalHistorialEvaluacion = ({ selected, actualizarTrabajador }) => {
  const route = "evaluacion";
  const {
    setHistorialEvaluacion,
    setRegistrarEvaluacion,
    setDataToEdit,
    registrarEvaluacion,
  } = useContext(PersonalContext);

  const { getDataById, deleteData, data1, setData1 } = useContext(CrudContext);

  const getEvaluacion = async () => {
    const response = await getDataById(route, selected.id);
    setData1(response.data);
    console.log(selected);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarEvaluacion(true);
  };

  const handleDelete = (id) => {
    deleteData(route, id.evaluacion_id).then((res) => {
      if (res.status === 200) {
        alertaEliminar(res.msg, res.status).then((res) => {
          closeModal()
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
  };
  const historialEvaluacion = [
    {
      id: "Id Historial",
      name: "Id Historial",
      selector: (row) => row.evaluacion_id,
      width: "120px",
    },
    {
      id: "Nombre",
      name: "Nombre",
      selector: (row) => row?.nombre,
      width: "250px",
    },
    {
      id: "Fecha de inicio",
      name: "Fecha de evaluación",
      selector: (row) =>
        row.fecha_evaluacion && row.fecha_evaluacion.split("T")[0],
    },
    {
      id: "Nota",
      name: "Nota",
      selector: (row) => row?.evaluacion_laboral,
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ];
  return (
    <div className="modal-evaluacion">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Historial de evaluación
            <AiOutlineClose onClick={closeModal} />
          </section>
          <section className="buscador">
            <Buscador abrirModal={setRegistrarEvaluacion} registrar={true} />
          </section>
          <Tabla columns={historialEvaluacion} table={data1} />
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
