import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { CrudContext } from "../../context/CrudContext";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import ModalUsuario from "./ModalUsuario";
import Header from "../header/Header";
import Tabla from "../tabla/Tabla";
import Swal from "sweetalert2";
import Buscador from "./Buscador";
import { usuario } from "../../data/dataTable";
import useSearch from "../../hooks/useSearch";

const UsuarioLayout = () => {
  const route = "usuario";
  const { registroUsuario, setRegistroUsuario, setDataToEdit } =
    useContext(AdminContext);
  const { getData, deleteData, data, setData } = useContext(CrudContext);

  const { result } = useSearch(data);

  const getUsuarios = async () => {
    const response = await getData(route);
    setData(response.data);
  };
  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistroUsuario(true);
  };

  const handleDelete = (id) => {
    alertaEliminarExito("usuario").then((res) => {
      if (res.isConfirmed) {
        deleteData(id, route);

        Swal.fire(
          "Eliminado!",
          "El usuario se eliminó correctamente.",
          "success"
        );
      }
      getUsuarios();
    });
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const columns = usuario(handleEdit, handleDelete);

  return (
    <div style={{ width: "100%" }}>
      <Header text={"Usuarios"} user={"Usuario"} ruta={"/administracion"} />
      <Buscador abrirModal={setRegistroUsuario} />
      <Tabla columns={columns} table={result} />
      {registroUsuario && <ModalUsuario actualizarTabla={getUsuarios} />}
    </div>
  );
};

export default UsuarioLayout;
