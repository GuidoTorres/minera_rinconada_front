import React from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import Tabla from "../../tabla/Tabla";
import BuscadorEntradaSalida from "../BuscadorEntradaSalida";
import "../styles/modalEntradaSalida.css"

const ModalHistorialEntradas = () => {
  const { setModal1 } = useContext(CrudContext);

  const closeModal = () => {
    setModal1(false);
  };

  return (
    <>
      <div className="modal-entrada">
        <div className="overlay">
          <div className="modal-container">
            <section className="modal-header">
              Historial de entradas
              <AiOutlineClose onClick={closeModal} />
            </section>
            <section className="buscador">
              <BuscadorEntradaSalida />
            </section>
            <Tabla />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalHistorialEntradas;
