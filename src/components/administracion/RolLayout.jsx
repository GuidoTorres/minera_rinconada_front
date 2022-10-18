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

const RolLayout = () => {
  const route = "rol";
  const { asignarUsuario, setAsignarUsuario, setDataToEdit, filterText } =
    useContext(AdminContext);
  const { getData, deleteData, setData, data } = useContext(CrudContext);
  const [search, setSearch] = useState([]);

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

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        item.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
        item.usuario.toLowerCase().includes(filterText.toLowerCase()) ||
        item.cargo.toLowerCase().includes(filterText.toLowerCase()) ||
        item.rol.toLowerCase().includes(filterText.toLowerCase())
    );
    setSearch(filteredData);
  }, [filterText, data]);

  const rol = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row.id,
    },
    {
      id: "Nombre",
      name: "Nombre",
      selector: (row) => row.nombre,
    },
    {
      id: "Usuario",
      name: "Usuario",
      selector: (row) => row.usuario,
    },
    {
      id: "Puesto",
      name: "Puesto",
      selector: (row) => row.cargo,
    },
    {
      id: "Rol",
      name: "Rol",
      selector: (row) => row.rol,
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
      <Header text={"Roles"} user={"Usuario"} ruta={"/administracion"}/>
      <Buscador abrirModal={setAsignarUsuario} />
      <Tabla columns={rol} table={search} />
      {asignarUsuario && <ModalAsignarRol actualizarTabla={getRoles}/>}
    </>
  );
};

export default RolLayout;
