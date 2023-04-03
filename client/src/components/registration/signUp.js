import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateInput } from "../core/helpers/inputValidator";
import numericOnly from "../core/directives/numericOnly";
import phoneNumber from "../core/directives/phoneNumber";
import { BackendApi } from "../../api";
import Swal from 'sweetalert2';



 const Signup = () => {
	const navigate = useNavigate();

	const defaultBody = {
		profileImage: "",
		name: "",
		address: "",
		email: "",
		password: "",
		
		phoneNumber: ""
	};

	const defaultValidationErrors = {
		name: [],
		address: [],
		email: [],
		password: [],
		phoneNumber: []
	};

	const [body, setBody] = useState(defaultBody);
	const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
  const [error, setError] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	
	const [isLoading, setIsLoading] = useState(false);
	

	const validateNumbers = () => {
		// TODO: Need a logic to check a valid US phone number here
		return true;
	};



	const checkValidation = () => {
		if (body.email.length <= 0 || body.phoneNumber.length <= 0) return true;

		for (let field in validationErrors) {
			if (validationErrors[field].length > 0) return true;
		}

		return false;
	};

	const handleSubmit = () => {
		if (!validateNumbers()) return;

     BackendApi.user.signUp(body)
    .then((data)=>{
   console.log(data)
   
   Swal.fire({
     icon: 'success',
     title: 'Registration successful',
     text: 'Please check your email for verification',
     confirmButtonText: 'OK'
   }).then(() => {
     navigate(`/registration/otp/${data._id}/1`);
   });

    })
    .catch((err)=>{
     setError(err.response.data.message);
       console.log(err)
    }) 
	};

	return (
		<div>
			<div className="auth-overlay signup-overlay">
				<div className="container">
					<div className="auth-form signup-form">
						<form className="pt-3">
							
						
							<div className="row justify-content-center">
								
								<div className="col-lg-6">
									<label className="fs-14 fw-500 mb-1">First Name</label>
									<div className={`input-box mb-3 ${validationErrors.name.length > 0 ? "error-message" : ""}`}>
										<input
											type="text"
											required
											placeholder="First Name"
											value={body?.name}
											onInput={(e) => setBody({ ...body, name: e.target.value })}
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													name: validateInput(e),
												});
											}}
											className="br-16 h-56 authInput"
										/>
										{validationErrors.name.length > 0 &&
											validationErrors.name.map((val, i) => {
												return (
													<div key={i} className="error">
														{val}
													</div>
												);
											})}
									</div>
								</div>
								<div className="col-lg-6">
									<label className="fs-14 fw-500 mb-1">Address</label>
									<div className={`input-box mb-3 ${validationErrors.address.length > 0 ? "error-message" : ""}`}>
										<input
											type="text"
											required
											placeholder="Address"
											value={body?.address}
											onInput={(e) => setBody({ ...body, address: e.target.value })}
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													address: validateInput(e),
												});
											}}
											className="br-16 h-56 authInput"
										/>
										{validationErrors.address.length > 0 &&
											validationErrors.address.map((val, i) => {
												return (
													<div key={i} className="error">
														{val}
													</div>
												);
											})}
									</div>
								</div>

								<div className="col-lg-6">
									<label className="fs-14 fw-500 mb-1">Phone Number</label>
									<div className={`input-box mb-3 ${validationErrors.phoneNumber.length > 0 ? "error-message" : ""}`}>
										<input
											type="text"
											required
											minLength={8}
											onKeyPress={(e) => phoneNumber(e)}
											value={body?.phoneNumber}
											onInput={(e) => setBody({ ...body, phoneNumber: e.target.value })}
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													phoneNumber: validateInput(e),
												});
											}}
											placeholder="Phone Number"
											className="br-16 h-56 authInput"
										/>
										{validationErrors.phoneNumber.length > 0 &&
											validationErrors.phoneNumber.map((val, i) => {
												return (
													<div key={i} className="error">
														{val}
													</div>
												);
											})}
									</div>
								</div>
								<div className="col-lg-6">
									<label className="fs-14 fw-500 mb-1">Email</label>
									<div className={`input-box mb-3 ${validationErrors.email.length > 0 ? "error-message" : ""}`}>
										<input
											type="email"
											value={body?.email}
											onInput={(e) => setBody({ ...body, email: e.target.value })}
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													email: validateInput(e),
												});
											}}
											placeholder="Email"
											className="br-16 h-56 authInput"
										/>
										{validationErrors.email.length > 0 &&
											validationErrors.email.map((val, i) => {
												return (
													<div key={i} className="error">
														{val}
													</div>
												);
											})}
									</div>
								</div>
								<div className="col-lg-12">
									<label className="fs-14 fw-500 mb-1">Password</label>
									<div
										className={`input-box position-relative mb-3 ${
											validationErrors.password.length > 0 ? "error-message" : ""
										}`}>
										<input
											type={isPasswordVisible ? "text" : "password"}
											required
											minLength={4}
											value={body?.password}
											onInput={(e) => setBody({ ...body, password: e.target.value })}
											placeholder="Password"
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													password: validateInput(e),
												});
											}}
											className="br-16 h-56 authInput"
										/>
										{validationErrors.password.length > 0 &&
											validationErrors.password.map((val, i) => {
												return (
													<div key={i} className="error">
														{val}
													</div>
												);
											})}
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
								</div>
							
								<div className="col-lg-12">
									{error?.length > 0 && <div className="error-message text-danger mb-3 fs-16 text-center">{error}</div>}
								</div>

								<div className="col-lg-6">
									<button
										type="button"
										className="btnPrimary pointer h-56 w-100 br-16"
										onClick={(e) => {
											e.preventDefault();
											handleSubmit();
										}}
										disabled={checkValidation()}>
										Register
									</button>
								</div>
							</div>
						</form>
						<div className="form-footer">
							<div className="d-flex justify-content-center align-items-center gap-3">
								<div className="fs-13 fw-500 text-900">Have an account?</div>
								<Link to="/" className="fs-13 fw-500 text-primary">
									Log in
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};



export default Signup