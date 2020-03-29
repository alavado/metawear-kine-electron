const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const PacienteType = new GraphQLObjectType({
  name: 'PacienteType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    bp: { type: GraphQLString },
    sexo: { type: GraphQLString },
    fechaNacimiento: { type: GraphQLString },
    diagnostico: { type: GraphQLString }
  })
})

module.exports = PacienteType
