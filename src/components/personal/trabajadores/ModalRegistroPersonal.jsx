import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import { asociacionValues, trabajadorValues } from "../../../data/initalValues";
import {
  alertaEditarExito,
  alertaError,
  alertaExito,
} from "../../../helpers/alertMessage";
import useForm from "../../../hooks/useForm";

import "../styles/modalRegistroPersonal.css";

const ModalRegistroPersonal = ({ actualizarTabla }) => {
  const route = "trabajador";
  const { dataToEdit, setRegistrarPersonal, setDataToEdit } =
    useContext(PersonalContext);
  const { getData, createData, updateData, setData3, data3 } =
    useContext(CrudContext);
  const [trabajador, setTrabajador] = useState(trabajadorValues);

  const [form, handleChange] = useForm(trabajadorValues);

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
    console.log(trabajador);

    if (!trabajador.dni) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(trabajador, route);
      alertaExito("Trabajador").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }

    if (dataToEdit) {
      updateData(trabajador, dataToEdit.id, route);
      alertaEditarExito("Trabajador").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }
  };

  const closeModal = () => {
    setRegistrarPersonal(false);
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
        <section className="modal-body">
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
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
                  value={trabajador?.fecha_nacimiento.split("T")[0]}
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
            </section>
            <section>
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
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={trabajador.email}
                  onChange={handleData}
                ></input>
              </div>
            </section>
            <section>
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
                    {data3.map((item) => (
                      <option value={item.id}>{item.nombre}</option>
                    ))}
                  </select>
                </div>
              )}
            </section>

            {/* <section>
              <div>
                <label>Nombre Asociación</label>
                <input
                  disabled={
                    trabajador.tipo_trabajador == "Asociación" ? false : true
                  }
                  type="text"
                  name="nombre"
                  value={asociacion.nombre}
                  onChange={handleData}
                ></input>
              </div>
              <div className="asociacion">
                <label>Código Asociación</label>
                <div>
                  <input
                    name="codigo"
                    value={asociacion.codigo}
                    onChange={handleData}
                    disabled={
                      trabajador.tipo_trabajador == "Asociación" ? false : true
                    }
                  ></input>
                  <button
                    disabled={
                      trabajador.tipo_trabajador == "Asociación" ? false : true
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div></div>
            </section>
            <section>
              <div>
                <label>Razón social</label>
                <input
                 name="razon_social"
                 value={empresa.razon_social}
                 onChange={handleData}
                  disabled={
                    trabajador.tipo_trabajador == "Empresa" ? false : true
                  }
                ></input>
              </div>
              <div>
                <label>Ruc empresa</label>
                <input
                name="ruc"
                value={empresa.ruc}
                  disabled={
                    trabajador.tipo_trabajador == "Empresa" ? false : true
                  }
                ></input>
              </div>
            </section> */}
            <section className="footer">
              <button>Registrar</button>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistroPersonal;
