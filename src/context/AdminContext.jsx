import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [render, setRender] = useState("inicio");
  const [openModal, setOpenModal] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [registroUsuario, setRegistroUsuario] = useState(false);
  const [asignarUsuario, setAsignarUsuario] = useState(false);
  const [registrarCampamento, setRegistrarCampamento] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const data = {
    registroUsuario,
    setRegistroUsuario,
    asignarUsuario,
    setAsignarUsuario,
    registrarCampamento,
    setRegistrarCampamento,
    render,
    setRender,
    openModal,
    setOpenModal,
    dataToEdit,
    setDataToEdit,
    filterText, setFilterText
  };

  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
};
