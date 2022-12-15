import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { entradas } from "../../../data/dataTable";
import Tabla from "../../tabla/Tabla";
import BuscadorEntradaSalida from "../BuscadorEntradaSalida";
import "../styles/modalEntradaSalida.css";
import ModalRegistrarEntradaSalida from "./ModalRegistrarEntradaSalida";

const ModalHistorialEntradas = ({ id }) => {
  const { setModal1, setModal2, modal2, tipo, setTipo, getDataById } =
    useContext(CrudContext);
  const [historial, setHistorial] = useState();
  const closeModal = () => {
    setModal1(false);
    setTipo("");
  };

  const getHistorial = async () => {
    const route = `${id}/${tipo}`;
    const route1 = `${id}/${tipo}`;
    const response = await getDataById(route, route1);
    setHistorial(response.data);
  };

  useEffect(() => {
    getHistorial();
  }, []);

  const colums = entradas()

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
            <Tabla columns={colums} table={historial}/>
          </div>
        </div>

        {modal2 && <ModalRegistrarEntradaSalida />}
      </div>
    </>
  );
};

export default ModalHistorialEntradas;
