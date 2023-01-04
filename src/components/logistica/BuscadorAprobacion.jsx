import React from "react";
import { useContext } from "react";
import {  AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";

const BuscadorAprobacion = ({}) => {
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

    </div>
  );
};

export default BuscadorAprobacion;
