import React from "react";
import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import { Input, Button } from "antd";
import { AiOutlineForm } from "react-icons/ai";
import "./styles/buscadorHistorial.css";
const { Search } = Input;

const BuscadorEvaluacion = ({ abrirModal, registrar, data }) => {
  const { setFilterText } = useContext(CrudContext);

  return (
    <div className="personal-buscador">
      <Search
        placeholder="Ingresa un termino aqui..."
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />
      <div className="button-container">
        { data?.at(-1)?.finalizado === false ? (
          ""
        ) : (
          <Button onClick={() => abrirModal(true)} icon={<AiOutlineForm />}>
            Registrar
          </Button>
        )}
      </div>
    </div>
  );
};

export default BuscadorEvaluacion;
