import React, { useContext, useState } from "react";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { PlanillaContext } from "../../../context/PlanillaContext";

const ModalPago = () => {
  const [inputFields, setInputFields] = useState([
    {
      conductor: "Conductor",
      dni: "Dni",
      telefono: "Teléfono",
      placa: "Placa",
      teletrans: "Teletrans",
      lugar: "Lugar de despacho",
    },
  ]);
  const { setPago } = useContext(PlanillaContext);
  const closeModal = () => {
    setPago(false);
  };

  const addFields = () => {
    let newField = {
      conductor: "Conductor",
      dni: "Dni",
      telefono: "Teléfono",
      placa: "Placa",
      teletrans: "Teletrans",
      lugar: "Lugar de despacho",
    };

    setInputFields([...inputFields, newField]);
  };

  return (
    <div className="modal-validacion">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Ficha de envio
            <AiOutlineClose onClick={closeModal} />
          </section>
          {/* <section className="buscador">
          <Buscador
            registrar={false}
            crear={false}
            exportar={true}
            cargar={false}
          />
        </section> */}
          <section style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <div>
              <label htmlFor="">Nombre:</label>
            </div>

            <div style={{ display: "flex", gap: "50px", marginTop: "10px" }}>
              <div>
                <label htmlFor="">Dni:</label>
              </div>
              <div>
                <label htmlFor="">Teléfono:</label>
              </div>
              <div>
                <label htmlFor="">Cargo:</label>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "5px",
                  gap: "150px",
                }}
              ></div>
            </div>
          </section>
          <section
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "20px",
            }}
          >
            <button
              onClick={addFields}
              style={{
                border: "1px solid grey",
                width: "120px",
                height: "30px",
                backgroundColor: "white",
                borderRadius: "6px",
              }}
            >
              Añadir
            </button>
          </section>
          <form>
            {inputFields.map((input, i) => {
              return (
                <section
                  style={{
                    padding: "10px 20px 20px 20px",
                    overflowY: "scroll",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid black",
                      borderRadius: "6px",
                      padding: "10px 10px 20px 10px",

                    }}
                  >
                    <div key={i}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label htmlFor="">{input.conductor}</label>
                          <input type="text" style={{ width: "200px" }} />
                        </div>

                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label htmlFor="">{input.dni}</label>
                          <input type="text" style={{ width: "200px" }} />
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label htmlFor="">{input.telefono}</label>
                          <input type="text" style={{ width: "200px" }} />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label htmlFor="">{input.placa}</label>
                          <input type="text" style={{ width: "200px" }} />
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label htmlFor="">{input.teletrans}</label>
                          <input type="text" style={{ width: "200px" }} />
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label htmlFor="">{input.lugar}</label>
                          <input type="text" style={{ width: "200px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </form>

          {/* <section style={{ padding: "10px 20px 20px 20px" }}>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "6px",
                padding: "10px 10px 20px 10px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", gap:"20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="">Conductor</label>
                  <input type="text" style={{width: "200px"}}/>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="">Dni</label>
                  <input type="text" style={{width: "200px"}}/>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="">Teléfono</label>
                  <input type="text" style={{width: "200px"}}/>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap:"20px", marginTop:"10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>

                <label htmlFor="">Placa</label>
                <input type="text" style={{width: "200px"}}/>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>

                <label htmlFor="">Teletrans</label>
                <input type="text" style={{width: "200px"}}/>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap:"20px", marginTop:"10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>

                <label htmlFor="">Lugar de despacho</label>
                <input type="text" style={{width: "200px"}}/>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default ModalPago;
