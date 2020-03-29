const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const PruebaType = new GraphQLObjectType({
  name: 'PruebaType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    canales: { type: new GraphQLList(GraphQLString) }
  })
})

module.exports = PruebaType
