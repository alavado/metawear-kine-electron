import { FIJAR_PRUEBA, COMENZAR_GRABACION, TERMINAR_GRABACION } from "../actionTypes"

const initialState = {
  prueba: null,
  grabando: false,
  datos: []
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
      return {
        ...state,
        grabando: true
      }
    }
    case TERMINAR_GRABACION: {
      return {
        ...state,
        grabando: false
      }
    }
    default:
      return state;
  }
}
