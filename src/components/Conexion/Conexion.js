import React, { useState } from 'react'
import Quaternion from 'quaternion'
import MiniDispositivo from './MiniDispositivo'
import './Conexion.css'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { obtenerAngulosDesdeCuaternionMetawear } from '../../helpers/cuaterniones'
import MiniGrafico from './MiniGrafico/MiniGrafico'

const Conexion = ({conectar}) => {

  const dispositivos = useSelector(state => state.dispositivos.dispositivos)
  const historial = useSelector(state => state.dispositivos.historial)
  const [ipRaspberry, setIpRaspberry] = useState('192.168.1.96')

  return (
    <section className="Conexion">
      {_.isEmpty(dispositivos) &&
        <div className="Conexion__formulario_ip">
          <label>IP de la Raspberry Pi</label>
          <input type="text" value={ipRaspberry} onChange={e => setIpRaspberry(e.target.value)} />
          <button onClick={() => conectar(ipRaspberry)}>Conectar</button>
        </div>
      }
      <h1 className="Conexion__dispositivos_titulo">
        {_.isEmpty(dispositivos) ? 'No hay dispositivos conectados' : 'Dispositivos conectados'}
      </h1>
      <div className="Conexion__dispositivos">
        {dispositivos.map(({mac, q}, i) => {
          const [roll, pitch, yaw] = obtenerAngulosDesdeCuaternionMetawear(q)
          return (
            <div
              key={`contenedor-dispositivo-${mac}`}
              className="contenedor-dispositivo"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="barra-superior">{mac}</div>
              <div className="main-dispositivo">
                <div className="aside-dispositivo">
                  <div className="valor">Alabeo: {roll}</div>
                  <MiniGrafico
                    data={historial.map(h => obtenerAngulosDesdeCuaternionMetawear(_.find(h.dispositivos, { mac }).q)[0])}
                  />
                  <div className="valor">Cabeceo: {pitch}</div>
                  <MiniGrafico
                    data={historial.map(h => obtenerAngulosDesdeCuaternionMetawear(_.find(h.dispositivos, { mac }).q)[1])}
                  />
                  <div className="valor">Guiñada: {yaw}</div>
                  <MiniGrafico
                    data={historial.map(h => obtenerAngulosDesdeCuaternionMetawear(_.find(h.dispositivos, { mac }).q)[2])}
                  />
                </div>
                <div className="contenedor-mini-dispositivo">
                  <MiniDispositivo rot={new Quaternion(q.w, -q.x, q.y, -q.z).conjugate().toMatrix4()} />
                </div>
              </div>
            </div>
          )})
        }
      </div>
    </section>
  )
}

export default Conexion
