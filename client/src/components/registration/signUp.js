import React,{useEffect, useState} from 'react'

import { Link, useNavigate } from "react-router-dom";



import  {BackendApi}  from "../../api"


export default function SignUp() {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData  = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    signup(data)



  };
 
  const  signup = async (data)=>{

     await BackendApi.user.signUp(data)
     .then((data)=>{
		console.log(data)

        navigate(`/registration/otp/${data._id}/type:2`);


     })
     .catch((err)=>{
        console.log(err)
     }) 

  }


  return (
<>

    <form onSubmit={handleSubmit}>
    
      <div className="form-group">
        <label htmlFor="nameInput">Name</label>
        <input type="text" className="form-control" id="name" name='name'  placeholder="Enter your name" />
      </div>
      <div className="form-group">
        <label htmlFor="emailInput">Email address</label>
        <input type="email" className="form-control" id="email"  name='email' placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label htmlFor="passwordInput">phoneNumber</label>
        <input type="text" className="form-control" id="phoneNumber"   name='phoneNumber'placeholder="Enter your Phone Number" />
      </div>
	  <div className="form-group">
        <label htmlFor="passwordInput">Address</label>
        <input type="text" className="form-control" id="address"  name='address' placeholder="Enter your Address" />
      </div>
	  <div className="form-group">
        <label htmlFor="passwordInput">Password</label>
        <input type="password" className="form-control" id="password"  name='password' placeholder="Enter your password" />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
    <div className="d-flex justify-content-center align-items-center gap-3">
								<div className="fs-13 fw-500 text-900">Have an account?</div>
								<Link to="/" className="fs-13 fw-500 text-primary">
									Login
								</Link>
							</div>

</>
  );
}