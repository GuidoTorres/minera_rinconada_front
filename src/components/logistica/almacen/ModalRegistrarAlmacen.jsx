import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { almacenValues } from "../../../data/initalValues";
import { AiOutlineClose } from "react-icons/ai";
import { alertaExito } from "../../../helpers/alertMessage";
import "../styles/modalRegistrarAlmacen.css"

const ModalRegistrarAlmacen = ({ actualizarTabla }) => {
  const [almacen, setAlmacen] = useState(almacenValues);
  const { dataToEdit, createData, updateData, setModal, setDataToEdit } =
    useContext(CrudContext);

  useEffect(() => {
    if (dataToEdit !== null) {
      setAlmacen(dataToEdit);
    } else {
      setAlmacen(almacenValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
  };

  const handleSubmit = async (e) => {
    let route = "almacen";
    e.preventDefault();
    if (dataToEdit === null) {
      const response = await createData(almacen, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    } else {
      const response = await updateData(almacen, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setAlmacen((values) => {
      return { ...values, [name]: value };
    });
  };

  return (
    <div className="modal-almacen">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar almacén" : "Registrar almacén"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section className="almacen-form">
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Nombre</label>
                <input
                  value={almacen.nombre}
                  type="text"
                  name="nombre"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Código</label>
                <input
                  type="text"
                  name="codigo"
                  onChange={handleData}
                  value={almacen.codigo}
                ></input>
              </div>
              <div>
                <label>Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  onChange={handleData}
                  value={almacen.descripcion}
                ></input>
              </div>
              <div className="button-container">
                <button>{dataToEdit ? "Editar" : "Registrar"}</button>
              </div>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistrarAlmacen;
