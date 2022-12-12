import React, { useContext } from "react";
import { useEffect } from "react";
import { CrudContext } from "../../../context/CrudContext";
import {  inventario } from "../../../data/dataTable";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import ModalRegistrarProducto from "./ModalRegistrarProducto";
import "../styles/inventarioLayout.css";
import ModalHistorialEntradas from "./ModalHistorialEntradas";
import { useState } from "react";

const InventarioLayout = () => {
  const {
    getData,
    setData,
    data,
    data1, setData1,
    modal,
    setModal,
    setDataToEdit,
    modal1,
    setModal1,
    getDataById
  } = useContext(CrudContext);

  const [almacen_id, setAlmacen_id] = useState("")

  const getAlmacen = async () => {
    const response = await getData("almacen");
    setData(response.data);
  };

  const getProductoAlmacen = async () => {
    const response = await getDataById("almacen/producto", almacen_id)
    setData1(response.data);

  }

  useEffect(() =>{

    getProductoAlmacen()

  },[almacen_id])

  useEffect(() => {
    getAlmacen();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
  };
  const handleDelete = () => {};

  const columns = inventario(handleEdit, handleDelete);

  return (
    <>
      <Header text={"Inventario"} user={"Usuario"} ruta={"/logistica"} />

      <div className="selector">
        <select name="almacen" onChange={e => setAlmacen_id(e.target.value)}>
          <option value="-1" >Seleccione</option>
          {data.map((item, i) => (
            <option key={i} value={item.id}>
              {item.nombre}
            </option>
          ))}
        </select>
      </div>
      <Buscador abrirModal={setModal} abrirEntrada={setModal1} />
      <br />
      <br />
      <Tabla columns={columns} table={data1}/>

      {modal && <ModalRegistrarProducto />}
      {modal1 && <ModalHistorialEntradas />}
    </>
  );
};

export default InventarioLayout;
