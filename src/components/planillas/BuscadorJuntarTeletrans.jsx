import React from "react";
import { useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { PlanillaContext } from "../../context/PlanillaContext";
import { alertaErrorCrear, alertaExito } from "../../helpers/alertMessage";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";

const BuscadorJuntarTeletrans = ({ registrar }) => {
  const { pagarVarios, setPagarVarios, multiplesTeletrans } =
    useContext(PlanillaContext);
  const [sumar, setSumar] = useState(0);
  const { setFilterText } = useContext(CrudContext);
  const handleModal = () => {
    setPagarVarios(true);
  };

  useEffect(() => {
    const sumarSaldos =
      multiplesTeletrans.length > 0 &&
      multiplesTeletrans
        .map((item) => item.saldo % 4)
        .reduce((partialSum, a) => partialSum + a, 0);
    setSumar(sumarSaldos);
  }, [multiplesTeletrans]);
  return (
    <div
      className="buscador-container"
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "-30px",
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
          {registrar !== false &&
          multiplesTeletrans.length > 1 &&
          sumar === 4 ? (
            <button onClick={handleModal} style={{ width: "150px" }}>
              Pagar 
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscadorJuntarTeletrans;
