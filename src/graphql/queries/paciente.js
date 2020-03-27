import { gql } from 'apollo-boost'

export default gql`
  query Paciente($id: ID!) {
    paciente(id: $id) {
      nombre
      bp
      sexo
      fechaNacimiento
      diagnostico
    }
  }
`