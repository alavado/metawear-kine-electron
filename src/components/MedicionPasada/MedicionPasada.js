import React from 'react'
import './MedicionPasada.css'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import queryMedicion from '../../graphql/queries/medicion'
import { formatearCanal } from '../../config/canales'
import GraficoMedicionPasada from './GraficoMedicionPasada'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faFileExport } from '@fortawesome/free-solid-svg-icons'
const { ipcRenderer } = window.require('electron')

const generarCSV = medicion => {
  const { canales } = medicion
  let csv = 'canal;angulo[°];tiempo[s]\n'
  console.log(medicion)
  canales.forEach(canal => {
    for (let i = 0; i < canal.datos.length; i++) {
      csv += `${formatearCanal(canal.nombre)};${canal.datos[i]};${canal.tiempos[i] / 1000}\n`
    }
  })
  return csv
}

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
      <FontAwesomeIcon
        title="Exportar CSV"
        className="FichaPaciente__icono_celda"
        icon={faFileExport}
        size="lg"
        onClick={() => {
          ipcRenderer.send('generarCSV', generarCSV(medicion))
        }}
      />
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
