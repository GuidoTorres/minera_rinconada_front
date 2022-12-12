import React from "react";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";

const BuscadorEntradaSalida = ({ abrirModal }) => {
  const { setFilterText } = useContext(CrudContext);

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
      </div>
    </div>
  );
};

export default BuscadorEntradaSalida;
