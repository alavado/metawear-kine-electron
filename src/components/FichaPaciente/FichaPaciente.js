import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import queryPaciente from '../../graphql/queries/paciente'
import './FichaPaciente.css'
import { fijarPaciente } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeight } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import 'moment/locale/es'
import HistorialPaciente from './HistorialPaciente'
import Loader from '../Loader'

const FichaPaciente = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading } = useQuery(queryPaciente, {
    variables: { id },
    onCompleted: data => dispatch(fijarPaciente(data.paciente))
  })
  const { paciente } = useSelector(state => state.paciente)

  if (loading || !paciente) {
    return <Loader />
  }

  const edad = moment().diff(moment.unix(paciente.fechaNacimiento / 1000), 'years')

  return (
    <div className="FichaPaciente">
      <div className="FichaPaciente__titulo">{paciente.nombre}</div>
      <div className="FichaPaciente__contenedor_superior">
        <div className="FichaPaciente__campos">
          <div className="FichaPaciente__campo">
            <div className="FichaPaciente__campo_nombre">BP</div>
            <div className="FichaPaciente__campo_valor">{paciente.bp}</div>
          </div>
          <div className="FichaPaciente__campo">
            <div className="FichaPaciente__campo_nombre">Sexo</div>
            <div className="FichaPaciente__campo_valor">{paciente.sexo}</div>
          </div>
          <div className="FichaPaciente__campo">
            <div className="FichaPaciente__campo_nombre">Edad</div>
            <div className="FichaPaciente__campo_valor">{edad} años</div>
          </div>
          <div className="FichaPaciente__campo">
            <div className="FichaPaciente__campo_nombre">Diagnóstico</div>
            <div className="FichaPaciente__campo_valor">{paciente.diagnostico}</div>
          </div>
        </div>
        <div className="FichaPaciente__contenedor_link_nueva_medicion">
          <Link
            className="FichaPaciente__link_nueva_medicion"
            to="/medicion/seleccion_prueba"
          >
            <FontAwesomeIcon className="FichaPaciente__icono_nueva_medicion" icon={faWeight} />
            Nueva medición
          </Link>
        </div>
      </div>
      <HistorialPaciente paciente={paciente} />
    </div>
  )
}

export default FichaPaciente
