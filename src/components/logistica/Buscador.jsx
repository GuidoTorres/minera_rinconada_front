import React from "react";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";

const Buscador = ({ abrirModal, abrirEntrada, abrirSalida }) => {
  const { setFilterText, filterText, getDataById, setTipo } =
    useContext(CrudContext);

  return (
    <div className="buscador-finanzas">
      <div>
        <span>
          <input
            type="text"
            name=""
            onChange={(e) => setFilterText(e.target.value)}
          />
          <AiOutlineSearch className="icon" />
        </span>
      </div>
      <div>
        <button onClick={() => abrirModal(true)}>Registrar</button>
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
      </div>
    </div>
  );
};

export default Buscador;
