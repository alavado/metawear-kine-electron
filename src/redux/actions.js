import { ACTUALIZAR_DISPOSITIVOS, FIJAR_ESTADO_CONEXION } from "./actionTypes";

export const fijarEstadoConexion = estado => ({
  type: FIJAR_ESTADO_CONEXION,
  payload: estado
})

export const actualizarDispositivos = dispositivos => ({
  type: ACTUALIZAR_DISPOSITIVOS,
  payload: Object.keys(dispositivos).map(k => ({
    mac: k,
    q: {
      x: dispositivos[k][0],
      y: dispositivos[k][1],
      z: dispositivos[k][2],
      w: dispositivos[k][3],
    }
  }))
})
