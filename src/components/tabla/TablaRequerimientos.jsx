import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";

const TablaRequerimientos = ({ columns, table, set }) => {


  const handleChange = ({ selectedRows }) => {
   
    set(selectedRows)
  };

  const rowDisabledCriteria = row => row.estado === "Aprobado";

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
        selectableRows
        onSelectedRowsChange={handleChange}
        // progressPending={"...cargando"}
        paginationComponentOptions={paginationComponentOptions}
        selectableRowDisabled={rowDisabledCriteria}
      />
    </div>
  );
};

export default TablaRequerimientos;
