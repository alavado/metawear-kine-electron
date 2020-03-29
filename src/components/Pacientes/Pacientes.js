import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryPacientes from '../../graphql/queries/pacientes'
import { Link } from 'react-router-dom'
import './Pacientes.css'

const Pacientes = () => {

  const { data } = useQuery(queryPacientes)

  return (
    <div className="Pacientes">
      <h1>Pacientes</h1>
      <div>
        {data && data.pacientes.map(({ id, nombre }) => (
          <div key={id} className="Pacientes__fila_paciente">
            <Link to={`/paciente/${id}`}>{nombre}</Link>
          </div>
        ))}
      </div>
      <Link to={'/nuevo_paciente'}>Nuevo paciente</Link>
    </div>
  )
}

export default Pacientes
