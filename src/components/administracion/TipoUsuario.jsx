import React from "react";
import { Link } from "react-router-dom";
import "./styles/tipoUsuario.css";

const TipoUsuario = ({ text, path }) => {
  return (
    <Link
      className="rol"
      to={`/administracion/${path}`}
      onClick={(e) => {
        setRender(text);
      }}
    >
      <span className="rol-circle"></span>
      <label htmlFor="">{text}</label>
    </Link>
  );
};

export default TipoUsuario;
