import { combineReducers } from 'redux'
import conexion from './conexion'
import dispositivos from './dispositivos'
import segmentos from './segmentos'
import medicion from './medicion'

export default combineReducers({ conexion, dispositivos, segmentos, medicion })
