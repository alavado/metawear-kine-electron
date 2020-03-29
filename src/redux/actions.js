import { ACTUALIZAR_DISPOSITIVOS, FIJAR_ESTADO_CONEXION,
  ACTUALIZAR_ANGULOS_SEGMENTO, ACTUALIZAR_CUATERNION_SEGMENTO,
  FIJAR_PRUEBA, 
  COMENZAR_GRABACION,
  TERMINAR_GRABACION,
  FIJAR_PACIENTE} from './actionTypes'
import {
  CANAL_FLEXIÓN_MUÑECA, CANAL_RADIALIZACIÓN_MUÑECA,
  CANAL_ABDUCCIÓN_HOMBRO, CANAL_FLEXIÓN_HOMBRO,
  CANAL_ROTACIÓN_HOMBRO, CANAL_PRONACIÓN_CODO, CANAL_FLEXIÓN_CODO } from '../config/canales'

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
      { eje: 'x', valor: x, nombre: CANAL_FLEXIÓN_MUÑECA },
      { eje: 'y', valor: y, nombre: '' },
      { eje: 'z', valor: z, nombre: CANAL_RADIALIZACIÓN_MUÑECA }
    ]
  }
  else if (nombre === 'antebrazo derecho') {
    angulosFormateados = [
      { eje: 'x', valor: x, nombre: CANAL_PRONACIÓN_CODO },
      { eje: 'y', valor: y, nombre: '' },
      { eje: 'z', valor: z, nombre: CANAL_FLEXIÓN_CODO }
    ]
  }
  else {
    angulosFormateados = [
      { eje: 'x', valor: x, nombre: CANAL_ABDUCCIÓN_HOMBRO },
      { eje: 'y', valor: y, nombre: CANAL_FLEXIÓN_HOMBRO },
      { eje: 'z', valor: z, nombre: CANAL_ROTACIÓN_HOMBRO }
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

export const comenzarGrabacion = () => ({
  type: COMENZAR_GRABACION
})

export const terminarGrabacion = () => ({
  type: TERMINAR_GRABACION
})

export const fijarPaciente = paciente => ({
  type: FIJAR_PACIENTE,
  payload: paciente
})