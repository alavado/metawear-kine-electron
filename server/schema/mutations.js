const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList } = graphql
const mongoose = require('mongoose')
const PacienteType = require('./types/paciente_type')
const Paciente = mongoose.model('Paciente')
const PruebaType = require('./types/prueba_type')
const Prueba = mongoose.model('Prueba')
const MedicionType = require('./types/medicion_type')
const Medicion = mongoose.model('Medicion')
const CanalType = require('./types/canal_type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    agregarPaciente: {
      type: PacienteType,
      args: {
        nombre: { type: GraphQLString },
        bp: { type: GraphQLString },
        sexo: { type: GraphQLString },
        fechaNacimiento: { type: GraphQLString },
        diagnostico: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return (new Paciente(args)).save()
      }
    },
    agregarPrueba: {
      type: PruebaType,
      args: {
        nombre: { type: GraphQLString },
        canales: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parentValue, args) {
        return (new Prueba(args)).save()
      }
    },
    agregarMedicion: {
      type: MedicionType,
      args: {
        nombre: { type: GraphQLString },
        fecha: { type: GraphQLString },
        paciente: { type: GraphQLID },
        prueba: { type: GraphQLID },
        canales: { type: new GraphQLList(CanalType) }
      },
      resolve(parentValue, args) {
        return (new Medicion(args)).save()
      }
    }
  }
})

module.exports = mutation
