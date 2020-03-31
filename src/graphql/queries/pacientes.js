import { gql } from 'apollo-boost'

export default gql`
  {
    pacientes {
      id
      nombre
      bp
    }
  }
`