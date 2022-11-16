import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import {
  alertaEditarExito,
  alertaError,
  alertaErrorCrear,
  alertaExito,
} from "../../../helpers/alertMessage";
import "../styles/modalRegistroEvaluacion.css";

const ModalRegistroEvaluacion = ({
  actualizarTabla,
  selected,
  actualizarTrabajador,
}) => {
  const route = "evaluacion";
  const route1 = "cargo";
  const evaluacionValues = {
    fecha_evaluacion: "",
    puesto: "",
    capacitacion_sso: "",
    capacitacion_gema: "",
    evaluacion_laboral: "",
    presion_arterial: "",
    temperatura: "",
    saturacion: "",
    imc: "",
    pulso: "",
    diabetes: "",
    antecedentes: "",
    emo: "",
    trabajador_id: selected.id,
    aprobado: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
  };
  const { setRegistrarEvaluacion, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);
  const { createData, updateData, getData } = useContext(CrudContext);
  const [evaluacion, setEvaluacion] = useState(evaluacionValues);
  const [cargo, setCargo] = useState([]);
  const [socio, setSocio] = useState([]);

  const getCargo = async () => {
    const route2 = "socio";
    const response = await getData(route1);
    const response2 = await getData(route2);

    setCargo(response.data);
    setSocio(response2.data);
  };

  useEffect(() => {
    if (dataToEdit) {
      setEvaluacion(dataToEdit);
    } else {
      setEvaluacion(evaluacionValues);
    }
    console.log(dataToEdit);
  }, [dataToEdit]);
  useEffect(() => {
    getCargo();
  }, []);

  const handleData = (e) => {
    const { name, value } = e.target;
    setEvaluacion((values) => {
      return { ...values, [name]: value };
    });

    if (name === "recomendado_por") {
      const prueba = socio.filter((item) => item.nombre === value);
      const cooperativa = prueba.map(
        (item) => (evaluacion.cooperativa = item.cooperativa)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!evaluacion.fecha_evaluacion) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(evaluacion, route).then((res) => {
        if (res.status) {
          alertaExito(res.msg, res.status).then((res) => {
            closeModal();
            if (res.isConfirmed) {
              actualizarTabla();
            }
          });
        }
      });
    }

    if (dataToEdit) {
      updateData(evaluacion, dataToEdit.evaluacion_id, route).then((res) => {
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
    setRegistrarEvaluacion(false);
    setDataToEdit(null);
    setEvaluacion(evaluacionValues);
  };

  return (
    <div className="modal-registrar-contrato">
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar evaluación" : "Registrar evaluación"}

          <AiOutlineClose onClick={closeModal} />
        </section>
        <div className="aprobado_rrhh">
          <div>
            <div className="titulo">
              <label htmlFor=""> Autoriza fiscalizador: </label>
            </div>
            <div>
              <label htmlFor=""> Si</label>
              <input
                type="radio"
                name="aprobado"
                value="si"
                checked={evaluacion?.aprobado === "si"}
                onChange={handleData}
              />

              <label htmlFor=""> No</label>
              <input
                type="radio"
                name="aprobado"
                value="no"
                checked={evaluacion?.aprobado !== "si"}
                onChange={handleData}
              />
            </div>
          </div>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <fieldset className="cabecera">
            <legend></legend>
            <div>
              <label>Fecha de evaluación</label>
              <input
                type="date"
                value={evaluacion.fecha_evaluacion.split("T")[0]}
                name="fecha_evaluacion"
                onChange={handleData}
              />
            </div>
            <div>
              <label htmlFor="">Cargo al que postula</label>
              <select
                value={evaluacion.puesto}
                name="puesto"
                onChange={handleData}
              >
                <option value="-1">Seleccione</option>
                {cargo.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset className="cooperativa">
            <legend>Cooperativa</legend>
            <section>
              <div>
                <label>Recomendado por</label>
                <select
                  value={evaluacion?.recomendado_por}
                  name="recomendado_por"
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  {socio.map((item, i) => (
                    <option key={i} value={item.nombre}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Cooperativa</label>
                <input
                  disabled
                  type="text"
                  name="cooperativa"
                  value={evaluacion?.cooperativa}
                />
              </div>

              <div>
                <label>Condición cooperativa</label>
                <select
                  value={evaluacion?.condicion_cooperativa}
                  name="condicion_cooperativa"
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  <option value="Hijo">Hijo</option>
                  <option value="Sobrino">Sobrino</option>
                  <option value="Primo">Primo</option>
                  <option value="Tio">Tio</option>
                  <option value="Tio">Compadre</option>
                  <option value="Tio">Compañero</option>
                  <option value="Tio">Amigo</option>
                </select>
              </div>
            </section>
          </fieldset>
          <fieldset>
            <legend>Control</legend>

            <section>
              <div>
                <label htmlFor="">Evaluación laboral</label>
                <input
                  type="number"
                  value={evaluacion.evaluacion_laboral}
                  name="evaluacion_laboral"
                  onChange={handleData}
                />
              </div>
            </section>
            <div className="aprobado">
              <div>
                <div className="titulo">
                  <label htmlFor=""> Autoriza</label>
                </div>
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="control"
                    value="si"
                    checked={evaluacion.control === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="control"
                    value="no"
                    checked={evaluacion.control !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Observaciones</label>
                <textarea></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Topico</legend>

            <section>
              <div>
                <label htmlFor="">Presión arterial</label>
                <input
                  type="number"
                  value={evaluacion.presion_arterial}
                  name="presion_arterial"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">Temperatura</label>
                <input
                  type="number"
                  value={evaluacion.temperatura}
                  name="temperatura"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">Saturación de oxígeno</label>
                <input
                  type="number"
                  value={evaluacion.saturacion}
                  name="saturacion"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">IMC</label>
                <input
                  type="number"
                  value={evaluacion.imc}
                  name="imc"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">Pulso(pm)</label>
                <input
                  type="number"
                  value={evaluacion.pulso}
                  name="pulso"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">Diabetes</label>
                <input
                  type="text"
                  value={evaluacion.diabetes}
                  name="diabetes"
                  onChange={handleData}
                />
              </div>
            </section>
            <div className="aprobado">
              <div>
                <div className="titulo">
                  <label htmlFor=""> Autoriza</label>
                </div>
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="topico"
                    value="si"
                    checked={evaluacion.topico === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="topico"
                    value="no"
                    checked={evaluacion.topico !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Observaciones</label>
                <textarea></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Seguridad</legend>

            <section>
              <div>
                <label>Capacitación SSO</label>
                <input
                  value={evaluacion.capacitacion_sso}
                  name="capacitacion_sso"
                  onChange={handleData}
                  type="number"
                ></input>
              </div>
            </section>
            <div className="aprobado">
              <div>
                <div className="titulo">
                  <label htmlFor=""> Autoriza</label>
                </div>
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="seguridad"
                    value="si"
                    checked={evaluacion.seguridad === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="seguridad"
                    value="no"
                    checked={evaluacion.seguridad !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Observaciones</label>
                <textarea></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Medio Ambiente</legend>

            <section>
              <div>
                <label htmlFor="">Capacitación GEMA</label>
                <input
                  type="number"
                  value={evaluacion.capacitacion_gema}
                  name="capacitacion_gema"
                  onChange={handleData}
                />
              </div>
              {/* <div>
                <label htmlFor="">Antecedentes CCM</label>
                <textarea
                  id=""
                  cols="30"
                  rows="10"
                  value={evaluacion.antecedentes}
                  name="antecedentes"
                  onChange={handleData}
                ></textarea>
              </div> */}
            </section>
            <div className="aprobado">
              <div>
                <div className="titulo">
                  <label htmlFor=""> Autoriza</label>
                </div>
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="medio_ambiente"
                    value="si"
                    checked={evaluacion.medio_ambiente === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="medio_ambiente"
                    value="no"
                    checked={evaluacion.medio_ambiente !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Observaciones</label>
                <textarea></textarea>
              </div>
            </div>
          </fieldset>

          <div className="footer">
            {dataToEdit ? <button>Editar</button> : <button>Registar</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistroEvaluacion;
