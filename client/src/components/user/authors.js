import React, { useEffect, useState } from 'react'
import { AdminDashboard } from '../././admin/dashboard'
import Table from 'react-bootstrap/Table';
import { BackendApi } from '../../api';
import { UserDashboard } from './user-dashboard';



const Authors = () => {

    
    const [authors,setAuthors]= useState([])


    const fetchAuthors =   () => {
        BackendApi.author.getAllAuthors()
        .then((authors)=>{
          console.log(authors)

          setAuthors(authors)
        })
        .catch((err) => {
          console.log(err)
        })
    
  }
  useEffect(() => {
    fetchAuthors()
    console.log(authors)
  
}, [])


  return (
    <>

   
    <div style={{display :"flex"}}>
    <UserDashboard/>
    <div style={{ flex: 1, padding: '20px' }}>
          
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Author Name</th>
          <th>Author Age </th>
          <th>Author Country</th>
        </tr>
      </thead>
      <tbody>
      {
        authors.map((author)=>{
            return (


            <tr key= {author._id}>
          <td>{author.name}</td>
          <td>{author.age}</td>
          <td>{author.country}</td>
         
         

        </tr>

            )

        })
      }
      
    
      </tbody>
    </Table>
        </div>
    </div>
    </>


  )
}

export default Authors