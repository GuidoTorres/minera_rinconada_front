import React from "react";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorSucursales from "../BuscadorSucursales";
import { proveedor } from "../../../data/dataTable";
import { useContext } from "react";
import { FinanzasContext } from "../../../context/FinanzasProvider";
import ModalRegistrar from "./ModalRegistrar";
import { CrudContext } from "../../../context/CrudContext";
import { useEffect } from "react";
import { alertaExito } from "../../../helpers/alertMessage";

const Proveedores = () => {
  const { modal, setModal } = useContext(FinanzasContext);
  const { getData, setData, data, deleteData, setDataToEdit } =
    useContext(CrudContext);

  const getProveedor = async () => {
    let route = "proveedor";
    const response = await getData(route);

    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (e) => {
    let route = "proveedor";
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

  useEffect(() => {
    getProveedor();
  }, []);

  const columns = proveedor(handleEdit, handleDelete);

  return (
    <>
      <Header text={"Proveedores"} user={"Usuario"} ruta={"/finanzas"} />
      <BuscadorSucursales abrirModal={setModal} />
      <Tabla columns={columns} table={data} />

      {modal && <ModalRegistrar actualizarTabla={getProveedor} />}
    </>
  );
};

export default Proveedores;
