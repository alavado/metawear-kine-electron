import React, { useState, useEffect } from 'react'
import './App.css'
import { w3cwebsocket } from 'websocket'
import Quaternion from 'quaternion'
import MiniDispositivo from '../MiniDispositivo/MiniDispositivo'

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
    }, 100)
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

  const macs = Object.keys(dispositivos) 
  //const macs = Object.keys(dispositivosPrueba)

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
              const rot = dispositivos[mac]
              const q = new Quaternion(rot[0], rot[1], rot[2], rot[3])
              return <tr key={`fila-${mac}`}>
                <td>{mac}</td>
                <td>{rot[0].toLocaleString('de-DE')}</td>
                <td>{rot[1].toLocaleString('de-DE')}</td>
                <td>{rot[2].toLocaleString('de-DE')}</td>
                <td>{rot[3].toLocaleString('de-DE')}</td>
                <td>
                  <div id="tridiv" >
                    <div className="scene" style={{transform: `matrix3d(${q.conjugate().toMatrix4()})`}}>
    <div className="shape cuboid-1 cub-1">
      <div className="face ft">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
      </div>
      <div className="face bk">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
      </div>
      <div className="face rt">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
      </div>
      <div className="face lt">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
      </div>
      <div className="face bm">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
      </div>
      <div className="face tp">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
      </div>
      <div className="cr cr-0">
        <div className="face side s0">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.11)',}}></div>
        </div>
        <div className="face side s1">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.075)',}}></div>
        </div>
        <div className="face side s2">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.11)',}}></div>
        </div>
      </div>
      <div className="cr cr-1">
        <div className="face side s0">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.196)',}}></div>
        </div>
        <div className="face side s1">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.3)',}}></div>
        </div>
        <div className="face side s2">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.404)',}}></div>
        </div>
      </div>
      <div className="cr cr-2">
        <div className="face side s0">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.49)',}}></div>
        </div>
        <div className="face side s1">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.525)',}}></div>
        </div>
        <div className="face side s2">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.49)',}}></div>
        </div>
      </div>
      <div className="cr cr-3">
        <div className="face side s0">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.404)',}}></div>
        </div>
        <div className="face side s1">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.298)',}}></div>
        </div>
        <div className="face side s2">
          <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.196)',}}></div>
        </div>
      </div>
    </div>
  </div>
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
