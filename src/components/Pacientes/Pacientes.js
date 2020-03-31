import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryPacientes from '../../graphql/queries/pacientes'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedicalAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './Pacientes.css'
import Loader from '../Loader'

const Pacientes = () => {

  const { data, loading } = useQuery(queryPacientes)

  if (loading) {
    return <Loader />
  }

  return (
    <div className="Pacientes">
      <div className="Pacientes__superior">
        <h1 className="Pacientes__titulo">Pacientes</h1>
        <Link
          className="Pacientes__link_nuevo_paciente"
          to={'/nuevo_paciente'}
        >
          <FontAwesomeIcon className="Pacientes__icono_nuevo_paciente" icon={faUserPlus} />
          Agregar paciente
        </Link>
      </div>
      <table className="Pacientes__tabla_pacientes">
        <thead className="Pacientes__tabla_pacientes_encabezado">
          <tr>
            <th className="Pacientes__tabla_pacientes_celda_encabezado">BP</th>
            <th className="Pacientes__tabla_pacientes_celda_encabezado">Nombre</th>
            <th className="Pacientes__tabla_pacientes_celda_encabezado">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {data && data.pacientes.map(({ id, nombre, bp }) => (
          <tr key={id} className="Pacientes__tabla_pacientes_fila">
            <td className="Pacientes__tabla_pacientes_celda">{bp}</td>
            <td className="Pacientes__tabla_pacientes_celda"><Link to={`/paciente/${id}`}>{nombre}</Link></td>
            <td className="Pacientes__tabla_pacientes_celda">
              <Link to={`/paciente/${id}`}>
                <FontAwesomeIcon
                  title="Ver ficha"
                  className="Pacientes__tabla_pacientes_icono"
                  size="lg"
                  icon={faFileMedicalAlt}
                />
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Pacientes
