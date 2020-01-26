import { ACTUALIZAR_DISPOSITIVOS } from "../actionTypes"

const initialState = {
  dispositivos: [],
  historial: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTUALIZAR_DISPOSITIVOS: {
      let historial = [...state.historial, {
        t: Date.now(),
        dispositivos: action.payload
      }]
      if (historial.length >= 100) {
        historial.shift()
      }
      return {
        ...state,
        dispositivos: action.payload,
        historial
      }
    }
    default:
      return state;
  }
}
