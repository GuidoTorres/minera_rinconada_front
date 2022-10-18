import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import Buscador from "./Buscador";
import Header from "../header/Header";
import Tabla from "../tabla/Tabla";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { CrudContext } from "../../context/CrudContext";
import ModalCampamento from "./ModalCampamento";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import Swal from "sweetalert2";

const CampamentoLayout = () => {
  const route = "campamento";

  const { registrarCampamento, setRegistrarCampamento, setDataToEdit } =
    useContext(AdminContext);
  const { getData, data, setData, deleteData } = useContext(CrudContext);

  const getCampamento = async () => {
    const response = await getData(route);

    setData(response.data);
  };

  useEffect(() => {
    getCampamento();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarCampamento(true);
  };

  const handleDelete = (id) => {
    alertaEliminarExito("campamento").then((res) => {
      if (res.isConfirmed) {
        deleteData(id, route);

        Swal.fire(
          "Eliminado!",
          "El campamento se eliminó correctamente.",
          "success"
        );
      }
      getCampamento();
    });
  };

  const campamento = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      id: "Nombre",
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },

    {
      id: "Dirección",
      name: "Dirección",
      selector: (row) => row.direccion,
      sortable: true,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div
          style={{
            display: "flex",
            width: "40px",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Header text={"Campamentos"} user={"Usuario"} ruta={"/administracion"}/>
      <Buscador abrirModal={setRegistrarCampamento} />
      <Tabla columns={campamento} table={data} />
      {registrarCampamento && (
        <ModalCampamento actualizarTabla={getCampamento} />
      )}
    </>
  );
};

export default CampamentoLayout;
