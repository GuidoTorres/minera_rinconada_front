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
const ModalRegistrarContrato = ({ actualizarTabla, selected, data }) => {
  const route = "contrato";
  const route1 = "cargo";
  const route2 = "campamento";
  const route3 = "gerencia";
  const route4 = "area";
  const route5 = "socio";
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
    const cargoData = await getData(route1);
    const campamentoData = await getData(route2);
    const gerenciaData = await getData(route3);
    const areaData = await getData(route4);
    const socioData = await getData(route5);

    const all = await Promise.all([
      cargoData,
      campamentoData,
      gerenciaData,
      areaData,
      socioData,
    ]);

    setCargo(all[0].data);
    setCampamento(all[1].data);
    setGerencia(all[2].data);
    setArea(all[3].data);
    setSocio(all[4].data);
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

    if (name === "recomendado_por") {
      const prueba = socio.filter((item) => item.nombre === value);
      const cooperativa = prueba.map(
        (item) => (contrato.cooperativa = item.cooperativa)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contrato.fecha_inicio || !contrato.codigo_contrato) {
      alertaError();
    } else if (dataToEdit === null) {
      createData(contrato, route)
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
      updateData(contrato, selected.id, route)
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
                  <label>C??digo contrato</label>
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
                  <label>??rea</label>
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
              <legend>Recomendado</legend>
              <section>
                <div>
                  <label>Recomendado por</label>
                  <select
                    value={contrato?.recomendado_por}
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
                    value={contrato?.cooperativa}
                  />
                </div>

                <div>
                  <label>Condici??n cooperativa</label>
                  <select
                    value={contrato?.condicion_cooperativa}
                    name="condicion_cooperativa"
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    <option value="Hijo">Hijo</option>
                    <option value="Sobrino">Sobrino</option>
                    <option value="Primo">Primo</option>
                    <option value="Tio">Tio</option>
                    <option value="Tio">Compadre</option>
                    <option value="Tio">Compa??ero</option>
                    <option value="Tio">Amigo</option>
                  </select>
                </div>
              </section>
            </fieldset>

            <fieldset>
              <legend>Termino de contrato</legend>
              <section>
                <div>
                  <label>Termino finalizaci??n</label>
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
                  <label>T??rmino de contrato</label>
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
              {dataToEdit ? <button>Editar</button> : <button>Registar</button>}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRegistrarContrato;
