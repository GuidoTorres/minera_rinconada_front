import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AdminContext } from "../../context/AdminContext";
import { CrudContext } from "../../context/CrudContext";
import { rolValues } from "../../data/initalValues";
import {
  alertaEditarExito,
  alertaError,
  alertaExito,
} from "../../helpers/alertMessage";
import "./styles/modalAsignarUsuario.css";

const ModalAsignarRol = ({ actualizarTabla }) => {
  const route1 = "puesto";
  const route2 = "cargo";
  const route3 = "usuario";
  const route = "rol";

  const { setAsignarUsuario, dataToEdit, setDataToEdit } =
    useContext(AdminContext);
  const {
    getData,
    data1,
    data2,
    setData1,
    setData2,
    data3,
    setData3,
    createData,
    updateData,
  } = useContext(CrudContext);

  const [rol, setRol] = useState(rolValues);

  const getPuesto = async () => {
    const response = await getData(route1);
    setData1(response.data);
  };

  const getCargo = async () => {
    const response = await getData(route2);
    setData2(response.data);
  };

  const getUsuario = async () => {
    const response = await getData(route3);
    setData3(response.data);
  };

  useEffect(() => {
    getPuesto();
    getCargo();
    getUsuario();
  }, []);

  useEffect(() => {
    if (dataToEdit) {
      setRol(dataToEdit);
    } else {
      setRol(rolValues);
    }
  }, [dataToEdit]);

  const handleData = (e) => {
    const { name, value } = e.target;
    setRol((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rol.usuario_id || !rol.cargo_id || !rol.rol_id) {
      console.log(rol);
      alertaError();
    } else if (dataToEdit === null) {
      console.log(rol);
      createData(rol, route);
      alertaExito("Rol").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }

    if (dataToEdit) {
      updateData(rol, dataToEdit.id, route);
      alertaEditarExito("Rol").then((res) => {
        closeModal();
        console.log(res);
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }
  };
  const closeModal = () => {
    setAsignarUsuario(false);
    setDataToEdit(null);
    setRol(rolValues);
  };

  return (
    <div className="modal-rol">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar rol" : "Asignar rol"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Nombre</label>
                <select
                  value={rol.usuario_id}
                  name="usuario_id"
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>

                  {data3.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Puesto</label>
                <select
                  name="cargo_id"
                  value={rol.cargo_id}
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>

                  {data2.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Rol</label>
                <select name="rol_id" value={rol.rol_id} onChange={handleData}>
                  <option value="-1">Seleccione</option>
                  {data1.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button>Asignar</button>
              </div>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalAsignarRol;
