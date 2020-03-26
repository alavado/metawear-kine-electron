const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList } = graphql
const PacienteType = require('./paciente_type')
const Paciente = mongoose.model('Paciente')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pacientes: {
      type: new GraphQLList(PacienteType),
      resolve() {
        return Paciente.find({})
      }
    }
  }
})

module.exports = RootQueryType
