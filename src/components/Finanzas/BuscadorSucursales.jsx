import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";

const BuscadorSucursales = ({abrirModal}) => {
    
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
        + Registrar
      </button>
    </div>
  );
};

export default BuscadorSucursales;
