import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import {
  alertaError,
  alertaExito,
  alertaEditarExito,
} from "../../../helpers/alertMessage";
import "../styles/modalRegistroSocio.css";

const ModalRegistroSocio = ({ actualizarTabla }) => {
  const route = "socio";
  const socioValues = {
    nombre: "",
    dni: "",
    telefono: "",
    cooperativa: "",
  };

  const [socio, setSocio] = useState(socioValues);
  const { createData, updateData } = useContext(CrudContext);
  const { setRegistrarSocio, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);

  const closeModal = () => {
    setRegistrarSocio(false);
    setDataToEdit(null);
    setSocio(socioValues);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setSocio((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!socio.nombre) {
      alertaError();
    } else if (dataToEdit === null) {
      const response = await createData(socio, route);
      
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }

    if (dataToEdit) {
      const response = await updateData(socio, dataToEdit.id, route);
      console.log(response);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }
  };

  useEffect(() => {
    if (dataToEdit) {
      setSocio(dataToEdit);
    } else {
      setSocio(socioValues);
    }
  }, [dataToEdit]);

  return (
    <div className="modal-socio">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar socio" : "Registrar socio"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Apellidos y nombres</label>
                <input
                  type="text"
                  name="nombre"
                  value={socio?.nombre}
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Dni</label>
                <input
                  type="number"
                  name="dni"
                  value={socio?.dni}
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Tel??fono</label>
                <input
                  type="number"
                  name="telefono"
                  value={socio?.telefono}
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Cooperativa</label>
                <select
                  name="cooperativa"
                  value={socio?.cooperativa}
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  <option value="Cerro San Francisco">
                    Cerro San Francisco
                  </option>
                  <option value="Lunar de Oro">Lunar de Oro</option>
                  <option value="Lunar de Oro">San Francisco</option>
                </select>
              </div>
              <div>
                <button>{dataToEdit ? "Editar" : "Registrar"}</button>
              </div>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistroSocio;
