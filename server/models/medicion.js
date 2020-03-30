const mongoose = require('mongoose')
const Schema = mongoose.Schema

const medicionSchema = new Schema({
  fecha: {
    type: String,
    required: true
  },
  prueba: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prueba'
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente'
  },
  canales: [{
    nombre: String,
    datos: [{ type: Number}],
    tiempos: [{ type: Number}]
  }]
})

module.exports = mongoose.model('Medicion', medicionSchema)
