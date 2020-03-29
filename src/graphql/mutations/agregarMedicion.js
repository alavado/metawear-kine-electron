import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarMedicion(
    $prueba: ID!,
    $paciente: ID!,
    $nombre: String!,
    $fecha: String!,
    $canales: [CanalInputType!]
  ) {
    agregarMedicion(
      prueba: $prueba,
      paciente: $paciente,
      nombre: $nombre,
      fecha: $fecha,
      canales: $canales
    ) {
      id
    }
  }
`