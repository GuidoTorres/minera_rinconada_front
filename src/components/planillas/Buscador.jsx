import React from "react";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { PlanillaContext } from "../../context/PlanillaContext";

const Buscador = ({
  abrirModal,
  registrar,
  crear,
  exportar,
  cargar,
  actualizarTabla,
}) => {
  const { createData } = useContext(CrudContext);
  const { campamentoAsistencia } = useContext(PlanillaContext);

  const handleModal = () => {
    abrirModal(true);
  };

  const crearAsistencia = () => {
    const route = "asistencia";
    const fecha = new Date().toLocaleString().split(",")[0];

    const asistencia = {
      fecha: fecha,
      // campamento_id: campamentoAsistencia.id,
    };

    createData(asistencia, route).then((res) => {
      if (res.status === 200) {
        actualizarTabla();
      }
    });
  };

  return (
    <div
      className="buscador-container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <span>
        <input
          type="text"
          name=""
          id=""
          //   onChange={(e) => setFilterText(e.target.value)}
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
            <button onClick={handleModal} style={{ width: "100px" }}>
              Registrar
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          {exportar !== false ? (
            <button onClick={handleModal} style={{ width: "100px" }}>
              Exportar{" "}
            </button>
          ) : (
            ""
          )}
          {crear !== false ? (
            <button onClick={crearAsistencia} style={{ width: "100px" }}>
              Crear
            </button>
          ) : (
            ""
          )}
          {cargar !== false ? (
            <button onClick={crearAsistencia} style={{ width: "100px" }}>
              Cargar
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Buscador;
