import React from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";

const TablaPlanilla = ({ columns, table }) => {
  const conditionalRowStyles = [
    // Cambio de color en la tabla dependiendo de la fecha que devuelve el backend en el json
    {
      when: (row) => row?.asistencia,
      style: (row) => ({
        backgroundColor:
          parseInt(row.asistencia) % 15 > 10
            ? "#ffef76"
            : parseInt(row.asistencia) % 15 === 0
            ? "#ff7467"
            : "",
      }),
    },
  ];

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
        paginationComponentOptions={paginationComponentOptions}
        paginationPerPage={8}
        paginationRowsPerPageOptions={[8, 16, 24, 32, 40]}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
};

export default TablaPlanilla;
