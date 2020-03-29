import React from 'react'
import queryPruebas from '../../graphql/queries/pruebas'
import { useQuery } from '@apollo/react-hooks'
import { Link, useHistory } from 'react-router-dom'
import './SeleccionPrueba.css'
import { useDispatch, useSelector } from 'react-redux'
import { fijarPrueba } from '../../redux/actions'

const SeleccionPrueba = () => {

  const { loading, data } = useQuery(queryPruebas)
  const { paciente } = useSelector(state => state.paciente)
  const dispatch = useDispatch()
  const history = useHistory()

  if (!paciente) {
    history.push('/')
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <h1>Paciente: {paciente.nombre}</h1>
      <h2>Seleccione la prueba</h2>
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
