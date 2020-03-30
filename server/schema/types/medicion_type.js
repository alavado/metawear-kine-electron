const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLFloat, GraphQLInt } = graphql
const CanalType = require('./canal_type')

const MedicionType = new GraphQLObjectType({
  name: 'MedicionType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    paciente: { type: GraphQLID },
    prueba: { type: GraphQLID },
    canales: { type: new GraphQLList(CanalType) }
  })
})

module.exports = MedicionType
