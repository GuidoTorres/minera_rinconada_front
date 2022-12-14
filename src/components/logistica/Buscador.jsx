import React from "react";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import "./styles/buscador.css"

const Buscador = ({ abrirModal, abrirEntrada, abrirSalida, abrirRequerimiento }) => {
  const { setFilterText, filterText, getDataById, setTipo } =
    useContext(CrudContext);

  return (
    <div className="buscador-inventario">
      <div className="buscador">
        <span>
          <input
            type="text"
            name=""
            onChange={(e) => setFilterText(e.target.value)}
          />
          <AiOutlineSearch className="icon" />
        </span>
      </div>
      <div className="button-container">
        <button onClick={() => abrirModal(true)}>Registrar producto</button>
        <button
          onClick={() => {
            abrirEntrada(true), setTipo("entrada");
          }}
        >
          Entradas
        </button>
        <button
          onClick={() => {
            abrirSalida(true), setTipo("salida");
          }}
        >
          Salidas
        </button>
        <button
          onClick={() => {
            abrirRequerimiento(true);
          }}
        >
          Requerimiento
        </button>
      </div>
    </div>
  );
};

export default Buscador;
