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
import moment from "moment";
import { trabajadorContratoValues } from "../../../data/initalValues";

const ModalRegistrarContrato = ({ actualizarTrabajadores, actualizarTabla, selected, data, cerrarHistorial }) => {
  const route = "contrato";
  const route1 = "cargo";
  const route2 = "campamento";
  const route3 = "gerencia";
  const route4 = "area";
  const route5 = "socio";
  const contratoValues = trabajadorContratoValues(data);
  const { setRegistrarContrato, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);
  const { createData, updateData, getData } = useContext(CrudContext);
  const [contrato, setContrato] = useState(contratoValues);
  const [cargo, setCargo] = useState([]);
  const [campamento, setCampamento] = useState([]);
  const [gerencia, setGerencia] = useState([]);
  const [area, setArea] = useState([]);
  const [socio, setSocio] = useState([]);

  const getAll = async () => {
    const response1 = await getData(route1);
    const response2 = await getData(route2);
    const response3 = await getData(route3);
    const response4 = await getData(route4);
    const response5 = await getData(route5);

    setCargo(response1.data);
    setCampamento(response2.data);
    setGerencia(response3.data);
    setArea(response4.data);
    setSocio(response5.data);
  };

  const addDays = (date, daysToAdd) => {
    const WEEKEND = [moment().day("Sunday").weekday()];
    var daysAdded = 0,
      momentDate = moment(new Date(date));
    while (daysAdded < daysToAdd) {
      momentDate = momentDate.add(1, "days");
      if (!WEEKEND.includes(momentDate.weekday())) {
        daysAdded++;
      }
    }
    let fecha = momentDate._d?.toISOString().split("T")[0];

    setContrato((prevState) => {
      return { ...prevState, fecha_fin: fecha };
    });
  };
  useEffect(() => {
    if (dataToEdit) {
      setContrato(dataToEdit);
    } else {
      setContrato(contratoValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    if (contrato.fecha_inicio !== "" && contrato.periodo_trabajo !== "") {
      let inicial = 14;
      let fechaInicio = contrato.fecha_inicio;
      let total = inicial * parseInt(contrato.periodo_trabajo);
      addDays(fechaInicio, total);
    } else {
      setContrato((prevState) => {
        return { ...prevState, fecha_fin: "" };
      });
    }
  }, [contrato.fecha_inicio, contrato.periodo_trabajo]);

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
      createData(contrato, route).then((res) => {
        if (res.status === 200) {
          alertaExito(res.msg, res.status).then((res) => {
            closeModal();
            if (res.isConfirmed) {
              actualizarTabla();
              actualizarTrabajadores()
              cerrarHistorial(false)
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
      updateData(contrato, selected.id, route).then((res) => {
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
    setRegistrarContrato(false);
    setDataToEdit(null);
    setContrato(contratoValues);
  };
  return (
    <div className="modal-contrato">
      {/* <div className="overlay"></div> */}
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar contrato" : "Registrar contrato"}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section className="modal-body">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Contrato</legend>
              <section>
                <div>
                  <label>Código contrato</label>
                  <input
                    value={contrato?.codigo_contrato}
                    name="codigo_contrato"
                    onChange={handleData}
                  ></input>
                </div>
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
                  <label>Fecha de fin</label>
                  <input
                    type="date"
                    value={contrato?.fecha_fin}
                    name="fecha_fin"
                    onChange={handleData}
                    className="fecha_fin"
                  ></input>
                </div>
                <div>
                  <label>Periodo de trabajo (quincena)</label>
                  <input
                  type="number"
                    value={contrato?.periodo_trabajo}
                    name="periodo_trabajo"
                    onChange={handleData}
                  ></input>
                </div>
              </section>
              <section>
                <div>
                  <label>Tipo de Contrato</label>
                  <select
                    value={contrato?.tipo_contrato}
                    name="tipo_contrato"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    <option value="Especias">Especies</option>
                    <option value="Planilla">Planilla</option>
                  </select>
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
                {data &&
                data.trabajador &&
                data.trabajador.length > 0 ? null : (
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
                {data &&
                data.trabajador &&
                data.trabajador.length > 0 ? null : (
                  <div>
                    <label>Jefe Directo</label>
                    <select
                      value={contrato?.jefe_directo}
                      name="jefe_directo"
                      onChange={handleData}
                    >
                      <option value="-1">Seleccione</option>
                      {cargo &&
                        cargo.map((item, i) => (
                          <option key={i} value={item.nombre}>
                            {item.nombre}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                <div>
                  <label>Volquete</label>
                  <input
                    value={contrato?.volquete}
                    name="volquete"
                    onChange={handleData}
                  ></input>
                </div>
                <div>
                  <label>Teletrans</label>
                  <input
                    value={contrato?.teletran}
                    name="teletran"
                    onChange={handleData}
                  ></input>
                </div>
              </section>
            </fieldset>
            <fieldset>
              <legend>Termino de contrato</legend>
              <section>
                <div>
                  <label>Termino finalización</label>
                  <select
                    value={contrato?.suspendido}
                    name="suspendido"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    <option value={false}>Normal</option>
                    <option value={true}>Suspendido</option>
                  </select>
                </div>

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
            </fieldset>

            <div className="footer">
              {dataToEdit ? (
                <button>Editar</button>
              ) : (
                <button>Registrar</button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistrarContrato;
