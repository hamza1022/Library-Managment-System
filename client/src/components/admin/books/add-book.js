import React, { useState,useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { BackendApi } from '../../../api';
import Select from "react-select";
import { Sidebar } from '../../layout/sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 



const AddBook = () => {

    const [authors, setAuthors] =useState([])
    const [selectedAuthor,setSelectedAuthor] =useState(null)
    const [error,setError] = useState("")

    console.log(authors)
    console.log("Selected",selectedAuthor)

    const getAuthors = () =>{
        BackendApi.author.getAllAuthors()
        .then((authors)=>{
            setAuthors(authors)

        })
        .catch((err)=>{
          setError(err)
        })
    }
 


     useEffect(() => {

        getAuthors()

      
    
    }, [])
    

    const navigate = useNavigate()

    const handleSubmit =(event)=>{
        event.preventDefault();
        const formData  = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        console.log(data)

        if (!data.name) {
          setError("Book name is required");
        }
        else if (!selectedAuthor){
          setError("Author is Required");
          
        }  else {
          BackendApi.book.addBook(data,selectedAuthor._id)
          .then((res)=>{
            // toast.success('Book created successfully!');
              navigate(-1);
  
              console.log("res retrieved", res)
  
          })
          .catch((err)=>{
             setError(err)
  
          })

        }

       



    }
  return (
    <div style={{display :"flex"}}>
    <Sidebar/>

    <div style={{ flex: 1, padding: '20px' }}>
    <ToastContainer />
    <h1>Create Book</h1>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nameInput">Book Name</label>
        <input type="text" className="form-control" id="name" name='name'  placeholder="Enter Book name" />
      </div>
      <div className="form-group">
        <label htmlFor="titleInput">Book Title </label>
        <input type="text" className="form-control" id="title"  name='title' placeholder="Enter Book Title" />
      </div>
      <div className="form-group">
        <label htmlFor="priceInput">Book Price</label>
        <input type="number" className="form-control" id="price" name='price' placeholder="Enter Book Price" />
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

<div className="col-lg-12">
									{error?.length > 0 && <div className="error-message text-danger mb-3 fs-16 text-center">{error}</div>}
								</div>
               
										
									
      <button type="submit" className="btn btn-primary">Add</button>
    </form>

    </div>
    </div>
  )
}

export default AddBook