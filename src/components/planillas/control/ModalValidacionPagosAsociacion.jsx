import React, { useContext, useEffect } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import Buscador from "../Buscador";
import Tabla from "../../tabla/Tabla";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Fechas from "./Fechas";

const ModalValidacionPagosAsociacion = ({ data }) => {
  const { setValidacionPagosAsociacion, setFechas, fechas } = useContext(PlanillaContext);
  const { getDataById, data3, setData3 } = useContext(CrudContext);

  const getTareoAsociacion = async () => {
    const route = "planilla/tareo/asociacion";
    const response = await getDataById(route, 10);
    setData3(response.data);
  };
  useEffect(() => {
    getTareoAsociacion();
  }, []);

  const closeModal = () => {
    setValidacionPagosAsociacion(false);
  };

  const dateData = (row) => {
    // setFechas(state => [...state, row])
    // <Fechas display={false} data={row} />
    return (
      <>
        <label>
          {row?.trabajador_asistencia?.map((item) => item.asistencia)}
        </label>
      </>
    );
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row?.id,
      width: "100px",
    },
    {
      id: "tareo",
      name: "Hoja de Tareo Asistencia de operaciones",
      sortable: true,
      center: true,
      selector: (row) => row?.nombre,
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
          <Tabla columns={planilla} table={data3} />
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
            >
              Validacion de Trabajador
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModalValidacionPagosAsociacion;
