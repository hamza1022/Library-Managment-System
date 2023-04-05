import React, { useState,useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { BackendApi } from '../../../api';
import Select from "react-select";
import { Sidebar } from '../../layout/sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
 



const AddBook = () => {

    const [authors, setAuthors] =useState([])
    const [selectedAuthor,setSelectedAuthor] =useState(null)
  const [error, setError]= useState("")
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [nameError, setNameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");

    const handleNameChange = (e) => {
      setName(e.target.value);
    };
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    }
    const handlePriceChange = (e) => {
      setPrice(e.target.value);
    }

  
    const handleNameBlur = () => {
      if (name.length <= 0) {
        setNameError("name is required");
      } else {
        setNameError("");
      }
    };
  
    const handleTitleBlur = () => {
  
      if(title.length <= 0 ){
        setTitleError("title is required");
        
      }
  
      else {
        setTitleError("");
      }
    };
    const handlePriceBlur = () => {
  
      if(price.length <= 0 ){
        setPriceError("price is required");
        
      }
  
      else {
        setPriceError("");
      }
    };
  
    const checkDisable = () => {
      if (name.length <= 0 || title.length <= 0 || price.length <= 0 || !selectedAuthor) {
        return true;
      }
     
      return false;
    };

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

            Swal.fire({
              icon: 'success',
              title: 'Book Created Successfull',
              
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1500
              }).then(()=>{
           
                navigate(-1);
               
          
              })

  
  
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
    <p>Create Author</p>
    <div>
			<div className="auth-overlay">
				<div className="container">
					<div className="auth-form">
          <form onSubmit={handleSubmit}>
  <div className="form-group">
  <label htmlFor="price">Name<span style={{color: "red"}}>*</span></label>
    <input
      type="text"
      className="form-control"
      id="name"
      name="name"
      value={name}
      onChange={handleNameChange}
      onBlur={handleNameBlur}
    />
    {nameError && (
      <div className="text-danger">{nameError}</div>
    )}
  </div>
  <div className="form-group">
  <label htmlFor="price">Title<span style={{color: "red"}}>*</span></label>
    <input
      type="text"
      className="form-control"
      id="title"
      name="title"
      value={title}
      onChange={handleTitleChange}
      onBlur={handleTitleBlur}
    />
    {titleError && (
      <div className="text-danger">{titleError}</div>
    )}
  </div>
  <div className="form-group">
  <label htmlFor="price">Price<span style={{color: "red"}}>*</span></label>


    <input
      type="number"
      className="form-control"
      id="price"
      name="price"
      value={price}
      onChange={handlePriceChange}
      onBlur={handlePriceBlur}
    />
    {priceError && (
      <div className="text-danger">{priceError}</div>
    )}
  </div>
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
  {error?.length > 0 && (
								<div className="alert alert-danger fs-12">
									{error}
								
								</div>
							)}
  <button type="submit" disabled={checkDisable()} className="btn btn-primary">
    Add
  </button>
</form>
						
					</div>
					      
      
				</div>
			</div>
		</div>

    </div>
    </div>
  )
}

export default AddBook