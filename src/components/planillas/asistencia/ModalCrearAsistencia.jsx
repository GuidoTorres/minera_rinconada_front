import React, { useContext, useEffect } from "react";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";

import { PlanillaContext } from "../../../context/PlanillaContext";
import { CrudContext } from "../../../context/CrudContext";

const ModalCrearAsistencia = ({ data }) => {
  const { setControlAsistencia, campamentoAsistencia, fechaId } =
    useContext(PlanillaContext);
  const { getDataById2, data2, setData2, createData } = useContext(CrudContext);

  const getTrabajadorAsistencia = async () => {
    const route = "asistencia/trabajador";
    const response = await getDataById2(
      route,
      campamentoAsistencia.id,
      fechaId.id
    );
    setData2(response.data);
  };
  useEffect(() => {
    getTrabajadorAsistencia();
  }, []);

  const closeModal = () => {
    setControlAsistencia(false);
  };

  const handleAsistencia = async (event, e) => {
    const route = "asistencia/trabajador";
    const info = {
      asistencia_id: fechaId.id,
      trabajador_id: e.id,
      asistencia: event.target.value,
    };
    const response = await createData(info, route);
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row?.id ,
    },
    {
      id: "dni",
      name: "Dni",
      sortable: true,
      width: "25%",
      center: true,
      selector: (row) => row?.dni,
    },
    {
      id: "trabajador",
      name: "Nombre del trabajador",
      sortable: true,
      width: "25%",
      center: true,
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
    },

    {
      id: "asistencia",
      name: "Asistencia",
      button: true,
      center: true,
      cell: (e) =>
        // e.trabajador_asistencia.asistencia
          <select
            defaultValue={e?.trabajador_asistencia?.map(item => {return item.asistencia})}
            onChange={(event) => handleAsistencia(event, e)}
          >
            <option value="-1">Seleccione</option>
            <option value="Asistio">Asistio</option>
            <option value="Falto">Falto</option>
            <option value="Permiso">Permiso</option>
            <option value="Dia Libre">Dia Libre</option>
            <option value="Comisión">Comisión</option>
          </select>
        ,
    },

    {
      id: "tipo_trabajador",
      name: "Tipo de trabajador",
      sortable: true,
      width: "25%",
      center: true,
      selector: (row) =>
        row?.asociacion_id === null ? "Normal" : "Asociacion",
    },
  ];
  return (
    <div className="modal-planilla">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Lista de Asistencia
            <AiOutlineClose onClick={closeModal} />
          </section>
          <section className="buscador">
            <Buscador
              registrar={false}
              crear={false}
              exportar={true}
              cargar={true}
            />
          </section>
          <Tabla columns={planilla} table={data2} />
        </div>
      </div>
    </div>
  );
};

export default ModalCrearAsistencia;
