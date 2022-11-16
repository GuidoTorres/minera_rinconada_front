import React, { useContext, useEffect, useState } from "react";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { AiOutlineClose, AiFillEye, AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { PlanillaContext } from "../../../context/PlanillaContext";
import { CrudContext } from "../../../context/CrudContext";
import ModalCrearAsistencia from "./ModalCrearAsistencia";

const ListaAsistencia = () => {
  const {
    setAsistencia,
    setControlAsistencia,
    controlAsistencia,
    campamentoAsistencia,
    setFechaId,
  } = useContext(PlanillaContext);
  const { getData, setData, data, deleteData } = useContext(CrudContext);

  const getAsistencia = async () => {
    const route = "asistencia/trabajador";
    const response = await getData(route);
    setData(response.data);
  };

  useEffect(() => {
    getAsistencia();
  }, []);

  const handleEdit = (e) => {
    setControlAsistencia(true);
    setFechaId(e);
  };

  const handleDelete = (e) => {
    const route = "asistencia";
    deleteData(route, e.id).then((res) => {
      if (res.status === 200) {
        getAsistencia();
      }
    });
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      width: "80px",
      selector: (row, index) => index + 1,
    },
    {
      id: "dni",
      name: "Dni",
      sortable: true,
      width: "20%",

      selector: (row) => row?.dni,
    },

    {
      id: "nombre",
      name: "Nombre",
      sortable: true,
      width: "30%",

      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
    },

    {
      id: "asistencia",
      name: "Asistencia",
      sortable: true,
      width: "20%",

      cell: (e) => (
        <>
          <select
            // defaultValue={e?.trabajador_asistencia?.map(item => {return item.asistencia})}
            onChange={(event) => handleAsistencia(event, e)}
          >
            <option value="-1">Seleccione</option>
            <option value="Asistio">Asistio</option>
            <option value="Falto">Falto</option>
            <option value="Permiso">Permiso</option>
            <option value="Dia Libre">Dia Libre</option>
            <option value="Comisión">Comisión</option>
          </select>
        </>
      ),
    },

    {
      id: "tipo",
      name: "Tipo de trabajador",
      button: true,
      width: "20%",

      selector: (row) =>
        row?.asociacion_id === null ? "Normal" : "Asociación",
    },
  ];

  return (
    <div>
      <Header text={"Asistencia"} user={"Usuario"} ruta={"/planilla"} />
      <Buscador
        registrar={false}
        crear={false}
        exportar={false}
        cargar={true}
        actualizarTabla={getAsistencia}
      />
      <Tabla columns={planilla} table={data} />
      {controlAsistencia && <ModalCrearAsistencia data={data} />}
    </div>
  );
};

export default ListaAsistencia;
