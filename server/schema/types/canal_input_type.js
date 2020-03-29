const graphql = require('graphql')
const { GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLInputObjectType } = graphql

const CanalInputType = new GraphQLInputObjectType({
  name: 'CanalInputType',
  fields: () => ({
    nombre: { type: GraphQLString },
    datos: { type: new GraphQLList(GraphQLFloat) },
    tiempos: { type: new GraphQLList(GraphQLInt) }
  })
})

module.exports = CanalInputType
