import { ACTUALIZAR_DISPOSITIVOS } from "../actionTypes"

const initialState = {
  dispositivos: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTUALIZAR_DISPOSITIVOS: {
      return {
        ...state,
        dispositivos: action.payload
      }
    }
    default:
      return state;
  }
}
