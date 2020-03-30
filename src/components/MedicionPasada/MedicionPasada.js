import React from 'react'
import './MedicionPasada.css'
import { useParams } from 'react-router-dom'

const MedicionPasada = () => {

  const { id } = useParams()

  return (
    <div>
      medicion {id}
    </div>
  )
}

export default MedicionPasada
