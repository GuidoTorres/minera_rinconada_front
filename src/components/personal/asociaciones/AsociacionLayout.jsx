import React, { useContext, useEffect, useRef, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import Header from "../../header/Header";
import Tabla from "../../tabla/TablaExpandible";
import Buscador from "../Buscador";
import ModalRegistrarAsociacion from "./ModalRegistrarAsociacion";
import { AiFillEdit, AiFillEye, AiFillFileExcel } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { alertaEliminarExito } from "../../../helpers/alertMessage";
import Swal from "sweetalert2";
import ModalRegistroPersonal from "../trabajadores/ModalRegistroPersonal";
import ModalHistorialContrato from "../trabajadores/ModalHistorialContrato";
import ModalHistorialContratoAsociacion from "./ModalHistorialContratoAsociacion";
import { asociacionLayout } from "../../../data/dataTable";

const AsociacionLayout = () => {
  const route = "asociacion";
  const inputFileRef = useRef(null);
  const {
    registrarAsociacion,
    setRegistrarAsociacion,
    setDataToEdit,
    historialContratoAsociacion,
    setHistorialContratoAsociacion,
  } = useContext(PersonalContext);
  const { getData, deleteData, data, setData, filterText } = useContext(CrudContext);
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
        deleteData(route, e)
          .then((res) => res.json())
          .then((res) => {
            Swal.fire({
              icon: res.status === 200 ? "success" : "error",
              // title: "Error...",
              text: `${res.msg}`,
            });
          });
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
            tipo: item?.tipo,
            trabajador:
              item &&
              item.trabajador &&
              item.trabajador.filter(
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
      `${import.meta.env.VITE_APP_BASE}/asociacion/upload/${asociacionId}`,
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

  const columns = asociacionLayout(
    changeHandler,
    handleContrato,
    handleEdit,
    handleDelete
  );

  return (
    <>
      <input
        type="file"
        ref={inputFileRef}
        onChange={excelFile}
        style={{ display: "none" }}
      />
      <Header text={"Asociaciones"} user={"Usuario"} ruta={"/personal"} />
      <Buscador abrirModal={setRegistrarAsociacion} registrar={true} />

      <Tabla
        columns={columns}
        table={search}
        actualizarTabla={getAsociaciones}
      />

      {registrarAsociacion && (
        <ModalRegistrarAsociacion actualizarTabla={getAsociaciones} />
      )}
      {historialContratoAsociacion && (
        <ModalHistorialContratoAsociacion
          selected={id}
          evaluaciones={data}
          actualizarAsociacion={getAsociaciones}
        />
      )}
    </>
  );
};

export default AsociacionLayout;
