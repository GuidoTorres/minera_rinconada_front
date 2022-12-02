import React from "react";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import { CrudContext } from "../../context/CrudContext";

const BuscadorEvaluacion = ({
  abrirModal,
  actualizarTrabajadores,
  registrar,
  data,
}) => {

  const {setFilterText} = useContext(CrudContext)

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
        {(registrar && data?.evaluacion_finalizada == "false") ||
        data?.evaluacion_finalizada === false ? (
          ""
        ) : (
          <button
            style={{ marginRight: "10px" }}
            onClick={() => abrirModal(true)}
          >
            + Registrar
          </button>
        )}
      </div>
    </div>
  );
};

export default BuscadorEvaluacion;
