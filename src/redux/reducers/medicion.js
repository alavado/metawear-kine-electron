import { FIJAR_PRUEBA } from "../actionTypes"

const initialState = {
  prueba: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_PRUEBA: {
      return {
        ...state,
        prueba: action.payload
      }
    }
    default:
      return state;
  }
}
