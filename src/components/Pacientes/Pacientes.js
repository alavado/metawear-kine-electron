import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryPacientes from '../../graphql/queries/pacientes'
import './Pacientes.css'

const Pacientes = () => {

  const { loading, data, error } = useQuery(queryPacientes)

  return (
    <ul>
      {data && data.pacientes.map(paciente => <li>{paciente.nombre}</li>)}
    </ul>
  )
}

export default Pacientes
