import React, { useState } from 'react'
import Quaternion from 'quaternion'
import MiniDispositivo from './MiniDispositivo'
import './Conexion.css'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'
import Esqueleto from '../Esqueleto'
import { obtenerAngulosDesdeCuaternionMetawear } from '../../helpers/cuaterniones'

const Conexion = ({conectar}) => {

  const dispositivos = useSelector(state => state.dispositivos.dispositivos)
  const historial = useSelector(state => state.dispositivos.historial)
  const [ipRaspberry, setIpRaspberry] = useState('192.168.0.17')
  const macs = Object.keys(dispositivos)

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
          display: false,
          labelString: 'Mes del ciclo'
        }
      }],
      yAxes: [{
        display: false,
        scaleLabel: {
          display: false,
          labelString: 'Peso promedio (kg)'
        },
        ticks: {
          suggestedMin: -180,
          suggestedMax: 180
        }
      }]
    }
  }

  return (
    <section>
      {macs.length === 0 &&
        <div id="formulario-conexion">
          <label>IP de la Raspberry Pi</label>
          <input type="text" value={ipRaspberry} onChange={e => setIpRaspberry(e.target.value)} />
          <button onClick={() => conectar(ipRaspberry)}>Conectar</button>
        </div>
      }
      <div id="contenedor-dispositivos">
        {macs.length > 0 &&
          macs.map((mac, i) => {
            const rot = dispositivos[mac]
            const w = rot[0], x = -rot[1], y = rot[2], z = -rot[3]
            const q = new Quaternion(w, x, y, z)
            const [roll, pitch, yaw] = obtenerAngulosDesdeCuaternionMetawear(rot)
            console.log(_.takeRight(historial, 300).map(h => obtenerAngulosDesdeCuaternionMetawear(h[mac])[0]))
            return (
              <div
                key={`contenedor-dispositivo-${mac}`}
                className="contenedor-dispositivo"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="barra-superior">{mac}</div>
                <div className="main-dispositivo">
                  <div className="aside-dispositivo">
                    <div>Roll: {roll}</div>
                    <div style={{marginTop: 12, width: '80px', height: '20px'}}>
                      <Line
                        data={{datasets: [
                          { data: _.takeRight(historial, 300).map(h => obtenerAngulosDesdeCuaternionMetawear(h[mac])[0]) }
                        ]}}
                        options={options}
                      />
                    </div>
                    <div>Pitch: {pitch}</div>
                    <div style={{marginTop: 12, width: '80px', height: '20px'}}>
                      <Line
                        data={{datasets: [
                          { data: _.takeRight(historial, 300).map(h => obtenerAngulosDesdeCuaternionMetawear(h[mac])[1]) }
                        ]}}
                        options={options}
                      />
                    </div>
                    <div>Yaw: {yaw}</div>
                    <div style={{marginTop: 12, width: '80px', height: '20px'}}>
                      <Line
                        data={{datasets: [
                          { data: _.takeRight(historial, 300).map(h => obtenerAngulosDesdeCuaternionMetawear(h[mac])[2]) }
                        ]}}
                        options={options}
                      />
                    </div>
                  </div>
                  <div className="contenedor-mini-dispositivo">
                    <MiniDispositivo rot={q.conjugate().toMatrix4()} />
                  </div>
                </div>
                {/* <div className="cuaternion">
                  {rot[0].toLocaleString('de-DE')} +
                  ({(-rot[1]).toLocaleString('de-DE')})i +
                  ({rot[2].toLocaleString('de-DE')})j +
                  ({(-rot[3]).toLocaleString('de-DE')})k
                </div> */}
              </div>
          )})
        }
      </div>
    </section>
  )
}

export default Conexion
