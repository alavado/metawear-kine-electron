import React, { useState } from 'react'
import './Medicion.css'
import { useSelector } from 'react-redux'
import VisualizacionMedicion from './VisualizacionMedicion'

const Medicion = () => {

  const [grabando, setGrabando] = useState(false)
  const { prueba } = useSelector(state => state.medicion)

  return (
    <div className="Medicion">
      <div className="Medicion__configuracion">
        <h2>{prueba && prueba.nombre}</h2>
        <h3>En esta prueba se mide lo siguiente:</h3>
        {prueba && prueba.canales.map(canal => <div key={canal}>{canal}</div>)}
        <button onClick={e => setGrabando(!grabando)}>{grabando ? 'Detener' : 'Comenzar'}</button>
      </div>
      {grabando &&
        <div className="Medicion__estado">
          <div className="Medicion__graficos">
            {prueba && prueba.canales.map(canal => (
              <div key={canal}>
                <h1>{canal}</h1>
              </div>
            ))}
          </div>
          <div className="Medicion__visualizacion">
            <VisualizacionMedicion />
          </div>
        </div>
      }
    </div>
  )
}

export default Medicion
