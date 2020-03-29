import { combineReducers } from 'redux'
import conexion from './conexion'
import dispositivos from './dispositivos'
import segmentos from './segmentos'
import medicion from './medicion'
import paciente from './paciente'

export default combineReducers({ conexion, dispositivos, segmentos, medicion, paciente })
