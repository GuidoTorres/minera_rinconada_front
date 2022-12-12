import React from 'react'
import TipoUsuario from '../administracion/TipoUsuario'

const Opciones = () => {
  return (
    <div className='opciones-usuario'>
    <TipoUsuario text={"Inventario"} path={"/logistica/inventario"}/>
    <TipoUsuario text={"Almacenes"} path={"/logistica/almacen"}/>
    <TipoUsuario text={"Requerimientos"} path={"/logistica/requerimiento"}/>
    <TipoUsuario text={"Aprobaciones"} path={"/logistica/aprobacion"}/>
    <TipoUsuario text={"Transferencia de alamacenes"} path={"/logistica/transferencia"}/>

</div>
  )
}

export default Opciones