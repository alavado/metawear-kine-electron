const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Medicion = require('./medicion')

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
  },
  mediciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicion'
  }]
})

pacienteSchema.statics.findMediciones = function(id) {
  return Medicion.find({ paciente: id })
}

module.exports = mongoose.model('Paciente', pacienteSchema)
