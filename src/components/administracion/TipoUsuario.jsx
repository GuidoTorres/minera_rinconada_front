import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./styles/tipoUsuario.css";

const TipoUsuario = ({ text, path }) => {
  return (
    <>
      <Link
        className="rol"
        to={`${path}`}
        onClick={(e) => {
          setRender(text);
        }}
      >
        <span className="rol-circle"></span>
        <label htmlFor="">{text}</label>
      </Link>
      <Outlet />
    </>
  );
};

export default TipoUsuario;
