import { createContext, useState } from "react";

export const PersonalContext = createContext();

export const PersonalProvider = ({ children }) => {
  const [render, setRender] = useState("inicio");
  const [openModal, setOpenModal] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [dataToEdit, setDataToEdit] = useState(null);

  const [registrarPersonal, setRegistrarPersonal] = useState(false);
  const [historialContrato, setHistorialContrato] = useState(false);
  const [registrarContrato, setRegistrarContrato] = useState(false);
  const [historialEvaluacion, setHistorialEvaluacion] = useState(false);
  const [registrarEvaluacion, setRegistrarEvaluacion] = useState(false);
  const [registrarAsociacion, setRegistrarAsociacion] = useState(false);
  const [registrarEmpresa, setRegistrarEmpresa] = useState(false);
  
  return (
    <PersonalContext.Provider
      value={{
        render,
        setRender,
        openModal,
        setOpenModal,
        registrarPersonal,
        setRegistrarPersonal,
        registrarEvaluacion,
        setRegistrarEvaluacion,
        historialContrato,
        registrarContrato,
        setRegistrarContrato,
        historialEvaluacion,
        setHistorialEvaluacion,
        filterText,
        setFilterText,
        dataToEdit,
        setDataToEdit,
        setHistorialContrato,
        registrarAsociacion,
        setRegistrarAsociacion,
        registrarEmpresa,
        setRegistrarEmpresa,
      }}
    >
      {children}
    </PersonalContext.Provider>
  );
};
