import { gql } from 'apollo-boost'

export default gql`
  query Paciente($id: ID!) {
    paciente(id: $id) {
      id
      nombre
      bp
      sexo
      fechaNacimiento
      diagnostico
      mediciones {
        id
        nombre
        fecha
        prueba {
          nombre
        }
      }
    }
  }
`