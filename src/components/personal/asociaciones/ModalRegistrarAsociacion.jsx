import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import {
  alertaError,
  alertaExito,
  alertaEditarExito,
} from "../../../helpers/alertMessage";
import "../styles/modalAsociacion.css";

const ModalRegistrarAsociacion = ({ actualizarTabla, selected }) => {
  const route = "asociacion";
  const asociacionValues = {
    nombre: "",
    codigo: "",
  };
  const [asociacion, setAsociacion] = useState(asociacionValues);
  const { setRegistrarAsociacion, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);
  const { createData, updateData } = useContext(CrudContext);

  useEffect(() => {
    if (dataToEdit) {
      setAsociacion(dataToEdit);
    } else {
      setAsociacion(asociacionValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setRegistrarAsociacion(false);
    setDataToEdit(null);
    setAsociacion(asociacionValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!asociacion.nombre || !asociacion.codigo) {
      alertaError();
    } else if (dataToEdit === null) {
      const response = await createData(asociacion, route);

      if (response.status === 200) {
        alertaExito(response.msg, response.status).then((res) => {
          closeModal();
          if (res.isConfirmed) {
            actualizarTabla();
          }
        });
      }
    }

    if (dataToEdit) {
      const response = await updateData(asociacion, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status).then((res) => {
          closeModal();
          if (res.isConfirmed) {
            actualizarTabla();
          }
        });
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setAsociacion((values) => {
      return { ...values, [name]: value };
    });
  };

  return (
    <div className="modal-asociacion">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar asociación" : "Registrar asociación"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Nombre Asociación</label>
                <input
                  type="text"
                  name="nombre"
                  value={asociacion?.nombre}
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Código Asociación</label>
                <input
                  type="text"
                  name="codigo"
                  value={asociacion?.codigo}
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Tipo de Asociación</label>
                <select
                  name="tipo"
                  onChange={handleData}
                  value={asociacion?.tipo}
                >
                  <option value="-1">Seleccione</option>

                  <option value="Canteadores">Canteadores</option>
                  <option value="Inspectores">Inspectores</option>
                  <option value="Vigilantes">Vigilantes</option>
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

export default ModalRegistrarAsociacion;
