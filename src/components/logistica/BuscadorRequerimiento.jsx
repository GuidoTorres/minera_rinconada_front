import React from "react";
import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import { AiOutlineSearch } from "react-icons/ai";

const BuscadorRequerimiento = ({ generar, data }) => {
  const { setFilterText, createData, multipleRequerimientos } = useContext(CrudContext);


  const generarPedido = async () => {
    const route = "pedido";
    const response = await createData(multipleRequerimientos, route)

    // console.log(response);
  };

  return (
    <div className="buscador-finanzas">
      <div>
        <span>
          <input
            type="text"
            name=""
            onChange={(e) => setFilterText(e.target.value)}
          />
          <AiOutlineSearch className="icon" />
        </span>
      </div>
      {generar && data?.length > 0 ? (
        <div>
          <button onClick={() => generarPedido()}>+ Generar</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BuscadorRequerimiento;
