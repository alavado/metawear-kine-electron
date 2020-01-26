import { ACTUALIZAR_DISPOSITIVOS } from "../actionTypes"

const initialState = {
  dispositivos: [],
  historial: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTUALIZAR_DISPOSITIVOS: {
      return {
        ...state,
        dispositivos: action.payload,
        historial: [...state.historial, action.payload]
      }
    }
    default:
      return state;
  }
}
