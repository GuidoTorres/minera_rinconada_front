import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import AsociacionLayout from "../components/personal/asociaciones/AsociacionLayout";
import EmpresaLayout from "../components/personal/empresas/EmpresaLayout";
import PersonalTipoLayout from "../components/personal/PersonalTipoLayout";
import SocioLayout from "../components/personal/socios/SocioLayout";
import PersonalLayout from "../components/personal/trabajadores/PersonalLayout";
import Sidebar from "../components/sidebar/Sidebar";
import { CrudProvider } from "../context/CrudContext";
import { PersonalProvider } from "../context/PersonalContext";

const Personal = () => {
  return (
    <div className="main-container">
      <section className="main-side">
        <Sidebar />
      </section>
      <section className="main-content">
        <CrudProvider>
          <PersonalProvider>
            <Routes>
              <Route path="personal">
                <Route index element={<PersonalTipoLayout />} />
                <Route path="trabajador" element={<PersonalLayout />} />
                <Route path="asociacion" element={<AsociacionLayout />} />
                <Route path="empresa" element={<EmpresaLayout />} />
                <Route path="socio" element={<SocioLayout />} />
              </Route>
            </Routes>
          </PersonalProvider>
        </CrudProvider>
      </section>
    </div>
  );
};

export default Personal;
