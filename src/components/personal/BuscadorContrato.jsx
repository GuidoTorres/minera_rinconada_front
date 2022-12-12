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
  const { setFilterText } = useContext(CrudContext);
  const noFinalizado = data?.contrato?.filter(
    (item) => item.finalizado === false
  );
  const finalizado = data?.contrato?.filter((item) => item.finalizado === true);

  console.log(registrar);
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
        {data?.fiscalizador === "si" &&
        data?.control === "si" &&
        data?.topico === "si" &&
        data?.seguridad === "si" &&
        data?.medio_ambiente === "si" &&
        data?.recursos_humanos === "si" &&
        noFinalizado.length === 0 ? (
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
