const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Paciente = mongoose.model('Paciente')

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
