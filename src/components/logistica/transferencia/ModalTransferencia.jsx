import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { transferenciaLayout } from "../../../data/dataTable";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import { Select, DatePicker, Form } from "antd";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import "../styles/transferenciaLayout.css";
import { alertaExito } from "../../../helpers/alertMessage";
import Swal from "sweetalert2";
const ModalTransferencia = () => {

    const { getData, createData, dataToEdit, setModal } = useContext(CrudContext);

    const initialValues = {
      origen: "",
      fecha: "",
      producto: "",
      destino: "",
      cantidad: "",
    };
  
    const [almacen, setAlmacen] = useState([]);
    const [producto, setProducto] = useState([]);
    const [productoFinal, setProductoFinal] = useState([]);
  
    const [almacenDestino, setAlmacenDestino] = useState([]);
    const [transferencia, setTransferencia] = useState(initialValues);
    const [tabla, setTabla] = useState([]);
    const [newJson, setNewJson] = useState([]);
    const [idCantidad, setIdCantidad] = useState("");
  
    const fetchData = async () => {
      const response = await getData("almacen");
      const response1 = await getData("producto");
  
      setAlmacen(response.data);
      setProducto(response1.data);
    };

    const closeModal = () =>{

      setModal(false)
    }
  
    useEffect(() => {
      const filterProductoOrigen = producto.filter(
        (item) => transferencia.origen == item.almacen_id
      );
      const filterAlmacen = almacen.filter(
        (item) => parseInt(transferencia.origen) !== item.id
      );
      setProductoFinal(filterProductoOrigen);
      setAlmacenDestino(filterAlmacen);
    }, [transferencia]);
  
    const handleChange = (e, i) => {
      const { name, value } = e.target;
      setTransferencia((values) => {
        return { ...values, [name]: value };
      });
      if (i !== undefined) {
        setIdCantidad(i);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    useEffect(() => {
      let formatData;
      let filterIfRepeated;
      if (transferencia.producto !== "") {
        let filterProducto = producto.filter(
          (item) => item.id == transferencia.producto
        );
  
        //Dar formato a la data para el post
        formatData = filterProducto.map((item) => {
          let temp = filterProducto.find(
            (ele) => ele.id === transferencia.producto
          );
          return {
            almacen_origen: transferencia.origen,
            almacen_destino: transferencia.destino,
            producto_id: item.id,
            codigo_interno: item.codigo_interno,
            fecha: transferencia.fecha,
            codigo: item.codigo,
            nombre: item.nombre,
            stock: item.stock,
            id: item.id,
            stock_origen: parseInt(item.stock),
          };
        });
  
        filterIfRepeated = formatData.filter(
          (item) => !tabla.some((item2) => item.id == item2.id)
        );
      }
  
      if (
        filterIfRepeated?.length !== 0 &&
        transferencia.destino &&
        transferencia.origen &&
        transferencia.fecha
      ) {
        //filtrar si el producto esta en el almacen de destino
        let filterDestino = producto.filter(
          (item) => item.almacen_id == transferencia.destino
        );
  
        // filtrar si tienen el mismo codigo interno
        let filterProductoDestino = filterDestino.filter((item) =>
          formatData.some((item2) => item.codigo_interno === item2.codigo_interno)
        );
  
        let newArray = formatData.map((item) => {
          return {
            almacen_origen: item.almacen_origen,
            almacen_destino: item.almacen_destino,
            producto_origen: item.producto_id,
            codigo_interno: item.codigo_interno,
            fecha: item.fecha,
            codigo: item.codigo,
            nombre: item.nombre,
            stock: item.stock,
            id: item.id,
            stock_origen: parseInt(item.stock),
            producto_destino: parseInt(
              filterProductoDestino.map((item2) => item2.id)
            ),
            stock_destino: parseInt(
              filterProductoDestino.map((item2) => item2.stock)
            ),
          };
        });
  
        console.log(newArray);
  
        if (filterProductoDestino.length !== 0) {
          setTabla((current) => [...current, newArray[0]]);
        } else {
          Swal.fire({
            icon: "error",
            text: "Producto no registrado en almacén de destino.",
          });
        }
      }
      if (idCantidad !== "") {
        tabla[idCantidad].cantidad = transferencia.cantidad;
      }
    }, [transferencia]);
  
    console.log(tabla);
  
    const handleSubmit = async (e) => {
      let route = "almacen/transferencia";
      e.preventDefault();
  
      const response = await createData(tabla, route);
      if (response.status === 200) {
        alertaExito(response.msg, response.status);
      }
    };
  
    const handleDelete = (e) => {
      setTabla((current) => current.filter((item) => item.id !== e.id));
    };
  
    const columns = transferenciaLayout(
      handleChange,
      handleDelete,
      transferencia.cantidad
    );
  return (
    <div className="modal-producto">
      <div className="overlay"></div>
      <div className="modal-container">
      <section className="modal-header">
          {dataToEdit ? `Editar transferencia` : `Registrar transferencia`}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <form className="transferencia-almacen">
          <div className="container">
            <div>
              <label htmlFor="">Almacén de origen</label>
              <select
                name="origen"
                value={transferencia.origen}
                onChange={handleChange}
              >
                <option value="-1">Seleccione</option>
                {almacen.map((item) => (
                  <option value={item.id}>{item.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="">Fecha</label>
              <input
                type="date"
                value={transferencia.fecha}
                name="fecha"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="">Producto</label>
              <select
                value={transferencia.producto}
                name="producto"
                onChange={handleChange}
              >
                <option>Seleccione</option>
                {productoFinal.map((item) => (
                  <option value={item.id}>{item.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="">Almacén de destino</label>
              <select
                name="destino"
                value={transferencia.destino}
                onChange={handleChange}
              >
                <option value="-1">Seleccione</option>
                {almacenDestino.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </form>
        <br />
        <br />
        <br />
        {tabla.length !== 0 ? (
          <Tabla columns={columns} table={tabla} />
        ) : (
          <Tabla columns={columns} table={newJson} />
        )}

        {tabla.length !== 0 ? (
          <div className="button-transferir">
            <button onClick={handleSubmit}>Transferir</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ModalTransferencia;
