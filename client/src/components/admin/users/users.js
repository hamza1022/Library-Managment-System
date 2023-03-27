import React, { useState ,useEffect} from 'react'
import { BackendApi } from '../../../api'
import { AdminDashboard } from '../dashboard'
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'

import {FaTrashAlt} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'
import {BsCheckLg} from 'react-icons/bs'

const Users = () => {

    const [users,setUsers]=useState([])
    const deleteUser = (user) => {
      // Show confirmation dialog
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Delete user if user confirms
          BackendApi.user.deleteUser(user)
            .then(() => {
              // Reload user list after successful deletion
              fetchUsers();
              // Show success message
              Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            })
            .catch((err) => {
              console.log(err)
              // Show error message
              Swal.fire(
                'Error!',
                'Failed to delete user.',
                'error'
              )
            })
        }
      })
    }

    const fetchUsers= async ()=>{
        BackendApi.user.getAllUsers({role:"user"})
            .then((users)=>{
              console.log(users)
    
              setUsers(users)
            })
            .catch((err) => {
              console.log(err)
            })
        
      

    }

    // const deleteUser = (user)=>{

    //   BackendApi.user.deleteUser(user)
    //   .then((users)=>{
    //     fetchUsers()
    //     console.log(users)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    // }

    const changeStatus =(user, newStatus)=>{
      BackendApi.user.changeStatus(user.email,newStatus)
      .then((user)=>{
        console.log("user",user)

        fetchUsers()

      })
      .catch((err)=>{
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
          <th>Action</th>
          <th>Delete</th>
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
                        <button><BsCheckLg onClick={() => changeStatus(user,"inactive")}></BsCheckLg></button>
                        : 
                        <button><ImCross onClick={() => changeStatus(user,"active")}></ImCross></button>
                        }




          </td>
          <td>
          <button><FaTrashAlt onClick={() => deleteUser(user)}></FaTrashAlt></button>
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