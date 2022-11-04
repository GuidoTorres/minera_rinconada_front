import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
// import { contratoValues } from "../../data/initalValues";

import {
  alertaEditarExito,
  alertaError,
  alertaExito,
} from "../../../helpers/alertMessage";
import "../styles/modalRegistrarContrato.css";

const ModalRegistrarContrato = ({ actualizarTabla, selected, data }) => {
  const route = "contrato";
  const route1 = "cargo";
  const route2 = "campamento";
  const route3 = "gerencia";
  const route4 = "area";
  const contratoValues = {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    evaluacion_id: data?.evaluacion_id,
    estado: false,
  };

  const { setRegistrarContrato, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);

  const { createData, updateData, getData } = useContext(CrudContext);
  const [contrato, setContrato] = useState(contratoValues);
  const [cargo, setCargo] = useState([]);
  const [campamento, setCampamento] = useState([]);
  const [gerencia, setGerencia] = useState([]);
  const [area, setArea] = useState([]);

  const getAll = async () => {
    const response1 = await getData(route1);
    const response2 = await getData(route2);
    const response3 = await getData(route3);
    const response4 = await getData(route4);

    setCargo(response1.data);
    setCampamento(response2.data);
    setGerencia(response3.data);
    setArea(response4.data);
  };

  useEffect(() => {
    console.log(dataToEdit);
    if (dataToEdit) {
      setContrato(dataToEdit);
    } else {
      setContrato(contratoValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    getAll();
  }, []);

  const handleData = (e) => {
    const { name, value } = e.target;
    setContrato((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contrato.fecha_inicio || !contrato.codigo_contrato) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(contrato, route);
      alertaExito("Contrato").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }

    if (dataToEdit) {
      updateData(contrato, selected.id, route);
      alertaEditarExito("Contrato").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }
  };

  const closeModal = () => {
    setRegistrarContrato(false);
    setDataToEdit(null);
    setContrato(contratoValues);
  };
  return (
    <div className="modal-contrato">
      {/* <div className="overlay"></div> */}
      <div className="modal-container">
        <section className="modal-header">
          Registrar Contrato
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section className="modal-body">
          <form onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Fecha de ingreso</label>
                <input
                  type="date"
                  value={contrato?.fecha_inicio?.split("T")[0]}
                  name="fecha_inicio"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Código contrato</label>
                <input
                  value={contrato?.codigo_contrato}
                  name="codigo_contrato"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Tipo de Contrato</label>
                <select
                  value={contrato?.tipo_contrato}
                  name="tipo_contrato"
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  <option value="Especias">Especias</option>
                  <option value="Planilla">Planilla</option>
                </select>
              </div>

              {data && data.trabajador && data.trabajador.length > 0 ? null : (
                <div>
                  <label>Puesto o Rol</label>
                  <select
                    value={contrato?.puesto}
                    name="puesto"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    {cargo &&
                      cargo.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </section>
            <section>
              <div>
                <label>Cooperativa</label>
                <input
                  value={contrato?.cooperativa}
                  name="cooperativa"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Recomendado por</label>
                <input
                  value={contrato?.recomendado_por}
                  name="recomendado_por"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Condición de cooperativa</label>
                <input
                  value={contrato?.condicion_cooperativa}
                  name="condicion_cooperativa"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Campamento</label>
                <select
                  value={contrato?.campamento_id}
                  name="campamento_id"
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  {campamento &&
                    campamento.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                </select>
              </div>
            </section>
            <section>
              <div>
                <label>Periodo de trabajo</label>
                <input
                  value={contrato?.periodo_trabajo}
                  name="periodo_trabajo"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Fecha de fin</label>
                <input
                  type="date"
                  value={contrato?.fecha_fin?.split("T")[0]}
                  name="fecha_fin"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Gerencia</label>
                <select
                  value={contrato?.gerencia}
                  name="gerencia"
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  {gerencia &&
                    gerencia.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label>Área</label>
                <select
                  value={contrato?.area}
                  name="area"
                  onChange={handleData}
                >
                  <option value="-1">Seleccion</option>
                  {area &&
                    area.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                </select>
              </div>
            </section>

            <section>
              <div>
                <label>Jefe directo</label>
                <input
                  value={contrato?.jefe_directo}
                  name="jefe_directo"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Base</label>
                <input
                  value={contrato?.base}
                  name="base"
                  onChange={handleData}
                ></input>
              </div>
            </section>
            <section>
              <div>
                <label>Término de contrato</label>
                <textarea
                  value={contrato?.termino_contrato}
                  name="termino_contrato"
                  onChange={handleData}
                ></textarea>
              </div>
              <div>
                <label>Nota de contrato</label>
                <input
                  value={contrato?.nota_contrato}
                  name="nota_contrato"
                  onChange={handleData}
                ></input>
              </div>
            </section>
            <div className="footer">
              <button>Registar</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistrarContrato;
