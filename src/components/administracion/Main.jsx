import React from 'react'
import { Outlet } from 'react-router-dom'
import UsuarioLayout from './UsuarioLayout'

const Main = () => {
  return (
    <>
    <UsuarioLayout/>
    <Outlet/>
    </>
  )
}

export default Main