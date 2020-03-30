const graphql = require('graphql')
const { GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLObjectType } = graphql

const CanalType = new GraphQLObjectType({
  name: 'CanalType',
  fields: () => ({
    nombre: { type: GraphQLString },
    datos: { type: new GraphQLList(GraphQLFloat) },
    tiempos: { type: new GraphQLList(GraphQLInt) }
  })
})

module.exports = CanalType
