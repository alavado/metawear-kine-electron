const graphql = require('graphql')
const { GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLInputObjectType } = graphql

const CanalType = new GraphQLInputObjectType({
  name: 'CanalType',
  fields: () => ({
    nombre: { type: GraphQLString },
    datos: { type: new GraphQLList(GraphQLFloat) },
    tiempos: { type: new GraphQLList(GraphQLInt) }
  })
})

module.exports = CanalType
