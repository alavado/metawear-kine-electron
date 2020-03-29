import { ACTUALIZAR_DISPOSITIVOS, FIJAR_ESTADO_CONEXION,
  ACTUALIZAR_ANGULOS_SEGMENTO, ACTUALIZAR_CUATERNION_SEGMENTO,
  FIJAR_PRUEBA } from "./actionTypes";

export const fijarEstadoConexion = estado => ({
  type: FIJAR_ESTADO_CONEXION,
  payload: estado
})

export const actualizarDispositivos = dispositivos => ({
  type: ACTUALIZAR_DISPOSITIVOS,
  payload: Object.keys(dispositivos).map(k => ({
    mac: k,
    q: {
      x: dispositivos[k][1],
      y: dispositivos[k][2],
      z: dispositivos[k][3],
      w: dispositivos[k][0],
    }
  }))
})

export const actualizarAngulosSegmento = (nombre, angulos) => {
  let angulosFormateados
  const [x, y, z] = angulos
  if (nombre === 'mano derecha') {
    angulosFormateados = [
      { eje: 'x', valor: x, nombre: 'Flexión / extensión' },
      { eje: 'y', valor: y, nombre: '' },
      { eje: 'z', valor: z, nombre: 'Radialización / ulnarización' }
    ]
  }
  else if (nombre === 'antebrazo derecho') {
    angulosFormateados = [
      { eje: 'x', valor: x, nombre: 'Pronación / supinación' },
      { eje: 'y', valor: y, nombre: '' },
      { eje: 'z', valor: z, nombre: 'Flexión / extensión' }
    ]
  }
  else {
    angulosFormateados = [
      { eje: 'x', valor: x, nombre: 'Abducción / aducción' },
      { eje: 'y', valor: y, nombre: 'Flexión / extensión' },
      { eje: 'z', valor: z, nombre: 'Rot. interna / externa' }
    ]
  }
  return {
    type: ACTUALIZAR_ANGULOS_SEGMENTO,
    payload: { nombre, angulos: angulosFormateados }
  }
}

export const actualizarCuaternionSegmento = (nombre, cuaternion) => {
  return {
    type: ACTUALIZAR_CUATERNION_SEGMENTO,
    payload: { nombre, cuaternion }
  }
}

export const fijarPrueba = prueba => ({
  type: FIJAR_PRUEBA,
  payload: prueba
})