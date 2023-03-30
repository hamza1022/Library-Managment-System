import React, { useState } from "react";
import { BackendApi } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Sidebar } from "../layout/sidebar";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");



  const handleSubmit = (event)=>{
    event.preventDefault();
    const formData  = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if(data.oldPassword.length <= 0 === "" ){
      setError("old password is required")
    }
    else if  (data.oldPassword.length < 4){
      setError("password   must be at least 4 characters")
    }
    else if(data.password !== data.confirmPassword){
      setError("Password and confirm password must be the same")

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
        if (result.isConfirmed) navigate("/user/dashboard");
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
        <label htmlFor="nameInput">Old password</label>
        <input type="password" className="form-control" id="name" name='oldPassword'  placeholder="Enter your old password" />
      </div>
      <div className="form-group">
        <label htmlFor="emailInput">New Password</label>
        <input type="password" className="form-control" id="email"  name='password' placeholder="Enter your new password" />
      </div>
      <div className="form-group">
        <label htmlFor="emailInput">Confirm Password</label>
        <input type="password" className="form-control" id="email"  name='confirmPassword' placeholder="enter password again" />
      </div>
      
      <button type="submit" className="btn btn-primary">Register</button>
    </form>

      

      </div>
    </>
  );
};

export default Profile;
