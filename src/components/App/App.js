import React, { useState, useEffect } from 'react'
import './App.css'
import { w3cwebsocket } from 'websocket'
import Quaternion from 'quaternion'

const client = new w3cwebsocket('ws://192.168.0.17/echo', 'message')

const App = () => {

  const [dispositivosPrueba, setDispositivosPrueba] = useState({
    'AA:BB:CC:DD:EE:FF': [0.1, 0.2, 0.3, 0.4],
    'FF:BB:CC:DD:EE:AA': [0.4, 0.3, 0.2, 0.1]
  })

  useEffect(() => {
    const interval = () => setInterval(() => {
      let disp = {}
      Object.keys(dispositivosPrueba).forEach(d => {
        disp[d] = [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random()
        ]
      })
      setDispositivosPrueba(disp)
    }, 50)
    interval()
    return () => clearInterval(interval)
  }, [])

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

  // const macs = Object.keys(dispositivos) 
  const macs = Object.keys(dispositivosPrueba)

  return (
    <div className="App">
      <p>{mensaje}</p>
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
              const rot = dispositivosPrueba[mac]
              const q = new Quaternion(rot[0], rot[1], rot[2], rot[3])
              return <tr key={`fila-${mac}`}>
                <td>{mac}</td>
                <td>{rot[0].toLocaleString('de-DE')}</td>
                <td>{rot[1].toLocaleString('de-DE')}</td>
                <td>{rot[2].toLocaleString('de-DE')}</td>
                <td>{rot[3].toLocaleString('de-DE')}</td>
                <td>
                  <div
                    className="rectangulo"
                    style={{transform: `matrix3d(${q.conjugate().toMatrix4()})`}}
                  >
                    xx
                  </div>
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

export default App
