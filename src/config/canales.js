export const CANAL_FLEXIÓN_MUÑECA = 'CANAL_FLEXIÓN_MUÑECA'
export const CANAL_RADIALIZACIÓN_MUÑECA = 'CANAL_RADIALIZACIÓN_MUÑECA'
export const CANAL_FLEXIÓN_CODO = 'CANAL_FLEXIÓN_CODO'
export const CANAL_PRONACIÓN_CODO = 'CANAL_PRONACIÓN_CODO'
export const CANAL_ROTACIÓN_HOMBRO = 'CANAL_ROTACIÓN_HOMBRO'
export const CANAL_ABDUCCIÓN_HOMBRO = 'CANAL_ABDUCCIÓN_HOMBRO'
export const CANAL_FLEXIÓN_HOMBRO = 'CANAL_FLEXIÓN_HOMBRO'

export const canales = [
  CANAL_FLEXIÓN_MUÑECA,
  CANAL_RADIALIZACIÓN_MUÑECA,
  CANAL_FLEXIÓN_CODO,
  CANAL_PRONACIÓN_CODO,
  CANAL_ROTACIÓN_HOMBRO,
  CANAL_ABDUCCIÓN_HOMBRO,
  CANAL_FLEXIÓN_HOMBRO
]

export const formatearCanal = canal => {
  switch (canal) {
    case CANAL_FLEXIÓN_MUÑECA:
      return 'Flexión de muñeca'
    case CANAL_RADIALIZACIÓN_MUÑECA:
      return 'Radialización de muñeca'
    case CANAL_FLEXIÓN_CODO:
      return 'Flexión de codo'
    case CANAL_PRONACIÓN_CODO:
      return 'Pronación de codo'
    case CANAL_ROTACIÓN_HOMBRO:
      return 'Rotación de hombro'
    case CANAL_ABDUCCIÓN_HOMBRO:
      return 'Abducción de hombro'
    case CANAL_FLEXIÓN_HOMBRO:
      return 'Flexión de hombro'
    default:
      return 'Canal no registrado'
  }
}