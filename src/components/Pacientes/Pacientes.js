import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryPacientes from '../../graphql/queries/pacientes'
import { Link } from 'react-router-dom'
import './Pacientes.css'

const Pacientes = () => {

  const { loading, data, error } = useQuery(queryPacientes)

  return (
    <div>
      {data && data.pacientes.map(({ id, nombre }) => (
        <Link to={`/paciente/${id}`}>{nombre}</Link>
      ))}
    </div>
  )
}

export default Pacientes
