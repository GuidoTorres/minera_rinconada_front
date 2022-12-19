import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { productoValues } from "../../../data/initalValues";
import { alertaExito } from "../../../helpers/alertMessage";
import DragAndDrop from "../../personal/DragAndDrop";

import "../styles/modalProducto.css";

const ModalRegistrarProducto = ({ actualizarTabla, id }) => {
  const { dataToEdit, setModal, createData, setDataToEdit, updateData } =
    useContext(CrudContext);
  const [image, setImage] = useState("");

  const productoValue = productoValues(id);

  const [producto, setProducto] = useState(productoValue);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
  };

  useEffect(() => {
    if (dataToEdit !== null) {
      setProducto(dataToEdit);
    } else {
      setProducto(productoValue);
    }
  }, [dataToEdit]);

  const handleSubmit = async (e) => {
    const route = "producto";
    e.preventDefault();
    if (dataToEdit === null) {
      const response = await createData(producto, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    } else {
      const response = await updateData(producto, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;

    setProducto((values) => {
      return { ...values, [name]: value };
    });
  };

  return (
    <div className="modal-registrar-producto">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? (
            <label>Editar producto</label>
          ) : (
            <label>Registrar producto</label>
          )}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="grid">
              <section>
                <div>
                  <div>
                    <label>Nombre</label>
                    <input
                      value={producto.nombre}
                      type="text"
                      name="nombre"
                      onChange={handleData}
                    ></input>
                  </div>
                  <div>
                    <label>Código</label>
                    <input
                      value={producto.codigo}
                      type="text"
                      name="codigo"
                      onChange={handleData}
                    ></input>
                  </div>
                </div>

                <div>
                  <div>
                    <label>Código interno</label>
                    <input
                      type="text"
                      name="codigo_interno"
                      onChange={handleData}
                      value={producto.codigo_interno}
                    ></input>
                  </div>
                  <div>
                    <label>Código de barras</label>
                    <input
                      type="text"
                      name="codigo_barras"
                      onChange={handleData}
                      value={producto.codigo_barras}
                    ></input>
                  </div>
                </div>

                <div>
                  <div>
                    <label>Descripción</label>
                    <input
                      type="text"
                      name="descripcion"
                      onChange={handleData}
                      value={producto.descripcion}
                    ></input>
                  </div>
                  <div>
                    <label>Categoría</label>
                    <input
                      type="text"
                      name="categoria"
                      onChange={handleData}
                      value={producto.categoria}
                    ></input>
                  </div>
                </div>

                <div>
                  <div>
                    <label>Unidades</label>
                    <input
                      type="text"
                      name="unidad"
                      onChange={handleData}
                      value={producto.unidad}
                    ></input>
                  </div>
                  <div>
                    <label>Precio</label>
                    <input
                      type="text"
                      name="precio"
                      onChange={handleData}
                      value={producto.precio}
                    ></input>
                  </div>
                </div>
                <div>
                  <div>
                    <label>Costo total</label>
                    <input
                      type="text"
                      name="fecha"
                      onChange={handleData}
                      value={producto.costo_total}
                    ></input>
                  </div>

                  <div>
                    <label>Fecha de registro</label>
                    <input
                      type="date"
                      name="fecha"
                      onChange={handleData}
                      value={producto.fecha}
                    ></input>
                  </div>
                </div>

                <div>
                  <div>
                    <label>Observaciones</label>
                    <input
                      type="text"
                      name="observacion"
                      onChange={handleData}
                      value={producto.observacion}
                    ></input>
                  </div>
                </div>
              </section>
              <section>
                <div className="imagen">
                  <DragAndDrop
                    avatar={image}
                    setAvatar={setImage}
                    selected={dataToEdit}
                  />
                </div>
              </section>
            </div>
            <div className="button-container">
              <button>Guardar</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistrarProducto;
