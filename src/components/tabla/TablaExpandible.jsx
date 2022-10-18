import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";
import { AiFillEdit, AiFillEye, AiFillFileExcel } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { PersonalContext } from "../../context/PersonalContext";
import ModalRegistroPersonal from "../personal/ModalRegistroPersonal";

const Tabla = ({ columns, table }) => {

  const {registrarPersonal, setRegistrarPersonal} = useContext(PersonalContext)

  const handleEdit = (e) => {

    setRegistrarPersonal(true)
    console.log(table);
  }

  const expandedComponent = ({ data }) => (
    <>
      <table
        style={{ marginBottom: "20px", marginTop: "10px", marginLeft: "30px" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", width: "250px" }}>
              Nombre{" "}
            </th>
            <th style={{ border: "1px solid black", width: "250px" }}>Dni</th>
            <th style={{ border: "1px solid black", width: "250px" }}>
              Tipo de trabajador
            </th>
            <th style={{ border: "1px solid black", width: "250px" }}>
              Contrato
            </th>
            <th style={{ border: "1px solid black", width: "250px" }}>
              Evaluación
            </th>
            <th style={{ border: "1px solid black", width: "250px" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data.trabajador.map((item, i) => (
            <tr key={i}>
              <td
                style={{
                  border: "1px solid black",
                  paddingTop: "8px",
                  paddingLeft: "4px",
                }}
              >
                {item.nombre} {item.apellido_paterno} {item.apellido_materno}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  paddingTop: "8px",
                }}
              >
                {item.dni}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  paddingTop: "8px",
                }}
              >
                {item.tipo_trabajador}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  paddingTop: "8px",
                }}
              >
                {" "}
                <AiFillEye onClick={handleEdit}/>
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  paddingTop: "8px",
                }}
              >
                {" "}
                <AiFillEye />
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  paddingTop: "8px",
                }}
              >
                {" "}
                <AiFillEdit />
                <BsFillTrash2Fill />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
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
          row.trabajador.length === 0 ? true : false
        }
        responsive
        noHeader={true}
        noDataComponent={"No se encontraron resultados."}
      />

      {registrarPersonal && (
        <ModalRegistroPersonal  />
      )}
    </div>
  );
};

export default Tabla;
