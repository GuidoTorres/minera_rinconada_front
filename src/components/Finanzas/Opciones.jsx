import React from 'react'
import TipoUsuario from '../administracion/TipoUsuario'

const Opciones = () => {
  return (
    
    <div className='opciones-usuario'>
    <TipoUsuario text={"Ingresos/egresos"} path={"/finanzas/saldo"}/>
    <TipoUsuario text={"Proveedores"} path={"/finanzas/proveedor"}/>
    <TipoUsuario text={"Sucursales"} path={"/finanzas/sucursal"}/>
</div>
  )
}

export default Opciones