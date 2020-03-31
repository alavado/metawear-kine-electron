import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './HistorialPaciente.css'
import 'moment/locale/es'

const HistorialPaciente = props => {

  const { paciente } = props

  return (
    <div className="HistorialPaciente">
        <h1 className="HistorialPaciente__titulo">Mediciones anteriores</h1>
        <table className="HistorialPaciente__tabla">
          <thead>
            <tr>
              <th className="HistorialPaciente__encabezado">Fecha</th>
              <th className="HistorialPaciente__encabezado">Prueba</th>
              <th className="HistorialPaciente__encabezado">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paciente.mediciones.map(medicion => (
              <tr key={medicion.id}>
                <td className="HistorialPaciente__celda">{moment.unix(medicion.fecha / 1000).fromNow()}</td>
                <td className="HistorialPaciente__celda">{medicion.prueba.nombre}</td>
                <td className="HistorialPaciente__celda">
                  <div className="HistorialPaciente__acciones">
                    <Link to={`/medicion_pasada/${medicion.id}`}>
                      <FontAwesomeIcon
                        title="Ver"
                        className="HistorialPaciente__icono_celda"
                        icon={faChartArea}
                        size="lg"
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default HistorialPaciente
