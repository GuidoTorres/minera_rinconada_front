import React from "react";
import { useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { PlanillaContext } from "../../context/PlanillaContext";
import { alertaErrorCrear, alertaExito } from "../../helpers/alertMessage";
import Swal from "sweetalert2";

const Buscador = ({
  abrirModal,
  registrar,
  crear,
  exportar,
  cargar,
  actualizarTabla,
  actualizarAsistencia,
  actualizar,
}) => {
  const { createData, setFilterText } = useContext(CrudContext);
  const { setControlAsistencia } = useContext(PlanillaContext);
  const inputFileRef = useRef(null);

  const handleModal = () => {
    abrirModal(true);
  };

  const crearAsistencia = () => {
    const route = "asistencia";
    const fecha = new Date().toLocaleString().split(",")[0];

    const asistencia = {
      fecha: fecha,
      hora_ingreso: "07:30",
    };

    createData(asistencia, route).then((res) => {
      if (res.status === 200) {
        alertaExito(res.msg, res.status).then((res) => {
          if (res.isConfirmed) {
            actualizarAsistencia();
          }
        });
      }
    });
  };

  const changeHandler = (e) => {
    inputFileRef.current.click();
  };

  const excelFile = (e) => {
    let formData = new FormData();
    formData.append("myFile", e.target.files[0]);
    fetch(`${import.meta.env.VITE_APP_BASE}/asistencia/excel`, {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            // title: "Error...",
            text: "Asistencias registradas con éxito!",
          });
        }
        actualizar();
        actualizarTabla();
        setControlAsistencia(false);
      });
    inputFileRef.current.value = null;
  };

  return (
    <div
      className="buscador-container"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        ref={inputFileRef}
        onChange={excelFile}
        style={{ display: "none" }}
      />
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
            <button style={{ width: "100px" }} onClick={changeHandler}>
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
