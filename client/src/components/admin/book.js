import React, { useState,useEffect } from 'react'
import { AdminDashboard } from './dashboard'
import Table from 'react-bootstrap/Table';
import {FaTrashAlt} from 'react-icons/fa' 
import { BackendApi } from '../../api';
import {FaEdit} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

const Book = () => {



    const [books,setBooks]= useState([])


    const fetchBooks =   () => {
        BackendApi.book.getAllBooks()
        .then((books)=>{
          console.log(books)

            setBooks(books)
        })
        .catch((err) => {
          console.log(err)
        })
    
  }
  useEffect(() => {
    fetchBooks()
    console.log(books)
  
}, [])

const removeBook=(book)=>{
    
    let token = localStorage.getItem("token");

    const options = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
    console.log(token)
    BackendApi.book.deleteBook(book,options)
    .then((res)=>{
        fetchBooks()
       
        console.log("res returned", res)
    })
    .catch((err)=>{
        console.log("err: ", err)
    })



   
    console.log(book._id)
}



  return (
    <>

   
    <div style={{display :"flex"}}>
    <AdminDashboard/>
    <div style={{ flex: 1, padding: '20px' }}>
          
    <NavLink
							to={"/admin/dashboard/book/create"}
							className="pointer"
                            style={{ display: 'block', marginBottom: '10px', color: '#000' }}
							>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
                            <button className='h-5 w-5'>Add Product</button>
						</NavLink>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Book Price</th>
          <th>Book Title</th>
          <th>Author</th>
          <th>Status</th>
          <th>Action</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
      {
        books.map((book)=>{
            return (


            <tr key= {book._id}>
          <td>{book.bookName}</td>
          <td>{book.bookPrice}</td>
          <td>{book.bookTitle}</td>
          <td>{book.Author?.name}</td>
          <td>{book.status}</td>
          <td>
            <button><FaTrashAlt onClick={() => removeBook(book)}></FaTrashAlt></button>
          </td>
          <td>
          <NavLink
							to={`/admin/dashboard/book/edit/${book._id}`}
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

export default Book