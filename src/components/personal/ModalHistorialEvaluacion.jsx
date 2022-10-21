import React, { useContext, useEffect } from "react";
import { AiFillEye, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { CrudContext } from "../../context/CrudContext";
import { PersonalContext } from "../../context/PersonalContext";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import Tabla from "../tabla/Tabla";
import Buscador from "./Buscador";
import ModalRegistroEvaluacion from "./ModalRegistroEvaluacion";
import "./styles/modalHistorialEvaluacion.css";
import Swal from "sweetalert2";

const ModalHistorialEvaluacion = ({ selected }) => {
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
    alertaEliminarExito("evaluacion").then((res) => {
      if (res.isConfirmed) {
        deleteData(id, route);

        Swal.fire(
          "Eliminado!",
          "La evaluación se eliminó correctamente.",
          "success"
        );
      }
      getEvaluacion();
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
      selector: (row) =>
        row?.nombre,
      width: "250px",
    },
    {
      id: "Fecha de inicio",
      name: "Fecha de evalación",
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
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
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
            <Buscador abrirModal={setRegistrarEvaluacion} />
          </section>
          <Tabla columns={historialEvaluacion} table={data1} />
        </div>
      </div>
      {registrarEvaluacion && (
        <ModalRegistroEvaluacion
          actualizarTabla={getEvaluacion}
          selected={selected}
        />
      )}
    </div>
  );
};

export default ModalHistorialEvaluacion;
