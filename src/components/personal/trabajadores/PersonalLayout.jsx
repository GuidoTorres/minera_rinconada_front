import React, { useContext, useEffect, useState, useRef } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import {
  alertaEliminar,
  alertaEliminarExito,
} from "../../../helpers/alertMessage";

import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import ModalRegistroPersonal from "./ModalRegistroPersonal";
import ModalHistorialContrato from "./ModalHistorialContrato";
import ModalHistorialEvaluacion from "./ModalHistorialEvaluacion";
import "../styles/personalLayout.css";
import { personalLayout } from "../../../data/dataTable";
import useSearch from "../../../hooks/useSearch";

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
  const { getData, deleteData, data, setData, updateData } =
    useContext(CrudContext);
  const [id, setId] = useState("");
  const [search, setSearch] = useState([]);
  const {result} = useSearch(data)
  const inputFileRef = useRef(null);

  const getTrabajadores = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarPersonal(true);
  };

  const handleDelete = (e) => {
    deleteData(route, e).then((res) => {
      if (res.status === 200) {
        alertaEliminar(res.msg, res.status).then((res) => {
          if (res.isConfirmed) {
            getTrabajadores();
          }
        });
      }
    });
  };

  const handleEvaluacion = (e) => {
    setHistorialEvaluacion(true);
    setId(e);
  };
  const handleContrato = (e) => {
    setHistorialContrato(true);
    setId(e);
  };

  const deshabilitarTrabajador = (e, data) => {
    const route = "trabajador";
    const json = {
      deshabilitado: e.target.checked,
    };

    updateData(json, data.id, route);
  };

  useEffect(() => {
    getTrabajadores();
  }, []);



  const columns = personalLayout(
    handleEvaluacion,
    handleContrato,
    deshabilitarTrabajador,
    handleEdit,
    handleDelete
  );

  return (
    <>

      <Header text={"Trabajadores"} user={"Usuario"} ruta={"/personal"} />

      <Buscador
        abrirModal={setRegistrarPersonal}
        importar={true}
        registrar={true}
        actualizarTrabajadores={getTrabajadores}
      />
      <Tabla columns={columns} table={result} />

      {registrarPersonal && (
        <ModalRegistroPersonal actualizarTabla={getTrabajadores} />
      )}

      {historialEvaluacion && (
        <ModalHistorialEvaluacion
          selected={id}
          actualizarTrabajador={getTrabajadores}
        />
      )}
      {historialContrato && <ModalHistorialContrato selected={id} />}
    </>
  );
};

export default PersonalLayout;
