import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { PersonalContext } from "../../context/PersonalContext";

const Buscador = ({ abrirModal, importar, registrar }) => {
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
      <div>
        {importar && (
          <button style={{ marginRight: "10px" }}>Importar Trabajadores</button>
        )}
        {registrar && (
          <button
            style={{ marginRight: "10px" }}
            onClick={() => abrirModal(true)}
          >
            + {render === "Roles o Puestos" ? "Asignar" : "Registrar"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Buscador;
