import React from 'react'
import './Medicion.css'
import { useSelector, useDispatch } from 'react-redux'
import VisualizacionMedicion from './VisualizacionMedicion'
import GraficoCanalMedicion from './GraficoCanalMedicion'
import { comenzarGrabacion, terminarGrabacion, fijarPaciente } from '../../redux/actions'
import { useMutation } from '@apollo/react-hooks'
import mutacionAgregarMedicion from '../../graphql/mutations/agregarMedicion'
import query from '../../graphql/queries/paciente'
import { useHistory } from 'react-router-dom'

const Medicion = () => {

  const { grabando, prueba, canales } = useSelector(state => state.medicion)
  const dispatch = useDispatch()
  const history = useHistory()
  const { paciente } = useSelector(state => state.paciente)
  const [agregarMedicion] = useMutation(mutacionAgregarMedicion, {
    refetchQueries: [{ query, variables: { id: paciente.id } }]
  })

  if (!paciente) {
    history.push('/')
  }

  const grabarMedicion = () => {
    dispatch(terminarGrabacion())
    agregarMedicion({ variables: {
      nombre: 'Sin nombre',
      prueba: prueba.id,
      paciente: paciente.id,
      fecha: Date.now().toString(),
      canales
    }})
      .then(() => history.push(`/paciente/${paciente.id}`))
  }

  return (
    <div className="Medicion">
      <h1>Paciente: {paciente.nombre}</h1>
      <div className="Medicion__configuracion">
        <h2>{prueba && prueba.nombre}</h2>
        <button onClick={() => grabando ? grabarMedicion() : dispatch(comenzarGrabacion())}>
          {grabando ? 'Detener' : 'Comenzar'}
        </button>
      </div>
      <div className="Medicion__estado">
        <div className="Medicion__graficos">
          {prueba && prueba.canales.map(canal => (
            <GraficoCanalMedicion key={canal} canal={canal} />
          ))}
        </div>
        <div className="Medicion__visualizacion">
          <VisualizacionMedicion />
        </div>
      </div>
    </div>
  )
}

export default Medicion
