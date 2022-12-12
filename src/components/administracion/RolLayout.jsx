import React, { useContext, useEffect, useState } from "react";
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

  const { getData, deleteData, setData, data, modal, setModal, setDataToEdit } =
    useContext(CrudContext);
  const { result } = useSearch(data);

  const getRoles = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = (id) => {
    alertaEliminarExito("rol").then((res) => {
      if (res.isConfirmed) {
        deleteData(route, id);

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
      <Buscador abrirModal={setModal} />
      <Tabla columns={columns} table={result} />
      {modal && <ModalAsignarRol actualizarTabla={getRoles} />}
    </>
  );
};

export default RolLayout;
