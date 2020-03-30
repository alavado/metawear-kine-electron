const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLFloat, GraphQLInt } = graphql
const CanalType = require('./canal_type')
const mongoose = require('mongoose')
const Prueba = mongoose.model('Prueba')

const MedicionType = new GraphQLObjectType({
  name: 'MedicionType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    fecha: { type: GraphQLString },
    paciente: { type: GraphQLID },
    prueba: {
      type: require('./prueba_type'),
      resolve(parentValue) {
        return Prueba.findById(parentValue.prueba)
      }
    },
    canales: { type: new GraphQLList(CanalType) }
  })
})

module.exports = MedicionType
