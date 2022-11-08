import React, { useContext, useEffect } from "react";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { AiOutlineClose, AiFillEye, AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { PlanillaContext } from "../../../context/PlanillaContext";
import ModalCrearAsistencia from "./ModalCrearAsistencia";
import { CrudContext } from "../../../context/CrudContext";

const ModalControlAsistencia = ({ campamento }) => {
  const {
    setAsistencia,
    setControlAsistencia,
    controlAsistencia,
    campamentoAsistencia,
    setFechaId,
  } = useContext(PlanillaContext);

  const { getDataById, setData1, data1, deleteData } = useContext(CrudContext);

  const getAsistencia = async () => {
    const route = "asistencia";
    const response = await getDataById(route, campamentoAsistencia.id);
    setData1(response.data);
  };

  useEffect(() => {
    getAsistencia();
  }, []);

  const closeModal = () => {
    setAsistencia(false);
  };

  const handleEdit = (e) => {
    setControlAsistencia(true);
    setFechaId(e);
  };

  const handleDelete = (e) => {
    const route = "asistencia";
    console.log(e);
    deleteData(route, e.id).then((res) => {
      if (res.status === 200) {
        getAsistencia();
      }
    });
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row?.id,
    },
    {
      id: "fecha",
      name: "Fecha",
      sortable: true,
      selector: (row) => row?.fecha,
    },

    {
      id: "control",
      name: "Control",
      button: true,
      center: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ];

  return (
    <div className="modal-planilla">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Control asistencia
            <AiOutlineClose onClick={closeModal} />
          </section>
          <section className="buscador">
            <Buscador
              registrar={false}
              crear={true}
              exportar={false}
              cargar={false}
              actualizarTabla={getAsistencia}
            />
          </section>
          <div style={{ overflowY: "hidden" }}>
            <Tabla columns={planilla} table={data1} />
          </div>
        </div>
      </div>
      {controlAsistencia && <ModalCrearAsistencia data={data1} />}
    </div>
  );
};

export default ModalControlAsistencia;
