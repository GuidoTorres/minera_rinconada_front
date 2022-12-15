import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { entradas } from "../../../data/dataTable";
import { entradaSalidaValues } from "../../../data/initalValues";
import { alertaExito } from "../../../helpers/alertMessage";
import Tabla from "../../tabla/Tabla";
import "../styles/modalRegistrarEntrada.css";

const ModalRegistrarEntradaSalida = () => {
  const { dataToEdit, setModal2, tipo, setDataToEdit, createData, updateData } =
    useContext(CrudContext);
  const [entrada, setEntrada] = useState(entradaSalidaValues);

  const closeModal = () => {
    setModal2(false);
    setDataToEdit(null);
  };

  useEffect(() => {
    if (dataToEdit !== null) {
      setEntrada(dataToEdit);
    } else {
      setEntrada(entradaSalidaValues);
    }
  }, [dataToEdit]);

  const handleSubmit = async (e) => {
    let route = "entrada";
    e.preventDefault();
    if (dataToEdit === null) {
      const response = await createData(entrada, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    } else {
      const response = await updateData(entrada, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setEntrada((values) => {
      return { ...values, [name]: value };
    });
  };

  const columns = entradas();

  return (
    <div className="modal-producto">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? `Editar ${tipo}` : `Registrar ${tipo}`}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Código</label>
                <input
                  // value={entrada.codigo}
                  type="text"
                  name="codigo"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Motivo de {tipo}</label>
                <input
                  // value={entrada.codigo}
                  type="text"
                  name="motivo"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Fecha de {tipo}</label>
                <input
                  type="date"
                  name="fecha"
                  onChange={handleData}
                  // value={entrada.fecha}
                ></input>
              </div>
            </section>

            <section>
              <div>
                <label>Encargado</label>
                <input
                  type="text"
                  name="encargado"
                  onChange={handleData}
                  // value={entrada.encargado}
                ></input>
              </div>
              <div>
                <label>Código orden de compra</label>
                <input
                  type="text"
                  name="descripcion"
                  onChange={handleData}
                  // value={entrada.orden_compra}
                ></input>
              </div>
            </section>

            <section>
              <div className="productos">
                <div>
                  <label>Productos</label>
                  <input
                    type="text"
                    name="productos"
                    //   onChange={handleData}
                    // value={entrada.producto}
                  ></input>
                </div>
                {tipo === "entrada" ? (
                  <div>
                    <button>+</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label>Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  onChange={handleData}
                  // value={entrada.categoria}
                ></input>
              </div>
              <div>
                <label>Cantidad</label>
                <input
                  type="text"
                  name="cantidad"
                  onChange={handleData}
                  // value={entrada.cantidad}
                ></input>
              </div>
              <div>
                <label>Unidades</label>
                <input
                  type="text"
                  name="cantidad"
                  onChange={handleData}
                  // value={entrada.unidad}
                ></input>
              </div>
            </section>

            <Tabla columns={columns} />

            <div className="button-container">
              <button>Guardar</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistrarEntradaSalida;
