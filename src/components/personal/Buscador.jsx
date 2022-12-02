import React, { useContext, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { PersonalContext } from "../../context/PersonalContext";
import Swal from "sweetalert2";
import { CrudContext } from "../../context/CrudContext";

const Buscador = ({
  abrirModal,
  importar,
  actualizarTrabajadores,
  registrar,
  tipo,
}) => {
  const { render, setFilterText } = useContext(PersonalContext);
  // const {setFilterText} = useContext(CrudContext)
  const inputFileRef = useRef(null);

  const changeHandler = (e) => {
    inputFileRef.current.click();
  };
  const excelFile = (e) => {
    let formData = new FormData();
    formData.append("myFile", e.target.files[0]);

    fetch(`${import.meta.env.VITE_APP_BASE}/trabajador/bulk`, {
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
            text: "Trabajadores registrados con éxito!",
          });
          actualizarTrabajadores();
        }
      });
    inputFileRef.current.value = null;
  };
  return (
    <div className="buscador-container">
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
      <div>
        {importar && (
          <button style={{ marginRight: "10px" }} onClick={changeHandler}>
            Importar Trabajadores
          </button>
        )}
        {registrar ? (
          <button
            style={{ marginRight: "10px" }}
            onClick={() => abrirModal(true)}
          >
            + {render === "Roles o Puestos" ? "Asignar" : "Registrar"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Buscador;
