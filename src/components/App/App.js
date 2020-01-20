import React, { useState } from 'react'
import './App.css'
import Conexion from '../Conexion'
import Esqueleto from '../Esqueleto'
import { Link, Switch, Route } from 'react-router-dom'
import { w3cwebsocket } from 'websocket'
import { useSelector, useDispatch } from 'react-redux'
import { fijarEstadoConexion, actualizarDispositivos } from '../../redux/actions'

const App = () => {

  const [mensaje, setMensaje] = useState('Nada')
  const dispatch = useDispatch()
  const estadoConexion = useSelector(state => state.conexion.estado)

  const conectarConRaspberryPi = ip => {
    const socket = new w3cwebsocket(`ws://${ip}/echo`, 'message')
    dispatch(fijarEstadoConexion('Conectando...'))
    socket.onerror = () => {
      dispatch(fijarEstadoConexion('Error: No se encontró una Raspberry Pi en la URL ingresada.'))
    }
    socket.onopen = () => {
      dispatch(fijarEstadoConexion('Conexión exitosa con Rasberry Pi'))
    }
    socket.onclose = () => {
      dispatch(fijarEstadoConexion('Conexión cerrada'))
      dispatch(actualizarDispositivos([]))
    }
    socket.onmessage = e => {
      if (typeof e.data === 'string') {
        const dispositivos = JSON.parse(e.data)
        dispatch(actualizarDispositivos(dispositivos))
      }
    }
  }

  return (
    <div className="app">
      <div className="contenedor-principal">
        <nav>
          <Link to="/dispositivos">Conexión</Link>
          <Link to="/esqueleto">Visualización 3D</Link>
        </nav>
        <Switch>
          <Route path="/dispositivos" component={() => (
            <Conexion
              conectar={conectarConRaspberryPi}
              mensaje={mensaje}
            />
          )} />
          <Route path="/esqueleto" component={Esqueleto} />
        </Switch>
      </div>
      <footer>{estadoConexion}</footer>
    </div>
  )
}

export default App
