import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./styles/buscador.css";
import { CrudContext } from "../../context/CrudContext";

const Buscador = ({ abrirModal }) => {
  const { setFilterText } = useContext(CrudContext);

  return (
    <div className="buscador-container">
      <span>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setFilterText(e.target.value)}
        />
        <AiOutlineSearch className="icon" />
      </span>
      <button onClick={() => abrirModal(true)}>
        +  Registrar
      </button>
    </div>
  );
};

export default Buscador;
