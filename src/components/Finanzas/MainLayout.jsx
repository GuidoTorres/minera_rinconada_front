import React from 'react'
import OpcionUsuario from '../administracion/OpcionUsuario'
import Header from '../header/Header'
import Opciones from './Opciones'

const MainLayout = () => {
  return (
    <>
    <Header back={false} text={"Finanzas"}/>
    <Opciones/>
    </>
  )
}

export default MainLayout