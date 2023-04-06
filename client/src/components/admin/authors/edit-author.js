import React, { useState,useEffect } from 'react'

import { useNavigate, useParams } from "react-router-dom";
import { BackendApi } from '../../../api';
import { Sidebar } from '../../layout/sidebar';
import Swal from 'sweetalert2'
const EditAuthor = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [author , setAuthor] = useState({})
    const [error, setError] = useState("")

    const getAuthorById = ()=>{
      BackendApi.author.getAuthorById(id)
      .then((author)=>{
        console.log(author)
        setAuthor(author)
  
      })
      .catch((err)=>{
        setError(err)
      })
    }

    useEffect(() => {

      getAuthorById()
      
   
    }, [])
    
  
  
      const handleSubmit =(event)=>{
          console.log("clicked")
  
          event.preventDefault();
          const formData  = new FormData(event.target);
          const data = Object.fromEntries(formData.entries());

          if(data.name.length <= 0 ){
            setError(" Name is required")
          }
          else if(data.age.length <= 0){
            setError("Age is required")
          }
          else if (data.country.length  <= 0){
            setError("Country is required")
          }
          else if(data.name.length>0 && data.age.length>0 && data.country.length>0){

         
  
          
  
          BackendApi.author.editAuthor(id,data)
          .then((res)=>{
            Swal.fire({
              icon: 'success',
              title: 'Author Edit Successfull',
              
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1500
              }).then(()=>{
           
                navigate(-1);
               
          
              })
           
  
              console.log("res retrieved", res)
  
          })
          .catch((err)=>{
              console.log("err",err)
  
          })
        }
  
  
  
      }
  return (
    <div style={{display :"flex"}}>
    <Sidebar/>

    <div style={{ flex: 1, padding: '20px' }}>
    <h2>Edit Author </h2>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nameInput">Name</label>
        <input type="text" className="form-control" id="name" name='name'  placeholder="Enter name"  defaultValue={author.name}/>
      </div>
      <div className="form-group">
        <label htmlFor="titleInput">Age  </label>
        <input type="text" className="form-control" id="age"  name='age' placeholder="Enter Age" defaultValue={author.age} />
      </div>
      <div className="form-group">
        <label htmlFor="priceInput">Country</label>
        <input type="text" className="form-control" id="country" name='country' placeholder="Enter Country"  defaultValue={author.country}/>
      </div>
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

export default EditAuthor