import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import {
  alertaEditarExito,
  alertaError,
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
  };
  const { setRegistrarEvaluacion, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);
  const { createData, updateData, getData } = useContext(CrudContext);
  const [evaluacion, setEvaluacion] = useState(evaluacionValues);
  const [cargo, setCargo] = useState([]);

  const getCargo = async () => {
    const response = await getData(route1);
    setCargo(response.data);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!evaluacion.fecha_evaluacion) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(evaluacion, route);
      alertaExito("Evaluación").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
        }
      });
    }

    if (dataToEdit) {
      updateData(evaluacion, dataToEdit.evaluacion_id, route);
      alertaEditarExito("Evaluación").then((res) => {
        closeModal();
        if (res.isConfirmed) {
          actualizarTabla();
          actualizarTrabajador();
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
          Registrar evaluación
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="aprobado">
              <div>
                <div className="titulo">
                  <label htmlFor=""> Aprobado</label>
                </div>
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="aprobado"
                    value="si"
                    checked={evaluacion.aprobado === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="aprobado"
                    value="no"
                    checked={evaluacion.aprobado !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
            </div>
            <section>
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
                <label htmlFor="">Puesto o Rol</label>
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
              <div>
                <label htmlFor="">Codigo de contrato</label>
                <input
                  type="text"
                  value={evaluacion.contrato_id}
                  name="contrato_id"
                  onChange={handleData}
                />
              </div>
              <div>
                <label>Capacitación SSO</label>
                <input
                  value={evaluacion.capacitacion_sso}
                  name="capacitacion_sso"
                  onChange={handleData}
                ></input>
              </div>
            </section>
            <section>
              <div>
                <label htmlFor="">Capacitación GEMA</label>
                <input
                  type="text"
                  value={evaluacion.capacitacion_gema}
                  name="capacitacion_gema"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">Evaluación laboral</label>
                <input
                  type="text"
                  value={evaluacion.evaluacion_laboral}
                  name="evaluacion_laboral"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">Presión arterial</label>
                <input
                  type="text"
                  value={evaluacion.presion_arterial}
                  name="presion_arterial"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">Temperatura</label>
                <input
                  type="text"
                  value={evaluacion.temperatura}
                  name="temperatura"
                  onChange={handleData}
                />
              </div>
            </section>

            <section>
              <div>
                <label htmlFor="">Saturación de oxígeno</label>
                <input
                  type="text"
                  value={evaluacion.saturacion}
                  name="saturacion"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">IMC</label>
                <input
                  type="text"
                  value={evaluacion.imc}
                  name="imc"
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor="">Pulso(pm)</label>
                <input
                  type="text"
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

            <section>
              <div>
                <label htmlFor="">Antecedentes CCM</label>
                <textarea
                  id=""
                  cols="30"
                  rows="10"
                  value={evaluacion.antecedentes}
                  name="antecedentes"
                  onChange={handleData}
                ></textarea>
              </div>
              <div>
                <label htmlFor="">Cargar EMO</label>
                <textarea
                  id=""
                  cols="30"
                  rows="10"
                  value={evaluacion.emo}
                  name="emo"
                  onChange={handleData}
                ></textarea>
              </div>
            </section>

            <div className="footer">
              <button>Registrar</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistroEvaluacion;
