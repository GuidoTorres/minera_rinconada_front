import React from "react";
import Header from "../header/Header";
import Opciones from "./Opciones";

const MainLayout = () => {
  return (
    <>
      <Header back={false} text={"Logistica"}/>
      <Opciones />
    </>
  );
};

export default MainLayout;
