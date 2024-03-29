import React, { useContext, useEffect, useState, useRef } from "react";
import { CrudContext } from "../../../context/CrudContext";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import ModalRegistroPersonal from "./ModalRegistroPersonal";
import ModalHistorialContrato from "./ModalHistorialContrato";
import ModalHistorialEvaluacion from "./ModalHistorialEvaluacion";
import "../styles/personalLayout.css";
import { personalLayout } from "../../../data/dataTable";
import useSearch from "../../../hooks/useSearch";
import { notificacion } from "../../../helpers/mensajes";
import Cargando from "../../cargando/Cargando";
import { Empty } from "antd";

const PersonalLayout = () => {
  const route = "trabajador";

  const {
    getData,
    deleteData,
    data,
    setData,
    updateData,
    setDataToEdit,
    modal,
    setModal,
    modal1,
    setModal1,
    modal2,
    setModal2,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [id, setId] = useState("");
  const [search, setSearch] = useState([]);
  const { result } = useSearch(data);
  const inputFileRef = useRef(null);
  const [trabajorEvaluacion, setTrabajadorEvaluacion] = useState([])
  const [trabajorContrato, setTrabajadorContrato] = useState([])


  const getTrabajadores = async () => {
    setCargando(true);
    const response = await getData(route);

    if (response) {
      setCargando(false);
      setData(response.data);
    }
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (e) => {
    const route = "trabajador";
    const response = await deleteData(route, e);

    if (response) {
      notificacion(response.status, response.msg);
      getTrabajadores();
    }
  };

  const handleEvaluacion = (e) => {
    setModal1(true);
    setId(e);
    setTrabajadorEvaluacion(e.evaluacion)
  };
  const handleContrato = (e) => {
    setModal2(true);
    setId(e.dni);
    setTrabajadorContrato(e)
  };

  const deshabilitarTrabajador = (e, data) => {
    const route = "trabajador";
    const json = {
      deshabilitado: e.target.checked,
    };
    updateData(json, data.dni, route);
  };

  useEffect(() => {
    getTrabajadores();
  }, []);

  const columns = personalLayout(
    handleEvaluacion,
    handleContrato,
    deshabilitarTrabajador,
    handleEdit,
    handleDelete
  );

  return (
    <>
      <Header text={"Trabajadores"} user={"Usuario"} ruta={"/personal"} />

      <div className="margenes">
        <Buscador
          abrirModal={setModal}
          importar={true}
          registrar={true}
          actualizarTrabajadores={getTrabajadores}
        />
        {data.length > 0 ? (
          <Tabla columns={columns} table={result} />
        ) : (
          <div className="noData">
            {cargando ? (
              <Cargando />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>No hay registros para mostrar.</span>}
              />
            )}
          </div>
        )}
      </div>


      {modal && <ModalRegistroPersonal actualizarTabla={getTrabajadores} data={data} />}

      {modal1 && (
        <ModalHistorialEvaluacion
          selected={id}
          actualizarTrabajador={getTrabajadores}
          data={trabajorEvaluacion}
        />
      )}
      {modal2 && (
        <ModalHistorialContrato
          selected={id}
          actualizarTrabajadores={getTrabajadores}
          data={trabajorContrato}
          
        />
      )}
    </>
  );
};

export default PersonalLayout;
