import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import queryPaciente from '../../graphql/queries/paciente'
import './FichaPaciente.css'

const FichaPaciente = () => {

  const { id } = useParams()
  const { loading, data } = useQuery(queryPaciente, { variables: { id } })

  if (loading) {
    return <div>Cargando...</div>
  }

  const { nombre, fechaNacimiento, bp, sexo, diagnostico } = data.paciente

  return (
    <div className="FichaPaciente">
      <div>
        <div>{nombre}</div>
        <div>{bp}</div>
        <div>{sexo}</div>
        <div>{fechaNacimiento}</div>
        <div>{diagnostico}</div>
        <Link to="/medicion/seleccion_prueba">Nueva medición</Link>
        <div>
          <h1>Historial</h1>
        </div>
      </div>
    </div>
  )
}

export default FichaPaciente
