import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function RowDetail({Email, Lastname, Firstname, Age, Id,Adress,Phone,ville,Npostal, OnDelete}) {
 
  return (
    <tr>
    <th>{Email}</th>
    <td>{Lastname}</td>
    <td>{Firstname}</td>
    <td>{Age}</td>
    <td>{Adress}</td>
    
    <td>{ville}</td>
    <td>{Npostal}</td>
    <td>{Phone}</td>
    <td className="gap__actions">
      <span className="badge bg-info">
        <Link to={`/user/${Id}`} className="text-white">
          <i className="fas fa-edit"></i>
        </Link>
      </span>

      <span className="badge bg-danger" onClick={()=>OnDelete(Id)}>
        <i className="fas fa-trash-alt"></i>
      </span>
    </td>
  </tr>
  )
}

export default RowDetail