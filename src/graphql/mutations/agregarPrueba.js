import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarPrueba($nombre: String!) {
    agregarPrueba(nombre: $nombre) {
      id
      nombre
    }
  }
`
