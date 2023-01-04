import React from 'react'
import DataTable from 'react-data-table-component';

const TablaExpandibleTransferencia = ({columns, table}) => {

    const paginationComponentOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
      };

    const expandedComponent = ({ data }) => (
        <div style={{ padding: "10px 20px 10px 20px" }}>
          <label htmlFor="">Áreas: </label>{(data.area).join(", ")}
          <br />
          <br />
          <label htmlFor="">Productos: </label>{(data.producto).join(", ")}

        </div>
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
  )
}

export default TablaExpandibleTransferencia