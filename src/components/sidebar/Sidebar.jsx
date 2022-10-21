import React from "react";
import { SidebarData } from "../../data/sidebarData";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import "./sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const [resize, setResize] = useState(false);

  const toggle = () => {
    setResize(!resize);
  };

  return (
    <div
      className="sidebar-container"
      // style={{ width: resize ? "70px" : "250px" }}
    >
      <div
        className="icon-container"
        // style={{ width: resize ? "70px" : "250px" }}
      >
        <AiOutlineMenu className="hamburguer" onClick={toggle} />
      </div>
      <div
        className="sidebar-logo"
        // style={{
        //   height: resize ? "60px" : "150px",
        //   width: resize ? "60px" : "150px",
        //   marginLeft: resize ? "0px": "50px"
        // }}
      ></div>
      <div
        className="sidebar-areas"
        //  style={{ width: resize ? "70px" : "250px" }}
      >
        <ul>
          {SidebarData.map((item, i) => {
            return (
              <Link className="link" key={i} to={item.path}>
                <span
                // style={{ width: resize ? "70px" : "250px" }}
                >
                  {item.icon}
                  <li
                  // style={{ display: resize ? "none" : "block" }}
                  >
                    {item.title}
                  </li>
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
      <Outlet/>
    </div>
  );
};

export default Sidebar;
