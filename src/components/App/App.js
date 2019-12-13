import React, { useState } from 'react'
import './App.css'
import { w3cwebsocket } from 'websocket'

const client = new w3cwebsocket('ws://192.168.0.17/echo', 'message')

const App = () => {

  const [mensaje, setMensaje] = useState('Nada')
  const [dispositivos, setDispositivos] = useState({})

  const conectarConRaspberryPi = () => {
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

  const macs = Object.keys(dispositivos)

  return (
    <div className="App">
      <p>{mensaje}</p>
      <table>
        <thead>
          <th>MAC</th>
          <th>w</th>
          <th>x</th>
          <th>y</th>
          <th>z</th>
        </thead>
        <tbody>
          {macs.length > 0 &&
            macs.map(mac => {
              return <tr>
                <td>{mac}</td>
                <td>{dispositivos[mac][0].toLocaleString('de-DE')}</td>
                <td>{dispositivos[mac][1].toLocaleString('de-DE')}</td>
                <td>{dispositivos[mac][2].toLocaleString('de-DE')}</td>
                <td>{dispositivos[mac][3].toLocaleString('de-DE')}</td>
              </tr>
            })
          }
        </tbody>
      </table>
      <button onClick={conectarConRaspberryPi}>Conectar</button>
    </div>
  )
}

export default App
