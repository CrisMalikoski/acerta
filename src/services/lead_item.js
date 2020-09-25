import React from 'react'
import { Link } from 'react-router-dom'


const LeadsItem = props => (
    <tr>
        <td>
            <button type="button" onClick={(e) => window.confirm(`Deseja excluir  + ${props.description}` && props.excluir(props.id, e))}><i className="fas fa-trash-alt"></i></button>
         <Link  to={`/alter_lead/${props.id}`}><button type="button" ><i className="fas fa-edit"></i></button></Link>
        </td>
        <td>{props.email}</td>
        <td>{props.nome}</td>
        <td>{props.cpf}</td>

    </tr>
)

export default LeadsItem
