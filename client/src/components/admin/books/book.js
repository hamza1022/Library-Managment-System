import React, { useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table';
import { FaTrashAlt } from 'react-icons/fa'
import { BackendApi } from '../../../api';
import { FaEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { Sidebar } from '../../layout/sidebar';
import Swal from 'sweetalert2'

const Book = () => {



  const [books, setBooks] = useState([])
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("")
  const [searchResults, setSearchResults] = useState([]);


  function handleChange(event) {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    if (newSearchText === "") {
      setSearchResults([]);
    } else {

      BackendApi.book.searchBook(newSearchText)
        .then((book) => {
          setSearchResults(book)

        })
        .catch((err) => {
          setError(err)
        })
    }
  }

  const booksToDisplay = searchText === "" ? books : searchResults;

  const fetchBooks = () => {
    BackendApi.book.getAllBooks()
      .then((books) => {
        console.log(books)

        setBooks(books)
      })
      .catch((err) => {
        setError(err)
      })

  }
  useEffect(() => {
    fetchBooks()
    console.log(books)

  }, [])

  const removeBook = (book) => {

    let token = localStorage.getItem("token");

    const options = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    console.log(token)


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

        BackendApi.book.deleteBook(book, options)
          .then(() => {
            fetchBooks()

            Swal.fire(
              'Deleted!',
              'Book has been deleted.',
              'success'
            )
          })
          .catch((err) => {
            setError(err)

            Swal.fire(
              'Error!',
              'Failed to delete user.',
              'error'
            )
          })
      }
    })





  }



  return (
    <>

      <div className="col-lg-12">
        {error?.length > 0 && <div className="error-message text-danger mb-3 fs-16 text-center">{error}</div>}
      </div>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '20px' }}>
          <input type="text" value={searchText} onChange={handleChange} />
        <h5>Search Books</h5>

        <div>
        <NavLink
            to={"/admin/dashboard/book/create"}
            className="pointer"
            // style={{ display: 'block', marginBottom: '10px', color: '#000', marginRight: "12px" }}
          >

            <span className="side-ic">
              <span className="iconify" data-icon="uim:calender"></span>
            </span>
            <button className='h-5 w-5'>Add Book</button>
          </NavLink>
        </div>
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
                booksToDisplay.map((book) => {
                  return (


                    <tr key={book._id}>
                      <td>{book.name}</td>
                      <td>{book.price}</td>
                      <td>{book.title}</td>
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