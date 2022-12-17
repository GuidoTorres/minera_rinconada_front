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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
                <TextField
                  label="Código"
                  variant="outlined"
                  name="codigo"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label={`Motivo de ${tipo}`}
                  variant="outlined"
                  name="motivo"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label={`Fecha de ${tipo}`}
                  variant="outlined"
                  name="fecha"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
            </section>

            <section>
              <div>
                <TextField
                  label="Encargado"
                  variant="outlined"
                  name="encargado"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Código orden de compra"
                  variant="outlined"
                  name="codigo"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Boleta/factura"
                  variant="outlined"
                  name="boleta"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Código de requerimiento"
                  variant="outlined"
                  name="codigo_requerimiento"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
            </section>

            <section>
              <div className="productos">
                <div>
                  <TextField
                    label="Productos"
                    variant="outlined"
                    name="producto"
                    type="text"
                    onChange={handleData}
                    size="small"
                  />
                </div>
                {tipo === "entrada" ? (
                  <div>
                    <Button variant="outlined">+</Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <TextField
                  label="Categoría"
                  variant="outlined"
                  name="categoria"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Cantidad"
                  variant="outlined"
                  name="cantidad"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Unidades"
                  variant="outlined"
                  name="unidad"
                  type="text"
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <Button variant="outlined">+</Button>
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
