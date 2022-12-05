import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { finanzas } from "../../../data/dataTable";
import { IngresoEgresoValues } from "../../../data/initalValues";
import { alertaExito } from "../../../helpers/alertMessage";
import useSearch from "../../../hooks/useSearch";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import "../styles/finanzasLayout.css";
import ModalDescarga from "./ModalDescarga";
import ModalReportes from "./ModalReportes";

const Finanzas = () => {
  const [socio, setSocio] = useState([]);
  const [area, setArea] = useState([]);
  const {
    getData,
    setData,
    data,
    getDataById,
    createData,
    dataToEdit,
    setDataToEdit,
    updateData,
    deleteData,
  } = useContext(CrudContext);
  const [sucursal, setSucursal] = useState(IngresoEgresoValues);
  const [proveedor, setProveedor] = useState([]);
  const [saldo, setSaldo] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [reportes, setReportes] = useState(false);
  const [id, setId] = useState();
  const [trabajador, setTrabajador] = useState([]);
  const [encargado, setEncargado] = useState();
  const [modalReporte, setModalReporte] = useState(false);

  const getAll = async () => {
    const route1 = "socio";
    const route2 = "area";
    const route3 = "sucursal";
    const route4 = "proveedor";
    const route5 = "trabajador/finanzas";

    const socioData = await getData(route1);
    const areaData = await getData(route2);
    const sucursalData = await getData(route3);
    const proveedorData = await getData(route4);
    const trabajadorData = await getData(route5);

    const all = await Promise.all([
      socioData,
      areaData,
      sucursalData,
      proveedorData,
      trabajadorData,
    ]);
    setSocio(all[0].data);
    setArea(all[1].data);
    setData(all[2].data);
    setProveedor(all[3].data);
    setTrabajador(all[4].data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const filterTrabajador = () => {
    const filterTrabajador = trabajador
      .filter((item) => item.dni == sucursal.dni)
      .flat();
    const nombre =
      filterTrabajador.length > 0
        ? filterTrabajador[filterTrabajador.length - 1]?.nombre +
          " " +
          filterTrabajador[filterTrabajador.length - 1]?.apellido_paterno +
          " " +
          filterTrabajador[filterTrabajador.length - 1]?.apellido_materno
        : "";

    setSucursal({
      ...sucursal,
      encargado: nombre,
    });
  };
  useEffect(() => {
    if (sucursal?.dni?.length > 7) {
      filterTrabajador();
    } else {
      setEncargado(null);
    }
  }, [sucursal.dni]);
  const getSaldo = async () => {
    const route5 = "saldo";
    const route6 = "finanzas/sucursal";

    if (sucursal.sucursal_id !== "") {
      const saldoData = await getDataById(route5, sucursal.sucursal_id);
      const tablaData = await getDataById(route6, sucursal.sucursal_id);

      setSaldo(saldoData.data);
      setHistorial(tablaData.data);
    }
  };
  useEffect(() => {
    getSaldo();
    setId(sucursal.sucursal_id);
  }, [sucursal.sucursal_id]);

  const handleData = (e) => {
    const { name, value } = e.target;

    setSucursal((values) => {
      return { ...values, [name]: value };
    });
    if (sucursal.dni !== "") {
      sucursal.encargado = encargado;
    }
  };

  useEffect(() => {
    if (dataToEdit) {
      setSucursal(dataToEdit);
    } else {
      setSucursal(IngresoEgresoValues);
    }
  }, [dataToEdit]);

  const handleSubmit = async (e) => {
    let route = "finanzas";
    e.preventDefault();

    if (dataToEdit === null) {
      const create = await createData(sucursal, route);
      if (create.status === 200) {
        alertaExito(create.msg, create.status).then((res) => {
          if (res.isConfirmed) {
            getSaldo();
          }
        });
        setId(sucursal.sucursal_id);
        setSucursal({
          sucursal_id: id,
          fecha: "",
          movimiento: "",
          forma_pago: "",
          encargado: "",
          area: "",
          cantidad: "",
          medida: "",
          descripcion: "",
          monto: "",
          proveedor: "",
          comprobante: "",
          dni: "",
          sucursal_transferencia: "",
        });
      }
      setModalReporte(false);
    } else {
      const prueba = await fetch(
        `${import.meta.env.VITE_APP_BASE}/finanzas/${sucursal.sucursal_id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sucursal),
        }
      );
      const content = await prueba.json();
      if (content.status === 200) {
        alertaExito(content.msg, content.status).then((res) => {
          if (res.isConfirmed) {
            getSaldo();
          }
        });
        setId(sucursal.sucursal_id);
        setDataToEdit(null);
        setSucursal({
          sucursal_id: id,
          fecha: "",
          movimiento: "",
          forma_pago: "",
          encargado: "",
          area: "",
          cantidad: "",
          medida: "",
          descripcion: "",
          monto: "",
          proveedor: "",
          comprobante: "",
          dni: "",
          sucursal_transferencia: "",
        });
      }
      setModalReporte(false);
    }
  };

  const cancelEdit = () => {
    setDataToEdit(null);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
  };

  const handleDelete = async (e) => {
    let route = "finanzas";
    const destroy = await deleteData(route, e);
    if (destroy.status === 200) {
      alertaExito(destroy.msg, destroy.status).then((res) => {
        if (res.isConfirmed) {
          getSaldo();
        }
      });
      setId(sucursal.sucursal_id);
    }
  };
  console.log(sucursal);

  const columns = finanzas(handleEdit, handleDelete);
  const { result } = useSearch(historial);

  return (
    <>
      <Header text={"Finanzas"} user={"Usuario"} ruta={"/finanzas"} />

      <section className="content">
        <section className="header">
          <div>
            <label htmlFor="">Sucursal</label>
            <select
              name="sucursal_id"
              value={sucursal.sucursal_id || id}
              onChange={handleData}
            >
              <option value="-1">Seleccione</option>
              {data.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={sucursal?.fecha}
              onChange={handleData}
            />
          </div>
        </section>

        <section className="registro">
          <form action="" onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                {dataToEdit ? "Editar Registro" : "Nuevo registro"}
              </legend>
              <div className="input-container">
                <div>
                  <label>Movimientos</label>
                  <select
                    name="movimiento"
                    value={sucursal?.movimiento}
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    <option value="Ingreso">Ingreso</option>
                    <option value="Egreso">Egreso</option>
                  </select>
                </div>
                <div>
                  <label>Forma de pago</label>
                  <select
                    name="forma_pago"
                    value={sucursal?.forma_pago}
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Deposito en cuenta">
                      Deposito en cuenta
                    </option>
                    <option value="Yape">Yape</option>
                    <option value="Transferencia bancaria">
                      Transferencia bancaria
                    </option>
                  </select>
                </div>
              </div>
              <div className="input-container">
                <div className="encargado">
                  <div>
                    <label htmlFor="">Dni</label>
                    <input
                      type="number"
                      name="dni"
                      value={sucursal.dni}
                      onChange={handleData}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Encargado</label>
                    <input
                      type="text"
                      name="encargado"
                      value={sucursal?.encargado}
                      onChange={handleData}
                    />
                  </div>
                </div>

                <div className="area-sucursal">
                  <div>
                    <label htmlFor="">Area</label>
                    <select
                      name="area"
                      value={sucursal?.area}
                      onChange={handleData}
                    >
                      <option value="-1">Seleccione</option>
                      {area?.map((item, i) => (
                        <option key={i} value={item.nombre}>
                          {item.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="">Sucursal</label>
                    <select
                      name="sucursal_transferencia"
                      value={sucursal.sucursal_transferencia}
                      onChange={handleData}
                    >
                      <option value="">Seleccione</option>
                      {data.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-container">
                <div>
                  <label htmlFor="">Cantidad</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={sucursal?.cantidad}
                    onChange={handleData}
                  />
                </div>

                <div>
                  <label htmlFor="">Medida</label>
                  <input
                    type="text"
                    name="medida"
                    value={sucursal?.medida}
                    onChange={handleData}
                  />
                </div>
              </div>

              <div className="input-container">
                <div>
                  <label htmlFor="">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={sucursal?.descripcion}
                    onChange={handleData}
                  />
                </div>

                <div>
                  <label htmlFor="">Monto</label>
                  <input
                    type="number"
                    name="monto"
                    onChange={handleData}
                    value={sucursal?.monto}
                  />
                </div>
              </div>

              <div className="input-container">
                <div>
                  <label htmlFor="">Proveedor</label>
                  <select
                    name="proveedor"
                    value={sucursal?.proveedor}
                    onChange={handleData}
                  >
                    <option value="-1">Seleccione</option>
                    {proveedor?.map((item, i) => (
                      <option key={i} value={item.nombre}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="">Comprobante</label>
                  <input
                    type="text"
                    name="comprobante"
                    value={sucursal?.comprobante}
                    onChange={handleData}
                  />
                </div>
              </div>

              <div className="footer">
                {dataToEdit && <button onClick={cancelEdit}>Cancelar</button>}
                <button>Guardar</button>
              </div>
            </fieldset>
          </form>
          <section className="saldo">
            <fieldset>
              <legend>Saldo</legend>
              <div className="input-container">
                <label htmlFor="">Saldo inicial</label>
                <input
                  type="text"
                  value={saldo[saldo.length - 1]?.saldo_inicial}
                  disabled
                />
              </div>
              <div className="input-container">
                <label htmlFor="">Ingresos</label>
                <input
                  type="text"
                  value={saldo[saldo.length - 1]?.ingresos}
                  disabled
                />
              </div>
              <div className="input-container">
                <label htmlFor="">Egresos</label>
                <input
                  type="text"
                  value={saldo[saldo.length - 1]?.egresos}
                  disabled
                />
              </div>
              <div className="input-container">
                <label htmlFor="">Saldo final</label>
                <input
                  type="text"
                  value={saldo[saldo.length - 1]?.saldo_final}
                  disabled
                />
              </div>
            </fieldset>
          </section>
        </section>

        <section>
          <Buscador abrirModal={setReportes} abrirReporte={setModalReporte} />
        </section>
        <section style={{ marginTop: "20px" }}>
          <Tabla columns={columns} table={result} />
        </section>
      </section>

      {reportes && <ModalReportes abrirModal={setReportes} id={id} />}
      {modalReporte && (
        <ModalDescarga estado={setModalReporte} id={sucursal.sucursal_id} />
      )}
    </>
  );
};

export default Finanzas;
