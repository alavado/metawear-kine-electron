import { FIJAR_PACIENTE } from "../actionTypes"

const initialState = {
  paciente: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_PACIENTE: {
      return {
        ...state,
        paciente: action.payload
      }
    }
    default:
      return state;
  }
}
