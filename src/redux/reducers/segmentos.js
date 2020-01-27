import { ACTUALIZAR_ANGULOS_SEGMENTO } from "../actionTypes"

const initialState = {
  segmentos: [
    {
      nombre: 'mano derecha',
      angulos: [
        {
          nombre: 'Flexión / extensión',
          eje: 'x',
          valor: 0
        },
        {
          nombre: 'Radialización / ulnarización',
          eje: 'y',
          valor: 0
        },
        {
          nombre: '',
          eje: 'z',
          valor: 0
        }
      ]
    },
    {
      nombre: 'antebrazo derecho',
      angulos: [
        {
          nombre: '',
          eje: 'x',
          valor: 0
        },
        {
          nombre: 'Flexión / extensión',
          eje: 'y',
          valor: 0
        },
        {
          nombre: 'Pronación / supinación',
          eje: 'z',
          valor: 0
        }
      ]
    },
    {
      nombre: 'brazo derecho',
      angulos: [
        {
          nombre: 'Abducción / aducción',
          eje: 'x',
          valor: 0
        },
        {
          nombre: 'Flexión / extensión',
          eje: 'y',
          valor: 0
        },
        {
          nombre: 'Rotación interna / externa',
          eje: 'z',
          valor: 0
        }
      ]
    },
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
            nombre,
            angulos
          }
        ]
      }
    }
    default:
      return state;
  }
}
