import React, { useState } from 'react'
import './App.css'
import Conexion from '../Conexion'
import Esqueleto from '../Esqueleto'
import Pacientes from '../Pacientes'
import FichaPaciente from '../FichaPaciente'
import { NavLink as Link, Switch, Route } from 'react-router-dom'
import { w3cwebsocket } from 'websocket'
import { useSelector, useDispatch } from 'react-redux'
import { fijarEstadoConexion, actualizarDispositivos } from '../../redux/actions'
import SeleccionPrueba from '../SeleccionPrueba'
import FormularioNuevoPaciente from '../FormularioNuevoPaciente'
import FormularioNuevaPrueba from '../FormularioNuevaPrueba'
import Medicion from '../Medicion'
import MedicionPasada from '../MedicionPasada'

const App = () => {

  const [mensaje, setMensaje] = useState('Nada')
  const dispatch = useDispatch()
  const estadoConexion = useSelector(state => state.conexion.estado)

  const conectarConRaspberryPi = ip => {
    const socket = new w3cwebsocket(`ws://${ip}/echo`, 'message')
    dispatch(fijarEstadoConexion('Conectando...'))
    socket.onerror = () => {
      dispatch(fijarEstadoConexion({
        texto: 'Error: No se encontró una Raspberry Pi en la URL ingresada.',
        color: 'red'
      }))
    }
    socket.onopen = () => {
      dispatch(fijarEstadoConexion({
        texto: 'Conexión exitosa con Rasberry Pi',
        color: '#00A74A'
      }))
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
          <h1>ACHS Kine</h1>
          <Link to="/dispositivos" activeClassName="link-activo">Conexión</Link>
          <Link to="/pacientes" activeClassName="link-activo">Pacientes</Link>
          {/* <Link to="/esqueleto" activeClassName="link-activo">Visualización 3D</Link> */}
        </nav>
        <main className="App__principal">
          <Switch>
            <Route path="/pacientes" component={Pacientes} />
            <Route path="/nuevo_paciente" component={FormularioNuevoPaciente} />
            <Route path="/medicion/seleccion_prueba" component={SeleccionPrueba} />
            <Route path="/nueva_prueba" component={FormularioNuevaPrueba} />
            <Route path="/medicion/:idprueba" component={Medicion} />
            <Route path="/paciente/:id" component={FichaPaciente} />
            <Route path="/dispositivos" component={() => (
              <Conexion
                conectar={conectarConRaspberryPi}
                mensaje={mensaje}
              />
            )} />
            <Route path="/esqueleto" component={Esqueleto} />
            <Route path="/medicion_pasada/:id" component={MedicionPasada} />
          </Switch>
        </main>
      </div>
      <footer style={{ backgroundColor: estadoConexion.color }}>{estadoConexion.texto}</footer>
    </div>
  )
}

export default App
