import React from 'react'
import { AdminDashboard } from './dashboard'

import { useNavigate, useParams } from "react-router-dom";
import { BackendApi } from '../../api';

const EditBook = () => {

  const { id } = useParams();
  const navigate = useNavigate();

    const handleSubmit =(event)=>{
        console.log("clicked")

        event.preventDefault();
        const formData  = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        

          BackendApi.book.editBook(id,data)
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
    <p>this is edit page</p>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nameInput">Book Name</label>
        <input type="text" className="form-control" id="bookName" name='bookName'  placeholder="Enter Book name" />
      </div>
      <div className="form-group">
        <label htmlFor="titleInput">Book Title </label>
        <input type="text" className="form-control" id="bookTitle"  name='bookTitle' placeholder="Enter Book Title" />
      </div>
      <div className="form-group">
        <label htmlFor="priceInput">Book Price</label>
        <input type="number" className="form-control" id="bookPrice" name='bookPrice' placeholder="Enter Book Price" />
      </div>
	  {/* <div className="form-group">
        <label htmlFor="passwordInput">Author</label>
        <input type="text" className="form-control" id="Author"  name='Author' placeholder="Enter Author" />
      </div> */}
      <button type="submit" className="btn btn-primary">Edit</button>
    </form>

    </div>
    </div>
  )
}

export default EditBook