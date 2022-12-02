import React, { useContext, useEffect, useState } from "react";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { PlanillaContext } from "../../../context/PlanillaContext";
import { CrudContext } from "../../../context/CrudContext";
import { listaAsistencia } from "../../../data/dataTable";
import ModalCrearAsistencia from "./ModalCrearAsistencia";
import "../style/listaAsistencia.css";
import { BsSlashCircle } from "react-icons/bs";
import useSearch from "../../../hooks/useSearch";

const ListaAsistencia = () => {
  const { setControlAsistencia, controlAsistencia, setFechaId, fechaId } =
    useContext(PlanillaContext);
  const { getData, setData, data, deleteData } = useContext(CrudContext);

  const {result} = useSearch(data)

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

  const handleIngreso = (e) => {
    console.log(e.target.value);
  };

  const columns = listaAsistencia(handleEdit, handleDelete);

  return (
    <div className="lista-asistencia">
      <Header text={"Asistencia"} user={"Usuario"} ruta={"/planilla"} />

      <Buscador
        registrar={false}
        crear={true}
        exportar={false}
        cargar={false}
        actualizarAsistencia ={getAsistencia}
        // actualizarTabla={getAsistencia}
      />
      <Tabla columns={columns} table={result} />
      {controlAsistencia && <ModalCrearAsistencia data={fechaId} actualizarTabla={getAsistencia} />}
    </div>
  );
};

export default ListaAsistencia;
