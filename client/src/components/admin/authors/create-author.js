import React from 'react'

import { useNavigate } from "react-router-dom";
import { BackendApi } from '../../../api';
import { AdminDashboard } from '../dashboard';


const CreateAuthor = () => {
    const navigate = useNavigate()

    const handleSubmit =(event)=>{
        event.preventDefault();
        const formData  = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

          BackendApi.author.addAuthor(data)
        .then((res)=>{
            navigate(-1);

            console.log("res retrieved", res)

        })
        .catch((err)=>{
            console.log("err",err)

        })



    }
  return (
    <div style={{display :"flex"}}>
    <AdminDashboard/>

    <div style={{ flex: 1, padding: '20px' }}>
    <p>Create Author</p>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nameInput"> Name</label>
        <input type="text" className="form-control" id="name" name='name'  placeholder="Enter Book name" />
      </div>
      <div className="form-group">
        <label htmlFor="titleInput">Age  </label>
        <input type="number" className="form-control" id="age"  name='age' placeholder="Enter Book Title" />
      </div>
      <div className="form-group">
        <label htmlFor="priceInput">Country</label>
        <input type="text" className="form-control" id="country" name='country' placeholder="Enter Book Price" />
      </div>
	 
      
										
									
      <button type="submit" className="btn btn-primary">Add</button>
    </form>

    </div>
    </div>
  )
}

export default CreateAuthor