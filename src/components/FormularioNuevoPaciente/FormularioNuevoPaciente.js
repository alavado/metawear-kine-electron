import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import mutacionAgregarPaciente from '../../graphql/mutations/agregarPaciente'
import query from '../../graphql/queries/pacientes'
import './FormularioNuevoPaciente.css'
import { useHistory } from 'react-router-dom'

const FormularioNuevoPaciente = () => {

  const [variables, setVariables] = useState({
    nombre: '',
    bp: '',
    sexo: 'M',
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
    <div className="FormularioNuevoPaciente">
      <h1 className="FormularioNuevoPaciente__titulo">Nuevo paciente</h1>
      <form className="FormularioNuevoPaciente__formulario" onSubmit={registrar}>
        <div className="FormularioNuevoPaciente__campo">
          <label>Nombre</label>
          <input
            type="text"
            value={variables.nombre}
            onChange={e => cambiarVariable('nombre', e.target.value)}
            autoFocus
          />
        </div>
        <div className="FormularioNuevoPaciente__campo">
          <label>BP</label>
          <input
            type="text"
            value={variables.bp}
            onChange={e => cambiarVariable('bp', e.target.value)}
          />
        </div>
        <div className="FormularioNuevoPaciente__campo">
          <label>Sexo</label>
          <select
            className="FormularioNuevoPaciente__selector"
            value={variables.sexo}
            onChange={e => cambiarVariable('sexo', e.target.value)}
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="FormularioNuevoPaciente__campo">
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            value={variables.fechaNacimiento}
            onChange={e => cambiarVariable('fechaNacimiento', e.target.value)}
          />
        </div>
        <div className="FormularioNuevoPaciente__campo">
          <label>Diagnóstico</label>
          <input
            type="text"
            value={variables.diagnostico}
            onChange={e => cambiarVariable('diagnostico', e.target.value)}
          />
        </div>
        <div className="FormularioNuevoPaciente__campo">
          <input className="FormularioNuevoPaciente__boton" type="submit" value="Registrar" />
        </div>
      </form>
    </div>
  )
}

export default FormularioNuevoPaciente
