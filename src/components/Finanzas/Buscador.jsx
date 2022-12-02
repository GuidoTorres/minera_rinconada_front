import React from "react";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import Export from "react-data-table-component";
import "./styles/buscador.css";

const Buscador = ({ abrirModal, abrirReporte }) => {
  const { setFilterText, filterText, getDataById } = useContext(CrudContext);

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
        {/* <button>Buscar</button> */}
      </div>
      <div>
        <button onClick={() => abrirReporte(true)}>Reportes</button>

        <button onClick={() => abrirModal(true)}>Gráfico</button>
      </div>
    </div>
  );
};

export default Buscador;
