import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import queryPaciente from '../../graphql/queries/paciente'
import './FichaPaciente.css'
import { fijarPaciente } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faDownload } from '@fortawesome/free-solid-svg-icons'

const FichaPaciente = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading } = useQuery(queryPaciente, {
    variables: { id },
    onCompleted: data => dispatch(fijarPaciente(data.paciente))
  })
  const { paciente } = useSelector(state => state.paciente)

  if (loading || !paciente) {
    return <div>Cargando...</div>
  }

  return (
    <div className="FichaPaciente">
      <div className="FichaPaciente__titulo">Paciente: {paciente.nombre}</div>
      <div className="FichaPaciente__campos">
        <div>BP: {paciente.bp}</div>
        <div>Sexo: {paciente.sexo}</div>
        <div>Fecha de nacimiento: {moment.unix(paciente.fechaNacimiento / 1000).format('L')}</div>
        <div>Diagnóstico: {paciente.diagnostico}</div>
      </div>
      <div className="FichaPaciente__contenedor_link_nueva_medicion">
        <Link className="FichaPaciente__link_nueva_medicion" to="/medicion/seleccion_prueba">Nueva medición</Link>
      </div>
      <div className="FichaPaciente__historial">
        <h1 className="FichaPaciente__historial_titulo">Historial de mediciones</h1>
        <table className="FichaPaciente__historial_tabla">
          <thead>
            <tr>
              <th className="FichaPaciente__encabezado">Fecha</th>
              <th className="FichaPaciente__encabezado">Prueba</th>
              <th className="FichaPaciente__encabezado">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paciente.mediciones.map(medicion => (
              <tr key={medicion.id}>
                <td className="FichaPaciente__celda">{moment.unix(medicion.fecha / 1000).fromNow()}</td>
                <td className="FichaPaciente__celda">{medicion.prueba.nombre}</td>
                <td className="FichaPaciente__celda">
                  <div className="FichaPaciente__acciones_historial">
                    <FontAwesomeIcon
                      title="Descargar CSV"
                      className="FichaPaciente__icono_celda"
                      icon={faDownload}
                    />
                    <Link to={`/medicion_pasada/${medicion.id}`}>
                      <FontAwesomeIcon
                        title="Ver"
                        className="FichaPaciente__icono_celda"
                        icon={faChartArea}
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FichaPaciente
