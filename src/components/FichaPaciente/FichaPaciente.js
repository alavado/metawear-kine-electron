import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import queryPaciente from '../../graphql/queries/paciente'
import './FichaPaciente.css'
import { fijarPaciente } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const FichaPaciente = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, data } = useQuery(queryPaciente, {
    variables: { id },
    onCompleted: data => dispatch(fijarPaciente(data.paciente))
  })
  const { paciente } = useSelector(state => state.paciente)

  if (loading || !paciente) {
    return <div>Cargando...</div>
  }

  return (
    <div className="FichaPaciente">
      <div>
        <div>Paciente: {paciente.nombre}</div>
        <div>{paciente.bp}</div>
        <div>{paciente.sexo}</div>
        <div>{paciente.fechaNacimiento}</div>
        <div>{paciente.diagnostico}</div>
        <Link to="/medicion/seleccion_prueba">Nueva medición</Link>
        <div>
          <h1>Historial</h1>
        </div>
      </div>
    </div>
  )
}

export default FichaPaciente
