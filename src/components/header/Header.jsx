import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AdminContext } from "../../context/AdminContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./header.css";
const Header = ({ back, text, user, ruta }) => {
  // const setRender = useContext(AdminContext);

  return (
    <div className="header-container">
      <div className="header-role">
        {text && back !== false ? (
          <Link
            className="link"
            to={ruta}
            // onClick={(e) => {
            //   setRender(text);
            // }}
          >
            <AiOutlineArrowLeft
              // onClick={(e) => setRender(null)}
              className="back"
            />
          </Link>
        ) : null}
        <label htmlFor="">{text}</label>
      </div>
      <div className="header-user">
        <label htmlFor="">{user}</label>
        <div></div>
      </div>
    </div>
  );
};

export default Header;
