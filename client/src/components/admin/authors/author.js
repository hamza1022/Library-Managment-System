import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import {FaTrashAlt} from 'react-icons/fa' 
import { BackendApi } from '../../../api';
import {FaEdit} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { Sidebar } from '../../layout/sidebar';
import Swal from 'sweetalert2'

const Author = () => {

    
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

const removeAuthor=(author)=>{


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
       
    let token = localStorage.getItem("token");

    const options = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
    console.log(token)
    BackendApi.author.deleteAuthor(author,options)
    .then((res)=>{
        fetchAuthors()
        Swal.fire({
		icon: 'success',
		title: 'Author Deleted Successfully',
		
		showCancelButton: false,
		showConfirmButton: false,
		timer: 1500
	  })
       
        console.log("res returned", res)
    })
    .catch((err)=>{
        console.log("err: ", err)
    })

    }
})
   
  


   
    console.log(author._id)
}
  return (
    <>

   
    <div style={{display :"flex"}}>
    <Sidebar/>
    <div style={{ flex: 1, padding: '20px' }}>
          
    <NavLink
							to={"/admin/dashboard/author/create"}
							className="pointer"
                            style={{ display: 'block', marginBottom: '10px', color: '#000' }}
							>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
                            <button className='h-5 w-5'>Add Author</button>
						</NavLink>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Author Name</th>
          <th>Author Age </th>
          <th>Author Country</th>
          <th>Action</th>
          <th>Edit</th>
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
         
          <td>
            <button><FaTrashAlt onClick={() => removeAuthor(author)}></FaTrashAlt></button>
          </td>
          <td>
          <NavLink
							to={`/admin/dashboard/author/edit/${author._id}`}
							className="pointer"
                            style={{ display: 'block', marginBottom: '10px', color: '#000' }}
							>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
                            <FaEdit className='h-5 w-5'></FaEdit>
						</NavLink>
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

export default Author