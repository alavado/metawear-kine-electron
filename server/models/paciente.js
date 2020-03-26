const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pacienteSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Paciente', pacienteSchema)
