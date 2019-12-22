import React, { useState } from 'react'
import Quaternion from 'quaternion'
import MiniDispositivo from './MiniDispositivo'
import './Conexion.css'
import { useSelector } from 'react-redux'

const Conexion = ({conectar}) => {

  const dispositivos = useSelector(state => state.dispositivos.dispositivos)
  const [ipRaspberry, setIpRaspberry] = useState('192.168.0.15')
  const macs = Object.keys(dispositivos)

  return (
    <div className="seccion">
      {macs.length === 0 ?
        <div id="formulario-conexion">
          <input type="text" value={ipRaspberry} onChange={e => setIpRaspberry(e.target.value)} />
          <button onClick={() => conectar(ipRaspberry)}>Conectar</button>
        </div> :
        <h1>Dispositivos</h1>
      }
      <div id="contenedor-dispositivos">
        {macs.length > 0 &&
          macs.map(mac => {
            const rot = dispositivos[mac]
            const q = new Quaternion(rot[0], -rot[1], rot[2], -rot[3])
            return (
              <div key={`contenedor-dispositivo-${mac}`} className="contenedor-dispositivo">
                <div className="mac">{mac}</div>
                <div className="contenedor-mini-dispositivo">
                  <MiniDispositivo rot={q.conjugate().toMatrix4()} />
                </div>
                <div className="cuaternion">
                  {rot[0].toLocaleString('de-DE')} +
                  ({(-rot[1]).toLocaleString('de-DE')})i +
                  ({rot[2].toLocaleString('de-DE')})j +
                  ({(-rot[3]).toLocaleString('de-DE')})k
                </div>
              </div>
          )})
        }
      </div>
    </div>
  )
}

export default Conexion
