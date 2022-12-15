import { createContext, useState } from "react";

export const CrudContext = createContext();

export const CrudProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterTextModal, setFilterTextModal] = useState("");

  const [dataToEdit, setDataToEdit] = useState(null);
  const [modalCampamento, setModalCampamento] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [tipo, setTipo] = useState()

  const getData = async (route) => {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE}/${route}`);
    const data = await response.json();

    if (data) return data;
  };

  const getDataById = async (route, id) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE}/${route}/${id}`
    );
    const data = await response.json();

    if (data) return data;
  };

  const getDataById2 = async (route, id, asistencia) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE}/${route}/${id}/${asistencia}`
    );
    const data = await response.json();
    if (data) return data;
  };

  const createData = async (data, route) => {
    const prueba = await fetch(`${import.meta.env.VITE_APP_BASE}/${route}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const content = await prueba.json();
    return content;
  };

  const updateData = async (data, id, route) => {
    const prueba = await fetch(
      `${import.meta.env.VITE_APP_BASE}/${route}/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const content = await prueba.json();
    return content;
  };

  const deleteData = async (route, id) => {
    const prueba = await fetch(
      `${import.meta.env.VITE_APP_BASE}/${route}/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
    const content = await prueba.json();
    return content;
  };

  const info = {
    createData,
    getData,
    updateData,
    deleteData,
    data,
    setData,
    modalCampamento,
    setModalCampamento,
    data1,
    setData1,
    data2,
    setData2,
    data3,
    setData3,
    getDataById,
    getDataById2,
    filterText,
    setFilterText,
    dataToEdit,
    setDataToEdit,
    modal,
    setModal,
    modal1,
    setModal1,
    modal2,
    setModal2,
    modal3,
    setModal3,filterTextModal, setFilterTextModal,tipo, setTipo
  };
  return <CrudContext.Provider value={info}>{children}</CrudContext.Provider>;
};
