const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pruebaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  canales: [{ type: String }]
})

module.exports = mongoose.model('Prueba', pruebaSchema)
