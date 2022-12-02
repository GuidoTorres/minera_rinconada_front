import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="main-container">
      <section className="main-side">
        <Sidebar />
      </section>
      <section className="main-content">
        <Outlet/>
      </section>
    </div>
  );
};

export default Layout;
