import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";
import {
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { PersonalContext } from "../../context/PersonalContext";
import ModalRegistroPersonal from "../personal/trabajadores/ModalRegistroPersonal";
import { CrudContext } from "../../context/CrudContext";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import ModalHistorialEvaluacion from "../personal/trabajadores/ModalHistorialEvaluacion";
import Swal from "sweetalert2";

const Tabla = ({ columns, table, actualizarTabla }) => {
  const route = "trabajador";
  const {
    registrarPersonal,
    setRegistrarPersonal,
    setHistorialEvaluacion,
    historialEvaluacion,
    setDataToEdit,
  } = useContext(PersonalContext);
  const { deleteData, updateData, setData } = useContext(CrudContext);
  const [id, setId] = useState("");

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarPersonal(true);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const handleDelete = (e) => {
    alertaEliminarExito("trabajador").then((res) => {
      if (res.isConfirmed) {
        deleteData(route, e);

        Swal.fire(
          "Eliminado!",
          "El trabajador se eliminó correctamente.",
          "success"
        );
      }
      actualizarTabla();
    });
  };
  const handleEvaluacion = (e) => {
    setHistorialEvaluacion(true);
    setId(e);
  };

  const personal = [
    {
      id: "codigo",
      name: "Código",
      selector: (row, index) => row.codigo_trabajador,
      sortable: true,
    },
    {
      id: "foto",
      name: "Foto",
      selector: (row) => (
        <div style={{ padding: "3px" }}>
          <img
            src={row?.foto || "https://via.placeholder.com/80"}
            style={{ height: "60px", width: "80px" }}
          ></img>
        </div>
      ),
      width: "100px",
    },
    {
      id: "Trabajador",
      name: "Trabajador",
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
      width: "300px",
      center: true,
      sortable: true,
    },
    {
      id: "Campamento",
      name: "Campamento",
      selector: (row) => (!row?.campamento ? "Por asignar" : row?.campamento),
      sortable: true,
    },
    {
      id: "Dni",
      name: "Dni",
      selector: (row) => row?.dni,
      sortable: true,
    },
    {
      id: "telefono",
      name: "Telefono",
      selector: (row) => row?.telefono,
      sortable: true,
    },

    {
      id: "Evaluación",
      name: "Evaluación",
      selector: (row) => row?.id,

      button: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleEvaluacion(e)} />

          {e?.evaluacions?.capacitacion_gema === 12 ? (
            <>
              <AiOutlineCheck
                style={{ color: "green", fontWeigth: "bold", fontSize: "16px" }}
              />
            </>
          ) : e?.evaluacions?.capacitacion_gema === 12 ? (
            <AiOutlineClose
              style={{ color: "red", fontWeigth: "bold", fontSize: "16px" }}
            />
          ) : (
            ""
          )}
          <label htmlFor="">{e?.trabajador?.evaluacions?.id}</label>
        </>
      ),
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ];

  const expandedComponent = ({ data }) => (
    <div style={{ padding: "10px 20px 10px 20px" }}>
      <DataTable columns={personal} data={data.trabajador} />
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

      {registrarPersonal && (
        <ModalRegistroPersonal actualizarTabla={actualizarTabla} />
      )}
      {historialEvaluacion && <ModalHistorialEvaluacion selected={id} />}
    </div>
  );
};

export default Tabla;
