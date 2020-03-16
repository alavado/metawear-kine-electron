import { ACTUALIZAR_ANGULOS_SEGMENTO, ACTUALIZAR_CUATERNION_SEGMENTO } from "../actionTypes"
import { Quaternion } from "three";

const initialState = {
  segmentos: [
    {
      nombre: 'mano derecha',
      angulos: [
        { eje: 'x', valor: 0, nombre: 'Flexión / extensión' },
        { eje: 'y', valor: 0, nombre: '' },
        { eje: 'z', valor: 0, nombre: 'Radialización / ulnarización' }
      ],
      cuaternion: new Quaternion()
    },
    {
      nombre: 'antebrazo derecho',
      angulos: [
        { eje: 'x', valor: 0, nombre: '' },
        { eje: 'y', valor: 0, nombre: 'Flexión / extensión' },
        { eje: 'z', valor: 0, nombre: 'Pronación / supinación' }
      ],
      cuaternion: new Quaternion()
    },
    {
      nombre: 'brazo derecho',
      angulos: [
        { eje: 'x', valor: 0, nombre: 'Abducción / aducción' },
        { eje: 'y', valor: 0, nombre: 'Flexión / extensión' },
        { eje: 'z', valor: 0, nombre: 'Rotación interna / externa' }
      ],
      cuaternion: new Quaternion()
    }
  ]
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTUALIZAR_ANGULOS_SEGMENTO: {
      const { nombre, angulos } = action.payload
      return {
        ...state,
        segmentos: [
          ...state.segmentos.filter(s => s.nombre !== nombre),
          {
            ...state.segmentos.find(s => s.nombre === nombre),
            nombre,
            angulos
          }
        ]
      }
    }
    case ACTUALIZAR_CUATERNION_SEGMENTO: {
      const { nombre, cuaternion } = action.payload
      return {
        ...state,
        segmentos: [
          ...state.segmentos.filter(s => s.nombre !== nombre),
          {
            ...state.segmentos.find(s => s.nombre === nombre),
            cuaternion
          }
        ]
      }
    }
    default:
      return state;
  }
}
