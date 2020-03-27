const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const models = require('./models')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

const { mongoURI } = require('./secret')
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error conectando a MongoDB Atlas', err))

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(2020, () => {
  console.log('Escuchando puerto:', 2020)
})
