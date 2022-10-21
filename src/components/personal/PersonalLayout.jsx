import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../context/CrudContext";
import { PersonalContext } from "../../context/PersonalContext";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import Header from "../header/Header";
import Tabla from "../tabla/Tabla";
import Buscador from "./Buscador";
import ModalRegistroPersonal from "./ModalRegistroPersonal";
import ModalHistorialContrato from "./ModalHistorialContrato";
import ModalRegistrarContrato from "./ModalRegistrarContrato";
import ModalHistorialEvaluacion from "./ModalHistorialEvaluacion";
import ModalRegistroEvaluacion from "./ModalRegistroEvaluacion";
import Swal from "sweetalert2";

const PersonalLayout = () => {
  const route = "trabajador";
  const {
    registrarPersonal,
    setRegistrarPersonal,
    setDataToEdit,
    historialContrato,
    setHistorialContrato,
    historialEvaluacion,
    setHistorialEvaluacion,
    filterText,
  } = useContext(PersonalContext);
  const { getData, deleteData, data, setData } = useContext(CrudContext);
  const [id, setId] = useState("");
  const [search, setSearch] = useState([]);

  const getTrabajadores = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarPersonal(true);
  };

  const handleDelete = (e) => {
    alertaEliminarExito("trabajador").then((res) => {
      if (res.isConfirmed) {
        deleteData(e, route);

        Swal.fire(
          "Eliminado!",
          "El trabajador se eliminó correctamente.",
          "success"
        );
      }
      getTrabajadores();
    });
  };

  const handleEvaluacion = (e) => {
    setHistorialEvaluacion(true);
    setId(e);
    console.log(e);
  };
  const handleContrato = (e) => {
    setHistorialContrato(true);
    setId(e);
  };

  useEffect(() => {
    getTrabajadores();
    console.log(data);
  }, []);

  useEffect(() => {
    const filtered =
      data &&
      data.filter(
        (item) =>
          (item.nombre &&
            item.nombre.toLowerCase().includes(filterText.toLowerCase())) ||
          (item?.apellido_paterno &&
            item.apellido_paterno
              .toLowerCase()
              .includes(filterText.toLowerCase())) ||
          (item?.apellido_materno &&
            item.apellido_materno
              .toLowerCase()
              .includes(filterText.toLowerCase())) ||
          (item?.dni && item.dni.toString().includes(filterText))
      );

    setSearch(filtered);
  }, [filterText, data]);

  const personal = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row?.id,
      width: "60px",
    },
    {
      id: "Trabajador",
      name: "Trabajador",
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
      width: "300px",
      sortable: true,
      center: true,
    },
    {
      id: "Campamento",
      name: "Campamento",
      selector: (row) =>
        row?.campamento.length !== 0 ? row?.campamento : "Por asignar",
      sortable: true,
    },
    {
      id: "Dni",
      name: "Dni",
      selector: (row) => row?.dni,
      sortable: true,
    },
    {
      id: "telefono",
      name: "Telefono",
      selector: (row) => row?.telefono,
      sortable: true,
    },
    {
      id: "Evaluación",
      name: "Evaluación",
      selector: (row) => row.id,

      button: true,
      cell: (e) => <AiFillEye onClick={() => handleEvaluacion(e)} />,
    },
    {
      id: "Contrato",
      name: "Contrato",
      button: true,
      cell: (e) => (
        <div
          disabled
          style={{
            width: "40px",
            display: "flex",
            justifyContent: "space-around",
            fontSize: "13px",
            pointerEvents: e.evaluacion_id !== "" ? "auto" : "none",
          }}
        >
          {e?.evaluacion_laboral !== "" ? e.evaluacion_laboral : "--"}
          <AiFillEye
            onClick={() => {
              handleContrato(e);
            }}
          />
        </div>
      ),
    },

    {
      id: "Deshabilitar",
      name: "Deshabilitar",
      button: true,
      cell: (e) => <input type="checkbox" />,
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
    <>
      <Header text={"Trabajador"} user={"Usuario"} ruta={"/personal"} />
      <Buscador abrirModal={setRegistrarPersonal} />
      <Tabla columns={personal} table={search} />

      {registrarPersonal && (
        <ModalRegistroPersonal actualizarTabla={getTrabajadores} />
      )}

      {historialEvaluacion && <ModalHistorialEvaluacion selected={id} />}
      {historialContrato && <ModalHistorialContrato selected={id} />}
    </>
  );
};

export default PersonalLayout;
