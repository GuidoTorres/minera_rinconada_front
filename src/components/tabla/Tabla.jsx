import React from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";

const Tabla = ({ columns, table }) => {


  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: false,
    selectAllRowsItemText: "Todos",
  };
  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={table}
        pagination
        striped
        highlightOnHover
        responsive
        noDataComponent={"No se encontraron resultados."}
        // progressPending={"...cargando"}
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
};

export default Tabla;
