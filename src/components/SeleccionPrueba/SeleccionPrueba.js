import React from 'react'
import queryPruebas from '../../graphql/queries/pruebas'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import './SeleccionPrueba.css'
import { useDispatch } from 'react-redux'
import { fijarPrueba } from '../../redux/actions'

const SeleccionPrueba = () => {

  const { loading, data } = useQuery(queryPruebas)
  const dispatch = useDispatch()

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <h1>Seleccione la prueba</h1>
      {data.pruebas.map(prueba => (
        <p key={prueba.id}>
          <Link
            onClick={() => dispatch(fijarPrueba(prueba))}
            to={`/medicion/${prueba.id}`}
          >
            {prueba.nombre}
          </Link>
        </p>
      ))}
      <p><Link to="/nueva_prueba">Nueva</Link></p>
    </div>
  )
}

export default SeleccionPrueba
