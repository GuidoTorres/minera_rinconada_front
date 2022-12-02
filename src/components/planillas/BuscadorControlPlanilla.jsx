import React from "react";
import { useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { PlanillaContext } from "../../context/PlanillaContext";
import { alertaErrorCrear, alertaExito } from "../../helpers/alertMessage";
import Swal from "sweetalert2";

const BuscadorControlPlanilla = ({ abrirModal, registrar }) => {

  const {setJuntarTeletrans} = useContext(PlanillaContext)
  const {setFilterText} = useContext(CrudContext)
  const handleModal = () => {
    setJuntarTeletrans(true);
  };
  return (
    <div
      className="buscador-container"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setFilterText(e.target.value)}
        />
        <AiOutlineSearch className="icon" />
      </span>
      <div
        style={{
          height: "50px",
          display: "flex",
          alignItems: "flex-end",
          gap: "5px",
        }}
      >
        <div>
          {registrar !== false ? (
            <button onClick={handleModal} style={{ width: "150px" }}>
              Juntar teletrans
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscadorControlPlanilla;
