import React, { useState } from "react";
import { BackendApi } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { validateInput } from "../core/helpers/inputValidator";
import Swal from "sweetalert2";

const Reset = () => {
  const {id,passwordResetToken} = useParams();
  console.log(passwordResetToken,id)
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the password and confirmPassword values
    
  //     BackendApi.user.resetPassword(data,id, passwordResetToken)
  //     .then((res) => {
  //       Swal.fire({
  //         title: "Success",
  //         text: "Password has been changed successfully!!!",
  //         icon: "success",
  //         confirmButtonText: "Ok",
  //         confirmButtonColor: "#2c974acd",
  //         allowEnterKeyboard: true,
  //       }).then((result) => {
  //         if (result.isConfirmed) navigate("/");
  //       });
  //     })
  //     .catch((e) => {
  //       setError(e.response.data.message);
  
  //     });

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


 



	const [error, setError] = useState("");





	// const handleSubmit = (event) => {

  //   event.preventDefault();
  //   const formData  = new FormData(event.target);
  //   const data = Object.fromEntries(formData.entries());
  //   console.log(data);

   

  //   if(data.password.length <= 0 === "" ){
  //     setError("password is required")
  //   }
  //   else if  (data.password.length < 4){
  //     setError("password   must be at least 4 characters")
  //   }
  //   else if(data.password !== data.confirmPassword){
  //     setError("Password and confirm password must be the same")

  //   }

   

  //     BackendApi.user.resetPassword(data,id, passwordResetToken)
  //     .then((res) => {
  //       Swal.fire({
  //         title: "Success",
  //         text: "Password has been changed successfully!!!",
  //         icon: "success",
  //         confirmButtonText: "Ok",
  //         confirmButtonColor: "#2c974acd",
  //         allowEnterKeyboard: true,
  //       }).then((result) => {
  //         if (result.isConfirmed) navigate("/");
  //       });
  //     })
  //     .catch((e) => {
  //       setError(e.response.data.message);
  
  //     });

    

  	



   



	// }

  return (
   


  //   <form onSubmit={handleSubmit}>


   
  //   <div className="form-group">
  //     <label htmlFor="emailInput">New Password</label>
  //     <input type="password" className="form-control" id="email"  name='password' placeholder="Enter password" />
  //   </div>
  //   <div className="form-group">
  //     <label htmlFor="emailInput">Confirm Password</label>
  //     <input type="password" className="form-control" id="email"  name='confirmPassword' placeholder="Confirm password " />
  //   </div>
  //   {error?.length > 0 && (
	// 							<div className="alert alert-danger fs-12">
	// 								{error}
								
	// 							</div>
	// 						)}

  //   <button type="submit" className="btn btn-primary">Set Password</button>
  // </form>
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
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>



  


  );
};
export default Reset;