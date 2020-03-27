import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarPrueba($nombre: String!, $canales: [String!]) {
    agregarPrueba(nombre: $nombre, canales: $canales) {
      id
      nombre
    }
  }
`
