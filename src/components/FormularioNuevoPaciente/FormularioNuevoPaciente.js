import React from 'react'
import './FormularioNuevoPaciente.css'

const FormularioNuevoPaciente = () => {
  return (
    <div>
      <form>
        <label>Nombre</label>
        <input type="text"></input>
        <input type="submit" value="Registrar" />
      </form>
    </div>
  )
}

export default FormularioNuevoPaciente
