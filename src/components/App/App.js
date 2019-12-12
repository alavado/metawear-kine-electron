import React, { useState } from 'react'
import './App.css'
import { w3cwebsocket } from 'websocket'

const client = new w3cwebsocket('ws://192.168.0.17/echo', 'message')

const App = () => {

  const [mensaje, setMensaje] = useState('Nada')
  const [datosWiiBalance, setDatosWiiBalance] = useState({})

  const conectarConRaspberryPi = () => {
    setMensaje('Conectando...')
    client.onerror = () => {
      setMensaje('Error: No se encontró una Raspberry Pi en la URL ingresada.')
    }
    client.onopen = () => {
      setMensaje('Conexión exitosa con Rasberry Pi')
      client.send('iniciar')
    }
    client.onclose = () => {
      setMensaje('Conexión cerrada')
      setDatosWiiBalance({})
    }
    client.onmessage = e => {
      if (typeof e.data === 'string') {
        setDatosWiiBalance(JSON.parse(e.data))
      }
    }
  }

  return (
    <div className="App">
      <p>{mensaje}</p>
      {JSON.stringify(datosWiiBalance)}
      <button onClick={conectarConRaspberryPi}>Conectar</button>
    </div>
  )
}

export default App
