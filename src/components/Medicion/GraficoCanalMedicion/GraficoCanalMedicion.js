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
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
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
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: -180,
          max: 180
        }
      }]
    },
  }

  return (
    <div className="GraficoCanalMedicion">
      <h2>{formatearCanal(canal)}</h2>
      <Line data={data} options={options} height={80} />
    </div>
  )
}

export default GraficoCanalMedicion
