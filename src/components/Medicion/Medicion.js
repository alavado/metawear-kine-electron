import React from 'react'
import './Medicion.css'
import { useSelector } from 'react-redux'

const Medicion = () => {

  const { prueba } = useSelector(state => state.medicion)

  return (
    <div className="Medicion">
      <div className="Medicion__configuracion">
        <h2>En esta prueba</h2>
        {prueba && prueba.canales.map(canal => <div key={canal}>{canal}</div>)}
        <button>Comenzar</button>
      </div>
      <div className="Medicion__visualizacion">
      </div>
    </div>
  )
}

export default Medicion
