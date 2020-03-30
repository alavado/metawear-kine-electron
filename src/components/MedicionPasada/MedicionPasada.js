import React from 'react'
import './MedicionPasada.css'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import queryMedicion from '../../graphql/queries/medicion'
import { formatearCanal } from '../../config/canales'
import GraficoMedicionPasada from './GraficoMedicionPasada'

const MedicionPasada = () => {

  const { id } = useParams()
  const { data, loading } = useQuery(queryMedicion, { variables: { id } })

  if (loading) {
    return 'Cargando...'
  }
  
  const { medicion } = data

  return (
    <div className="MedicionPasada">
      medicion {id}
      {medicion.canales.map(canal => (
        <div className="MedicionPasada__contenedor_grafico" key={`grafico-${canal.nombre}`}>
          <h1>{formatearCanal(canal.nombre)}</h1>
          <GraficoMedicionPasada canal={canal} />
        </div>
      ))}
    </div>
  )
}

export default MedicionPasada
