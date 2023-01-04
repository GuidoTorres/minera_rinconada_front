import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { CrudContext } from '../../../context/CrudContext'
import { aprobacionLayout } from '../../../data/dataTable'
import Header from '../../header/Header'
import Tabla from '../../tabla/Tabla'
import BuscadorAprobacion from '../BuscadorAprobacion'

const AprobacionLayout = () => {

  const {getData} = useContext(CrudContext)
  const [data, setData] = useState([])

  const getAprobacion = async() => {

    const response = await getData("pedido")
    setData(response.data)
  }
  useEffect(() => {

    getAprobacion()
  },[])


  const columns = aprobacionLayout()

  return (
    <>
    <Header text={"Aprobaciones"} user={"Usuario"} ruta={"/logistica"}/>
    <br />
    <br />

    <BuscadorAprobacion/>
    <br />
    <br />

    <Tabla columns={columns} table={data}/>
    
    </>
  )
}

export default AprobacionLayout