import React, { useContext, useEffect, useState } from "react";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { PlanillaContext } from "../../../context/PlanillaContext";
import ModalControlAsistencia from "./ModalControlAsistencia";
import { CrudContext } from "../../../context/CrudContext";

const ListaAsistencia = () => {
  const { asistencia, setAsistencia, setCampamentoAsistencia } = useContext(PlanillaContext);
  const { getData, setData, data } = useContext(CrudContext);
  const [campamento, setCampamento] = useState()

  const getCampamentos = async () => {
    const route = "planilla/campamento";
    const response = await getData(route);
    setData(response.data);
  };

  useEffect(() => {
    getCampamentos();
    console.log(data);
  }, []);

  const handleControl = (e) => {
    setAsistencia(true);
    setCampamentoAsistencia(e)
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row?.id,
      width: "60px",
    },
    {
      id: "campamento",
      name: "Campamento",
      sortable: true,
      width: "80%",
      center: true,
      selector: (row) => row?.nombre,
    },

    {
      id: "control",
      name: "Control",
      button: true,
      center: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleControl(e)} />
        </>
      ),
    },
  ];

  return (
    <div>
      <Header text={"Asistencia"} user={"Usuario"} ruta={"/planilla"} />
      <Buscador registrar={false} crear={false} exportar={false} cargar={false}/>
      <Tabla columns={planilla} table={data} />

      {asistencia && <ModalControlAsistencia campamento={campamento}/>}
    </div>
  );
};

export default ListaAsistencia;
