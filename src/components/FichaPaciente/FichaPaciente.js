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
        <div>BP: {paciente.bp}</div>
        <div>Sexo: {paciente.sexo}</div>
        <div>Fecha de nacimiento: {paciente.fechaNacimiento}</div>
        <div>Diagnóstico: {paciente.diagnostico}</div>
        <Link to="/medicion/seleccion_prueba">Nueva medición</Link>
        <div className="FichaPaciente__historial">
          <h1>Historial</h1>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Prueba</th>
              </tr>
            </thead>
            <tbody>
              {paciente.mediciones.map(medicion => (
                <tr key={medicion.id}>
                  <td>{medicion.fecha}</td>
                  <td>{medicion.prueba.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FichaPaciente
