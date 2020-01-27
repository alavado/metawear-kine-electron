import { FIJAR_ESTADO_CONEXION } from "../actionTypes"

const initialState = {
  estado: {
    texto: 'Conecte con la Raspberry Pi para comenzar una medición',
    color: '#2E483E'
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_ESTADO_CONEXION: {
      return {
        ...state,
        estado: action.payload,
        activa: true
      }
    }
    default:
      return state;
  }
}
