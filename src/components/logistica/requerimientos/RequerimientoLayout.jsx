import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import {
  pedidoLayout,
  requerimientoLayout,
  requerimientoTable,
} from "../../../data/dataTable";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import TablaExpandibleTransferencia from "../../tabla/TablaExpandibleTransferencia";
import TablaRequerimientos from "../../tabla/TablaRequerimientos";
import BuscadorRequerimiento from "../BuscadorRequerimiento";
import ModalRequerimiento from "../inventario/ModalRequerimiento";

const RequerimientoLayout = () => {
  const {
    getData,
    data,
    setData,
    dataToEdit,
    setDataToEdit,
    modal,
    setModal,
    deleteData,
    multipleRequerimientos,
    setMultipleRequerimientos,
  } = useContext(CrudContext);

  const [requerimientos, setRequerimientos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [json, setJson] = useState([]);

  const getRequerimiento = async () => {
    const route = "requerimiento";
    const route1 = "pedido";
    const response = await getData(route);
    const response1 = await getData(route1);
    setData(response.data);
    setPedido(response1.data);
  };

  useEffect(() => {
    if (requerimientos.length > 0) {
      let obj = {
        fecha: new Date().toLocaleString("es").split(",")[0],
        estado: "Pendiente",
        req_id: requerimientos.map((item) => item.id),
      };

      setMultipleRequerimientos(obj);
    }
  }, [requerimientos]);

  useEffect(() => {
    getRequerimiento();
  }, []);

  const handleDelete = (e) => {
    console.log(e);
  }

  const columns = requerimientoLayout(handleDelete);
  const pedidoColumns = pedidoLayout();

  return (
    <>
      <Header text={"Requerimientos"} user={"Usuario"} ruta={"/logistica"} />
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <label htmlFor="" style={{marginLeft: "20px"}}><strong>Requerimientos</strong> </label>
          <BuscadorRequerimiento generar={true} data={requerimientos} />
          <br />
          <br />
          <TablaRequerimientos
            columns={columns}
            table={data}
            set={setRequerimientos}
          />
        </div>
        <div style={{ flex: "1" }}>
        <label htmlFor="" style={{marginLeft: "20px"}}><strong>Pedidos</strong></label>

          <BuscadorRequerimiento generar={false} />
          <br />
          <br />
          <TablaExpandibleTransferencia
            columns={pedidoColumns}
            table={pedido}
          />
        </div>
      </div>

      {modal && <ModalRequerimiento />}
    </>
  );
};

export default RequerimientoLayout;
