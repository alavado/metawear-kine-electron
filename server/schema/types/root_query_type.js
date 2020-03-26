const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList } = graphql
const PacienteType = require('./paciente_type')
const Paciente = mongoose.model('Paciente')
const PruebaType = require('./prueba_type')
const Pruebas = mongoose.model('Prueba')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pacientes: {
      type: new GraphQLList(PacienteType),
      resolve() {
        return Paciente.find({})
      }
    },
    pruebas: {
      type: new GraphQLList(PruebaType),
      resolve() {
        return Pruebas.find({})
      }
    }
  }
})

module.exports = RootQueryType
