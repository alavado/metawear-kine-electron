import { gql } from 'apollo-boost'

export default gql`
  query Medicion($id: ID!) {
    medicion(id: $id) {
      id
      canales {
        nombre
        datos
        tiempos
      }
    }
  }
`
