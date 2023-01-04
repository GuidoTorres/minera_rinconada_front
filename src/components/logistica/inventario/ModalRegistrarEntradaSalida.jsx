import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import {
  entradas,
  productoEntrada,
  registrarEntrada,
} from "../../../data/dataTable";
import { entradaSalidaValues } from "../../../data/initalValues";
import { alertaExito } from "../../../helpers/alertMessage";
import Tabla from "../../tabla/Tabla";
import "../styles/modalRegistrarEntrada.css";
import ModalRegistrarProducto from "./ModalRegistrarProducto";

const ModalRegistrarEntradaSalida = ({ data, almacen_id }) => {
  const {
    dataToEdit,
    setModal2,
    tipo,
    setDataToEdit,
    createData,
    updateData,
    modal,
    setModal,
    getData,
  } = useContext(CrudContext);
  const [text, setText] = useState("");
  const [search, setSearch] = useState([]);
  const initialValues = entradaSalidaValues(tipo, almacen_id);
  const [entrada, setEntrada] = useState(initialValues);
  const [newJson, setNewJson] = useState([]);
  const [key, setKey] = useState("");
  const [agregar, setAgregar] = useState("");
  const [area, setArea] = useState([]);
  const [entradaId, setEntradaId] = useState([]);

  const getArea = async () => {
    const route = "area";
    const route1 = `entrada`;
    const response = await getData(route);
    const response1 = await getData(route1);
    setArea(response.data);
    setEntradaId(response1.data);
  };

  useEffect(() => {
    getArea();
  }, []);

  const closeModal = () => {
    setModal2(false);
    setDataToEdit(null);
  };
  useEffect(() => {
    if (dataToEdit !== null) {
      setEntrada(dataToEdit);

      const product = dataToEdit?.producto_entrada_salidas.map(
        (item) => {
          return{
            cantidad: item.cantidad,
            almacen_id: item.producto.almacen_id,
            categoria: item.producto.categoria,
            codigo: item.producto.codigo,
            codigo_barras: item.producto.codigo_barras,
            descripcion: item.producto.descripcion,
            fecha:item.producto.fecha,
            id: item.producto.id,
            nombre: item.producto.nombre,
            stock: item.producto.stock,
            unidad: item.producto.unidad



          }
        }
      );
      setNewJson(product);
    } else {
      setEntrada(initialValues);
    }
  }, [dataToEdit]);
  console.log(newJson);

  useEffect(() => {
    if (text !== "") {
      const filterProducto = data?.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase())
      );

      const formatData =
        tipo === "entrada" && filterProducto.length > 0
          ? filterProducto.map((item) => {
              return {
                id: item.id,
                codigo_producto: item.codigo,
                nombre: item.nombre,
                cantidad: isNaN(
                  parseInt(item.stock) + parseInt(entrada.cantidad)
                )
                  ? parseInt(item.stock)
                  : parseInt(item.stock) + parseInt(entrada.cantidad),
                unidad: item.unidad,
                boleta: entrada.boleta,
                motivo: entrada.motivo,
                categoria: entrada.categoria,
                codigo:
                  "000" + (parseInt(entradaId[entradaId.length - 1]?.id) + 1),
                codigo_compra: entrada.codigo_compra,
                codigo_requerimiento: entrada.codigo_requerimiento,
                encargado: entrada.encargado,
                fecha: entrada.fecha,
                producto_id: item.id,
                tipo: entrada.tipo,
                almacen_id: almacen_id,
                producto: entrada.producto,
              };
            })
          : tipo === "salida" && filterProducto.length > 0
          ? filterProducto.map((item) => {
              return {
                id: item.id,
                codigo_producto: item.codigo,
                nombre: item.nombre,
                cantidad: isNaN(
                  parseInt(item.stock) - parseInt(entrada.cantidad)
                )
                  ? parseInt(item.stock)
                  : parseInt(item.stock) - parseInt(entrada.cantidad),
                unidad: item.unidad,
                boleta: entrada.boleta,
                motivo: entrada.motivo,
                categoria: entrada.categoria,
                codigo:
                  "000" + (parseInt(entradaId[entradaId.length - 1]?.id) + 1),
                codigo_compra: entrada.codigo_compra,
                codigo_requerimiento: entrada.codigo_requerimiento,
                encargado: entrada.encargado,
                fecha: entrada.fecha,
                producto_id: item.id,
                tipo: entrada.tipo,
                almacen_id: almacen_id,
                area: entrada.area,
                personal: entrada.personal,
              };
            })
          : "";

      if (formatData.length !== 0 && key === "Enter") {
        setSearch([formatData[0]]);

        if (agregar !== "") {
          let newState = [entrada];

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
  }, [text, entrada, key, agregar]);

  useEffect(() => {
    if (newJson.length !== 0) {
      setKey("");
      setAgregar("");
    }
  }, [newJson]);

  const handleSubmit = async (e) => {
    let route = "entrada";
    e.preventDefault();
    if (dataToEdit === null) {
      const response = await createData(newJson, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    } else {
      const response = await updateData(newJson, dataToEdit.id, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
        closeModal();
        actualizarTabla();
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setEntrada((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleDelete = (e) => {
    console.log(newJson);
    console.log(e);
    if (dataToEdit !== null) {
      setNewJson((current) => current.filter((item) => item.id !== e.id));
    } else {
      setNewJson((current) =>
        current.filter((item) => item.producto_id !== e.producto_id)
      );
    }
  };
  const columns = registrarEntrada(handleData, handleDelete, entrada.cantidad);

  return (
    <div className="modal-producto">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? `Editar ${tipo}` : `Registrar ${tipo}`}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body">
            <section className="container">
              <div>
                <label>Código</label>
                <input
                  value={
                    "000" + (parseInt(entradaId[entradaId.length - 1]?.id) + 1)
                  }
                  type="text"
                  name="codigo"
                  disabled
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Motivo de {tipo}</label>
                <input
                  value={entrada.motivo}
                  type="text"
                  name="motivo"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Fecha de {tipo}</label>
                <input
                  type="date"
                  name="fecha"
                  value={entrada.fecha}
                  onChange={handleData}
                ></input>
              </div>
            </section>

            <section className="container">
              <div>
                {tipo === "entrada" ? (
                  <>
                    <label>Encargado</label>
                    <input
                      type="text"
                      name="encargado"
                      value={entrada.encargado}
                      onChange={handleData}
                    ></input>
                  </>
                ) : (
                  <>
                    <label>Área</label>

                    <select
                      name="area"
                      value={entrada.area}
                      onChange={handleData}
                    >
                      <option value="-1">Seleccione</option>

                      {area.map((item) => (
                        <option value={item.nombre}>{item.nombre}</option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <div>
                {tipo === "entrada" ? (
                  <>
                    <label>Código orden de compra</label>
                    <input
                      type="text"
                      name="codigo_compra"
                      value={entrada.codigo_compra}
                      onChange={handleData}
                    ></input>
                  </>
                ) : (
                  <>
                    <label>Personal</label>
                    <input
                      type="text"
                      name="personal"
                      value={entrada.personal}
                      onChange={handleData}
                    ></input>
                  </>
                )}
              </div>
              <div>
                {tipo === "entrada" ? (
                  <>
                    <label>Boleta/Factura</label>
                    <input
                      type="text"
                      name="boleta"
                      value={entrada.boleta}
                      onChange={handleData}
                    ></input>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {tipo === "entrada" ? (
                  <>
                    <label>Código de requerimiento</label>
                    <input
                      type="text"
                      name="codigo_requerimiento"
                      value={entrada.codigo_requerimiento}
                      onChange={handleData}
                    ></input>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </section>

            <section className="container">
              <div className={tipo === "entrada" ? "productos" : "producto"}>
                <div>
                  <label>Productos</label>
                  <input
                    type="text"
                    name="producto"
                    value={entrada.producto}
                    onKeyDown={(e) => setKey(e.key)}
                    onChange={(e) => {
                      handleData(e);
                      setText(e.target.value);
                    }}
                  ></input>
                </div>
                {tipo === "entrada" ? (
                  <div className="agregar">
                    <button type="button" onClick={() => setModal(true)}>
                      +
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="productos">
                <div>
                  <label>Categoría</label>
                  <input
                    type="text"
                    name="categoria"
                    onChange={handleData}
                    value={entrada.categoria}
                  ></input>
                </div>
                <div className="agregar">
                  <button type="button" onClick={() => setAgregar("agregar")}>
                    <AiOutlineCheck />
                  </button>
                </div>
              </div>
            </section>

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
      {modal && <ModalRegistrarProducto />}
    </div>
  );
};

export default ModalRegistrarEntradaSalida;
