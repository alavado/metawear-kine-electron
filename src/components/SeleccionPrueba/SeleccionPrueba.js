import React from 'react'
import queryPruebas from '../../graphql/queries/pruebas'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import './SeleccionPrueba.css'

const SeleccionPrueba = () => {

  const { data, loading, error } = useQuery(queryPruebas)

  return (
    <div>
      <h1>Seleccione la prueba</h1>
      {data && data.pruebas.map(({ id, nombre }) => <p><Link>{nombre}</Link></p>)}
    </div>
  )
}

export default SeleccionPrueba
