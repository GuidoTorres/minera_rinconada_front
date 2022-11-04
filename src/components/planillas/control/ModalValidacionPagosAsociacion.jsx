import React from "react";

const ModalValidacionPagosAsociacion = () => {
  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row?.id,
      width: "5%",
    },
    {
      id: "tareo",
      name: "Hoja de Tareo Asistencia de operaciones",
      sortable: true,
      width: "25%",
      center: true,
      selector: (row) => row?.codigo_contrato,
    },
    {
      // en name usar row.fecha para jalar las fechas dinamiacmente
      id: "Asistencia",
      name: "Fecha de inicio",
      selector: (row) => row?.fecha_inicio?.split("T")[0],
      sortable: true,
    },
  ];

  return (
    <div className="modal-validacion">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Hoja de Tareo
            <AiOutlineClose onClick={closeModal} />
          </section>
          <section className="buscador">
            <Buscador registrar={false} crear={false} exportar={true} cargar={false}/>
          </section>
          <section style={{ paddingLeft: "30px" }}>
            <div>
              <label htmlFor="">Nombre:</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "5px",
                justifyContent:"space-between"
              }}
            >
              <div>
                <label htmlFor="">Dni:</label>
              </div>
              <div>
                <label htmlFor="">Teléfono:</label>
              </div>
              <div>
                <label htmlFor="">Cargo:</label>
              </div>
            </div>
          </section>
          <Tabla columns={planilla} />
          <div style={{ paddingLeft: "30px", marginTop: "5px" }}>
            <label htmlFor="">Total de días asistidos:</label>
          </div>
          <section
            style={{
              paddingLeft: "30px",
              marginTop: "20px",
              display: "flex",
              gap: 20,
              paddingRight: "30px",
            }}
          >
            <button
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "6px",
                border: "1px solid grey",
              }}
            >
              Verificación Gerente de Op.
            </button>
            <button
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "6px",
                border: "1px solid grey",
              }}
            >
              Verificación Jefe de Operaciones
            </button>
            <button
              style={{
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "6px",
                border: "1px solid grey",
              }}
            >
              Validacion de Trabajador
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModalValidacionPagosAsociacion;
