import React, { useState } from "react";
import { BackendApi } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { validateEmail } from "../core/helpers/validation";

import { Sidebar } from "../layout/sidebar";
import Swal from "sweetalert2";

const Reset = () => {
  const {id,passwordRestToken} = useParams();
  console.log(passwordRestToken)
  const defaultBody = {
		password: "",
		confirmPassword: "",
	};
  const navigate = useNavigate();


  const defaultValidationErrors = {
		password: [],
		confirmPassword: [],
	};



  const [email, setEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
  const [body, setBody] = useState(defaultBody);
  const [validation, setValidation] = useState({ email: "",password:"",confirmPassword: "", });
  const [error, setError] = useState("");
  const [isPasswordDisMatch, setIsPasswordDisMatch] = useState(false);




	const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);


	const handleChange = (e) => {
		if (e.target.name === "email") {
			setEmail(e.target.value);
		}
		if (e.target.name === "password") {
			setPassword(e.target.value);
		}	
    if(e.target.name === "confirmPassword") {
      setconfirmPassword(e.target.value);
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
    if (e.target.name === "confirmPassword") {
			if (confirmPassword.length <= 0) temp = { ...temp, confirmPassword: "Confirm Password is required" };
			else if (confirmPassword.length < 4) temp = { ...temp, confirmPassword: "This field must be at least 4 characters long" };
			else temp = { ...temp, confirmPassword: "" };
		}
		setValidation(temp);
	};

	const checkDisable = () => {
		if (email.length <= 0 || password.length <= 0 || confirmPassword.length <= 0 || confirmPassword.length <=0) {
			return true;
		}
		if (validation.email.length > 0 || validation.password.length > 0 || validation.confirmPassword.length > 0) {
			return true;
		}
		return false;
	};

  const validatePasswords = () => {
		if (body.password !== body.confirmPassword) {
      setError("Passwords do not match")
			setIsPasswordDisMatch(true);
			setBody({ ...body, confirmPassword: "" });
			return false;
		} else {
			setIsPasswordDisMatch(false);
			return true;
		}
	};

	const handleSubmit = (e) => {
  	if (!validatePasswords()) return;

		e.preventDefault();
		let body = {
			email: email,
			password: password,
		};

    BackendApi.user.resetPassword(body,id, passwordRestToken)
    .then((res) => {
      Swal.fire({
        title: "Success",
        text: "Password has been changed successfully!!!",
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
    <div>
    <div className="auth-overlay">
      <div className="container">
        <div className="auth-form">
          <form className="pt-3">
            <div className="text-center mb-2">
              <img src="/assets/images/fixerstation-logo.png" height={60} alt="" />
            </div>
            <h3 className="fw-600 text-900 mb-2 text-center">Reset Password</h3>
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
            <label className="fs-14 fw-500 mb-1">Confirm Password</label>
            <div
              className={`input-box position-relative mb-3 ${validation.password.length > 0 ? "error-message" : ""}`}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                name="confirmPassword"
                value={confirmPassword}
                onBlur={(e) => handleValidation(e)}
                onChange={(e) => handleChange(e)}
                className="br-16 h-56 authInput"
              />
              {validation.confirmPassword.length > 0 && <div className="error">{validation.confirmPassword}</div>}
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
            {validationErrors?.confirmPassword.length <= 0 && isPasswordDisMatch && (
									<div className="error-message text-danger text-center fs-12 mt-2">
										Password and Confirm Password did not match!!
									</div>
								)}
                {error?.length > 0 && (
								<div className="error-message text-danger text-center mt-2  fs-5 ms-3 mb-3">{error}</div>
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
  );
};
export default Reset;