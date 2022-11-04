import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { AiOutlineClose } from "react-icons/ai";
import { PersonalContext } from "../../../context/PersonalContext";
import {
  alertaEditarExito,
  alertaError,
  alertaExito,
} from "../../../helpers/alertMessage";

const ModalRegistrarEmpresa = ({ actualizarTabla, selected }) => {
  const route = "empresa";
  const empresaValues = {
    razon_social: "",
    ruc: "",
  };
  const [empresa, setEmpresa] = useState(empresaValues);
  const { setRegistrarEmpresa, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);
  const { createData, updateData } = useContext(CrudContext);

  useEffect(() => {
    if (dataToEdit) {
      setEmpresa(dataToEdit);
    } else {
      setEmpresa(empresaValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setRegistrarEmpresa(false);
    setDataToEdit(null);
    setEmpresa(empresaValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!empresa.razon_social || !empresa.ruc) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(empresa, route);
      alertaExito("Empresa").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }

    if (dataToEdit) {
      updateData(empresa, dataToEdit.id, route);
      alertaEditarExito("Empresa").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }
  };

  const handleData = (e)=>{

    const { name, value } = e.target;
    setEmpresa((values) => {
      return { ...values, [name]: value };
    });
  }

  return (
    <div className="modal-asociacion">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar empresa" : "Registrar empresa"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Razón social</label>

                <input
                  type="text"
                  name="razon_social"
                  value={empresa?.razon_social}
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Ruc empresa</label>
                <input
                  type="text"
                  name="ruc"
                  value={empresa?.ruc}
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

export default ModalRegistrarEmpresa;
