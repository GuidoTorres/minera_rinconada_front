import React from "react";
import { SidebarData } from "../../data/sidebarData";
import { Link, Outlet } from "react-router-dom";

import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="icon-container"></div>
      <div className="sidebar-logo"></div>
      <div className="sidebar-areas">
        <ul>
          {SidebarData.map((item, i) => {
            return (
              <Link className="link" key={i} to={item.path}>
                <span data-tooltip={item.title} data-tooltip-position="right">
                  {item.icon}
                  <li>{item.title}</li>
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
