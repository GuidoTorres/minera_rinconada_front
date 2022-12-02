import React from "react";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import { CrudContext } from "../../context/CrudContext";

const BuscadorContrato = ({
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
        {registrar &&
        data?.fiscalizador === "si" &&
        data?.control === "si" &&
        data?.topico === "si" &&
        data?.seguridad === "si" &&
        data?.medio_ambiente === "si" &&
        data?.recursos_humanos === "si" ? (
          <button
            style={{ marginRight: "10px" }}
            onClick={() => abrirModal(true)}
          >
            + Registrar
          </button>
        ) : (
          ""
        )}

        {registrar &&
        data?.fiscalizador === "si" &&
        data?.control === "si" &&
        data?.topico === "si" &&
        data?.seguridad === "si" &&
        data?.medio_ambiente === "si" &&
        data?.recursos_humanos === "si" &&
        data?.evaluacion_finalizado ? (
          <button
            style={{ marginRight: "10px" }}
            onClick={() => abrirModal(true)}
          >
            + Registrar
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BuscadorContrato;
