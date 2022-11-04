import { createContext, useState } from "react";

export const PlanillaContext = createContext();

export const PlanillaProvider = ({ children }) => {
  const [planillaControl, setPlanillaControl] = useState(false);
  const [asistencia, setAsistencia] = useState(false);
  const [controlAsistencia, setControlAsistencia] = useState(false);
  const [campamentoAsistencia, setCampamentoAsistencia] = useState();
  const [validacionPagos, setValidacionPagos] = useState(false)
  const [fechaId, setFechaId]= useState()
  const [userData, setUserdata] = useState([])
  const [pago, setPago] = useState(false)

  const data = {
    planillaControl,
    setPlanillaControl,
    asistencia,
    setAsistencia,
    controlAsistencia,
    setControlAsistencia,
    campamentoAsistencia,
    setCampamentoAsistencia,
    validacionPagos, setValidacionPagos,fechaId, setFechaId,
    userData, setUserdata,pago, setPago
  };

  return (
    <PlanillaContext.Provider value={data}>{children}</PlanillaContext.Provider>
  );
};
