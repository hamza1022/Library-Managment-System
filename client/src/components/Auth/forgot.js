
import React, { useState } from 'react'

import { Link, useNavigate } from "react-router-dom";
import { BackendApi } from '../../api';
import { validateEmail } from "../core/helpers/validation";


const Forgot = () => {
    const navigate= useNavigate()
    const [email, setEmail] = useState("");
    const [validation, setValidation] = useState({ email: "" });
 
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



  return (
    <>

<div>
			<div className="auth-overlay">
				<div className="container">
					<div className="auth-form">
						<form className="pt-3">
							<div className="text-center mb-2">
								<img src="/assets/images/fixerstation-logo.png" height={60} alt="" />
							</div>
						
							<label className="fs-14 fw-500 mb-1">Email</label>
							<div className={`input-box mb-3 ${validation.email.length > 0 ? "error-message" : ""}`}>
								<input
									type="text"
									placeholder="Email"
									name="email"
									value={email}
									onBlur={(e) => handleValidation(e)}
									onChange={(e) => handleChange(e)}
									className="br-16 h-56 authInput"
								/>
								{validation.email.length > 0 && <div className="error">{validation.email}</div>}
							</div>
						
						
              {error?.length > 0 && (
								<div className="alert alert-danger fs-12">
									{error}
								
								</div>
							)}
						
            
              
							<div className="mb-3 mt-5">
								<button
									type="submit"
									disabled={checkDisable()}
									onClick={handleSubmit}
									className="btnPrimary h-56 w-100 br-16">
									Send
								</button>
							</div>
						
						</form>
						
					</div>
					    
       
				</div>
			</div>
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

export default Forgot

