import React from 'react'
import TipoUsuario from './TipoUsuario'
import "./styles/opcionUsuario.css"

const OpcionUsuario = () => {
  return (
    <div className='opciones-usuario'>
        <TipoUsuario text={"Usuarios"} path={"usuarios"}/>
        <TipoUsuario text={"Roles o Puestos"} path={"roles"}/>
        <TipoUsuario text={"Campamentos"} path={"campamentos"}/>
    </div>
  )
}

export default OpcionUsuario