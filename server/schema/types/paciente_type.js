const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const MedicionType = require('./medicion_type')
const mongoose = require('mongoose')
const Paciente = mongoose.model('Paciente')

const PacienteType = new GraphQLObjectType({
  name: 'PacienteType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    bp: { type: GraphQLString },
    sexo: { type: GraphQLString },
    fechaNacimiento: { type: GraphQLString },
    diagnostico: { type: GraphQLString },
    mediciones: {
      type: new GraphQLList(MedicionType),
      resolve(parentValue) {
        return Paciente.findMediciones(parentValue.id)
      }
    },
  })
})

module.exports = PacienteType
