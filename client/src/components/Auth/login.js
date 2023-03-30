
import React from 'react'

import { Link, useNavigate } from "react-router-dom";
import { BackendApi } from '../../api';
import { useDispatch } from "react-redux";
import { SetUser } from "../../store/user";


// export const UserContext = createContext();
const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    login(data)

  };

  const login =   (data) => {

    BackendApi.user.login(data)
    .then((user) => {
      console.log("user restored", user)
      dispatch(SetUser(user));
      window.localStorage.setItem("token", user.token);
      
     
  
      if (user.role == "admin") {
        navigate("/admin/dashboard/books");
      }
      else{
         navigate("/user/books");
      }
    })
    .catch((err) => {
      console.log("err",err)
    })
  

  }




  return (
    <>
    


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
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input type="password" className="form-control" id="password" name='password' placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="text-center">
								<Link to="/forgot" className="fs-14 fw-500 text-800 text-center">
									Forgot password?
								</Link>
							</div>

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

export default Login

