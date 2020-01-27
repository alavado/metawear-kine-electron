import { ACTUALIZAR_DISPOSITIVOS, FIJAR_ESTADO_CONEXION, ACTUALIZAR_ANGULOS_SEGMENTO } from "./actionTypes";

export const fijarEstadoConexion = estado => ({
  type: FIJAR_ESTADO_CONEXION,
  payload: estado
})

export const actualizarDispositivos = dispositivos => ({
  type: ACTUALIZAR_DISPOSITIVOS,
  payload: Object.keys(dispositivos).map(k => ({
    mac: k,
    q: {
      x: dispositivos[k][1],
      y: dispositivos[k][2],
      z: dispositivos[k][3],
      w: dispositivos[k][0],
    }
  }))
})

export const actualizarAngulosSegmento = (nombre, angulos) => {
  console.log({nombre, angulos})
  let angulosFormateados
  if (nombre === 'mano derecha') {
    angulosFormateados = [
      {
        nombre: 'Flexión / extensión',
        eje: 'x',
        valor: angulos[0]
      },
      {
        nombre: 'Radialización / ulnarización',
        eje: 'y',
        valor: angulos[1]
      },
      {
        nombre: '',
        eje: 'z',
        valor: angulos[2]
      }
    ]
  }
  else if (nombre === 'antebrazo derecho') {
    angulosFormateados = [
      {
        nombre: '',
        eje: 'x',
        valor: angulos[0]
      },
      {
        nombre: 'Flexión / extensión',
        eje: 'y',
        valor: angulos[1]
      },
      {
        nombre: 'Pronación / supinación',
        eje: 'z',
        valor: angulos[2]
      }
    ]
  }
  else {
    angulosFormateados = [
      {
        nombre: 'Abducción / aducción',
        eje: 'x',
        valor: angulos[0]
      },
      {
        nombre: 'Flexión / extensión',
        eje: 'y',
        valor: angulos[1]
      },
      {
        nombre: 'Rotación interna / externa',
        eje: 'z',
        valor: angulos[2]
      }
    ]
  }
  return {
    type: ACTUALIZAR_ANGULOS_SEGMENTO,
    payload: { nombre, angulos: angulosFormateados }
  }
}
