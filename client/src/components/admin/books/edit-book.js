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

  
  const getBookById = ()=>{
    BackendApi.book.getOneById(id)
    .then((book)=>{
      setBook(book)
     
      
      
    })
    .catch((err)=>{
      setError(err)
    })
  }
  
  // const getAuthor =()=>{
  //   const authorId = parseInt(book?.Author);  
  //   BackendApi.author.getAuthorById(authorId)
  //   .then((author)=>{
  //     setSelectedAuthor(author);
     

  //   })
  //   .catch((err)=>{
  //     setError(err)
  //   })

  // }
  console.log(selectedAuthor)
  console.log(book)
  


  console.log("Selected", selectedAuthor)

  const handleSubmit = (event) => {
    console.log("clicked")

    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries())
    console.log("form data .>>>>>>>>>>",data)

    if(data.name.length <= 0 ){
      setError(" Name is required")
    }
    else if(data.title.length <= 0){
      setError("Title is required")
    }
    else if (data.price.length  <= 0){
      setError("Price is required")
    }
    else if(!selectedAuthor){
      setError("Please select Author")

    }

    else if(data.name.length>0 && data.title.length>0 && data.price.length>0){

      BackendApi.book.editBook(id, data, selectedAuthor._id)
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

  


  }




  useEffect(() => {

    getAuthors()
    getBookById()
    


  }, [])

  useEffect(() => {

if(book && authors ){
  const author = authors.find(author=>author._id.toString() === book.Author.toString())
  console.log("gdshjdsagdsajgdsajdgdsa",author)
  setSelectedAuthor(author)

}
  

  }, [book])
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
        

          <label className="fs-14 fw-500 text-900 mb-1 mt-3">Author</label>

          <Select
            defaultValue={selectedAuthor}
            value={selectedAuthor}
            options={authors}
            getOptionLabel={(authors) => authors.name}
            getOptionValue={(authors) => authors._id}

            isSearchable={true}
            isClearable={true}
            onChange={(e) => {
              setSelectedAuthor(e);

            }}
          />
           {error?.length > 0 && (
								<div className="alert alert-danger fs-12">
									{error}
								
								</div>
							)}
          <button type="submit" className="btn btn-primary">Edit</button>
        </form>

      </div>
    </div>
  )
}

export default EditBook