import { ACTUALIZAR_DISPOSITIVOS, FIJAR_ESTADO_CONEXION } from "./actionTypes";

export const fijarEstadoConexion = estado => ({
  type: FIJAR_ESTADO_CONEXION,
  payload: estado
})

export const actualizarDispositivos = dispositivos => ({
  type: ACTUALIZAR_DISPOSITIVOS,
  payload: dispositivos
})
