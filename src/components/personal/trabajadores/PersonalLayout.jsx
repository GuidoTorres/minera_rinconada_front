import React, { useContext, useEffect, useState, useRef } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import {
  alertaEliminar,
  alertaEliminarExito,
} from "../../../helpers/alertMessage";
import {
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import ModalRegistroPersonal from "./ModalRegistroPersonal";
import ModalHistorialContrato from "./ModalHistorialContrato";
import ModalRegistrarContrato from "./ModalRegistrarContrato";
import ModalHistorialEvaluacion from "./ModalHistorialEvaluacion";
import ModalRegistroEvaluacion from "./ModalRegistroEvaluacion";
import Swal from "sweetalert2";
import "../styles/personalLayout.css";

const PersonalLayout = () => {
  const route = "trabajador";
  const {
    registrarPersonal,
    setRegistrarPersonal,
    setDataToEdit,
    historialContrato,
    setHistorialContrato,
    historialEvaluacion,
    setHistorialEvaluacion,
    filterText,
  } = useContext(PersonalContext);
  const { getData, deleteData, data, setData, updateData } =
    useContext(CrudContext);
  const [id, setId] = useState("");
  const [search, setSearch] = useState([]);
  const inputFileRef = useRef(null);

  const getTrabajadores = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarPersonal(true);
  };

  const handleDelete = (e) => {
    deleteData(route, e).then((res) => {
      if (res.status === 200) {
        alertaEliminar(res.msg, res.status).then((res) => {
          if (res.isConfirmed) {
            getTrabajadores();
          }
        });
      }
    });
  };

  const handleEvaluacion = (e) => {
    setHistorialEvaluacion(true);
    setId(e);
  };
  const handleContrato = (e) => {
    setHistorialContrato(true);
    setId(e);
  };

  const deshabilitarTrabajador = (e, data) => {
    const route = "trabajador";
    const json = {
      deshabilitado: e.target.checked,
    };

    updateData(json, data.id, route);
  };

  useEffect(() => {
    getTrabajadores();
    console.log(data);
  }, []);

  useEffect(() => {
    const filtered =
      data &&
      data.filter(
        (item) =>
          (item.codigo_trabajador &&
            item.codigo_trabajador
              .toLowerCase()
              .includes(filterText.toLowerCase())) ||
          (item.nombre &&
            item.nombre.toLowerCase().includes(filterText.toLowerCase())) ||
          (item?.apellido_paterno &&
            item.apellido_paterno
              .toLowerCase()
              .includes(filterText.toLowerCase())) ||
          (item?.apellido_materno &&
            item.apellido_materno
              .toLowerCase()
              .includes(filterText.toLowerCase())) ||
          (item?.dni && item.dni.toString().includes(filterText))
      );

    setSearch(filtered);
  }, [filterText, data]);

  const personal = [
    {
      id: "codigo",
      name: "Codigo",
      selector: (row) => row?.codigo_trabajador,
    },
    {
      id: "foto",
      name: "Foto",
      selector: (row) => (
        <div style={{ padding: "3px" }}>
          <img src={row?.foto} style={{ height: "60px" }}></img>
        </div>
      ),
    },
    {
      id: "Trabajador",
      name: "Trabajador",
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
      width: "300px",
      sortable: true,
    },
    {
      id: "Campamento",
      name: "Campamento",
      selector: (row) =>
         row && row?.campamento?.length !== 0
          ? row?.campamento?.map((item) => item?.nombre)
          : "Por asignar",
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
      selector: (row) => row.id,

      button: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleEvaluacion(e)} />
          {e.aprobado === "si" ? (
            <AiOutlineCheck
              style={{ color: "green", fontWeigth: "bold", fontSize: "16px" }}
            />
          ) : e.aprobado === "no" ? (
            <AiOutlineClose
              style={{ color: "red", fontWeigth: "bold", fontSize: "16px" }}
            />
          ) : null}
        </>
      ),
    },
    {
      id: "Contrato",
      name: "Contrato",
      button: true,
      cell: (e) => (
        <div
          disabled
          style={{
            width: "40px",
            display: "flex",
            justifyContent: "space-around",
            fontSize: "13px",
          }}
        >
          {e?.nota !== "" ? e.nota : "--"}
          <AiFillEye
            onClick={() => {
              handleContrato(e);
            }}
          />
        </div>
      ),
    },

    {
      id: "Deshabilitar",
      name: "Deshabilitar",
      button: true,
      cell: (e) => (
        <input
          type="checkbox"
          defaultChecked={e.deshabilitado}
          onChange={(a) => deshabilitarTrabajador(a, e)}
        />
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

  return (
    <>
      <Header text={"Trabajadores"} user={"Usuario"} ruta={"/personal"} />

      <Buscador
        abrirModal={setRegistrarPersonal}
        importar={true}
        registrar={true}
      />
      <Tabla columns={personal} table={search} />

      {registrarPersonal && (
        <ModalRegistroPersonal actualizarTabla={getTrabajadores} />
      )}

      {historialEvaluacion && (
        <ModalHistorialEvaluacion
          selected={id}
          actualizarTrabajador={getTrabajadores}
        />
      )}
      {historialContrato && <ModalHistorialContrato selected={id} />}
    </>
  );
};

export default PersonalLayout;
