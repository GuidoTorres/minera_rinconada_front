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

const UsuarioLayout = () => {
  const route = "usuario";
  const { registroUsuario, setRegistroUsuario, setDataToEdit, filterText } =
    useContext(AdminContext);
  const { getData, deleteData, data, setData } = useContext(CrudContext);
  const [search, setSearch] = useState([]);

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

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        item.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
        item.usuario.toLowerCase().includes(filterText.toLowerCase())
    );
    setSearch(filteredData);
  }, [filterText, data]);

  const usuario = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      id: "Nombre",
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      id: "Usuario",
      name: "Usuario",
      selector: (row) => row.usuario,
      sortable: true,
    },
    {
      id: "Contraseña",
      name: "Contraseña",
      selector: (row) => row.contrasenia,
      sortable: true,
      reorder: true,
    },
    {
      id: "Estado",
      name: "Estado",
      selector: (row) => (!row.estado ? "Inactivo" : "Activo"),
      sortable: true,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div
          style={{
            display: "flex",
            width: "40px",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Header text={"Usuarios"} user={"Usuario"} ruta={"/administracion"} />
      <Buscador abrirModal={setRegistroUsuario} />
      <Tabla columns={usuario} table={search} />
      {registroUsuario && <ModalUsuario actualizarTabla={getUsuarios} />}
    </div>
  );
};

export default UsuarioLayout;
