import React from "react";
import DataTable from "react-data-table-component";
import "./tablaTransferencia.css";

const TablaTransferencia = ({ columns, table }) => {
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const expandedComponent = ({ data }) => (
    <section style={{ padding: "10px 20px 10px 20px" }}>
      {data.transferencia.map((item) => (
        <div className="row-container">
          <div>
            <label>Producto: </label>
            <label htmlFor="">{item.producto}</label>
          </div>
          <div>
            <label>Almacén origen: </label>
            <label htmlFor="">{item.almacen_origen}</label>
          </div>

          <div>
            <label>Almacén destino: </label>
            <label htmlFor="">{item.almacen_destino}</label>
          </div>

          <div>
            <label>Cantidad: </label>
            <label htmlFor="">{item.cantidad}</label>
          </div>
        </div>
      ))}
    </section>
  );
  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={table}
        pagination
        fixedHeader
        striped
        highlightOnHover
        expandableRows
        expandableRowsComponent={expandedComponent}
        expandableRowDisabled={(row) =>
          row?.trabajador?.length === 0 ? true : false
        }
        paginationComponentOptions={paginationComponentOptions}
        responsive
        noHeader={true}
        noDataComponent={"No se encontraron resultados."}
      />
    </div>
  );
};

export default TablaTransferencia;
