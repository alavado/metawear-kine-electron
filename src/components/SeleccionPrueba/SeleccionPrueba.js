import React from 'react'
import queryPruebas from '../../graphql/queries/pruebas'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import './SeleccionPrueba.css'

const SeleccionPrueba = () => {

  const { loading, data } = useQuery(queryPruebas)

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <h1>Seleccione la prueba</h1>
      {data.pruebas.map(({ id, nombre }) => (
        <p><Link to={`/medicion/${id}`}>{nombre}</Link></p>
      ))}
      <p><Link to="/nueva_prueba">Nueva</Link></p>
    </div>
  )
}

export default SeleccionPrueba
