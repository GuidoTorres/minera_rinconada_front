import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import { trabajadorEvaluacionValues } from "../../../data/initalValues";
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
  cerrarHistorial,
}) => {
  const route = "evaluacion";
  const route1 = "cargo";

  const { setRegistrarEvaluacion, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);

  const evaluacionValues = trabajadorEvaluacionValues(selected);
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
            actualizarTabla();
            actualizarTrabajador();
            cerrarHistorial(false);
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
              // actualizarTrabajador();
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
          {dataToEdit ? "Editar evaluaci??n" : "Registrar evaluaci??n"}

          <AiOutlineClose onClick={closeModal} />
        </section>

        <form className="modal-body" onSubmit={handleSubmit}>
          <fieldset className="cabecera">
            <legend></legend>
            <div>
              <label> Fecha de evaluaci??n</label>
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
            <legend>
              <strong>Cooperativa</strong>
            </legend>
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
                <label>Condici??n cooperativa</label>
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
                  <option value="Compadre">Compadre</option>
                  <option value="Compa??ero">Compa??ero</option>
                  <option value="Amigo">Amigo</option>
                  <option value="Nuera">Nuera</option>
                  <option value="Conocido">Conocido</option>
                  <option value="Recomendado">Recomendado</option>
                </select>
              </div>
            </section>
          </fieldset>
          <fieldset className="fiscalizador">
            <legend>
              <strong>Fiscalizador</strong>
            </legend>
            <div className="container">
              <div className="titulo">
                <label htmlFor=""> Fiscalizador a cargo </label>
                <select
                  value={evaluacion?.fiscalizador}
                  name="fiscalizador"
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

              <div className="aprobado">
                <div>
                  <div className="titulo">
                    <label htmlFor=""> Autoriza</label>
                  </div>
                  <div>
                    <label htmlFor=""> Si</label>
                    <input
                      type="radio"
                      name="fiscalizador_aprobado"
                      value="si"
                      checked={evaluacion?.fiscalizador_aprobado === "si"}
                      onChange={handleData}
                    />

                    <label htmlFor=""> No</label>
                    <input
                      type="radio"
                      name="fiscalizador_aprobado"
                      value="no"
                      checked={evaluacion?.fiscalizador_aprobado !== "si"}
                      onChange={handleData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="control">
            <legend>
              <strong>Control</strong>
            </legend>

            <div>
              <label htmlFor="">
                Estado: Normal
                {/* {selected?.contrato?.map((item) =>
                  item?.estado !== false ? "Suspendido" : "Normal"
                )} */}
              </label>
              <label htmlFor="">Evaluaci??n laboral: {selected?.nota}</label>
            </div>

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
                <textarea
                  name="control_observacion"
                  value={evaluacion?.control_observacion}
                  onChange={handleData}
                ></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <strong>Topico</strong>
            </legend>

            <section>
              <div>
                <label htmlFor="">Presi??n arterial</label>
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
                <label htmlFor="">Saturaci??n de ox??geno</label>
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
                <select
                  value={evaluacion.diabetes}
                  name="diabetes"
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
                {/* <input
                  type="text"
                  value={evaluacion.diabetes}
                  name="diabetes"
                  onChange={handleData}
                /> */}
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
                <textarea
                  name="topico_observacion"
                  value={evaluacion?.topico_observacion}
                  onChange={handleData}
                ></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <strong>Seguridad</strong>
            </legend>

            <section>
              <div>
                <label>Capacitaci??n SSO</label>
                <input
                  value={evaluacion?.capacitacion_sso}
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
                    checked={evaluacion?.seguridad === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="seguridad"
                    value="no"
                    checked={evaluacion?.seguridad !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Observaciones</label>
                <textarea
                  name="seguridad_observacion"
                  value={evaluacion?.seguridad_observacion}
                  onChange={handleData}
                ></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <strong>Medio Ambiente</strong>
            </legend>

            <section>
              <div>
                <label htmlFor="">Capacitaci??n GEMA</label>
                <input
                  type="number"
                  value={evaluacion?.capacitacion_gema}
                  name="capacitacion_gema"
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
                    name="medio_ambiente"
                    value="si"
                    checked={evaluacion?.medio_ambiente === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="medio_ambiente"
                    value="no"
                    checked={evaluacion?.medio_ambiente !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Observaciones</label>
                <textarea
                  name="medio_ambiente_observacion"
                  value={evaluacion?.medio_ambiente_observacion}
                  onChange={handleData}
                ></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <strong>Recursos Humanos</strong>
            </legend>
            <div className="aprobado">
              <div>
                <div className="titulo">
                  <label htmlFor=""> Autoriza</label>
                </div>
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="recursos_humanos"
                    value="si"
                    checked={evaluacion?.recursos_humanos === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="recursos_humanos"
                    value="no"
                    checked={evaluacion?.recursos_humanos !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Observaciones</label>
                <textarea
                  name="recursos_humanos_observacion"
                  value={evaluacion?.recursos_humanos_observacion}
                  onChange={handleData}
                ></textarea>
              </div>
            </div>
          </fieldset>

          <div className="footer">
            {dataToEdit ? <button>Editar</button> : <button>Registrar</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistroEvaluacion;
