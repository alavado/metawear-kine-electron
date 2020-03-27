const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Prueba = mongoose.model('Prueba')

const PruebaType = new GraphQLObjectType({
  name: 'PruebaType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    canales: { type: new GraphQLList(GraphQLString) }
  })
})

module.exports = PruebaType
