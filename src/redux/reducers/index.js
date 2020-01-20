import { combineReducers } from 'redux'
import conexion from './conexion'
import dispositivos from './dispositivos'

export default combineReducers({ conexion, dispositivos })
