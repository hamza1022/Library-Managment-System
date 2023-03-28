import React from 'react'

import { useNavigate, useParams } from "react-router-dom";
import { BackendApi } from '../../../api';
import { Sidebar } from '../../layout/sidebar';

const EditAuthor = () => {

    const { id } = useParams();
    const navigate = useNavigate();
  
      const handleSubmit =(event)=>{
          console.log("clicked")
  
          event.preventDefault();
          const formData  = new FormData(event.target);
          const data = Object.fromEntries(formData.entries());
  
          
  
          BackendApi.author.editAuthor(id,data)
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
    <Sidebar/>

    <div style={{ flex: 1, padding: '20px' }}>
    <p>this is edit page</p>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nameInput">Name</label>
        <input type="text" className="form-control" id="name" name='name'  placeholder="Enter Book name" />
      </div>
      <div className="form-group">
        <label htmlFor="titleInput">Age  </label>
        <input type="text" className="form-control" id="age"  name='age' placeholder="Enter Book Title" />
      </div>
      <div className="form-group">
        <label htmlFor="priceInput">Country</label>
        <input type="text" className="form-control" id="country" name='country' placeholder="Enter Book Price" />
      </div>
	
      <button type="submit" className="btn btn-primary">Edit</button>
    </form>

    </div>
    </div>
  )
}

export default EditAuthor