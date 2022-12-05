import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import fileDownload from "js-file-download";
import { useContext } from "react";
import axios from "axios";
import { CrudContext } from "../../../context/CrudContext";

const ModalDescarga = ({ estado, id }) => {
  const { getData } = useContext(CrudContext);
  const [fechas, setFechas] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });

  const closeModal = () => {
    estado(false);
  };

  const handleSubmit = async (e) => {
    let route = `${import.meta.env.VITE_APP_BASE}/v1/finanzas/excel`;

    e.preventDefault();

    if (id !== "") {
      const prueba = await axios.get(
        `${route}/${id}?fecha_inicio=${fechas.fecha_inicio}&fecha_fin=${fechas.fecha_fin}`,
        {
          responseType: "arraybuffer",
          headers: { "Content-Type": "blob" },
        }
      );

      if (prueba) {
        const url = URL.createObjectURL(new Blob([prueba.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `reporte del ${fechas.fecha_inicio} al ${fechas.fecha_fin}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;

    setFechas((values) => {
      return { ...values, [name]: value };
    });
  };

  return (
    <div className="modal-asociacion">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          Descargar reporte
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Fecha de inicio</label>

                <input
                  type="date"
                  name="fecha_inicio"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Fecha de fin</label>
                <input
                  type="date"
                  name="fecha_fin"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <button>Descargar</button>
              </div>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalDescarga;
