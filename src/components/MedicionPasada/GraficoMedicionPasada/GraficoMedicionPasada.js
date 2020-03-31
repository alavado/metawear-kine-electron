import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { formatearCanal } from '../../../config/canales'
import _ from 'lodash'
import './GraficoMedicionPasada.css'

const GraficoMedicionPasada = ({ canal }) => {

  const data = useMemo(() => {
    return {
      labels: canal.tiempos.map(t => Math.round(t / 1000)),
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
          data: canal.datos
        }
      ],
    }
  }, [canal])

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
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        },
      }],
    },
  }

  return (
    <div className="GraficoMedicionPasada">
      <Line data={data} options={options} height={80} />
    </div>
  )
}

export default GraficoMedicionPasada
