import React, { useContext, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { PersonalContext } from "../../context/PersonalContext";

const Buscador = ({ abrirModal, importar, registrar, data, registrar2 }) => {
  const { render, setFilterText } = useContext(PersonalContext);
  const [finalizado, setFinalizado] = useState();
  const inputFileRef = useRef(null);

  useEffect(() => {
    checkIsEnd();
  }, []);

  console.log(data);

  const checkIsEnd = () => {
    let estado = [];
    estado = data?.estado?.includes(false);

    if (estado) {
      setFinalizado(false);
    } else {
      setFinalizado(true);
    }
  };

  const changeHandler = (e) => {
    inputFileRef.current.click();
  };
  const excelFile = (e) => {
    let formData = new FormData();
    formData.append("myFile", e.target.files[0]);

    fetch(`http://localhost:3000/api/v1/trabajador/bulk`, {
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
          getAsociaciones();
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
        {finalizado && registrar2 ? (
          <button
            style={{ marginRight: "10px" }}
            onClick={() => abrirModal(true)}
          >
            + {render === "Roles o Puestos" ? "Asignar" : "Registrar"}
          </button>
        ) : (
          ""
        )}
        {registrar && (
          <button
            style={{ marginRight: "10px" }}
            onClick={() => abrirModal(true)}
          >
            + {render === "Roles o Puestos" ? "Asignar" : "Registrar"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Buscador;
