import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import {
  entradas,
  productoEntrada,
  productoSalida,
} from "../../../data/dataTable";
import Tabla from "../../tabla/Tabla";
import BuscadorEntradaSalida from "../BuscadorEntradaSalida";
import "../styles/modalEntradaSalida.css";
import ModalRegistrarEntradaSalida from "./ModalRegistrarEntradaSalida";

const ModalHistorialEntradas = ({ id, data }) => {
  const {
    setModal1,
    setModal2,
    modal2,
    tipo,
    setTipo,
    getDataById,

    setDataToEdit,
  } = useContext(CrudContext);
  const [historial, setHistorial] = useState();
  const closeModal = () => {
    setModal1(false);
    setTipo("");
  };

  const getHistorial = async () => {
    const route = `entrada`;
    console.log(tipo);
    const routeId = `${id}?tipo=${tipo}`;
    // const route1 = `${tipo}/${id}`;
    const response = await getDataById(route, routeId);
    setHistorial(response.data);
  };
  useEffect(() => {
    getHistorial();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal2(true);
  };

  const handleDelete = (e) => {};

  const colums1 = productoEntrada(handleEdit, handleDelete);
  const colums2 = productoSalida(handleEdit, handleDelete);

  return (
    <>
      <div className="modal-entrada">
        <div className="overlay">
          <div className="modal-container">
            <section className="modal-header">
              Historial de {tipo}s
              <AiOutlineClose onClick={closeModal} />
            </section>
            <section className="buscador">
              <BuscadorEntradaSalida abrirModal={setModal2} />
            </section>
            <br />
            <br />
            {tipo === "entrada" ? (
              <Tabla columns={colums1} table={historial} />
            ) : (
              <Tabla columns={colums2} table={historial} />
            )}
          </div>
        </div>

        {modal2 && <ModalRegistrarEntradaSalida data={data} almacen_id={id} actualizarTabla={getHistorial}/>}
      </div>
    </>
  );
};

export default ModalHistorialEntradas;
