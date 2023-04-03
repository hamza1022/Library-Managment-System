import React, { useState } from "react";
import { BackendApi } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Sidebar } from "../layout/sidebar";
import Swal from "sweetalert2";

const Reset = () => {
  const navigate = useNavigate();
  const {passwordRestToken} = useParams();
  console.log(passwordRestToken)


  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState({ email: "",password:"",confirmPassword: "", });
  const [error, setError] = useState("");

  const handleChange = (e) => {
		if (e.target.name === "email") {
			setEmail(e.target.value);
		}
	};

	const handleValidation = (e) => {
		let temp = { ...validation };
		if (e.target.name === "email") {
			if (email.length <= 0) {
				temp = { ...temp, email: "email is required" };
			} else if (!validateEmail(email)) {
				temp = { ...temp, email: "email is not valid" };
			} else {
				temp = { ...temp, email: "" };
			}
		}
	
		setValidation(temp);
	};

	const checkDisable = () => {
		if (email.length <= 0) {
			return true;
		}
		if (validation.email.length > 0 ) {
			return true;
		}
		return false;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let body = {
			email: email,
		};

    BackendApi.user.forgotPassword(body)
    .then((user) => {
      console.log("user restored", user)
      setEmail("");
      navigate(`/registration/otp/${user.result._id}/2`);
    
     
    })
  .catch((err)=>{
    console.log(err)
    setError(err.response?.data?.message);

  })

		
	};



  const handleSubmit = (event)=>{
    event.preventDefault();
    const formData  = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    if(data.email === ""){
        setError("Email is required")
    }

    else if(data.password.length <= 0 === "" ){
      setError("password is required")
    }
    else if  (data.password.length < 4){
      setError("password   must be at least 4 characters")
    }
    else if(data.password !== data.confirmPassword){
      setError("Password and confirm password must be the same")

    }

    BackendApi.user.resetPassword(data,passwordRestToken)
    .then((res) => {
      Swal.fire({
        title: "Success",
        text: "Password has been reset successfully!!!",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#2c974acd",
        allowEnterKeyboard: true,
      }).then((result) => {
        if (result.isConfirmed) navigate("/");
      });
    })
    .catch((e) => {
      setError(e.response.data.message);
    
    });

  }


  

  return (
    <>
      <div style={{display :"flex"}}>
   
    <Sidebar/>
     

      <form onSubmit={handleSubmit}>
    
      
      <div className="form-group">
        <label htmlFor="emailInput">Email</label>
        <input type="email" className="form-control" id="email"  name='email' placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label htmlFor="emailInput">New Password</label>
        <input type="password" className="form-control" id="email"  name='password' placeholder="Enter your new password" />
      </div>
      <div className="form-group">
        <label htmlFor="emailInput">Confirm Password</label>
        <input type="password" className="form-control" id="email"  name='confirmPassword' placeholder="enter password again" />
      </div>

      
      
      
      <button type="submit" className="btn btn-primary">Set Password</button>

      {error?.length > 0 && (
								<div className="alert alert-danger fs-12">
									{error}
								
								</div>
							)}
    </form>

      

      </div>
    </>
  );
};

export default Reset;
