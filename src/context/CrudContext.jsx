import { createContext, useState } from "react";

export const CrudContext = createContext();

export const CrudProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [modalCampamento, setModalCampamento] = useState(false);

  const getData = async (route) => {
    const response = await fetch(`https://rinconada.herokuapp.com/api/v1/${route}`);
    const data = await response.json();

    if (data) return data;
  };

  const getDataById = async (route,id) => {
    const response = await fetch(`https://rinconada.herokuapp.com/api/v1/${route}/${id}`);
    const data = await response.json();

    if (data) return data;
  };

  const createData = async (data, route) => {
    const prueba = await fetch(`https://rinconada.herokuapp.com/api/v1/${route}`, {
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
    const prueba = await fetch(`https://rinconada.herokuapp.com/api/v1/${route}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await prueba.json();

    return content;
  };

  const deleteData = async (id, route) => {
    const prueba = await fetch(`https://rinconada.herokuapp.com/api/v1/${route}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
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
    getDataById
  };
  return <CrudContext.Provider value={info}>{children}</CrudContext.Provider>;
};
