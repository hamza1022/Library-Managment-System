import React, { useState, useEffect } from 'react'


import { useNavigate, useParams } from "react-router-dom";
import { BackendApi } from '../../../api';
import Select from "react-select";
import { Sidebar } from '../../layout/sidebar';
import Swal from 'sweetalert2';

const EditBook = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [authors, setAuthors] = useState([])
  const [book, setBook] = useState({})
  const [error, setError] = useState("")

  console.log(authors)

  const getAuthors = () => {
    BackendApi.author.getAllAuthors()
      .then((authors) => {
        setAuthors(authors)

      }).catch(err => console.log(err))
  }

  const getAuthor =()=>{
    BackendApi.author.getAuthorById(book.Author)
    .then((author)=>{
      setSelectedAuthor(author);
     

    })
    .catch((err)=>{
      setError(err)
    })

  }
  console.log(selectedAuthor)

  const getBookById = ()=>{
    BackendApi.book.getOneById(id)
    .then((book)=>{
      setBook(book)
      const author = authors.find((author) => author._id === book.Author);
      setSelectedAuthor(author);


    })
    .catch((err)=>{
      setError(err)
    })
  }
  console.log(book)

  useEffect(() => {

    getAuthors()
    getBookById()
    getAuthor()



  }, [])

  console.log("Selected", selectedAuthor)

  const handleSubmit = (event) => {
    console.log("clicked")

    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries())

    BackendApi.book.editBook(id, data, selectedAuthor?._id)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Book Edit Successfull',
          
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
          }).then(()=>{
       
            navigate(-1);
           
      
          })


      

       

      })
      .catch((err) => {
        console.log("err", err)

      })



  }
  return (

    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: '20px' }}>
       <h1>Edit Book</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Book Name</label>
            <input type="text" className="form-control" id="name" name='name' placeholder="Enter Book name" defaultValue={book.name} />
          </div>
          <div className="form-group">
            <label htmlFor="titleInput">Book Title </label>
            <input type="text" className="form-control" id="title" name='title' placeholder="Enter Book Title" defaultValue={book.title} />
          </div>
          <div className="form-group">
            <label htmlFor="priceInput">Book Price</label>
            <input type="number" className="form-control" id="price" name='price' placeholder="Enter Book Price"defaultValue={book.price} />
          </div>
          {/* <div className="form-group">
        <label htmlFor="passwordInput">Author</label>
        <input type="text" className="form-control" id="Author"  name='Author' placeholder="Enter Author" />
      </div> */}

          <label className="fs-14 fw-500 text-900 mb-1 mt-3">Author</label>

          <Select
            defaultValue={null}
            value={selectedAuthor}
            options={authors}
            getOptionLabel={(authors) => authors.name}
            getOptionValue={(authors) => authors.name}

            isSearchable={false}
            isClearable={true}
            onChange={(e) => {
              setSelectedAuthor(e);

            }}
          />
          <button type="submit" className="btn btn-primary">Edit</button>
        </form>

      </div>
    </div>
  )
}

export default EditBook