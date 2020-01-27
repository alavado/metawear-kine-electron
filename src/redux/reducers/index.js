import { combineReducers } from 'redux'
import conexion from './conexion'
import dispositivos from './dispositivos'
import segmentos from './segmentos'

export default combineReducers({ conexion, dispositivos, segmentos })
