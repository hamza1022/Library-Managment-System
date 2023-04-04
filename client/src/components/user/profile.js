import React, { useState } from "react";
import { BackendApi } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Sidebar } from "../layout/sidebar";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordDisMatch, setIsPasswordDisMatch] = useState(false);

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);

  }


  const handleOldPasswordBlur = (e)=>{
    if (oldPassword.length < 4) {
      setOldPasswordError(" Old password is required");
    }

    else {
      setOldPasswordError("");
    }

  }

  const handlePasswordBlur = () => {
    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long");
    }
    else if (password === oldPassword) {
      setPasswordError("Old and New password can not be same")
      

    } 
    else {
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
		if (oldPassword.length<=0 || password.length <= 0 || confirmPassword.length <= 0) {
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
    oldPassword,
    password,
    confirmPassword,
  }

      BackendApi.user.changePassword(data)
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Password has been changed successfully!!!",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#2c974acd",
          allowEnterKeyboard: true,
        }).then((result) => {
          if (result.isConfirmed) navigate("/user/books");
        });
      })
      .catch((e) => {
        setError(e.response.data.message);
  
      });

  };

 

  return (
    <>
      <div style={{display :"flex"}}>
   
    <Sidebar/>
     

    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="password">Old Password</label>
    <input
      type="password"
      className="form-control"
      id="oldPassword"
      name="oldPassword"
      value={oldPassword}
      onChange={handleOldPasswordChange}
      onBlur={handleOldPasswordBlur}
    />
    {oldPasswordError && (
      <div className="text-danger">{oldPasswordError}</div>
    )}
  </div>
  
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
  <div className="col-lg-12">
									{error?.length > 0 && <div className="error-message text-danger mb-3 fs-16 text-center">{error}</div>}
								</div>
  <button type="submit"  disabled={checkDisable()} className="btn btn-primary">
    Submit
  </button>
</form>

      

      </div>
    </>
  );
};

export default Profile;
