import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AiOutlineClose } from "react-icons/ai";
import { campamentoValues } from "../../data/initalValues";
import "./styles/modalCampamento.css";
import {
  alertaEditarExito,
  alertaError,
  alertaExito,
} from "../../helpers/alertMessage";
import { CrudContext } from "../../context/CrudContext";

const ModalCampamento = ({ actualizarTabla }) => {
  const route = "campamento"
  const { dataToEdit, setRegistrarCampamento, setDataToEdit } =
    useContext(AdminContext);
  const { createData, updateData } = useContext(CrudContext);
  const [campamento, setCampamento] = useState(campamentoValues);

  useEffect(() => {
    if (dataToEdit) {
      setCampamento(dataToEdit);
    } else {
      setCampamento(campamentoValues);
    }
  }, [dataToEdit]);

  const handleData = (e) => {
    const { name, value } = e.target;
    setCampamento((values) => {
      return { ...values, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!campamento.nombre || !campamento.direccion) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(campamento, route);
      alertaExito("Campamento").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }
    if (dataToEdit) {
      updateData(campamento, dataToEdit.id, route);
      alertaEditarExito("Campamento").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }
  };

  const closeModal = () => {
    setRegistrarCampamento(false);
    setDataToEdit(null);
    setCampamento(campamentoValues);
  };

  return (
    <div className="modal-campamento">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar campamento" : "Registrar campamento"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={campamento.nombre}
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={campamento.direccion}
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

export default ModalCampamento;
