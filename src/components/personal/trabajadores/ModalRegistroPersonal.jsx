import React, { useContext, useEffect, useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { trabajadorValues } from "../../../data/initalValues";
import {
  alertaEditarExito,
  alertaError,
  alertaErrorCrear,
  alertaExito,
} from "../../../helpers/alertMessage";
import useForm from "../../../hooks/useForm";
import DragAndDrop from "../DragAndDrop";

import "../styles/modalRegistroPersonal.css";

const ModalRegistroPersonal = ({ actualizarTabla }) => {
  const route = "trabajador";

  const { getData, createData, updateData, setData3, data3, setModal,setDataToEdit ,dataToEdit } =
    useContext(CrudContext);
  const [trabajador, setTrabajador] = useState(trabajadorValues);
  const [avatar, setAvatar] = useState(null);

  const getAsociacion = async () => {
    const response = await getData("asociacion");
    setData3(response.data);
  };

  useEffect(() => {
    getAsociacion();
  }, []);

  useEffect(() => {
    if (dataToEdit) {
      setTrabajador(dataToEdit);
    } else {
      setTrabajador(trabajadorValues);
    }
  }, [dataToEdit]);

  const handleData = (e) => {
    const { name, value } = e.target;

    setTrabajador((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("dni", trabajador.dni || "");
    formData.set("codigo_trabajador", trabajador.codigo_trabajador || "");
    formData.set("fecha_nacimiento", trabajador.fecha_nacimiento || "");
    formData.set("telefono", trabajador.telefono || "");
    formData.set("apellido_paterno", trabajador.apellido_paterno || "");
    formData.set("apellido_materno", trabajador.apellido_materno || "");
    formData.set("nombre", trabajador.nombre || "");
    formData.set("email", trabajador.email || "");
    formData.set("estado_civil", trabajador.estado_civil || "");
    formData.set("genero", trabajador.genero || "");
    formData.set("direccion", trabajador.direccion || "");
    formData.set("asociacion_id", trabajador.asociacion_id || "");

    avatar?.file && formData.set("image", avatar.file || "");

    if (!trabajador.dni) {
      alertaError();
    } else if (dataToEdit === null) {
      fetch(`${import.meta.env.VITE_APP_BASE}/trabajador`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            alertaExito(res.msg, res.status).then((res) => {
              closeModal();
              if (res.isConfirmed) {
                actualizarTabla();
              }
            });
          } else {
            alertaErrorCrear(res.msg).then((res) => {
              closeModal();
            });
          }
        });
    }

    if (dataToEdit) {
      fetch(`${import.meta.env.VITE_APP_BASE}/trabajador/${dataToEdit.dni}`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            alertaEditarExito(res.msg, res.status).then((res) => {
              closeModal();
              if (res.isConfirmed) {
                actualizarTabla();
              }
            });
          }
        });
    }
  };

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setTrabajador(trabajadorValues);
  };

  return (
    <div className="modal-trabajador">
      <div className="overlay"></div>

      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar trabajador" : "Registrar trabajador"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <form className="modal-body" onSubmit={handleSubmit}>
          <section className="avatar">
            <DragAndDrop
              avatar={avatar}
              setAvatar={setAvatar}
              selected={dataToEdit}
            />
          </section>
          <section className="data">
            <div>
              <label>Dni</label>
              <input
                type="text"
                value={trabajador.dni}
                name="dni"
                onChange={handleData}
              ></input>
            </div>
            <div>
              <label>Código Trabajador</label>
              <input
                type="text"
                name="codigo_trabajador"
                value={trabajador.codigo_trabajador}
                onChange={handleData}
              ></input>
            </div>
            <div>
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={trabajador?.fecha_nacimiento?.split("T")[0]}
                onChange={handleData}
              ></input>
            </div>
            <div>
              <label>Nombre</label>
              <input
                type="text"
                value={trabajador.nombre}
                name="nombre"
                onChange={handleData}
              ></input>
            </div>
            <div>
              <label>Apellido Paterno</label>
              <input
                type="text"
                name="apellido_paterno"
                value={trabajador.apellido_paterno}
                onChange={handleData}
              ></input>
            </div>
            <div>
              <label>Apellido Materno</label>
              <input
                type="text"
                name="apellido_materno"
                value={trabajador.apellido_materno}
                onChange={handleData}
              ></input>
            </div>
            <div>
              <label>Teléfono</label>
              <input
                type="number"
                name="telefono"
                value={trabajador.telefono}
                onChange={handleData}
              ></input>
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={trabajador.email}
                onChange={handleData}
              ></input>
            </div>
            <div>
              <label>Estado civil</label>
              <select
                name="estado_civil"
                value={trabajador.estado_civil}
                onChange={handleData}
              >
                <option value="-1">Seleccione</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viudo">Viudo</option>
              </select>
            </div>
            <div>
              <label>Género</label>
              <select
                name="genero"
                value={trabajador.genero}
                onChange={handleData}
              >
                <option value="-1">Seleccione</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div>
              <label>Dirección</label>
              <input
                type="text"
                name="direccion"
                value={trabajador.direccion}
                onChange={handleData}
              ></input>
            </div>
            {dataToEdit && (
              <div>
                <label>Asignar asociación</label>
                <select
                  name="asociacion_id"
                  value={trabajador.asociacion_id}
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  {data3.map((item, i) => (
                    <option value={item.id} key={i}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </section>

          <div className="footer">
            <button>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistroPersonal;
