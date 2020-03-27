import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import mutacionAgregarPaciente from '../../graphql/mutations/agregarPaciente'
import query from '../../graphql/queries/pacientes'
import './FormularioNuevoPaciente.css'
import { Redirect, useHistory } from 'react-router-dom'

const FormularioNuevoPaciente = () => {

  const [variables, setVariables] = useState({
    nombre: '',
    bp: '',
    sexo: '',
    fechaNacimiento: '',
    diagnostico: ''
  })
  const [agregarPaciente] = useMutation(
    mutacionAgregarPaciente,
    { refetchQueries: [{ query }] }
  )
  const history = useHistory()

  const registrar = e => {
    e.preventDefault()
    agregarPaciente({ variables })
      .then(() => history.push('/pacientes'))
  }

  const cambiarVariable = (nombre, valor) => {
    setVariables({ ...variables, [nombre]: valor })
  }

  return (
    <div>
      <form onSubmit={registrar}>
        <label>Nombre</label>
        <input
          type="text"
          value={variables.nombre}
          onChange={e => cambiarVariable('nombre', e.target.value)}
        />
        <label>BP</label>
        <input
          type="text"
          value={variables.bp}
          onChange={e => cambiarVariable('bp', e.target.value)}
        />
        <label>Sexo</label>
        <input
          type="text"
          value={variables.sexo}
          onChange={e => cambiarVariable('sexo', e.target.value)}
        />
        <label>Fecha de nacimiento</label>
        <input
          type="date"
          value={variables.fechaNacimiento}
          onChange={e => cambiarVariable('fechaNacimiento', e.target.value)}
        />
        <label>Diagnóstico</label>
        <input
          type="text"
          value={variables.diagnostico}
          onChange={e => cambiarVariable('diagnostico', e.target.value)}
        />
        <input type="submit" value="Registrar" />
      </form>
    </div>
  )
}

export default FormularioNuevoPaciente
