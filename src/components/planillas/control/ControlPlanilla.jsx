import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { AiFillEye } from "react-icons/ai";
import ModalPlanillaControl from "./ModalPlanillaControl";

const ControlPlanilla = () => {
  const { planillaControl, setPlanillaControl, setUserdata } =
    useContext(PlanillaContext);
  const { getData, setData, data } = useContext(CrudContext);

  const [tableData, setTableData] = useState([]);

  const getTrabajadores = async () => {
    const route = "planilla";
    const response = await getData(route);
    setData(response.data);
  };

  useEffect(() => {
    getTrabajadores();
  }, []);

  const handleContrato = (e) => {
    setPlanillaControl(true);
    setTableData(e);
    setUserdata(e);
  };

  const planilla = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
    },
    {
      id: "nombres",
      name: "Nombres y apellidos",
      selector: (row) => row?.nombre,

      sortable: true,
      center: true,
    },
    // {
    //   id: "dni",
    //   name: "Dni",
    //   selector: (row) => (row?.dni ? row.dni : "---"),
    //   sortable: true,
    //   center: true,
    // },

    {
      id: "celular",
      name: "Celular",
      sortable: true,
      selector: (row) => (row?.telefono ? row.telefono : "---"),
      center: true,
    },
    {
      id: "fecha_inicio",
      name: "Fecha de inicio",
      selector: (row) => row?.fecha_inicio.slice(0, 10),
    },
    {
      id: "fecha_fin",
      name: "Fecha de fin",
      button: true,
      selector: (row) => row?.fecha_fin.slice(0, 10),
    },
    {
      id: "Dias",
      name: "Dias laborados",
      button: true,
      selector: (row) => (row?.asistencia ? row.asistencia : "--"),
    },
    {
      id: "volquete",
      name: "Volquete",
      selector: (row) => row?.total?.split(",")[0],

      center: true,
    },

    {
      id: "teletrans",
      name: "Teletrans",
      selector: (row) => row?.total?.split(",")[0],

      center: true,
    },
    {
      id: "saldo",
      name: "Saldo",
      button: true,
      selector: (row) => row?.saldo?.split(",")[0],

      center: true,
    },
    {
      id: "estado",
      name: "Estado",
      button: true,
      selector: (row) => "Finalizado",

      center: true,
    },
    {
      id: "control",
      name: "Control",
      button: true,
      center: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleContrato(e)} />
        </>
      ),
    },
  ];

  return (
    <div>
      <Header text={"Planilla"} user={"Usuario"} ruta={"/planilla"} />
      <Buscador
        registrar={false}
        crear={false}
        exportar={false}
        cargar={false}
      />
      <Tabla columns={planilla} table={data} />
      {planillaControl && (
        <ModalPlanillaControl
          selected={tableData}
          actualizarTabla={getTrabajadores}
        />
      )}
    </div>
  );
};

export default ControlPlanilla;
