import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { transferenciaHistorial } from "../../../data/dataTable";
import Header from "../../header/Header";
import TablaTransferencia from "../../tabla/TablaTransferencia";
import BuscadorEntradaSalida from "../BuscadorEntradaSalida";
import ModalTransferencia from "./ModalTransferencia";

const TransferenciaLayout = () => {
  const { getData, setData, data, setModal, modal } = useContext(CrudContext);

  const getTransferencia = async () => {
    const route = "transferencia";

    const response = await getData(route);
    setData(response.data);
  };
  useEffect(() => {
    getTransferencia();
  }, []);

  const columns = transferenciaHistorial();
  return (
    <>
      <Header text={"Transferencias"} user={"Usuario"} ruta={"/logistica"} />

      <br />

      <BuscadorEntradaSalida abrirModal={setModal}/>

      <br />
      <br />
      <TablaTransferencia columns={columns} table={data} />

      {modal && <ModalTransferencia/>}
    </>
  );
};

export default TransferenciaLayout;
