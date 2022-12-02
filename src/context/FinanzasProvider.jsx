import { createContext, useState } from "react";

export const FinanzasContext = createContext();

export const FinanzasProvider = ({ children }) => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [modal, setModal] = useState(false);

  const data = { dataToEdit, setDataToEdit, modal, setModal };

  return (
    <FinanzasContext.Provider value={data}>{children}</FinanzasContext.Provider>
  );
};
