import React, { useState } from 'react'
import Quaternion from 'quaternion'
import MiniDispositivo from './MiniDispositivo'
import './Conexion.css'
import { useSelector } from 'react-redux'
import Esqueleto from '../Esqueleto'

const Conexion = ({conectar}) => {

  const dispositivos = useSelector(state => state.dispositivos.dispositivos)
  const [ipRaspberry, setIpRaspberry] = useState('192.168.0.17')
  const macs = Object.keys(dispositivos)

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

            const sinr_cosp = 2 * (w * x + y * z)
            const cosr_cosp = 1 - 2 * (x * x + y * y)
            const roll = Math.atan2(sinr_cosp, cosr_cosp)

            const sinp = 2 * (w * y - z * x)
            let pitch
            if (Math.abs(sinp) >= 1)
                pitch = Math.sign(sinp) * Math.PI / 2 // use 90 degrees if out of range
            else
                pitch = Math.asin(sinp)

            const siny_cosp = 2 * (w * z + x * y);
            const cosy_cosp = 1 - 2 * (y * y + z * z);
            const yaw = Math.atan2(siny_cosp, cosy_cosp);

            return (
              <div
                key={`contenedor-dispositivo-${mac}`}
                className="contenedor-dispositivo"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="barra-superior">{mac}</div>
                <div className="main-dispositivo">
                  <div className="aside-dispositivo">
                    <div>Roll: {Math.round(100 * roll * 360 / 6.28) / 100}</div>
                    <div>Pitch: {Math.round(100 * pitch * 360 / 6.28) / 100}</div>
                    <div>Yaw: {Math.round(100 * yaw * 360 / 6.28) / 100}</div>
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
