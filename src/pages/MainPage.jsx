import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import AdministracionLayout from "../components/administracion/AdministracionLayout";
import CampamentoLayout from "../components/administracion/CampamentoLayout";
import RolLayout from "../components/administracion/RolLayout";
import UsuarioLayout from "../components/administracion/UsuarioLayout";
import AsociacionLayout from "../components/personal/asociaciones/AsociacionLayout";
import EmpresaLayout from "../components/personal/empresas/EmpresaLayout";
import PersonalLayout from "../components/personal/trabajadores/PersonalLayout";
import PersonalTipoLayout from "../components/personal/PersonalTipoLayout";
import Sidebar from "../components/sidebar/Sidebar";
import { CrudProvider } from "../context/CrudContext";
import { PersonalProvider } from "../context/PersonalContext";
import "./styles/mainPage.css";
import IndexLayout from "../components/planillas/IndexLayout";
import ControlPlanilla from "../components/planillas/control/ControlPlanilla";
import { PlanillaProvider } from "../context/PlanillaContext";
import ListaAsistencia from "../components/planillas/asistencia/ListaAsistencia";
import SocioLayout from "../components/personal/socios/SocioLayout";
import { FinanzasProvider } from "../context/FinanzasProvider";
import Finanzas from "../components/Finanzas/ingresos-egresos/FinanzasLayout";
import MainLayout from "../components/Finanzas/MainLayout";
import MainLayoutInventario from "../components/logistica/MainLayout";
import Proveedores from "../components/Finanzas/proveedor/Proveedores";
import Sucursales from "../components/Finanzas/sucursal/Sucursales";
import InventarioLayout from "../components/logistica/inventario/InventarioLayout";
import AlmacenLayout from "../components/logistica/almacen/AlmacenLayout";
import RequerimientoLayout from "../components/logistica/requerimientos/RequerimientoLayout";
import AprobacionLayout from "../components/logistica/aprobaciones/AprobacionLayout";
import TransferenciaLayout from "../components/logistica/transferencia/TransferenciaLayout";
import Header from "../components/header/Header";

const MainPage = () => {
  return (
    <Router>
      <>
        <div className="main-container">
          <section className="main-side">
            <Sidebar />
          </section>
          <section className="main-content">
     
            <CrudProvider>
              <Routes>
                <Route path="administracion">
                  <Route index element={<AdministracionLayout />} />
                  <Route path="usuarios" element={<UsuarioLayout />} />
                  <Route path="roles" element={<RolLayout />} />
                  <Route path="campamentos" element={<CampamentoLayout />} />
                </Route>
              </Routes>
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

              <PlanillaProvider>
                <Routes>
                  <Route path="planilla">
                    <Route index element={<IndexLayout />} />
                    <Route path="asistencia" element={<ListaAsistencia />} />
                    <Route path="control" element={<ControlPlanilla />} />
                  </Route>
                </Routes>
              </PlanillaProvider>

              <FinanzasProvider>
                <Routes>
                  <Route path="finanzas">
                    <Route index element={<MainLayout />} />
                    <Route path="saldo" element={<Finanzas />} />
                    <Route path="proveedor" element={<Proveedores />} />
                    <Route path="sucursal" element={<Sucursales />} />
                  </Route>
                </Routes>
              </FinanzasProvider>

              <Routes>
                <Route path="logistica">
                  <Route index element={<MainLayoutInventario />} />
                  <Route path="inventario" element={<InventarioLayout />} />
                  <Route path="almacen" element={<AlmacenLayout />} />
                  <Route path="sucursal" element={<Sucursales />} />
                  <Route path="requerimiento" element={<RequerimientoLayout />} />
                  <Route path="aprobacion" element={<AprobacionLayout />} />
                  <Route path="transferencia" element={<TransferenciaLayout />} />


                </Route>
              </Routes>
            </CrudProvider>
          </section>
        </div>
      </>
    </Router>
  );
};

export default MainPage;
