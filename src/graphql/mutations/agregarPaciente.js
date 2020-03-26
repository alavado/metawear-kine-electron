import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarPaciente($nombre: String!) {
    agregarPaciente(nombre: $nombre) {
      id
      nombre
    }
  }
`
