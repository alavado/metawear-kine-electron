import { gql } from 'apollo-boost'

export default gql`
  {
    pruebas {
      id
      nombre
      canales
    }
  }
`