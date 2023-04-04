import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";
import { BackendApi } from '../../../api';
import { Sidebar } from '../../layout/sidebar';
import Swal from 'sweetalert2';



const CreateAuthor = () => {
    const navigate = useNavigate()

    const [error, setError]= useState("")

    const handleSubmit =(event)=>{
        event.preventDefault();
        const formData  = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (!data.name) {
          setError("Author name is required");
        }

        else {

    
          BackendApi.author.addAuthor(data)
          .then((res)=>{

            Swal.fire({
              icon: 'success',
              title: 'Author Created Successfull',
              
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1500
              }).then(()=>{
           
                navigate(-1);
               
          
              })
            
           
            
          })
          .catch((err)=>{
            setError(err.response?.data?.message)
            
          })
        }



    }
  return (
    <div style={{display :"flex"}}>
    <Sidebar/>

    <div style={{ flex: 1, padding: '20px' }}>
    <p>Create Author</p>
    <div className="col-lg-12">
									{error?.length > 0 && <div className="error-message text-danger mb-3 fs-16 text-center">{error}</div>}
								</div>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nameInput"> Name</label>
        <input type="text" className="form-control" id="name" name='name'  placeholder="Enter Author" />
      </div>
      <div className="form-group">
        <label htmlFor="titleInput">Age  </label>
        <input type="number" className="form-control" id="age"  name='age' placeholder="Enter Age " />
      </div>
      <div className="form-group">
        <label htmlFor="priceInput">Country</label>
        <input type="text" className="form-control" id="country" name='country' placeholder="Enter Country" />
      </div>
	 
      
										
									
      <button type="submit" className="btn btn-primary">Add</button>
    </form>

    </div>
    </div>
  )
}

export default CreateAuthor