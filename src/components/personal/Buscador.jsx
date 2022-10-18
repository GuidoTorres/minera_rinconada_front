import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { PersonalContext } from "../../context/PersonalContext";

const Buscador = ({abrirModal}) => {
  const { render, setFilterText } = useContext(PersonalContext);

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
        + {render === "Roles o Puestos" ? "Asignar" : "Registrar"}
      </button>
    </div>
  );
};

export default Buscador;
