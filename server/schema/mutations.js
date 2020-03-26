const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList } = graphql
const mongoose = require('mongoose')
const PacienteType = require('./types/paciente_type')
const Paciente = mongoose.model('Paciente')

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
    }
  }
})

module.exports = mutation
