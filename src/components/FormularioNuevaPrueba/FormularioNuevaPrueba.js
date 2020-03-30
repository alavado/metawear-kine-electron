import React, { useState } from 'react'
import './FormularioNuevaPrueba.css'
import { canales, formatearCanal } from '../../config/canales'
import agregarPruebaMutation from '../../graphql/mutations/agregarPrueba'
import query from '../../graphql/queries/pruebas'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

const FormularioNuevaPrueba = () => {

  const [variables, setVariables] = useState({
    nombre: '',
    canales: []
  })
  const [agregarPrueba] = useMutation(agregarPruebaMutation, {
    refetchQueries: [{ query }]
  })
  const history = useHistory()

  const enviarFormulario = e => {
    e.preventDefault()
    agregarPrueba({ variables })
      .then(() => history.push('/medicion/seleccion_prueba'))
  }

  const toggleCanal = e => {
    const { checked: estado, value: canal } = e.target
    setVariables({ ...variables,
      canales: estado ?
      [...variables.canales, canal] :
      variables.canales.filter(c => c !== canal)
    })
  }

  return (
    <div className="FormularioNuevaPrueba">
      <h1 className="FormularioNuevaPrueba__titulo">Nueva prueba</h1>
      <form onSubmit={enviarFormulario}>
        <label>Nombre de la prueba</label>
        <input
          type="text"
          value={variables.nombre}
          onChange={e => setVariables({ ...variables, nombre: e.target.value })}
        />
        {canales.map(canal => (
          <div className="FormularioNuevaPrueba__checkbox" key={`contenedor-canal-${canal}`}>
            <input
              type="checkbox"
              value={canal}
              onChange={toggleCanal}
            />
            <label>{formatearCanal(canal)}</label>
          </div>
        ))}
        <input type="submit" value="Agregar" />
      </form>
    </div>
  )
}

export default FormularioNuevaPrueba
