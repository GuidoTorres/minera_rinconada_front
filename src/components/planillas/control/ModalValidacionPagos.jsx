import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import "../style/modalValidacionPagos.css";
import ModalVerificacion from "./ModalVerificacion";
import { validacionPagos } from "../../../data/dataTable";
import useSearch from "../../../hooks/useSearch";

const ModalValidacionPagos = ({ data }) => {
  const { setValidacionPagos, verificacion, setVerificacion } =
    useContext(PlanillaContext);
  const { getDataById, data2, setData2 } = useContext(CrudContext);
  const [text, setText] = useState();
  const { result } = useSearch(data2);
  const getTareo = async () => {
    const route = "planilla/tareo";
    const response = await getDataById(route, data.dni);
    setData2(response.data);
  };
  useEffect(() => {
    getTareo();
  }, []);

  const modalVerificacion = (data) => {
    setVerificacion(true);
    setText(data);
  };

  const closeModal = () => {
    setValidacionPagos(false);
  };

  const columns = validacionPagos();

  return (
    <>
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
            <section style={{ paddingLeft: "30px", paddingRight: "30px" }}>
              <div>
                <label htmlFor="">
                  Nombre:{" "}
                  {data &&
                    [data].map((item) => (item.nombre ? item.nombre : "----"))}
                </label>
              </div>

              <div style={{ display: "flex", gap: "50px", marginTop: "10px" }}>
                <div>
                  <label htmlFor="">
                    Dni:{" "}
                    {data &&
                      [data].map((item) => (item.dni ? item.dni : "----"))}
                  </label>
                </div>
                <div>
                  <label htmlFor="">
                    Tel??fono:{" "}
                    {data &&
                      [data].map((item) =>
                        item.telefono ? item.telefono : "----"
                      )}
                  </label>
                </div>
                {/* <div>
                  <label htmlFor="">Cargo:</label>
                </div> */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5px",
                    gap: "150px",
                  }}
                ></div>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="">
                    Total de d??as asistidos:{" "}
                    {
                      data2.filter((item) => item.asistencia === "Asistio")
                        .length
                    }
                  </label>
                </div>
              </div>
            </section>
            <Tabla columns={columns} table={result} />

            <section
              style={{
                paddingLeft: "30px",
                display: "flex",
                gap: 20,
                paddingRight: "30px",
                marginBottom: "20px"
              }}
            >
              <button
                style={{
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: "6px",
                  border: "1px solid grey",
                }}
                onClick={() => modalVerificacion("Verificaci??n Gerente de Op.")}
              >
                Verificaci??n Gerente de Op.
              </button>
              <button
                style={{
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: "6px",
                  border: "1px solid grey",
                }}
                onClick={() =>
                  modalVerificacion("Verificaci??n Jefe de Operaciones")
                }
              >
                Verificaci??n Jefe de Operaciones
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
      </div>
      {verificacion && <ModalVerificacion text={text} />}
    </>
  );
};

export default ModalValidacionPagos;
