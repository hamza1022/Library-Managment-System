import React, { useState ,useEffect} from 'react'
import { BackendApi } from '../../../api'
import { AdminDashboard } from '../dashboard'
import Table from 'react-bootstrap/Table';

import {FaTrashAlt} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'
import {BsCheckLg} from 'react-icons/bs'

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

    const changeStatus =(user)=>{
      console.log(user.email)
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
          <th>Action</th>
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

          {
                        user.status =="active" ? 
                        <button><ImCross onClick={() => changeStatus(user)}></ImCross></button>
                        : 
                        <button><BsCheckLg onClick={() => changeStatus(user)}></BsCheckLg></button>
                        }




          </td>
         
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