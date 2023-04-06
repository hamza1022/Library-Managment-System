import React, { useState, useEffect } from 'react'


import { BackendApi } from '../../api';
import Select from "react-select";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../layout/sidebar';

import Swal from 'sweetalert2';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import Table from 'react-bootstrap/Table';



const PlaceOrder = () => {
  const navigate = useNavigate()
  let { id } = useParams()
  


  const loggedInUser = useSelector((state) => state.user.value);
  const [selectedBooks, setSelectedBooks] = useState([])
  const [books, setBooks] = useState([])
  const [book, setBook] = useState([])
  const [authors, setAuthors] = useState([])

console.log("book which to order slected books", selectedBooks)

const getAuthors = () => {
  BackendApi.author.getAllAuthors()
    .then((authors) => {
      setAuthors(authors)

    }).catch(err => console.log(err))
}



  const fetchBooks = () => {
    BackendApi.book.getAllBooks()
      .then((books) => {
      

        setBooks(books)
      })
      .catch((err) => {
        
      })

  }

  const getBookById = () => {
    BackendApi.book.getOneById(id)
      .then((book) => {
        setSelectedBooks([book])
        


      })

  }
    const handleSubmit = () => {
    if (selectedBooks) {
      const bookIds = selectedBooks.map((book) => book._id);

      BackendApi.order.placeOrder(loggedInUser._id, bookIds)
        .then((order) => {

          Swal.fire({
            icon: 'success',
            title: 'You Order has been placed Successfully',
            text: 'Thanks for Shooping',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500
          })
            .then(() => {
              navigate('/user/order')
             

            })


        })
        .catch((err) => { console.log(err) })


      
    } else {
  
    }
  };

  useEffect(() => {
    fetchBooks()
    getBookById()
    getAuthors()


  }, [])
  
  // useEffect(() => {
  //   if(book && authors ){
  //     const author = authors.find(author=>author._id.toString() === book.Author.toString())
  //     console.log("gdshjdsagdsajgdsajdgdsa",author)
  //     // setSelectedAuthor(author)
    
  //   }

  // }, [book])





  return (
    <>

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '20px' }}>

          <div>

            <h2>Want to order more books</h2>
          </div>

          <label className="fs-14 fw-500 text-900 mb-1 mt-3">Books</label>
          <Select
            defaultValue={selectedBooks}
            value={selectedBooks}
            options={books}
            getOptionLabel={(book) => book.name}
            getOptionValue={(book) => book._id}
            isSearchable={false}
            isClearable={true}
            onChange={(selected) => {
              setSelectedBooks(selected);
             
            }}
            isMulti
          />
         
        
          <h1 className='text-xl font-bold mb-6 text-center' style={{ marginTop: 40 }}> Order Summary</h1>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Book Price</th>
          <th>Book Title</th>
          <th>Author</th>
        
      
        </tr>
      </thead>
      <tbody>
      {
        selectedBooks?.map((book)=>{
            return (


            <tr key= {book._id}>
          <td>{book.name}</td>
          <td>{book.price}</td>
          <td>{book.title}</td>
          <td>
          {book.Author?.name
          }
          </td>
       
        
        </tr>

            )

        })
      }
      
    
      </tbody>
    </Table>
          
          <div className="col-lg-6">
            <button
              className="btnPrimary pointer mt-4 h-56 w-100 br-16"
              onChange={(e) => {
                setSelectedBooks(e);

              }}
              onClick={(e) => {
                handleSubmit(e)
              }}
            >
              Place Order
            </button>
          </div>



        </div>
      </div>
    </>
  )
}

export default PlaceOrder