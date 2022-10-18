import React from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";
const Tabla = ({ columns, table }) => {

  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={table}
        pagination
        fixedHeader
        striped
        highlightOnHover
        noDataComponent={"No se encontraron resultados."}

      />
    </div>
  );
};

export default Tabla;
