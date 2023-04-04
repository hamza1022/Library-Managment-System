

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
 import { BackendApi } from '../../api';
 import { SetUser } from "../../store/user";
import { validateEmail } from "../core/helpers/validation";
 import Swal from 'sweetalert2';

 const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validation, setValidation] = useState({ email: "", password: "" });
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [profileError, setProfileError] = useState(null);
	const [error, setError] = useState("");



	const handleChange = (e) => {
		if (e.target.name === "email") {
			setEmail(e.target.value);
		}
		if (e.target.name === "password") {
			setPassword(e.target.value);
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
		if (e.target.name === "password") {
			if (password.length <= 0) temp = { ...temp, password: "password is required" };
			else if (password.length < 4) temp = { ...temp, password: "This field must be at least 4 characters long" };
			else temp = { ...temp, password: "" };
		}
		setValidation(temp);
	};

	const checkDisable = () => {
		if (email.length <= 0 || password.length <= 0) {
			return true;
		}
		if (validation.email.length > 0 || validation.password.length > 0) {
			return true;
		}
		return false;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let body = {
			email: email,
			password: password,
		};

    BackendApi.user.login(body)
    .then((user) => {
      console.log("user restored", user)
      dispatch(SetUser(user));
      window.localStorage.setItem("token", user.token);
      setEmail("");
      setPassword("");
      setProfileError(null);

	  Swal.fire({
		icon: 'success',
		title: 'Login Successfull',
		text: 'Thanks for Login',
		showCancelButton: false,
		showConfirmButton: false,
		timer: 1500
	  }).then(()=>{
		if (user.role == "admin") {
			navigate("/admin/dashboard/books");
		  }
		  else{
			 navigate("/user/books");
		  }

	  })

	  
   
  })
  .catch((err)=>{
    console.log(err)
    setError(err.response?.data?.message);
	setEmail("")
	setPassword("")

  })

		
	};

	return (
		<div>
			<div className="auth-overlay">
				<div className="container">
					<div className="auth-form">
						<form className="pt-3">
							<div className="text-center mb-2">
								<img src="/assets/images/fixerstation-logo.png" height={60} alt="" />
							</div>
							<h3 className="fw-600 text-900 mb-2 text-center">Log in</h3>
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
							<label className="fs-14 fw-500 mb-1">Password</label>
							<div
								className={`input-box position-relative mb-3 ${validation.password.length > 0 ? "error-message" : ""}`}>
								<input
									type={isPasswordVisible ? "text" : "password"}
									placeholder="Password"
									name="password"
									value={password}
									onBlur={(e) => handleValidation(e)}
									onChange={(e) => handleChange(e)}
									className="br-16 h-56 authInput"
								/>
								{validation.password.length > 0 && <div className="error">{validation.password}</div>}
								{!isPasswordVisible && (
									<span
										onClick={() => {
											setIsPasswordVisible(true);
										}}
										className="iconEye">
										<span className="iconify" data-icon="ic:outline-remove-red-eye"></span>
									</span>
								)}
								{isPasswordVisible && (
									<span
										onClick={() => {
											setIsPasswordVisible(false);
										}}
										className="iconEye">
										<span className="iconify" data-icon="pajamas:eye-slash"></span>
									</span>
								)}
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
									Login
								</button>
							</div>
							<div className="text-center">
								<Link to="/forgot" className="fs-14 fw-500 text-800 text-center">
									Forgot password?
								</Link>
							</div>
						</form>
						
					</div>
					      <div className="form-footer">
         <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="fs-13 fw-500 text-900">Don't Have an account?</div>
           <Link to="/register" className="fs-13 fw-500 text-primary">
            Register
           </Link>
         </div>
       </div>
       
				</div>
			</div>
		</div>
	);
};
 export default Login

