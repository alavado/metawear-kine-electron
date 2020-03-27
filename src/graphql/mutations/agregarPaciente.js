import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarPaciente($nombre: String!, $bp: String!, $sexo: String!, $fechaNacimiento: String!, $diagnostico: String) {
    agregarPaciente(nombre: $nombre, bp: $bp, sexo: $sexo, fechaNacimiento: $fechaNacimiento, diagnostico: $diagnostico) {
      id
      nombre,
      bp,
      sexo,
      fechaNacimiento,
      diagnostico
    }
  }
`
