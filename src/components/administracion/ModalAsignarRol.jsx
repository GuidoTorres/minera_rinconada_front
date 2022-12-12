import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { rolValues } from "../../data/initalValues";
import {
  alertaEditarExito,
  alertaError,
  alertaExito,
} from "../../helpers/alertMessage";
import "./styles/modalAsignarUsuario.css";

const ModalAsignarRol = ({ actualizarTabla }) => {
  const {
    data1,
    data2,
    data3,
    setData1,
    setData2,
    setData3,
    getData,
    createData,
    updateData,
    setModal,
    dataToEdit,
    setDataToEdit,
  } = useContext(CrudContext);

  const [rol, setRol] = useState(rolValues);

  const getAll = async () => {
    const route1 = "puesto";
    const route2 = "cargo";
    const route3 = "usuario";
    const puesto = await getData(route1);
    const cargo = await getData(route2);
    const usuario = await getData(route3);

    const promise = await Promise.all([puesto, cargo, usuario]);
    setData1(promise[2].data);
    setData2(promise[1].data);
    setData3(promise[0].data);
  };

  useEffect(() => {
    getAll();
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
    const route = "rol";
    e.preventDefault();
    if (!rol.usuario_id || !rol.cargo_id || !rol.rol_id) {
      alertaError();
    } else if (dataToEdit === null) {
      const response = createData(rol, "rol");
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }

    if (dataToEdit) {
      const response = updateData(rol, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }
  };

  const closeModal = () => {
    setModal(false);
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

                  {data1.map((item, i) => (
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
                  {data3.map((item, i) => (
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
