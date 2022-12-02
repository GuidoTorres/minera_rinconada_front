import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { FinanzasContext } from "../../../context/FinanzasProvider";
import { proveedorValues } from "../../../data/initalValues";
import { alertaExito } from "../../../helpers/alertMessage";
import "../styles/modalProveedor.css"

const ModalRegistrar = ({ actualizarTabla }) => {
  const { modal, setModal } = useContext(FinanzasContext);
  const { createData, setData1, data1, dataToEdit, setDataToEdit, updateData } =
    useContext(CrudContext);
  const [proveedor, setProveedor] = useState(proveedorValues);

  useEffect(() => {
    if (dataToEdit !== null) {
      setProveedor(dataToEdit);
    } else {
      setProveedor(proveedorValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setProveedor((values) => {
      return { ...values, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    let route = "proveedor";
    e.preventDefault();
    if (dataToEdit === null) {
      const response = await createData(proveedor, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    } else {
      const response = await updateData(proveedor, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }
  };
  return (
    <div className="modal-proveedor" >
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar proveedor" : "Registrar proveedor"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Nombre</label>
                <input
                  value={proveedor.nombre}
                  type="text"
                  name="nombre"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Dni o Ruc</label>
                <input
                  value={proveedor.dni}
                  type="text"
                  name="dni"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Dirección</label>
                <input
                  value={proveedor.direccion}
                  type="text"
                  name="direccion"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Télefono</label>
                <input
                  value={proveedor.telefono}
                  type="text"
                  name="telefono"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Descripción</label>
                <input
                  value={proveedor.descripcion}
                  type="text"
                  name="descripcion"
                  onChange={handleData}
                ></input>
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

export default ModalRegistrar;
