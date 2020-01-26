import React from 'react'
import './MiniGrafico.css'
import { Line } from 'react-chartjs-2'

const MiniGrafico = ({ data }) => {

  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: false
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: false
        },
        ticks: {
          suggestedMin: -220,
          suggestedMax: 180,
          display: false
        }
      }]
    }
  }

  return (
    <div className="contenedor-mini-grafico">
      <Line
        data={{
          labels: data.map((p , i) => i),
          datasets: [
            {
              data,
              pointRadius: 0,
              fill: false,
              borderColor: '#00C65E',
              borderWidth: 1
            }
        ]}}
        options={options}
      />
    </div>
  )
}

export default MiniGrafico
