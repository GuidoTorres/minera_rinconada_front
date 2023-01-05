import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { aprobacionLayout } from "../../../data/dataTable";
import { alertaExito } from "../../../helpers/alertMessage";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorAprobacion from "../BuscadorAprobacion";

const AprobacionLayout = () => {
  const { getData, updateData } = useContext(CrudContext);
  const [data, setData] = useState([]);
  const [dataAprobacion, setDataAprobacion] = useState();

  const getAprobacion = async () => {
    const response = await getData("pedido");
    setData(response.data);
  };
  useEffect(() => {
    getAprobacion();
  }, []);

  useEffect(() => {
    if (dataAprobacion !== undefined) {
      getAprobacion();
      const aprobacionPrueba = data.filter(
        (item) => item.id === dataAprobacion.id
      );
      const aprobacionLength = aprobacionPrueba.filter(
        (item) =>
          item.aprobacion1 === true &&
          item.aprobacion2 === true &&
          item.aprobacion3 === true
      );
      console.log(aprobacionLength);
      console.log(data);

      if (aprobacionLength.length !== 0) {
        
        const info = {
          estado: true,
        };
        updateEstado(dataAprobacion, info);
      }else{
        const info = {
          estado: false,
        };
        updateEstado(dataAprobacion, info);

      }

    }
  }, [dataAprobacion]);

  const updateEstado = async (dataAprobacion, info) => {
    const route = "pedido";

    const response = await updateData(info, dataAprobacion.id, route);
    if (response.status === 200) {
      getAprobacion();
    }
  };

  const updateAprobacion = async (e, i) => {
    const route = "pedido";
    setDataAprobacion(i);
    const info = {
      [e.target.name]: e.target.checked,
    };
    const response = await updateData(info, i.id, route);
    if (response.status === 200) {
      getAprobacion();
    }
  };

  const handleDelete = () => {};

  const columns = aprobacionLayout(updateAprobacion, handleDelete);

  return (
    <>
      <Header text={"Aprobaciones"} user={"Usuario"} ruta={"/logistica"} />
      <br />
      <br />

      <BuscadorAprobacion />
      <br />
      <br />

      <Tabla columns={columns} table={data} />
    </>
  );
};

export default AprobacionLayout;
