const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Paciente = mongoose.model('Paciente')

const PacienteType = new GraphQLObjectType({
  name: 'PacienteType',
  fields: () => ({
    nombre: { type: GraphQLString }
  })
})

module.exports = PacienteType
