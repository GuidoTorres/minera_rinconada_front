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
    const route = "asistencia";
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
    deleteData(route, e).then((res) => {
      if (res.status === 200) {
        getAsistencia();
      }
    });
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
    },
    {
      id: "fecha",
      name: "Fecha",
      sortable: true,

      selector: (row) => row?.fecha,
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
    <div>
      <Header text={"Asistencia"} user={"Usuario"} ruta={"/planilla"} />
      <Buscador
        registrar={false}
        crear={true}
        exportar={false}
        cargar={false}
        actualizarTabla={getAsistencia}
      />
      <Tabla columns={planilla} table={data} />
      {controlAsistencia && <ModalCrearAsistencia data={data} />}
    </div>
  );
};

export default ListaAsistencia;
