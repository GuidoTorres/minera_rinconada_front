import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { CrudContext } from "../../context/CrudContext";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import ModalAsignarRol from "./ModalAsignarRol";
import Buscador from "./Buscador";
import Header from "../header/Header";
import Tabla from "../tabla/Tabla";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import Swal from "sweetalert2";
import useSearch from "../../hooks/useSearch";
import { rolLayout } from "../../data/dataTable";

const RolLayout = () => {
  const route = "rol";
  const { asignarUsuario, setAsignarUsuario, setDataToEdit, filterText } =
    useContext(AdminContext);
  const { getData, deleteData, setData, data } = useContext(CrudContext);
  const { result } = useSearch(data);

  const getRoles = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setAsignarUsuario(true);
  };

  const handleDelete = (id) => {
    alertaEliminarExito("rol").then((res) => {
      if (res.isConfirmed) {
        deleteData(id, route);

        Swal.fire("Eliminado!", "Se elimino el rol correctamente.", "success");
      }
      getRoles();
    });
  };

  useEffect(() => {
    getRoles();
  }, []);

  const columns = rolLayout(handleEdit, handleDelete);

  return (
    <>
      <Header text={"Roles"} user={"Usuario"} ruta={"/administracion"} />
      <Buscador abrirModal={setAsignarUsuario} />
      <Tabla columns={columns} table={result} />
      {asignarUsuario && <ModalAsignarRol actualizarTabla={getRoles} />}
    </>
  );
};

export default RolLayout;
