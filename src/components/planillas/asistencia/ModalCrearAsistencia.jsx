import React, { useContext, useEffect } from "react";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";

import { PlanillaContext } from "../../../context/PlanillaContext";
import { CrudContext } from "../../../context/CrudContext";
import { crearAsistencia } from "../../../data/dataTable";

import "../style/modalCrearAsistencia.css";

const ModalCrearAsistencia = ({ data, actualizarTabla }) => {
  const { setControlAsistencia, fechaId } = useContext(PlanillaContext);
  const { getDataById, data2, setData2, createData, updateData } =
    useContext(CrudContext);

  const getTrabajadorAsistencia = async () => {
    const route = "asistencia/trabajador";
    const response = await getDataById(route, fechaId.id);
    setData2(response.data);
  };
  useEffect(() => {
    getTrabajadorAsistencia();
  }, []);

  const closeModal = () => {
    setControlAsistencia(false);
    setData2([]);
  };

  const handleAsistencia = async (event, e) => {
    const route = "asistencia/trabajador";
    const info = {
      asistencia_id: fechaId.id,
      trabajador_id: e.dni,
      asistencia: event.target.value,
    };
    const response = await createData(info, route).then((res) => {
      if (res.status === 200) {
        getTrabajadorAsistencia();
      }
    });
  };

  const handleIngreso = async (e) => {
    const route = "asistencia/hora_ingreso";
    let obj = {
      hora_ingreso: e.target.value,
    };

    const response = await updateData(obj, data.id, route);
    if (response.status === 200) {
      actualizarTabla();
    }
  };

  const columns = crearAsistencia(handleAsistencia);
  return (
    <div className="modal-asistencia">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Lista de Asistencia
            <AiOutlineClose onClick={closeModal} />
          </section>
          <div className="hora-ingreso">
            <label htmlFor="">Hora de ingreso:</label>
            <input
              type="time"
              name="hora_ingreso"
              defaultValue={data?.hora_ingreso || "07:00"}
              onChange={handleIngreso}
            />
          </div>
          <section className="buscador">
            <Buscador
              registrar={false}
              crear={false}
              exportar={false}
              cargar={true}
              actualizar={actualizarTabla}
              actualizarTabla={getTrabajadorAsistencia}
            />
          </section>
          <Tabla columns={columns} table={data2} />
        </div>
      </div>
    </div>
  );
};

export default ModalCrearAsistencia;
