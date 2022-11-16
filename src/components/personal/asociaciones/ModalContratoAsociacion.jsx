import React, { useContext, useEffect } from "react";
import { PersonalContext } from "../../../context/PersonalContext";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import {
  alertaEditarExito,
  alertaError,
  alertaExito,
} from "../../../helpers/alertMessage";
import moment from "moment";

import "../styles/modalRegistrarContrato.css";
import { valuesContrato } from "../../../data/initalValues";
import { addDays } from "../../../helpers/calcularFechaFin";
const ModalContratoAsociacion = ({ actualizarTabla, selected, data }) => {
  const route = "contrato/asociacion";
  const route1 = "cargo";
  const route2 = "campamento";
  const route3 = "gerencia";
  const route4 = "area";
  const route5 = "socio";

  //valores iniciales de contrato
  const contratoValues = valuesContrato(data);

  const { setRegistrarContratoAsociacion, setDataToEdit, dataToEdit } =
    useContext(PersonalContext);

  const { createData, updateData, getData } = useContext(CrudContext);
  const [contratos, setContratos] = useState(contratoValues);
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
  useEffect(() => {
    getAll();
  }, []);

  const handleData = (e) => {
    const { name, value } = e.target;
    setContratos((values) => {
      return { ...values, [name]: value };
    });

    if (name === "recomendado_por") {
      const prueba = socio.filter((item) => item.nombre === value);
      const cooperativa = prueba.map(
        (item) => (contratos.cooperativa = item.cooperativa)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contratos.fecha_inicio || !contratos.fecha_fin) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(contratos, route)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            alertaExito(res.msg, res.status).then((res) => {
              closeModal();
              if (res.isConfirmed) {
                actualizarTabla();
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
      updateData(contratos, dataToEdit.id, "contrato")
        .then((res) => res.json())
        .then((res) => {
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
    setRegistrarContratoAsociacion(false);
    setDataToEdit(null);
    setContratos(contratoValues);
  };

  useEffect(() => {
    if (dataToEdit) {
      setContratos(dataToEdit);
    } else {
      setContratos(contratoValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    if (contratos.fecha_inicio !== "" && contratos.periodo_trabajo !== "") {
      let inicial = 14;
      let fechaInicio = contratos.fecha_inicio;
      let total = inicial * parseInt(contratos.periodo_trabajo);
      const date = addDays(fechaInicio, total);
      setContratos((prevState) => {
        return { ...prevState, fecha_fin: date };
      });
    } else {
      setContratos((prevState) => {
        return { ...prevState, fecha_fin: "" };
      });
    }
  }, [contratos.fecha_inicio, contratos.periodo_trabajo]);

  return (
    <div className="modal-contrato">
      {/* <div className="overlay"></div> */}
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? "Editar contrato" : "Registrar Contrato"}
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
                    value={contratos?.codigo_contrato}
                    name="codigo_contrato"
                    onChange={handleData}
                  ></input>
                </div>
                <div>
                  <label>Fecha de ingreso</label>
                  <input
                    type="date"
                    value={contratos?.fecha_inicio?.split("T")[0]}
                    name="fecha_inicio"
                    onChange={handleData}
                  ></input>
                </div>
                <div>
                  <label>Fecha de fin</label>
                  <input
                    type="date"
                    value={contratos?.fecha_fin?.split("T")[0]}
                    name="fecha_fin"
                    onChange={handleData}
                  ></input>
                </div>
                <div>
                  <label>Periodo de trabajo(quincena)</label>
                  <input
                    type="number"
                    value={contratos?.periodo_trabajo}
                    name="periodo_trabajo"
                    onChange={handleData}
                  ></input>
                </div>
              </section>
              <section>
                <div>
                  <label>Tipo de Contrato</label>
                  <select
                    value={contratos?.tipo_contrato}
                    name="tipo_contrato"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    <option value="Especias">Especias</option>
                    <option value="Planilla">Planilla</option>
                  </select>
                </div>
                <div>
                  <label>Gerencia</label>
                  <select
                    value={contratos?.gerencia}
                    name="gerencia"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    {gerencia.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Área</label>
                  <select
                    value={contratos?.area}
                    name="area"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccion</option>
                    {area.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Campamento</label>
                  <select
                    value={contratos?.campamento_id}
                    name="campamento_id"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    {campamento.map((item, i) => (
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
                  <select
                    value={contratos?.jefe_directo}
                    name="jefe_directo"
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
                  <label>Base</label>
                  <select
                    value={contratos?.base}
                    name="base"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    <option value="1">Lunar de Oro</option>
                    <option value="2">Rinconada</option>
                  </select>
                </div>
                <div>
                  <label>Volquete</label>
                  <input
                    type="number"
                    value={contratos?.volquete}
                    name="volquete"
                    onChange={handleData}
                  ></input>
                </div>
                <div>
                  <label>Teletrans</label>
                  <input
                    type="number"
                    value={contratos?.teletran}
                    name="teletran"
                    onChange={handleData}
                  ></input>
                </div>
              </section>
            </fieldset>

            {/* {data.tipo !== "Canteadores" ? (
              <fieldset>
                <legend>Recomendado</legend>
                <section>
                  <div>
                    <label>Recomendado por</label>
                    <select
                      value={contratos?.recomendado_por}
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
                      value={contratos?.cooperativa}
                    />
                  </div>

                  <div>
                    <label>Condición de cooperativa</label>
                    <select
                      value={contratos?.condicion_cooperativa}
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
            ) : (
              ""
            )} */}

            <fieldset>
              <legend>Termino de contrato</legend>
              <section>
                <div>
                  <label>Estado</label>
                  <select
                    value={contratos?.suspendido}
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
                    value={contratos?.termino_contrato}
                    name="termino_contrato"
                    onChange={handleData}
                  ></textarea>
                </div>
                <div>
                  <label>Nota de contrato</label>
                  <input
                    value={contratos?.nota_contrato}
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

export default ModalContratoAsociacion;
