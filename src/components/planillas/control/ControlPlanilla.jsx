import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Header from "../../header/Header";
import Buscador from "../Buscador";
import { AiFillEye } from "react-icons/ai";
import ModalPlanillaControl from "./ModalPlanillaControl";
import { controlPlanilla } from "../../../data/dataTable";
import BuscadorControlPlanilla from "../BuscadorControlPlanilla";
import ModalJuntarTeletrans from "./ModalJuntarTeletrans";
import useSearch from "../../../hooks/useSearch";
import TablaPlanilla from "../../tabla/TablaPlanilla";

const ControlPlanilla = () => {
  const { planillaControl, setPlanillaControl, setUserdata,juntarTeletrans } =
    useContext(PlanillaContext);
  const { getData, setData, data } = useContext(CrudContext);
  const [tableData, setTableData] = useState([]);
  const {result} = useSearch(data)

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

  const columns = controlPlanilla(handleContrato);

  return (
    <div>
      <Header text={"Planilla"} user={"Usuario"} ruta={"/planilla"} />
      <BuscadorControlPlanilla
        registrar={true}
        crear={false}
        exportar={false}
        cargar={false}
      />

      <TablaPlanilla columns={columns} table={result} />

      {planillaControl && (
        <ModalPlanillaControl
          selected={tableData}
          actualizarTabla={getTrabajadores}
        />
      )}
      {juntarTeletrans && (
        <ModalJuntarTeletrans
          selected={tableData}
          actualizarTabla={getTrabajadores}
        />
      )}
    </div>
  );
};

export default ControlPlanilla;
