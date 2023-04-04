import React, { useState } from "react";
import { BackendApi } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { validateInput } from "../core/helpers/inputValidator";
import Swal from "sweetalert2";

const Reset = () => {
  const {id,passwordResetToken} = useParams();
  console.log(passwordResetToken,id)
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordDisMatch, setIsPasswordDisMatch] = useState(false);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordBlur = () => {
    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };


  const comaprePassword = () => {
		if (password !== confirmPassword) {
		setError("Password mismatch")
    setIsPasswordDisMatch(true);
			return false;
		} else {
      setIsPasswordDisMatch(false);
			
			return true;
		}
	};
  const checkDisable = () => {
		if (password.length <= 0 || confirmPassword.length <= 0) {
			return true;
		}
		if  (password !== confirmPassword){
			return true;
		}
		return false;
	};


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!comaprePassword()) return;


  let data  = {
    password,
    confirmPassword,
  }

      BackendApi.user.resetPassword(data,id, passwordResetToken)
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

  };



  return (
   <>



  
  <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      name="password"
      value={password}
      onChange={handlePasswordChange}
      onBlur={handlePasswordBlur}
    />
    {passwordError && (
      <div className="text-danger">{passwordError}</div>
    )}
  </div>
  <div className="form-group">
    <label htmlFor="confirmPassword">Confirm Password</label>
    <input
      type="password"
      className="form-control"
      id="confirmPassword"
      name="confirmPassword"
      value={confirmPassword}
      onChange={handleConfirmPasswordChange}
      onBlur={handleConfirmPasswordBlur}
    />
    {confirmPasswordError && (
      <div className="text-danger">{confirmPasswordError}</div>
    )}
  </div>
  {error?.length > 0 && (
								<div className="alert alert-danger fs-12">
									{error}
								
								</div>
							)}
  <button type="submit" disabled={checkDisable()} className="btn btn-primary">
    Submit
  </button>
</form>
 <div className="form-footer">
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="fs-13 fw-500 text-900">Have an account?</div>
          <Link to="/" className="fs-13 fw-500 text-primary">
            Login
          </Link>
        </div>
      </div>



  

   </>

  );
};
export default Reset;