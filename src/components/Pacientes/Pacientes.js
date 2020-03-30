import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryPacientes from '../../graphql/queries/pacientes'
import { Link } from 'react-router-dom'
import './Pacientes.css'

const Pacientes = () => {

  const { data } = useQuery(queryPacientes)

  return (
    <div className="Pacientes">
      <div className="Pacientes__superior">
        <h1 className="Pacientes__titulo">Pacientes</h1>
        <Link
          className="Pacientes__link_nuevo_paciente"
          to={'/nuevo_paciente'}
        >
          Nuevo paciente
        </Link>
      </div>
      <table className="Pacientes__tabla_pacientes">
        <thead className="Pacientes__tabla_pacientes_encabezado">
          <tr>
            <th className="Pacientes__tabla_pacientes_celda">Nombre</th>
          </tr>
        </thead>
        <tbody>
        {data && data.pacientes.map(({ id, nombre }) => (
          <tr key={id} className="Pacientes__tabla_pacientes_fila">
            <td className="Pacientes__tabla_pacientes_celda">
              <Link to={`/paciente/${id}`}>{nombre}</Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Pacientes
