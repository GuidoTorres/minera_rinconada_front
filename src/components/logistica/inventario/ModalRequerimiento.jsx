import React from "react";
import Tabla from "../../tabla/Tabla";

const ModalRequerimiento = () => {
  return (
    <div className="modal-producto">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          {dataToEdit ? `Editar ${tipo}` : `Registrar ${tipo}`}
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section>
          <form className="modal-body" onSubmit={handleSubmit}>
            <section>
              <div>
                <label>Código requerimiento</label>
                <input
                  // value={entrada.codigo}
                  type="text"
                  name="codigo"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Fecha de Pedido</label>
                <input
                  // value={entrada.codigo}
                  type="text"
                  name="fecha_pedido"
                  onChange={handleData}
                ></input>
              </div>
              <div>
                <label>Fecha de entrega</label>
                <input
                  type="date"
                  name="fecha_entrega"
                  onChange={handleData}
                  // value={entrada.fecha}
                ></input>
              </div>
            </section>

            <section>
              <div>
                <label>Nombre solicitante</label>
                <input
                  type="text"
                  name="nombre"
                  onChange={handleData}
                  // value={entrada.encargado}
                ></input>
              </div>
              <div>
                <label>Área</label>
                <input
                  type="text"
                  name="area"
                  onChange={handleData}
                  // value={entrada.orden_compra}
                ></input>
              </div>
              <div>
                <label>Celular</label>
                <input
                  type="text"
                  name="celular"
                  onChange={handleData}
                  // value={entrada.orden_compra}
                ></input>
              </div>
              <div>
                <label>Proyecto/Actividad</label>
                <input
                  type="text"
                  name="proyecto"
                  onChange={handleData}
                  // value={entrada.orden_compra}
                ></input>
              </div>
            </section>

            <section>
              <div>
                <label>Productos</label>
                <input
                  type="text"
                  name="productos"
                  //   onChange={handleData}
                  // value={entrada.producto}
                ></input>
              </div>

              <div>
                <label>Cantidad</label>
                <input
                  type="text"
                  name="cantidad"
                  onChange={handleData}
                  // value={entrada.cantidad}
                ></input>
              </div>
              <div>
                <label>Unidades</label>
                <input
                  type="text"
                  name="cantidad"
                  onChange={handleData}
                  // value={entrada.unidad}
                ></input>
              </div>
              <div>
                <button>+</button>
              </div>
            </section>

            
            <Tabla columns={columns} />

            <div className="button-container">
              <button>Guardar</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalRequerimiento;
