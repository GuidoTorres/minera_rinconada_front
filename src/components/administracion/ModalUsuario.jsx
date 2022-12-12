import React, { useContext, useState } from "react";
import "./styles/modalUsuario.css";
import { usuarioValues } from "../../data/initalValues";
import { AiOutlineClose } from "react-icons/ai";
import {
  alertaEditarExito,
  alertaError,
  alertaExito,
} from "../../helpers/alertMessage";
import { useEffect } from "react";
import { CrudContext } from "../../context/CrudContext";

const ModalUsuario = ({ actualizarTabla }) => {
  const route = "usuario";

  const { createData, updateData, modal, setModal, setDataToEdit, dataToEdit } =
    useContext(CrudContext);
  const [usuario, setUsuario] = useState(usuarioValues);

  useEffect(() => {
    if (dataToEdit) {
      setUsuario(dataToEdit);
    } else {
      setUsuario(usuarioValues);
    }
  }, [dataToEdit]);

  const handleData = (e) => {
    const { name, value } = e.target;
    setUsuario((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !usuario.nombre ||
      !usuario.usuario ||
      !usuario.contrasenia ||
      !usuario.estado
    ) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(usuario, route);
      alertaExito("Usuario").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }
    if (dataToEdit) {
      updateData(usuario, dataToEdit.id, route);
      alertaEditarExito("Usuario").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }
  };

  function closeModal() {
    setModal(false);
    setDataToEdit(null);
    setUsuario(usuarioValues);
  }
  return (
    <div className="modal-usuario">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar usuario" : "Registrar usuario"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Nombre</label>
                <input
                  value={usuario.nombre}
                  type="text"
                  name="nombre"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Usuario</label>
                <input
                  type="text"
                  name="usuario"
                  onChange={handleData}
                  value={usuario.usuario}
                ></input>
              </div>
              <div>
                <label>Contraseña</label>
                <input
                  type="text"
                  name="contrasenia"
                  onChange={handleData}
                  value={usuario.contrasenia}
                ></input>
              </div>

              <div>
                <label>Estado</label>
                <select
                  name="estado"
                  onChange={handleData}
                  value={!usuario.estado ? -1 : usuario.estado}
                >
                  <option value="-1">Seleccione</option>
                  <option value={false}>Inactivo</option>
                  <option value={true}>Activo</option>
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

export default ModalUsuario;
