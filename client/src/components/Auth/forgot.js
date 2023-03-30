
import React from 'react'

import { Link, useNavigate } from "react-router-dom";
import { BackendApi } from '../../api';


// export const UserContext = createContext();
const Forgot = () => {
    const navigate= useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data)

    forgot(data)

  };

  const forgot =   (data) => {

    BackendApi.user.forgotPassword(data)
    .then((user) => {
      console.log("user restored", user)
      navigate(`/registration/otp/${user.result._id}`);
    
     
    })
    .catch((err) => {
      console.log("err",err)
    })
  

  }




  return (
    <>

    <div>
        <h2>Forgot Your Password?</h2>
        <div>
            <p>
            Enter your email address to request a password
reset. You will receive an OTP with further instructions.
            </p>
        </div>
    </div>
    


      <div className="text-center mb-2">
        <img src="\public\assests\images\ellips-upload-user.png" height={60} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-2">
          <img src="/assets/images/ellips-upload-user.png" height={60} alt="" />
        </div>
        <div className="form-group" style={{ marginTop: 20 }}>
          <label htmlFor="emailInput">Email address</label>
          <input type="email" className="form-control" id="email" name='email' placeholder="Enter your email" />
        </div>
       
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
  
      <div className="form-footer">
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="fs-13 fw-500 text-900">Don't Have an account?</div>
          <Link to="/register" className="fs-13 fw-500 text-primary">
            Register
          </Link>
        </div>
      </div>
    
    </>
  )
}

export default Forgot

