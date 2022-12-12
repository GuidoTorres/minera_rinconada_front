import React, { useContext, useEffect } from "react";
import Buscador from "./Buscador";
import Header from "../header/Header";
import Tabla from "../tabla/Tabla";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { CrudContext } from "../../context/CrudContext";
import ModalCampamento from "./ModalCampamento";
import { alertaEliminarExito } from "../../helpers/alertMessage";
import Swal from "sweetalert2";
import useSearch from "../../hooks/useSearch";
import { campamentoLayout } from "../../data/dataTable";

const CampamentoLayout = () => {
  const route = "campamento";

  const { getData, data, setData, deleteData, modal, setModal, setDataToEdit } =
    useContext(CrudContext);
  const { result } = useSearch(data);
  const getCampamento = async () => {
    const response = await getData(route);

    setData(response.data);
  };

  useEffect(() => {
    getCampamento();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = (id) => {
    alertaEliminarExito("campamento").then((res) => {
      if (res.isConfirmed) {
        deleteData(route, id);

        Swal.fire(
          "Eliminado!",
          "El campamento se eliminó correctamente.",
          "success"
        );
        getCampamento();
      }
    });
  };

  const columns = campamentoLayout(handleEdit, handleDelete);

  return (
    <>
      <Header text={"Campamentos"} user={"Usuario"} ruta={"/administracion"} />
      <Buscador abrirModal={setModal} />
      <Tabla columns={columns} table={result} />
      {modal && <ModalCampamento actualizarTabla={getCampamento} />}
    </>
  );
};

export default CampamentoLayout;
