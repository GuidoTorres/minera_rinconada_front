import React, { useContext, useEffect, useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import { trabajadorValues } from "../../../data/initalValues";
import {
  alertaEditarExito,
  alertaError,
  alertaErrorCrear,
  alertaExito,
} from "../../../helpers/alertMessage";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import useForm from "../../../hooks/useForm";
import DragAndDrop from "../DragAndDrop";

import "../styles/modalRegistroPersonal.css";

const ModalRegistroPersonal = ({ actualizarTabla }) => {
  const route = "trabajador";

  const { dataToEdit, setRegistrarPersonal, setDataToEdit } =
    useContext(PersonalContext);
  const { getData, createData, updateData, setData3, data3, setModal } =
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
    setRegistrarPersonal(false);
    setDataToEdit(null);
    setTrabajador(trabajadorValues);
  };

  const styles = theme => ({
    name: {
      paddingTop: '50px', // for example
    },
  });

  return (
    <div className="modal-trabajador">
      <div className="overlay"></div>

      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar trabajador" : "Registrar trabajador"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <form className="modal-body" onSubmit={handleSubmit}>
          <section className="modal-grid">
            <section className="avatar">
              <DragAndDrop
                avatar={avatar}
                setAvatar={setAvatar}
                selected={dataToEdit}
              />
            </section>
            <section className="data">
              <div>
                <TextField
                  className="text"
                  label="Dni"
                  variant="outlined"
                  name="dni"
                  type="number"
                  value={trabajador.dni}
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  className="text"
                  label="Código Trabajador"
                  variant="outlined"
                  name="codigo_trabajador"
                  type="text"
                  value={trabajador.codigo_trabajador}
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  className="text"
                  label="Fecha de nacimiento"
                  variant="outlined"
                  name="fecha_nacimiento"
                  type="text"
                  value={trabajador.fecha_nacimiento?.split("T")[0]}
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  className="text"
                  label="Nombre"
                  variant="outlined"
                  name="nombre"
                  type="text"
                  value={trabajador.nombre}
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  className="text"
                  label="Apellido paterno"
                  variant="outlined"
                  name="apellido_paterno"
                  type="text"
                  value={trabajador.apellido_paterno}
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  className="text"
                  label="Apellido materno"
                  variant="outlined"
                  name="apellido_materno"
                  type="text"
                  value={trabajador.apellido_materno}
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  className="text"
                  label="Teléfono"
                  variant="outlined"
                  name="telefono"
                  type="text"
                  value={trabajador.telefono}
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  className="text"
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="text"
                  value={trabajador.email}
                  onChange={handleData}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  className="text"
                  label="Estado civil"
                  select
                  variant="outlined"
                  name="estado_civil"
                  type="text"
                  value={trabajador.estado_civil}
                  onChange={handleData}
                  size="small"
                >
                  <MenuItem value={"Soltero"}>Soltero</MenuItem>
                  <MenuItem value={"Casado"}>Casado</MenuItem>
                  <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                  <MenuItem value={"Viudo"}>Viudo</MenuItem>
                </TextField>
              </div>
              <div>
                <TextField
                  className="text"
                  label="Genero"
                  select
                  variant="outlined"
                  name="genero"
                  type="text"
                  value={trabajador.genero}
                  onChange={handleData}
                  size="small"
                >
                  <MenuItem value={"Masculino"}>Masculino</MenuItem>
                  <MenuItem value={"Femenino"}>Femenino</MenuItem>
                </TextField>
              </div>
              <div>
                <TextField
                  className="text"
                  label="Dirección"
                  variant="outlined"
                  name="direccion"
                  type="text"
                  value={trabajador.direccion}
                  onChange={handleData}
                  size="small"
                />
              </div>
              {dataToEdit && (
                <div>
                  <TextField
                    className="text"
                    label="Asignar asociación"
                    select
                    variant="outlined"
                    name="asociacion_id"
                    type="text"
                    value={trabajador.asociacion_id}
                    onChange={handleData}
                    size="small"
                  >
                    {data3.map((item, i) => (
                      <MenuItem value={item.id} key={i}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              )}
            </section>
          </section>

          <div className="footer">
            <Button>Registrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistroPersonal;
