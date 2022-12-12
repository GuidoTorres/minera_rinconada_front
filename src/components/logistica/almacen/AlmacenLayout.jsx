import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { almacen } from "../../../data/dataTable";
import { alertaExito } from "../../../helpers/alertMessage";
import Buscador from "../../administracion/Buscador";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import ModalRegistrarAlmacen from "./ModalRegistrarAlmacen";

const AlmacenLayout = () => {
  const { getData, data, setData, dataToEdit, setDataToEdit, modal ,setModal, deleteData } =
    useContext(CrudContext);

  const getAlmacenes = async () => {
    const route = "almacen";
    const response = await getData(route);
    setData(response.data);
  };

  useEffect(() => {
    getAlmacenes();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true)
  };
  const handleDelete = async(e) => {

    const route = "almacen"
    const response = await deleteData(route, e);
    if (response.status !== 200) {
      alertaExito(response.msg, response.status);
    } else {
      alertaExito(response.msg, response.status).then((res) => {
        if (res.isConfirmed) {
          getAlmacenes();
        }
      });
    }

  };

  const columns = almacen(handleEdit, handleDelete);
  return (
    <>
      <Header text={"Almacenes"} user={"Usuario"} ruta={"/administracion"} />
      <Buscador abrirModal={setModal}/>
      <Tabla columns={columns} table={data} />

      {modal && <ModalRegistrarAlmacen actualizarTabla={getAlmacenes}/>}
    </>
  );
};

export default AlmacenLayout;
