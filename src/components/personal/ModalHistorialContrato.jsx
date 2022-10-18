import React, { useContext, useEffect, useState } from "react";
import Tabla from "../tabla/Tabla";
import Buscador from "./Buscador";
import { AiFillEye, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import "./styles/modalHistorialContrato.css";
import { PersonalContext } from "../../context/PersonalContext";
import { CrudContext } from "../../context/CrudContext";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import ModalRegistrarContrato from "./ModalRegistrarContrato";
import Swal from "sweetalert2";

const ModalHistorialContrato = ({ selected }) => {
  const route = "contrato";
  const {
    setHistorialContrato,
    setRegistrarContrato,
    setDataToEdit,
    registrarContrato,
    filterText,
  } = useContext(PersonalContext);
  const { getDataById, deleteData, data1, setData1 } = useContext(CrudContext);
  const [search, setSearch] = useState([]);

  const getContrato = async () => {
    const response = await getDataById(route, selected.id);
    setData1(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarContrato(true);
  };

  const handleDelete = (id) => {
    alertaEliminarExito("contrato").then((res) => {
      if (res.isConfirmed) {
        deleteData(id, route);

        Swal.fire(
          "Eliminado!",
          "El contrato se eliminó correctamente.",
          "success"
        );
      }
      getContrato();
    });
  };

  const closeModal = () => {
    setHistorialContrato(false);
  };

  useEffect(() => {
    getContrato();
  }, []);

  // useEffect(() => {
  //   const filtered = data1 && data1.filter((item) =>
  //     item?.fecha_inicio.toLowerCase().includes(filterText.toLowerCase())
  //   );

  //   setSearch(filtered);
  // }, [filterText, data1]);

  const historialContrato = [
    {
      id: "Id contrato",
      name: "Id contrato",
      selector: (row) => row.id,
    },
    {
      id: "Tipo de Contrato",
      name: "Tipo de Contrato",
      selector: (row) => row.tipo_contrato,
    },
    {
      id: "Fecha de inicio",
      name: "Fecha de inicio",
      selector: (row) => row.fecha_inicio && row.fecha_inicio.split("T")[0],
    },
    {
      id: "Fecha de fin",
      name: "Fecha de fin",
      selector: (row) => row.fecha_fin && row.fecha_fin.split("T")[0],
    },
    {
      id: "Estado",
      name: "Estado",
    },
    {
      id: "Nota",
      name: "Nota",
      selector: (row) => row.nota_contrato,
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
    <div className="modal-historial">
      <div className="overlay"></div>
      <div className="modal-container">
        <section className="modal-header">
          Historial de contratos
          <AiOutlineClose onClick={closeModal} />
        </section>
        <section className="buscador">
          <Buscador abrirModal={setRegistrarContrato} />
        </section>
        <Tabla columns={historialContrato} table={data1} />
      </div>
      {registrarContrato && (
        <ModalRegistrarContrato
          actualizarTabla={getContrato}
          selected={selected}
        />
      )}
    </div>
  );
};

export default ModalHistorialContrato;
