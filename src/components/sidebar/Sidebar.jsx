import React from "react";
import { SidebarData } from "../../data/sidebarData";
import { Link } from "react-router-dom";
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
      style={{ width: resize ? "70px" : "250px" }}
    >
      <div className="icon-container">
        <AiOutlineMenu className="hamburguer" onClick={toggle} />
      </div>
      <div
        className="sidebar-logo"
        style={{ height: resize ? "60px" : "150px", width: resize ? "60px" : "150px" }}
      ></div>
      <div className="sidebar-areas">
        <ul>
          {SidebarData.map((item, i) => {
            return (
              <Link className="link" key={i} to={item.path}>
                <span>
                  {item.icon}
                  <li style={{ display: resize ? "none" : "block" }}>
                    {item.title}
                  </li>
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
