const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql
const PacienteType = require('./paciente_type')
const Paciente = mongoose.model('Paciente')
const PruebaType = require('./prueba_type')
const Prueba = mongoose.model('Prueba')
const MedicionType = require('./medicion_type')
const Medicion = mongoose.model('Medicion')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pacientes: {
      type: new GraphQLList(PacienteType),
      resolve() {
        return Paciente.find({})
      }
    },
    paciente: {
      type: PacienteType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Paciente.findById(id)
      }
    },
    pruebas: {
      type: new GraphQLList(PruebaType),
      resolve() {
        return Prueba.find({})
      }
    },
    mediciones: {
      type: new GraphQLList(MedicionType),
      resolve(parentValue, { idPaciente }) {
        return Medicion.find({ paciente: idPaciente })
      }
    },
    medicion: {
      type: MedicionType,
      resolve(parentValue, { id }) {
        return Medicion.findById(id)
      }
    }
  }
})

module.exports = RootQueryType
