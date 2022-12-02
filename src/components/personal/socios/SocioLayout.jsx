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
import { socioLayout } from "../../../data/dataTable";
import useSearch from "../../../hooks/useSearch";

const SocioLayout = () => {
  const route = "socio";
  const { setRegistrarSocio, registrarSocio, setDataToEdit } =
    useContext(PersonalContext);
  const { getData, deleteData, data, setData } = useContext(CrudContext);

  const {result} = useSearch(data)

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

  const columns = socioLayout(handleEdit, handleDelete);
  return (
    <>
      <Header text={"Socios"} user={"Usuario"} ruta={"/personal"} />
      <Buscador abrirModal={setRegistrarSocio} registrar={true} />
      <Tabla columns={columns} table={result} />

      {registrarSocio && <ModalRegistroSocio actualizarTabla={getSocios} />}
    </>
  );
};

export default SocioLayout;
