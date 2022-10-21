import React, { useContext, useEffect, useRef, useState } from "react";
import { CrudContext } from "../../context/CrudContext";
import { PersonalContext } from "../../context/PersonalContext";
import Header from "../header/Header";
import Tabla from "../tabla/TablaExpandible";
import Buscador from "./Buscador";
import ModalRegistrarAsociacion from "./ModalRegistrarAsociacion";
import { AiFillEdit, AiFillEye, AiFillFileExcel } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import Swal from "sweetalert2";
import ModalRegistroPersonal from "./ModalRegistroPersonal";
import ModalHistorialContrato from "./ModalHistorialContrato";
import ModalHistorialContratoAsociacion from "./ModalHistorialContratoAsociacion";

const AsociacionLayout = () => {
  const route = "asociacion";
  const inputFileRef = useRef(null);
  const {
    registrarAsociacion,
    setRegistrarAsociacion,
    setDataToEdit,
    filterText,
    historialContratoAsociacion, setHistorialContratoAsociacion
  } = useContext(PersonalContext);
  const { getData, deleteData, data, setData } = useContext(CrudContext);
  const [asociacionId, setAsociacionId] = useState();
  const [id, setId] = useState("");
  const [search, setSearch] = useState([]);

  const getAsociaciones = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarAsociacion(true);
  };

  const handleDelete = (e) => {
    alertaEliminarExito("asociación").then((res) => {
      if (res.isConfirmed) {
        deleteData(e, route);

        Swal.fire(
          "Eliminado!",
          "La asociación se eliminó correctamente.",
          "success"
        );
      }
      getAsociaciones();
    });
  };
  useEffect(() => {
    getAsociaciones();
  }, []);

  useEffect(() => {
    const filtered =
      data &&
      data
        .map((item) => [
          {
            codigo: item?.codigo,
            id: item?.id,
            nombre: item?.nombre,
            campamento: item?.campamento,
            trabajador: item && item.trabajador && item.trabajador.filter(
              (prueba) =>
                prueba?.nombre
                  .toLowerCase()
                  .includes(filterText.toLowerCase()) ||
                prueba?.apellido_paterno
                  .toLowerCase()
                  .includes(filterText.toLowerCase()) ||
                prueba?.apellido_materno
                  .toLowerCase()
                  .includes(filterText.toLowerCase())
            ),
          },
        ])
        .flat();
    setSearch(filtered);

    if (filterText) {
      const filtered2 =
        filtered &&
        filtered.filter(
          (item) =>
            item.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
            item.trabajador.length
        );
      setSearch(filtered2);
    }
  }, [filterText, data]);

  const changeHandler = (e) => {
    inputFileRef.current.click();

    setAsociacionId(e.id);
  };

  const excelFile = (e) => {
    let formData = new FormData();
    formData.append("myFile", e.target.files[0]);

    fetch(
      `http://localhost:3000/api/v1/asociacion/upload/${asociacionId}`,
      {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            // title: "Error...",
            text: "Trabajadores registrados con éxito!",
          });
          getAsociaciones();
        }
      });
    inputFileRef.current.value = null;
  };

  const handleContrato = (e) => {
    setHistorialContratoAsociacion(true);
    setId(e);
  };

  const personal = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row?.id,
      sortable: true,
    },
    {
      id: "Asociación",
      name: "Asociación",
      selector: (row) => row?.nombre,
      sortable: true,
    },
    {
      id: "Campamento",
      name: "Campamento",
      sortable: true,

        selector: (row) => row?.campamento ? row.campamento : "Por asignar",
    },
    // {
    //   id: "Dni",
    //   name: "Dni",
    // //   selector: (row) => row.dni,
    // },
    // {
    //   id: "T. de trabajador",
    //   name: "T. de trabajador",
    // //   selector: (row) => row.tipo_trabajador,
    // },
    {
      id: "Asignar Trabajadores",
      name: "Asignar Trabajadores",
      button: true,
      cell: (e) => (
        <>
          {" "}
          <AiFillFileExcel onClick={() => changeHandler(e)} />{" "}
        </>
      ),
      width: "200px"
    },
    {
      id: "Contrato",
      name: "Contrato",
      button: true,
      cell: (e) => (
        <div
          style={{
            width: "40px",
            display: "flex",
            justifyContent: "space-around",
            fontSize: "13px",
          }}
        >
          <AiFillEye onClick={() => handleContrato(e)} />
        </div>
      ),
    },
    // {
    //   id: "Evaluación",
    //   name: "Evaluación",
    // //   selector: (row) => row.id,

    //   button: true,
    //   //   cell: (e) => <AiFillEye onClick={() => handleEvaluacion(e)} />,
    // },

    // {
    //   id: "Deshabilitar",
    //   name: "Deshabilitar",
    //   button: true,
    //   cell: (e) => <input type="checkbox" />,
    // },
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
      <input
        type="file"
        ref={inputFileRef}
        onChange={excelFile}
        style={{ display: "none" }}
      />
      <Header text={"Asociaciones"} user={"Usuario"} ruta={"/personal"} />
      <Buscador abrirModal={setHistorialContratoAsociacion} />

      <Tabla
        columns={personal}
        table={search}
        actualizarTabla={getAsociaciones}
      />

      {registrarAsociacion && (
        <ModalRegistrarAsociacion actualizarTabla={getAsociaciones} />
      )}
      {historialContratoAsociacion && <ModalHistorialContratoAsociacion selected={id}/>}
    </>
  );
};

export default AsociacionLayout;
