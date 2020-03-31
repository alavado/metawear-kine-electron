import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import queryPaciente from '../../graphql/queries/paciente'
import './FichaPaciente.css'
import { fijarPaciente } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'
import HistorialPaciente from './HistorialPaciente'

const FichaPaciente = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading } = useQuery(queryPaciente, {
    variables: { id },
    onCompleted: data => dispatch(fijarPaciente(data.paciente))
  })
  const { paciente } = useSelector(state => state.paciente)

  if (loading || !paciente) {
    return <div>Cargando...</div>
  }

  return (
    <div className="FichaPaciente">
      <div className="FichaPaciente__titulo">Paciente: {paciente.nombre}</div>
      <div className="FichaPaciente__contenedor_superior">
        <div className="FichaPaciente__campos">
          <div>BP: {paciente.bp}</div>
          <div>Sexo: {paciente.sexo}</div>
          <div>Fecha de nacimiento: {moment.unix(paciente.fechaNacimiento / 1000).format('L')}</div>
          <div>Diagnóstico: {paciente.diagnostico}</div>
        </div>
        <div className="FichaPaciente__contenedor_link_nueva_medicion">
          <Link className="FichaPaciente__link_nueva_medicion" to="/medicion/seleccion_prueba">Nueva medición</Link>
        </div>
      </div>
      <HistorialPaciente paciente={paciente} />
    </div>
  )
}

export default FichaPaciente
