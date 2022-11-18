import React, { useContext, useEffect } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import Buscador from "../Buscador";
import Tabla from "../../tabla/Tabla";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Fechas from "./Fechas";
import "../style/modalValidacionPagosAsociacion.css";
import ModalVerificacionAsociacion from "./ModalVerificacionAsociacion";
import { useState } from "react";
const ModalValidacionPagosAsociacion = ({ data }) => {
  const {
    setValidacionPagosAsociacion,
    setFechas,
    fechas,
    verificacion,
    setVerificacion,
  } = useContext(PlanillaContext);
  const { getDataById, data3, setData3 } = useContext(CrudContext);
  const [text, setText] = useState();

  const getTareoAsociacion = async () => {
    const route = "planilla/tareo/asociacion";
    const response = await getDataById(route, data.id);
    setData3(response.data);
  };
  console.log(data3);
  useEffect(() => {
    getTareoAsociacion();
  }, []);

  const modalVerificacion = (data) => {
    setVerificacion(true);
    setText(data);
  };

  const closeModal = () => {
    setValidacionPagosAsociacion(false);
  };

  useEffect(() => {
    setFechas(data3);
  }, [data3]);

  const dateData = (row) => {
    return (
      <>
        <label>
          {row?.trabajador_asistencia?.map((item) =>
            item.asistencia === "Permiso"
              ? "P "
              : item.asistencia === "Asistio"
              ? "X "
              : item.asistencia === "Falto"
              ? "F "
              : item.asistencia === "Dia libre"
              ? "DL "
              : item.asistencia === "Comision"
              ? "C "
              : ""
          )}
        </label>
      </>
    );
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
      width: "100px",
    },
    {
      id: "tareo",
      name: "Hoja de Tareo Asistencia de operaciones",
      sortable: true,
      center: true,
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
    },
    {
      // en name usar row.fecha para jalar las fechas dinamiacmente
      id: "Asistencia",
      name: <Fechas />,
      selector: (row) => dateData(row),
      sortable: true,
    },
  ];

  return (
    <div className="modal-validacion">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Hoja de Tareo
            <AiOutlineClose onClick={closeModal} />
          </section>
          <section className="buscador">
            <Buscador
              registrar={false}
              crear={false}
              exportar={true}
              cargar={false}
            />
          </section>
          <section style={{ paddingLeft: "30px" }}>
            <div>
              <label htmlFor="">
                Nombre: {data && data?.nombre ? data.nombre : "---"}
              </label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "5px",
              }}
            >
              <div>
                <label htmlFor="">
                  Dni: {data && data?.dni ? data.dni : "---"}
                </label>
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label htmlFor="">
                  Teléfono: {data && data?.telefono ? data.telefono : "---"}
                </label>
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label htmlFor="">
                  Cargo: {data && data?.cargo ? data.cargo : "---"}
                </label>
              </div>
            </div>
          </section>
          {/* <Tabla columns={planilla} table={data3} /> */}
          <section className="table-container">
            <table>
              {data3?.map((item) => {
                return (
                  <tr>
                    <th>Nro</th>
                    <th>Hoja de tareo asistencia de operacion</th>

                    {item?.fechas.map((data) => (
                      <th style={{ height: "110px", position: "relative" }}>
                        {" "}
                        <span
                          style={{
                            bottom: "5px",
                            left: "50%",
                            position: "absolute",
                            transform: "rotate(-90deg)",
                            transformOrigin: "center left",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {data?.dia}
                        </span>
                      </th>
                    ))}
                  </tr>
                );
              })}
              {data3?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {item?.nombre +
                      " " +
                      item?.apellido_paterno +
                      " " +
                      item?.apellido_materno}
                  </td>
                  {item?.trabajador_asistencia?.map((data) => (
                    <td>
                      {data.asistencia === "Permiso"
                        ? "P "
                        : data.asistencia === "Asistio"
                        ? "X "
                        : data.asistencia === "Falto"
                        ? "F "
                        : data.asistencia === "Dia libre"
                        ? "DL "
                        : data.asistencia === "Comision"
                        ? "C "
                        : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </table>
          </section>

          {/* <div style={{ paddingLeft: "30px", marginTop: "5px" }}>
            <label htmlFor="">Total de días asistidos:</label>
          </div> */}
          <section
            style={{
              paddingLeft: "30px",
              marginTop: "20px",
              display: "flex",
              gap: 20,
              paddingRight: "30px",
            }}
          >
            <button
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "6px",
                border: "1px solid grey",
              }}
              onClick={() => modalVerificacion("Verificación Gerente de Op.")}
            >
              Verificación Gerente de Op.
            </button>
            <button
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "6px",
                border: "1px solid grey",
              }}
              onClick={() =>
                modalVerificacion("Verificación Jefe de Operaciones")
              }
            >
              Verificación Jefe de Operaciones
            </button>
            <button
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "6px",
                border: "1px solid grey",
              }}
              onClick={() => modalVerificacion("Validacion de Trabajador")}
            >
              Validacion de Trabajador
            </button>
          </section>
        </div>
      </div>
      {verificacion && <ModalVerificacionAsociacion text={text} />}
    </div>
  );
};

export default ModalValidacionPagosAsociacion;
