import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../context/CrudContext";
import { PersonalContext } from "../../context/PersonalContext";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import Header from "../header/Header";
import Tabla from "../tabla/Tabla";
import Buscador from "./Buscador";
import { AiFillEdit, AiFillEye, AiFillFileExcel } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import ModalRegistrarEmpresa from "./ModalRegistrarEmpresa";
import ModalHistorialContrato from "./ModalHistorialContrato";
import ModalHistorialEvaluacion from "./ModalHistorialEvaluacion";

const EmpresaLayout = () => {
  const route = "empresa";
  const {
    registrarEmpresa,
    setRegistrarEmpresa,
    setDataToEdit,
    filterText,
    setHistorialContrato,
    historialContrato,
    setHistorialEvaluacion, historialEvaluacion
  } = useContext(PersonalContext);
  const { getData, deleteData, data, setData } = useContext(CrudContext);
  const [search, setSearch] = useState([]);
  const [id, setId] = useState("");

  const getEmpresa = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarEmpresa(true);
  };

  const handleDelete = (e) => {
    alertaEliminarExito("empresa").then((res) => {
      if (res.isConfirmed) {
        deleteData(e, route);

        Swal.fire(
          "Eliminado!",
          "La asociación se eliminó correctamente.",
          "success"
        );
      }
      getEmpresa();
    });
  };
  useEffect(() => {
    getEmpresa();
  }, []);

  const handleContrato = (e) => {
    setHistorialContrato(true);
    setId(e);
  };

  // const handleEvaluacion = () => {
  //   setHistorialEvaluacion(true);
  //   setId();
  // };

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.razon_social &&
        item.razon_social.toLowerCase().includes(filterText.toLowerCase())
    );

    setSearch(filtered);
  }, [filterText, data]);

  const empresa = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row.id,
    },
    {
      id: "Empresa",
      name: "Empresa",
      selector: (row) => row.razon_social,
    },
    // {
    //   id: "Campamento",
    //   name: "Campamento",
    // //   selector: (row) => (!row.campamento ? "Por asignar" : row.campamento),
    // },
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
      id: "Contrato",
      name: "Contrato",
      button: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleContrato(e)} />
        </>
      ),
    },
    // {
    //   id: "Evaluación",
    //   name: "Evaluación",
    //   //   selector: (row) => row.id,

    //   button: true,
    //   cell: (e) => <AiFillEye onClick={() => handleEvaluacion(e)} />,
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
      <Header text={"Empresas"} user={"Usuario"} ruta={"/personal"} />
      <Buscador abrirModal={setRegistrarEmpresa} />
      <Tabla columns={empresa} table={search} />

      {registrarEmpresa && <ModalRegistrarEmpresa />}
      {historialContrato && <ModalHistorialContrato selected={id} />}
      {historialEvaluacion && <ModalHistorialEvaluacion selected={id}/>}
    </>
  );
};

export default EmpresaLayout;
