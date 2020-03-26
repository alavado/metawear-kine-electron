import React from 'react'
import './FichaPaciente.css'
import { Link, useParams } from 'react-router-dom'

const FichaPaciente = () => {

  const { id } = useParams()

  return (
    <div>
      {id}
      <Link to="/seleccion_prueba">Nueva prueba</Link>
      <div>
        <h1>Historial</h1>
      </div>
    </div>
  )
}

export default FichaPaciente
