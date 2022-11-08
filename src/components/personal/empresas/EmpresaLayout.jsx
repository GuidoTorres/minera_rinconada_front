import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { PersonalContext } from "../../../context/PersonalContext";
import { alertaEliminarExito } from "../../../helpers/alertMessage";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { AiFillEdit, AiFillEye, AiFillFileExcel } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import ModalRegistrarEmpresa from "./ModalRegistrarEmpresa";
import ModalHistorialEvaluacion from "../trabajadores/ModalHistorialEvaluacion";
import ModalHistorialContrato from "./ModalHistorialContrato";

const EmpresaLayout = () => {
  const route = "empresa";
  const {
    registrarEmpresa,
    setRegistrarEmpresa,
    setDataToEdit,
    filterText,
    setHistorialContrato,
    historialContrato,
    setHistorialEvaluacion,
    historialEvaluacion,
  } = useContext(PersonalContext);
  const { getData, deleteData, data, setData } = useContext(CrudContext);
  const [search, setSearch] = useState([]);
  const [id, setId] = useState("");

  const getEmpresa = async () => {
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    console.log(e);
    setDataToEdit(e);
    setRegistrarEmpresa(true);
  };

  const handleDelete = (e) => {
    console.log(e);
    alertaEliminarExito("empresa").then((res) => {
      if (res.isConfirmed) {
        deleteData(route, e);

        Swal.fire(
          "Eliminado!",
          "Se eliminó correctamente la empresa.",
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
    </>
  );
};

export default EmpresaLayout;
