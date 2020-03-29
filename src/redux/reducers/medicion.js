import { FIJAR_PRUEBA, COMENZAR_GRABACION, TERMINAR_GRABACION, ACTUALIZAR_ANGULOS_SEGMENTO } from "../actionTypes"
import { canales,
  CANAL_FLEXIÓN_MUÑECA, CANAL_RADIALIZACIÓN_MUÑECA,
  CANAL_PRONACIÓN_CODO, CANAL_FLEXIÓN_CODO,
  CANAL_FLEXIÓN_HOMBRO, CANAL_ABDUCCIÓN_HOMBRO, CANAL_ROTACIÓN_HOMBRO } from "../../config/canales"
import { rad2deg } from "../../helpers/cuaterniones"

const initialState = {
  prueba: null,
  grabando: false,
  inicio: 0,
  canales: []
}

const obtenerCanalesSegmento = (nombre, angulos) => {
  switch (nombre) {
    case 'mano derecha':
      return [
        { canal: CANAL_FLEXIÓN_MUÑECA, angulo: angulos[0] },
        { canal: CANAL_RADIALIZACIÓN_MUÑECA, angulo: angulos[2] },
      ]
    case 'antebrazo derecho':
      return [
        { canal: CANAL_FLEXIÓN_CODO, angulo: angulos[0] },
        { canal: CANAL_PRONACIÓN_CODO, angulo: angulos[2] },
      ]
    case 'brazo derecho':
      return [
        { canal: CANAL_FLEXIÓN_HOMBRO, angulo: angulos[0] },
        { canal: CANAL_ABDUCCIÓN_HOMBRO, angulo: angulos[1] },
        { canal: CANAL_ROTACIÓN_HOMBRO, angulo: angulos[2] },
      ]
    default:
      return null
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_PRUEBA: {
      return {
        ...state,
        prueba: action.payload
      }
    }
    case COMENZAR_GRABACION: {
      console.log(canales.map(canal => ({
        nombre: canal,
        datos: [],
        tiempos: []
      })))
      return {
        ...state,
        grabando: true,
        inicio: Date.now(),
        canales: canales.map(canal => ({
          nombre: canal,
          datos: [],
          tiempos: []
        }))
      }
    }
    case TERMINAR_GRABACION: {
      return {
        ...state,
        grabando: false
      }
    }
    case ACTUALIZAR_ANGULOS_SEGMENTO: {
      if (!state.grabando) {
        return state
      }
      const { nombre, angulos } = action.payload
      const canales = [...state.canales]
      const canalesSegmento = obtenerCanalesSegmento(nombre, angulos)
      canalesSegmento.forEach(({ canal, angulo }) => {
        canales.find(c => c.nombre === canal).datos.push(rad2deg(angulo.valor))
        canales.find(c => c.nombre === canal).tiempos.push(Date.now() - state.inicio)
      })
      return { ...state, canales }
    }
    default:
      return state;
  }
}
