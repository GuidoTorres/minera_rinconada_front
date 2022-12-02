import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { FinanzasContext } from "../../../context/FinanzasProvider";
import { sucursalValues } from "../../../data/initalValues";
import { alertaExito } from "../../../helpers/alertMessage";

const ModalRegistrar = ({actualizarTabla}) => {
  const { setDataToEdit, dataToEdit, createData, updateData } =
    useContext(CrudContext);
  const { modal, setModal } = useContext(FinanzasContext);
  const [sucursal, setSucursal] = useState(sucursalValues);

  useEffect(() => {
    if (dataToEdit !== null) {
      setSucursal(dataToEdit);
    } else {
      setSucursal(sucursalValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setSucursal((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    let route = "sucursal";
    e.preventDefault();
    if (dataToEdit === null) {
      const response = await createData(sucursal, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    } else {
      const response = await updateData(sucursal, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }
  };

  return (
    <div className="modal-usuario" style={{ height: "100px !important" }}>
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar sucursal" : "Registrar sucursal"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Nombre</label>
                <input
                  value={sucursal.nombre}
                  type="text"
                  name="nombre"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Código</label>
                <input
                  value={sucursal.codigo}
                  type="text"
                  name="codigo"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Descripción</label>
                <input
                  value={sucursal.descripcion}
                  type="text"
                  name="descripcion"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Saldo inicial</label>
                <input
                  value={sucursal.saldo_inicial}
                  type="number"
                  name="saldo_inicial"
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

export default ModalRegistrar;
