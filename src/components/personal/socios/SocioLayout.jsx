import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";

import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import ModalRegistroSocio from "./ModalRegistroSocio";
import { alertaEliminarExito } from "../../../helpers/alertMessage";

const SocioLayout = () => {
  const route = "socio";
  const { setRegistrarSocio, registrarSocio, setDataToEdit } =
    useContext(PersonalContext);
  const { getData, deleteData, data, setData } = useContext(CrudContext);

  const getSocios = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarSocio(true);
  };

  const handleDelete = (e) => {
    alertaEliminarExito("socio").then((res) => {
      if (res.isConfirmed) {
        deleteData(route, e)
          .then((res) => res.json())
          .then((res) => {
            Swal.fire({
              icon: res.status === 200 ? "success" : "error",
              // title: "Error...",
              text: `${res.msg}`,
            });
          });
        getSocios();
      }
    });
  };

  useEffect(() => {
    getSocios();
  }, []);

  const personal = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      id: "nombre",
      name: "Apellidos y nombres",
      selector: (row) => row?.nombre,
      sortable: true,
    },
    {
      id: "dni",
      name: "Dni",
      selector: (row) => row?.dni,
      sortable: true,
    },
    {
      id: "telefono",
      name: "Teléfono",
      sortable: true,

      selector: (row) => row?.telefono,
    },
    {
      id: "cooperativa",
      name: "Cooperativa",
      sortable: true,

      selector: (row) => row?.cooperativa,
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
      <Header text={"Socios"} user={"Usuario"} ruta={"/personal"} />
      <Buscador abrirModal={setRegistrarSocio} registrar={true} />
      <Tabla columns={personal} table={data} />

      {registrarSocio && <ModalRegistroSocio actualizarTabla={getSocios} />}
    </>
  );
};

export default SocioLayout;
