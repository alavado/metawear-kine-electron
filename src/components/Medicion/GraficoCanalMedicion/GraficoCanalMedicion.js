import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { formatearCanal } from '../../../config/canales'
import _ from 'lodash'
import './GraficoCanalMedicion.css'

const GraficoCanalMedicion = ({ canal }) => {

  const { canales } = useSelector(state => state.medicion)

  const data = useMemo(() => {
    const historialCanal = canales.find(c => c.nombre === canal)
    return {
      labels: (historialCanal && _.takeRight(historialCanal.tiempos.map(t => ''), 200)) || [],
      datasets: [
        {
          label: '',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#424242',
          borderColor: '#00ff00',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#00ff00',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#00ff00',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: (historialCanal && _.takeRight(historialCanal.datos, 200)) || []
        }
      ],
    }
  }, [canales])

  const options = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: -180,
          max: 180
        },
        position: 'right'
      }],
      xAxes: [{
        gridLines: {
          display: false
        },
      }],
    },
  }

  const historial = canales.find(c => c.nombre === canal)

  return (
    <div className="GraficoCanalMedicion">
      <div className="GraficoCanalMedicion__barra_superior">
        <h2 className="GraficoCanalMedicion__titulo">{formatearCanal(canal)}</h2>
        {historial && <div className="GraficoCanalMedicion__valores">
          <div className="GraficoCanalMedicion__valor_actual">{Math.round(historial.datos.slice(-1)[0])}°</div>
        </div>}
      </div>
      <Line className="GraficoCanalMedicion__grafico" data={data} options={options} height={80} />
    </div>
  )
}

export default GraficoCanalMedicion
