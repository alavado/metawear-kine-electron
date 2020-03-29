import React from 'react'
import './Medicion.css'
import { useSelector, useDispatch } from 'react-redux'
import VisualizacionMedicion from './VisualizacionMedicion'
import GraficoCanalMedicion from './GraficoCanalMedicion'
import { comenzarGrabacion, terminarGrabacion } from '../../redux/actions'

const Medicion = () => {

  const { grabando, prueba } = useSelector(state => state.medicion)
  const dispatch = useDispatch()

  return (
    <div className="Medicion">
      <div className="Medicion__configuracion">
        <h2>{prueba && prueba.nombre}</h2>
        <button onClick={() => dispatch(!grabando ? comenzarGrabacion() : terminarGrabacion())}>
          {grabando ? 'Detener' : 'Comenzar'}
        </button>
      </div>
      <div className="Medicion__estado">
        <div className="Medicion__graficos">
          {prueba && prueba.canales.map(canal => (
            <GraficoCanalMedicion key={canal} canal={canal} />
          ))}
        </div>
        <div className="Medicion__visualizacion">
          <VisualizacionMedicion />
        </div>
      </div>
    </div>
  )
}

export default Medicion
