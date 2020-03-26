import React from 'react'
import './FichaPaciente.css'
import { useParams } from 'react-router-dom'

const FichaPaciente = () => {

  const { id } = useParams()

  return (
    <div>
      {id}
    </div>
  )
}

export default FichaPaciente
