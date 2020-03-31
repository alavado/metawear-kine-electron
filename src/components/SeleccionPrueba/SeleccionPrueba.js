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
    <div className="SeleccionPrueba">
      <h1 className="SeleccionPrueba__titulo">Paciente: {paciente.nombre}</h1>
      <h2 className="SeleccionPrueba__instrucciones">Seleccione la prueba</h2>
      <div className="SeleccionPrueba__contenedor_pruebas">
        {data.pruebas.sort((p, q) => p.nombre > q.nombre ? 1 : -1).map(prueba => (
          <Link
            className="SeleccionPrueba__boton_prueba"
            key={prueba.id}
            onClick={() => dispatch(fijarPrueba(prueba))}
            to={`/medicion/${prueba.id}`}
          >
            {prueba.nombre}
          </Link>
        ))}
        <Link className="SeleccionPrueba__boton_nueva_prueba" to="/nueva_prueba">Nueva</Link>
      </div>
    </div>
  )
}

export default SeleccionPrueba
