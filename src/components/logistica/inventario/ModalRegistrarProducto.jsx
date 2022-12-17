import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { productoValues } from "../../../data/initalValues";
import { alertaExito } from "../../../helpers/alertMessage";
import DragAndDrop from "../../personal/DragAndDrop";
import TextField from "@mui/material/TextField";
// import { DesktopDatePicker } from '@mui/material/';

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
          {dataToEdit ? "Editar producto" : "Registrar producto"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="grid">
              <section>
                <div>
                  <div>
                    <TextField
                      label="Nombre"
                      variant="outlined"
                      name="nombre"
                      type="text"
                      value={producto.nombre}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                  <div>
                    <TextField
                      className="text"
                      label="Código"
                      variant="outlined"
                      name="codigo"
                      type="text"
                      value={producto.codigo}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <TextField
                      className="text"
                      label="Código interno"
                      variant="outlined"
                      name="codigo_interno"
                      type="text"
                      value={producto.codigo_interno}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                  <div>
                    <TextField
                      className="text"
                      label="Código de barras"
                      variant="outlined"
                      name="codigo_barras"
                      type="text"
                      value={producto.codigo_barras}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <TextField
                      className="text"
                      label="Descripción"
                      variant="outlined"
                      name="descripcion"
                      type="text"
                      value={producto.descripcion}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                  <div>
                    <TextField
                      className="text"
                      label="Categoría"
                      variant="outlined"
                      name="categoria"
                      type="text"
                      value={producto.categoria}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <TextField
                      className="text"
                      label="Unidades"
                      variant="outlined"
                      name="unidad"
                      type="text"
                      value={producto.unidad}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                  <div>
                    <TextField
                      className="text"
                      label="Precio"
                      variant="outlined"
                      name="precio"
                      type="text"
                      value={producto.precio}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    {/* <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    /> */}
                    <TextField
                      className="text"
                      label="Fecha de registro"
                      variant="outlined"
                      name="fecha_registro"
                      type="text"
                      value={producto.fecha_registro}
                      onChange={handleData}
                      size="small"
                    />
                  </div>
                  <div>
                    <TextField
                      className="text"
                      label="Observaciones"
                      variant="outlined"
                      name="observacion"
                      type="text"
                      value={producto.observacion}
                      onChange={handleData}
                      size="small"
                    />
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
