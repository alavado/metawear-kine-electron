const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pacienteSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  bp: {
    type: String,
    unique: true
  },
  sexo: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  diagnostico: {
    type: String
  }
})

module.exports = mongoose.model('Paciente', pacienteSchema)
