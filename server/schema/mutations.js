const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList } = graphql
const mongoose = require('mongoose')
const PacienteType = require('./types/paciente_type')
const Paciente = mongoose.model('Paciente')
const PruebaType = require('./types/prueba_type')
const Prueba = mongoose.model('Prueba')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    agregarPaciente: {
      type: PacienteType,
      args: {
        nombre: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return (new Paciente(args)).save()
      }
    },
    agregarPrueba: {
      type: PruebaType,
      args: {
        nombre: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return (new Prueba(args)).save()
      }
    }
  }
})

module.exports = mutation
