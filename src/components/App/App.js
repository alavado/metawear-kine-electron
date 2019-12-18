import React, { useState } from 'react'
import './App.css'
import Conexion from '../Conexion'
import Esqueleto from '../Esqueleto'
import { Link, Switch, Route } from 'react-router-dom'
import { w3cwebsocket } from 'websocket'
import { useDispatch } from 'react-redux'
import { ACTUALIZAR_DISPOSITIVOS } from '../../redux/actionTypes'

const App = () => {

  const [mensaje, setMensaje] = useState('Nada')
  const dispatch = useDispatch()

  const conectarConRaspberryPi = ip => {
    console.log('x')
    const socket = new w3cwebsocket(`ws://${ip}/echo`, 'message')
    setMensaje('Conectando...')
    socket.onerror = () => {
      setMensaje('Error: No se encontró una Raspberry Pi en la URL ingresada.')
    }
    socket.onopen = () => {
      setMensaje('Conexión exitosa con Rasberry Pi')
    }
    socket.onclose = () => {
      setMensaje('Conexión cerrada')
      dispatch({ type: ACTUALIZAR_DISPOSITIVOS, payload: {} })
    }
    socket.onmessage = e => {
      if (typeof e.data === 'string') {
        const dispositivos = JSON.parse(e.data)
        dispatch({ type: ACTUALIZAR_DISPOSITIVOS, payload: dispositivos })
      }
    }
  }

  return (
    <div className="App">
      <div className="menu">
        <Link to="/conexion">Conexion</Link>
        <Link to="/esqueleto">Esqueleto</Link>
      </div>
      <Switch>
        <Route path="/conexion" component={() => <Conexion conectar={conectarConRaspberryPi} mensaje={mensaje} /> } />
        <Route path="/esqueleto" component={Esqueleto} />
      </Switch>
    </div>
  )
}

export default App
