import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/modalReportes.css";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { useEffect } from "react";
import { useState } from "react";

const ModalReportes = ({ abrirModal, id }) => {
  const { getData, data2, setData2, createData } = useContext(CrudContext);
  const [reporte, setReporte] = useState();
  const [dataReporte, setDataReporte] = useState();

  const closeModal = () => {
    abrirModal(false);
  };

  const getArea = async () => {
    const response = await getData("area");
    setData2(response.data);
  };

  useEffect(() => {
    getArea();
  }, []);

  const data = {
    labels: dataReporte?.labels,
    datasets: [dataReporte?.ingresos, dataReporte?.egresos],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReporte((values) => {
      return { ...values, [name]: value };
    });
  };
  const postReporte = async (e) => {
    const response = await createData(reporte, `finanzas/reporte/${id}`);
    setDataReporte(response.data);
  };

  return (
    <>
      <div className="modal-reportes">
        <div className="overlay"></div>

        <div className="modal-container">
          <section className="modal-header">
            Reporte de ingresos/egresos
            {/* {dataToEdit ? "Editar trabajador" : "Registrar trabajador"} */}
            <AiOutlineClose onClick={closeModal} />
          </section>
          <section className="modal-body">
            <section className="opciones">
              <div>
                <label htmlFor="">Area</label>
                <select name="area" onChange={handleChange}>
                  <option value="-1">Seleccione</option>
                  {data2.map((item, i) => (
                    <option key={i} value={item.nombre}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Fecha de inicio</label>
                <input
                  type="date"
                  name="fecha_inicio"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="">Fecha de fin</label>
                <input type="date" name="fecha_fin" onChange={handleChange} />
              </div>
              <div className="button-container">
                <button onClick={postReporte}>Generar</button>
              </div>
            </section>
            <section className="grafico">
              {dataReporte?.labels?.length > 0 ? (
                <Line datasetIdKey="id" data={data} />
              ) : (
               <label className="no-data">Sin data</label>
              )}
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default ModalReportes;
