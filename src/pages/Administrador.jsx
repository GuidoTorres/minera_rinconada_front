import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import AdministracionLayout from "../components/administracion/AdministracionLayout";
import CampamentoLayout from "../components/administracion/CampamentoLayout";
import RolLayout from "../components/administracion/RolLayout";
import UsuarioLayout from "../components/administracion/UsuarioLayout";
import Sidebar from "../components/sidebar/Sidebar";
import { AdminProvider } from "../context/AdminContext";
import { CrudProvider } from "../context/CrudContext";

const Administrador = () => {
  return (
    <div className="main-container">
      <section className="main-side">
        <Sidebar />
      </section>
      <section className="main-content">
        <CrudProvider>
          <AdminProvider>
            <Routes>
              <Route path="/" element={<AdministracionLayout />}>
                <Route path="usuarios" element={<UsuarioLayout />} />
                <Route path="roles" element={<RolLayout />} />
                <Route path="campamentos" element={<CampamentoLayout />} />
              </Route>
            </Routes>
            <Outlet/>
          </AdminProvider>
        </CrudProvider>
      </section>
    </div>
  );
};

export default Administrador;
