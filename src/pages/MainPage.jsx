import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import AdministracionLayout from "../components/administracion/AdministracionLayout";
import CampamentoLayout from "../components/administracion/CampamentoLayout";
import ModalUsuario from "../components/administracion/ModalUsuario";
import RolLayout from "../components/administracion/RolLayout";
import UsuarioLayout from "../components/administracion/UsuarioLayout";
import AsociacionLayout from "../components/personal/asociaciones/AsociacionLayout";
import EmpresaLayout from "../components/personal/empresas/EmpresaLayout";
import PersonalLayout from "../components/personal/trabajadores/PersonalLayout";
import PersonalTipoLayout from "../components/personal/PersonalTipoLayout";
import Sidebar from "../components/sidebar/Sidebar";
import { AdminProvider } from "../context/AdminContext";
import { CrudProvider } from "../context/CrudContext";
import { PersonalProvider } from "../context/PersonalContext";
import Administrador from "./Administrador";
import "./styles/mainPage.css";
import IndexLayout from "../components/planillas/IndexLayout";
import ControlPlanilla from "../components/planillas/control/ControlPlanilla";
import { PlanillaProvider } from "../context/PlanillaContext";
import ListaAsistencia from "../components/planillas/asistencia/ListaAsistencia";

const MainPage = () => {
  return (
    <Router>
      <>
        <div className="main-container">
          <section className="main-side">
            <Sidebar />
          </section>

          <section className="main-content">
            <AdminProvider>
              <CrudProvider>
                <Routes>
                  <Route path="administracion">
                    <Route index element={<AdministracionLayout />} />
                    <Route path="usuarios" element={<UsuarioLayout />} />
                    <Route path="roles" element={<RolLayout />} />
                    <Route path="campamentos" element={<CampamentoLayout />} />
                  </Route>
                </Routes>
              </CrudProvider>
            </AdminProvider>

            <PersonalProvider>
              <CrudProvider>
                <Routes>
                  <Route path="personal">
                    <Route index element={<PersonalTipoLayout />} />
                    <Route path="trabajador" element={<PersonalLayout />} />
                    <Route path="asociacion" element={<AsociacionLayout />} />
                    <Route path="empresa" element={<EmpresaLayout />} />
                  </Route>
                </Routes>
              </CrudProvider>
            </PersonalProvider>

            <PlanillaProvider>
              <CrudProvider>
                <Routes>
                  <Route path="planilla">
                    <Route index element={<IndexLayout />} />
                    <Route path="asistencia" element={<ListaAsistencia />}  />
                    <Route path="control" element={<ControlPlanilla />} />
                  </Route>
                </Routes>
              </CrudProvider>
            </PlanillaProvider>
          </section>
        </div>
      </>
    </Router>
  );
};

export default MainPage;
