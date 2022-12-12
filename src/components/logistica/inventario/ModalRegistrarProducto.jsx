import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import DragAndDrop from "../../personal/DragAndDrop";
import "../styles/modalProducto.css";

const ModalRegistrarProducto = () => {
  const { dataToEdit, setModal } = useContext(CrudContext);
  const [image, setImage] = useState("");

  const [producto, setProducto] = useState([]);

  const closeModal = () => {
    setModal(false);
    dataToEdit(null);
  };

  const handleSubmit = () => {};

  const handleData = (e) => {
    const { name, value } = e.target;

    setProducto((values) => {
      return { ...values, [name]: value };
    });
  };

  return (
    <div className="modal-producto">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar producto" : "Registrar producto"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Código</label>
                <input
                  value={producto.codigo}
                  type="text"
                  name="codigo"
                  onChange={handleData}
                ></input>
              </div>
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

              <div className="imagen">
                <label>Imagen</label>
                <DragAndDrop
                  avatar={image}
                  setAvatar={setImage}
                  selected={dataToEdit}
                />
              </div>
              <div>
                <button>Guardar</button>
              </div>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistrarProducto;
