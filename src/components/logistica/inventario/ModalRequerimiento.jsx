import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { requerimientoTable } from "../../../data/dataTable";
import { requerimientoValues } from "../../../data/initalValues";
import { alertaExito } from "../../../helpers/alertMessage";
import Tabla from "../../tabla/Tabla";

import "../styles/modalRequerimientos.css";

const ModalRequerimiento = ({ id, data }) => {
  const {
    dataToEdit,
    setModal3,
    createData,
    updateData,
    setDataToEdit,
    getData,
  } = useContext(CrudContext);

  const [codRequerimiento, setCodRequerimiento] = useState("");
  const initialValues = requerimientoValues(id);
  const [requerimiento, setRequerimiento] = useState(initialValues);
  const [text, setText] = useState("");
  const [search, setSearch] = useState([]);
  const [newJson, setNewJson] = useState([]);
  const [key, setKey] = useState("");
  const [agregar, setAgregar] = useState("");
  const [area, setArea] = useState([]);
  const [idRequerimiento, setIdRequerimiento] = useState("");

  const closeModal = () => {
    setModal3(false);
    setDataToEdit(null);
  };

  const getRequerimientoCodigo = async () => {
    const route = "requerimiento";
    const route1 = "area";

    const response = await getData(route);
    const response1 = await getData(route1);

    setCodRequerimiento(response.data[response.data.length - 1].id);
    setArea(response1.data);
  };

  useEffect(() => {
    getRequerimientoCodigo();
  }, []);

  useEffect(() => {
    if (dataToEdit !== null) {
      setRequerimiento(dataToEdit);
    } else {
      setRequerimiento(initialValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    if (text !== "") {
      const filterProducto = data?.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase())
      );

      const formatData =
        filterProducto.length > 0 &&
        filterProducto.map((item) => {
          return {
            codigo_producto: item.codigo,
            codigo: requerimiento.codigo,
            fecha_pedido: requerimiento.fecha_pedido,
            fecha_entrega: requerimiento.fecha_entrega,
            solicitante: requerimiento.solicitante,
            area: requerimiento.area,
            celular: requerimiento.celular,
            proyecto: requerimiento.proyecto,
            producto_id: item.id,
            descripcion: item.nombre,
            cantidad: requerimiento.cantidad,
            unidad: item.unidad,
            almacen_id: id,
          };
        });

      if (formatData.length !== 0 && key === "Enter") {
        setSearch([formatData[0]]);
        if (agregar !== "") {
          let newState = [requerimiento];

          newState[0].producto = "";
          newState[0].categoria = "";
          newState[0].cantidad = "";
          setNewJson((current) => [...current, search[0]]);
          setSearch([]);
        }
      } else {
        setSearch([]);
      }
    } else {
      setSearch([]);
    }

    if (idRequerimiento !== "") {
      console.log((newJson[idRequerimiento].cantidad));
      newJson[idRequerimiento].cantidad = requerimiento.cantidad;
    }
  }, [text, requerimiento, key, agregar]);


  useEffect(() => {
    if (newJson.length !== 0) {
      setKey("");
      setAgregar("");
    }
  }, [newJson]);

  const handleData = (e, i) => {
    const { name, value } = e.target;
    setRequerimiento((values) => {
      return { ...values, [name]: value };
    });

    if (i !== undefined) {
      setIdRequerimiento(i);
    }
  };

  const handleSubmit = async (e) => {
    let route = "requerimiento";
    e.preventDefault();

    if (dataToEdit === null) {
      const response = await createData(newJson, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
      }
    } else {
      const response = await updateData(newJson, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
      }
    }
  };


  const handleDelete = (e) => {
    setNewJson((current) =>
      current.filter((item) => item.producto_id !== e.producto_id)
    );
  };

  const columns = requerimientoTable(handleData, handleDelete);

  return (
    <div className="modal-requerimientos">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          Registrar requerimiento
          {/* {dataToEdit ? `Editar ${tipo}` : `Registrar ${tipo}`} */}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body">
            <section>
              <div>
                <label>Código requerimiento</label>
                <input
                  disabled
                  value={requerimiento.codigo}
                  type="text"
                  name="codigo"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Fecha de Pedido</label>
                <input
                  value={requerimiento.fecha_pedido}
                  type="date"
                  name="fecha_pedido"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Fecha de entrega</label>
                <input
                  value={requerimiento.fecha_entrega}
                  type="date"
                  name="fecha_entrega"
                  onChange={handleData}
                ></input>
              </div>
            </section>

            <section>
              <div>
                <label>Nombre solicitante</label>
                <input
                  value={requerimiento.solicitante}
                  type="text"
                  name="solicitante"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Área</label>

                <select
                  name="area"
                  value={requerimiento.area}
                  onChange={handleData}
                >
                  <option value="-1">Seleccione</option>
                  {area.map((item, i) => (
                    <option key={i} value={item.nombre}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Celular</label>
                <input
                  value={requerimiento.celular}
                  type="text"
                  name="celular"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Proyecto/Actividad</label>
                <input
                  value={requerimiento.proyecto}
                  type="text"
                  name="proyecto"
                  onChange={handleData}
                ></input>
              </div>
            </section>

            <section>
              <div>
                <label>Productos</label>
                <input
                  type="text"
                  name="producto"
                  value={requerimiento.producto}
                  onKeyDown={(e) => setKey(e.key)}
                  onChange={(e) => {
                    handleData(e);
                    setText(e.target.value);
                  }}
                ></input>
              </div>

              {/* <div>
                <label>Cantidad</label>
                <input
                  value={requerimiento.cantidad}
                  type="text"
                  name="cantidad"
                  onChange={handleData}
                ></input>
              </div> */}
              {/* <div>
                <label>Unidades</label>
                <input
                  value={requerimiento.unidad}
                  type="text"
                  name="unidad"
                  onChange={handleData}
                ></input>
              </div> */}
              <div className="agregar">
                <button type="button" onClick={() => setAgregar("agregar")}>
                  <AiOutlineCheck />
                </button>
              </div>
            </section>
            <br />
            <br />
            {search.length !== 0 ? (
              <Tabla columns={columns} table={search} />
            ) : (
              <Tabla columns={columns} table={newJson} />
            )}
          </form>
          <div className="button-container">
            {newJson.length !== 0 ? (
              <button onClick={handleSubmit}>Guardar</button>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModalRequerimiento;
