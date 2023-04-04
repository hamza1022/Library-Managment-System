import React, { useState, useEffect } from 'react'
import { BackendApi } from '../../../api'
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'

import { FaTrashAlt } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { BsCheckLg } from 'react-icons/bs'
import { Sidebar } from '../../layout/sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from "../../../store/user";

const Users = () => {


  const [users, setUsers] = useState([])
  const deleteUser = (user) => {

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

        BackendApi.user.deleteUser(user)
          .then(() => {
            fetchUsers();

            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            )
          })
          .catch((err) => {
            console.log(err)

            Swal.fire(
              'Error!',
              'Failed to delete user.',
              'error'
            )
          })
      }
    })
  }

  const fetchUsers = async () => {
    BackendApi.user.getAllUsers({ role: "user" })
      .then((users) => {
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

  const changeStatus = (user, newStatus) => {



    BackendApi.user.changeStatus(user.email, newStatus)
      .then((user) => {
        Swal.fire({
          icon: 'success',
          title: 'Status Changes Successfully',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        })
          .then(() => {

            fetchUsers()
          })


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


      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>


          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>phoneNumber </th>
                <th>Address</th>
                <th>email</th>
                <th>Role</th>
                <th>change status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.address}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>

                        {
                          user.status == "active" ?
                            <button><BsCheckLg onClick={() => changeStatus(user, "blocked")}></BsCheckLg></button>
                            :
                            <button><ImCross onClick={() => changeStatus(user, "active")}></ImCross></button>
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