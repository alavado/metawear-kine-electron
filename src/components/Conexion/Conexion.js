import React, { useState } from 'react'
import { w3cwebsocket } from 'websocket'
import Quaternion from 'quaternion'
import MiniDispositivo from './MiniDispositivo'
import './Conexion.css'

const Conexion = () => {

  const [mensaje, setMensaje] = useState('Nada')
  const [dispositivos, setDispositivos] = useState({})
  const [ipRaspberry, setIpRaspberry] = useState('192.168.0.17')
  const macs = Object.keys(dispositivos)

  const conectarConRaspberryPi = () => {
    const client = new w3cwebsocket(`ws://${ipRaspberry}/echo`, 'message')
    setMensaje('Conectando...')
    client.onerror = () => {
      setMensaje('Error: No se encontró una Raspberry Pi en la URL ingresada.')
    }
    client.onopen = () => {
      setMensaje('Conexión exitosa con Rasberry Pi')
    }
    client.onclose = () => {
      setMensaje('Conexión cerrada')
      setDispositivos({})
    }
    client.onmessage = e => {
      if (typeof e.data === 'string') {
        setDispositivos(JSON.parse(e.data))
      }
    }
  }

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
      <button onClick={conectarConRaspberryPi}>Conectar</button>
    </div>
  )
}

export default Conexion
