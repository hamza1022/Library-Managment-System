import React, { useState ,useEffect} from 'react'
import { BackendApi } from '../../../api'
import { AdminDashboard } from '../dashboard'
import Table from 'react-bootstrap/Table';

const Users = () => {

    const [users,setUsers]=useState([])

    const fetchUsers= async ()=>{

       
        BackendApi.user.getAllUsers()
            .then((users)=>{
              console.log(users)
    
              setUsers(users)
            })
            .catch((err) => {
              console.log(err)
            })
        
      

    }


    useEffect(() => {
        fetchUsers();

     
    }, [])
    
  return (
    <>

   
    <div style={{display :"flex"}}>
    <AdminDashboard/>
    <div style={{ flex: 1, padding: '20px' }}>
          
    
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>phoneNumber </th>
          <th>Address</th>
          <th>email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {
        users.map((user)=>{
            return (
            <tr key= {user._id}>
          <td>{user.name}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.address}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
         
          <td>
        
          </td>
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

export default Users