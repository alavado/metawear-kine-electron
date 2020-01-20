import { FIJAR_ESTADO_CONEXION } from "../actionTypes"

const initialState = {
  estado: 'Conecte con la Raspberry Pi para comenzar una medición'
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_ESTADO_CONEXION: {
      return {
        ...state,
        estado: action.payload
      }
    }
    default:
      return state;
  }
}
