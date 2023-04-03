import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { environment } from "../../constants";
import { validateInput } from "../../core/helpers/inputValidator";
import http from "../../api";
import numericOnly from "../../core/directives/numericOnly";
import phoneNumber from "../../core/directives/phoneNumber";



export const Signup = () => {
	const navigate = useNavigate();

	const defaultBody = {
		profileImage: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		primaryPhone: ""
	};

	const defaultValidationErrors = {
		firstName: [],
		lastName: [],
		email: [],
		password: [],
		confirmPassword: [],
		primaryPhone: []
	};

	const [body, setBody] = useState(defaultBody);
	const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
	

	const validateNumbers = () => {
		// TODO: Need a logic to check a valid US phone number here
		return true;
	};



	const checkValidation = () => {
		if (body.email.length <= 0 || body.primaryPhone.length <= 0) return true;

		for (let field in validationErrors) {
			if (validationErrors[field].length > 0) return true;
		}

		return false;
	};

	const handleSubmit = () => {
		if (!validateNumbers()) return;

		http
			.post(environment.api_url + "/user/signup", body)
			.then((res) => {
				setError("");
				setBody(defaultBody);
				navigate("/auth/complete-profile/" + res.data.data.user._id);
			})
			.catch((err) => {
				setError(err?.response?.data?.message);
			});
	};

	return (
		<div>
			<div className="auth-overlay signup-overlay">
				<div className="container">
					<div className="auth-form signup-form">
						<form className="pt-3">
							<div className="text-center mb-2">
								<img src="/assets/images/fixerstation-logo.png" height={60} alt="" />
							</div>
							<h5 className="fw-600 text-900 mb-2 text-center">Sign up as Handyman</h5>
							<div className="row justify-content-center">
								<div className="col-12">
									<div className="d-flex align-items-center mb-3">
										<div className="userUpload me-4">
											{body?.profileImage?.length > 0 ? (
												<>
													<img src={body?.profileImage} alt="" />
													<a onClick={() => setBody({ ...body, profileImage: "" })} className="cross-profile pointer">
														<span className="iconify" data-icon="gridicons:cross-circle"></span>
													</a>
												</>
											) : (
												<>
													<img src="/assets/images/ellips-upload-user.png" alt="" />
												</>
											)}
										</div>
										{body?.profileImage?.length <= 0 && (
											<>
												<div className="uploadBox h-40">
													{isLoading }
													{!isLoading && (
														<>
															<div className="icon">
																<span className="iconify " data-icon="akar-icons:cloud-upload"></span>
															</div>
															<div className="fs-14 fw-500 text-800">
																Add Profile{" "}
																<input
																	onChange={(e) => {
																		onProfileImageChange(e);
																		e.target = null;
																	}}
																	type="file"
																/>
															</div>
														</>
													)}
												</div>
											</>
										)}
									</div>
								</div>
								<div className="col-lg-6">
									<label className="fs-14 fw-500 mb-1">First Name</label>
									<div className={`input-box mb-3 ${validationErrors.firstName.length > 0 ? "error-message" : ""}`}>
										<input
											type="text"
											required
											placeholder="First Name"
											value={body?.firstName}
											onInput={(e) => setBody({ ...body, firstName: e.target.value })}
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													firstName: validateInput(e),
												});
											}}
											className="br-16 h-56 authInput"
										/>
										{validationErrors.firstName.length > 0 &&
											validationErrors.firstName.map((val, i) => {
												return (
													<div key={i} className="error">
														{val}
													</div>
												);
											})}
									</div>
								</div>
								<div className="col-lg-6">
									<label className="fs-14 fw-500 mb-1">Last Name</label>
									<div className={`input-box mb-3 ${validationErrors.lastName.length > 0 ? "error-message" : ""}`}>
										<input
											type="text"
											required
											placeholder="Last Name"
											value={body?.lastName}
											onInput={(e) => setBody({ ...body, lastName: e.target.value })}
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													lastName: validateInput(e),
												});
											}}
											className="br-16 h-56 authInput"
										/>
										{validationErrors.lastName.length > 0 &&
											validationErrors.lastName.map((val, i) => {
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
									<div className={`input-box mb-3 ${validationErrors.primaryPhone.length > 0 ? "error-message" : ""}`}>
										<input
											type="text"
											required
											minLength={8}
											onKeyPress={(e) => phoneNumber(e)}
											value={body?.primaryPhone}
											onInput={(e) => setBody({ ...body, primaryPhone: e.target.value })}
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													primaryPhone: validateInput(e),
												});
											}}
											placeholder="Phone Number"
											className="br-16 h-56 authInput"
										/>
										{validationErrors.primaryPhone.length > 0 &&
											validationErrors.primaryPhone.map((val, i) => {
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
								<div className="col-lg-6">
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
								<div className="col-lg-6">
									<label className="fs-14 fw-500 mb-1">Confirm Password</label>
									<div
										className={`input-box position-relative mb-3 ${
											validationErrors.confirmPassword.length > 0 ? "error-message" : ""
										}`}>
										<input
											type={isConfirmPasswordVisible ? "text" : "password"}
											required
											minLength={4}
											value={body?.confirmPassword}
											onInput={(e) => setBody({ ...body, confirmPassword: e.target.value })}
											placeholder="Confirm Password"
											name="confirmPassword"
											onBlur={(e) => {
												setValidationErrors({
													...validationErrors,
													confirmPassword: validateInput(e, body?.password),
												});
											}}
											className="br-16 h-56 authInput"
										/>
										{validationErrors.confirmPassword.length > 0 &&
											validationErrors.confirmPassword.map((val, i) => {
												return (
													<div key={i} className="error">
														{val}
													</div>
												);
											})}
										{!isConfirmPasswordVisible && (
											<span
												onClick={() => {
													setIsConfirmPasswordVisible(true);
												}}
												className="iconEye">
												<span className="iconify" data-icon="ic:outline-remove-red-eye"></span>
											</span>
										)}
										{isConfirmPasswordVisible && (
											<span
												onClick={() => {
													setIsConfirmPasswordVisible(false);
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
										Next
									</button>
								</div>
							</div>
						</form>
						<div className="form-footer">
							<div className="d-flex justify-content-center align-items-center gap-3">
								<div className="fs-13 fw-500 text-900">Have an account?</div>
								<Link to="/auth" className="fs-13 fw-500 text-primary">
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
