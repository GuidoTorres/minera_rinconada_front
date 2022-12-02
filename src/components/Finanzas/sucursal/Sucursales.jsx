import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { FinanzasContext } from "../../../context/FinanzasProvider";
import { sucursalValues } from "../../../data/initalValues";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorSucursales from "../BuscadorSucursales";
import { sucursalData } from "../../../data/dataTable";
import ModalRegistrar from "./ModalRegistrar";

const Sucursales = () => {
  const { modal, setModal } = useContext(FinanzasContext);
  const { getData, setData, data, deleteData, dataToEdit, setDataToEdit } =
    useContext(CrudContext);

  const getSucursal = async () => {
    let route = "sucursal";
    let response = await getData(route);
    setData(response.data);
  };

  useEffect(() => {
    getSucursal();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (e) => {
    let route = "sucursal";
    const response = await deleteData(route, e);
    if (response.status !== 200) {
      alertaExito(response.msg, response.status);
    } else {
      alertaExito(response.msg, response.status).then((res) => {
        if (res.isConfirmed) {
          getProveedor();
        }
      });
    }
  };

  const columns = sucursalData(handleEdit, handleDelete);
  return (
    <>
      <Header text={"Sucursales"} user={"Usuario"} ruta={"/finanzas"} />
      <BuscadorSucursales abrirModal={setModal} />
      <Tabla columns={columns} table={data} />

      {modal && <ModalRegistrar actualizarTabla ={getSucursal}/>}
    </>
  );
};

export default Sucursales;
