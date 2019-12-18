import React, { useState } from 'react'
import Quaternion from 'quaternion'
import MiniDispositivo from './MiniDispositivo'
import './Conexion.css'
import { useSelector } from 'react-redux'

const Conexion = ({conectar, mensaje}) => {

  const dispositivos = useSelector(state => state.dispositivos.dispositivos)
  const [ipRaspberry, setIpRaspberry] = useState('192.168.0.17')
  const macs = Object.keys(dispositivos)

  return (
    <div className="seccion">
      <p>{mensaje}</p>
      <input type="text" value={ipRaspberry} onChange={e => setIpRaspberry(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>MAC</th>
            <th>w</th>
            <th>x</th>
            <th>y</th>
            <th>z</th>
          </tr>
        </thead>
        <tbody>
          {macs.length > 0 &&
            macs.map(mac => {
              const rot = dispositivos[mac]
              const q = new Quaternion(rot[0], -rot[1], rot[2], -rot[3])
              return <tr key={`fila-${mac}`}>
                <td>{mac}</td>
                <td>{rot[0].toLocaleString('de-DE')}</td>
                <td>{rot[1].toLocaleString('de-DE')}</td>
                <td>{rot[2].toLocaleString('de-DE')}</td>
                <td>{rot[3].toLocaleString('de-DE')}</td>
                <td>
                  <MiniDispositivo
                    rot={q.conjugate().toMatrix4()}
                  />
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
      <button onClick={() => conectar(ipRaspberry)}>Conectar</button>
    </div>
  )
}

export default Conexion
